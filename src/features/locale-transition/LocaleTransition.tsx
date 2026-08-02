'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { tokens } from '@/design-system';
import { gsap } from '@/hooks/animations/gsap';

/** Marca los bloques que se animan al cambiar de idioma. Lo pone el atom `Section`. */
const BLOCK_SELECTOR = '[data-i18n-block]';

/**
 * Red de seguridad: si la animación de salida no termina a tiempo, se navega
 * igual.
 *
 * Esto no es paranoia. El `router.push` vive en el `onComplete` del tween, y el
 * ticker de GSAP corre sobre `requestAnimationFrame`: si por lo que sea ese
 * tween no completa, el idioma **nunca cambiaría**. Un efecto que falla tiene
 * que degradar a "cambia sin animación", nunca a "no cambia".
 */
const FAILSAFE_MS = 800;

type LocaleTransitionValue = {
  /** Anima la salida y recién después navega. */
  changeLocale: (href: string) => void;
};

const LocaleTransitionContext = createContext<LocaleTransitionValue | null>(null);

/** Bloques que están efectivamente en pantalla ahora mismo. */
function visibleBlocks(): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>(BLOCK_SELECTOR).filter((element) => {
    const bounds = element.getBoundingClientRect();
    return bounds.bottom > 0 && bounds.top < window.innerHeight;
  });
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Orquesta la transición al cambiar de idioma.
 *
 * Cómo funciona, y por qué así:
 *
 * - El `<Link>` del selector no navega solo: usa la prop `onNavigate` de
 *   `next/link`, cancela la navegación con `preventDefault()` y nos cede el
 *   control. Así conservamos el `<a href>` real — prefetch, hreflang y
 *   abrir-en-pestaña-nueva siguen funcionando, cosa que se perdería con un
 *   `<button>`.
 * - Se anima **solo lo visible**: los bloques fuera de pantalla ya aparecen
 *   traducidos cuando scrolleás, sin hacer esperar a nadie.
 * - El nav queda quieto a propósito. Acabás de hacer clic ahí; que se te vaya
 *   de abajo del cursor se siente como un error, no como una transición.
 * - Toda animación termina en `clearProps`, y hay un failsafe por tiempo: el
 *   contenido nunca puede quedar invisible.
 *
 * Encima de esto, `experimental.viewTransition` hace que el navegador cruce el
 * DOM viejo con el nuevo donde haya soporte. Son capas independientes: si esa
 * API no existe, la transición de GSAP sigue estando.
 */
export function LocaleTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isChanging = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFailsafe = () => {
    if (failsafe.current) {
      clearTimeout(failsafe.current);
      failsafe.current = null;
    }
  };

  const restore = useCallback(() => {
    gsap.set(gsap.utils.toArray<HTMLElement>(BLOCK_SELECTOR), { clearProps: 'all' });
    isChanging.current = false;
    clearFailsafe();
  }, []);

  const changeLocale = useCallback(
    (href: string) => {
      // Un segundo clic mientras corre la salida no debe encadenar navegaciones.
      if (isChanging.current) return;

      const blocks = visibleBlocks();
      if (blocks.length === 0) {
        router.push(href, { scroll: false });
        return;
      }

      isChanging.current = true;

      /*
       * Navega una sola vez, la dispare quien la dispare: el fin de la
       * animación o el failsafe. Sin este candado, un tween que completa tarde
       * después de que saltó el failsafe produciría una segunda navegación.
       * `scroll: false` conserva la posición: la traducción del bloque que
       * estabas leyendo tiene que aparecer donde estaba, no arriba de todo.
       */
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        clearFailsafe();
        router.push(href, { scroll: false });
      };

      failsafe.current = setTimeout(go, FAILSAFE_MS);

      const { choreography, choreographyEase, reducedMotion } = tokens.motion;

      // Movimiento reducido: solo se funde, sin desplazamiento ni escala.
      if (prefersReducedMotion()) {
        gsap.to(blocks, {
          autoAlpha: 0,
          duration: reducedMotion.duration,
          ease: 'none',
          onComplete: go,
        });
        return;
      }

      gsap.to(blocks, {
        autoAlpha: 0,
        y: -32,
        scale: 0.985,
        transformOrigin: 'center top',
        duration: choreography.exit,
        ease: choreographyEase.exit,
        stagger: 0.05,
        onComplete: go,
      });
    },
    [router],
  );

  /** La ruta ya cambió: el DOM nuevo está montado, se anima la entrada. */
  useEffect(() => {
    if (!isChanging.current) return;

    clearFailsafe();

    const blocks = visibleBlocks();
    if (blocks.length === 0) {
      restore();
      return;
    }

    const { choreography, choreographyEase, reducedMotion } = tokens.motion;

    if (prefersReducedMotion()) {
      gsap.fromTo(
        blocks,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: reducedMotion.duration,
          ease: 'none',
          clearProps: 'all',
          onComplete: () => {
            isChanging.current = false;
          },
        },
      );
      return;
    }

    /*
     * La entrada dura más del doble que la salida y escalona más: la salida
     * tiene que sacarse de encima, la entrada tiene que hacerse notar. Es la
     * misma regla que rige el resto del sitio.
     */
    gsap.fromTo(
      blocks,
      { autoAlpha: 0, y: 40, scale: 0.985 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        transformOrigin: 'center top',
        duration: choreography.enter,
        ease: choreographyEase.enter,
        stagger: 0.09,
        clearProps: 'all',
        onComplete: () => {
          isChanging.current = false;
        },
      },
    );
  }, [pathname, restore]);

  useEffect(() => clearFailsafe, []);

  return (
    <LocaleTransitionContext.Provider value={{ changeLocale }}>
      {children}
    </LocaleTransitionContext.Provider>
  );
}

/**
 * Acceso a la transición de idioma.
 *
 * Devuelve `null` fuera del provider en vez de tirar: si por algún motivo el
 * selector queda fuera del árbol, el link navega normalmente sin animación —
 * degradar es mejor que romper la navegación entre idiomas.
 */
export function useLocaleTransition(): LocaleTransitionValue | null {
  return useContext(LocaleTransitionContext);
}
