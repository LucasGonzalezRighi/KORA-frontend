'use client';

import { useRef } from 'react';

import { tokens } from '@/design-system';
import { gsap, useGSAP, motionIsReduced } from '@/hooks/animations/gsap';
import { cn } from '@/utils/cn';

/** Espacio duro: un espacio normal se colapsa al partir la etiqueta en spans. */
const HARD_SPACE = ' ';

/**
 * Intercambio de etiqueta al pasar el cursor, carácter por carácter.
 *
 * Hay dos copias del texto apiladas dentro de una máscara: al hacer hover, la
 * de arriba sube y la de abajo ocupa su lugar, con las letras desfasadas. El
 * escalonado es la razón de usar GSAP: CSS puede mover las dos capas, pero no
 * desfasar cada letra sin ensuciar el marcado con delays a mano.
 *
 * Está partido en hook + componente porque lo usan dos cosas distintas: los
 * links (`<a>`) y el disparador del submenú (`<button>`).
 */

/**
 * Devuelve el ref y los handlers para el elemento interactivo.
 *
 * Los eventos de foco están además de los de mouse a propósito: quien navega
 * con teclado tiene que ver el mismo estado que quien usa mouse.
 */
export function useLabelSwap<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      if (motionIsReduced()) return;

      const { durations, easings } = tokens.motion;
      const shared = { duration: durations.fast, ease: easings.outQuart, stagger: 0.018 };

      timeline.current = gsap
        .timeline({ paused: true })
        .to(root.querySelectorAll('[data-swap="top"]'), { yPercent: -105, ...shared }, 0)
        .fromTo(
          root.querySelectorAll('[data-swap="bottom"]'),
          { yPercent: 105 },
          { yPercent: 0, ...shared },
          0,
        );

      return () => {
        timeline.current?.kill();
        timeline.current = null;
      };
    },
    { scope: ref },
  );

  const handlers = {
    onMouseEnter: () => timeline.current?.play(),
    onMouseLeave: () => timeline.current?.reverse(),
    onFocus: () => timeline.current?.play(),
    onBlur: () => timeline.current?.reverse(),
  };

  return { ref, handlers };
}

function Layer({ label, layer }: { label: string; layer: 'top' | 'bottom' }) {
  return (
    <span aria-hidden className={cn('flex', layer === 'bottom' && 'absolute inset-0')}>
      {[...label].map((character, index) => (
        <span key={`${layer}-${index}`} data-swap={layer} className="inline-block whitespace-pre">
          {character === ' ' ? HARD_SPACE : character}
        </span>
      ))}
    </span>
  );
}

/**
 * Las dos capas de texto.
 *
 * El `pb` es necesario: sin él, el `overflow-hidden` de la máscara corta las
 * colas de las letras con descendente — la "g" de "Blog", sin ir más lejos.
 * El texto accesible va una sola vez en el `sr-only`; las capas visibles son
 * `aria-hidden` para que no se anuncie la etiqueta por duplicado.
 */
export function SwapLabel({ label }: { label: string }) {
  return (
    <span className="relative block overflow-hidden pb-[0.14em]">
      <span className="sr-only">{label}</span>
      <Layer label={label} layer="top" />
      <Layer label={label} layer="bottom" />
    </span>
  );
}
