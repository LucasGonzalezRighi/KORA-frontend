'use client';

import { useRef } from 'react';

import { POINTER_CONDITIONS, type MotionConditions, gsap, useGSAP } from './gsap';

/**
 * Variables CSS que el hook actualiza. El gradiente las lee desde la hoja de
 * estilos, así el JS solo mueve dos números y el pintado queda del lado del CSS.
 */
export const GLOW_VARS = { x: '--kora-pointer-x', y: '--kora-pointer-y' } as const;

/**
 * Hace que un halo siga al cursor dentro del elemento, con retraso.
 *
 * El retraso es el punto: un glow pegado al cursor se siente barato; uno que lo
 * persigue se siente como una superficie con material. De ahí el `quickTo` con
 * duración y no una asignación directa.
 *
 * Al salir, el halo vuelve al centro en vez de quedarse clavado donde estaba.
 */
export function usePointerGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(POINTER_CONDITIONS, (context) => {
        const { hasFinePointer, prefersReduced } = context.conditions as MotionConditions;
        if (!hasFinePointer || prefersReduced) return;

        /*
         * Se anima un objeto intermedio y NO la variable CSS directamente.
         *
         * Animar `--kora-pointer-x` con GSAP le escribe un número crudo: la
         * propiedad arranca sin valor, así que no hay unidad de dónde deducirla
         * y queda `45` en vez de `45%`. El gradiente pasa a ser
         * `radial-gradient(... at 45 100 ...)`, que es CSS inválido — y un
         * gradiente inválido no se pinta: el halo desaparece entero.
         *
         * Con el proxy, GSAP interpola números y nosotros escribimos el `%`.
         */
        const position = { x: 72, y: 100 };

        const apply = () => {
          element.style.setProperty(GLOW_VARS.x, `${position.x}%`);
          element.style.setProperty(GLOW_VARS.y, `${position.y}%`);
        };

        apply();

        const tween = { duration: 0.9, ease: 'power2.out', onUpdate: apply };
        const setX = gsap.quickTo(position, 'x', tween);
        const setY = gsap.quickTo(position, 'y', tween);

        /*
         * El listener va en `window`, no en el elemento: la capa del halo es
         * `pointer-events-none` para no tapar el formulario que tiene encima, y
         * un elemento sin pointer-events nunca recibe `pointermove`.
         */
        const onMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width) * 100;
          const y = ((event.clientY - bounds.top) / bounds.height) * 100;

          // Fuera del bloque, el halo vuelve a su posición de reposo.
          if (x < -20 || x > 120 || y < -20 || y > 120) {
            setX(50);
            setY(100);
            return;
          }

          setX(x);
          setY(y);
        };

        window.addEventListener('pointermove', onMove, { passive: true });

        return () => {
          window.removeEventListener('pointermove', onMove);
          // Devuelve el halo a la posición del diseño al desmontar.
          element.style.removeProperty(GLOW_VARS.x);
          element.style.removeProperty(GLOW_VARS.y);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
