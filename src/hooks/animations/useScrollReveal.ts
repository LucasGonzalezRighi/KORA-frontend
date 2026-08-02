'use client';

import { useRef } from 'react';

import { tokens } from '@/design-system';

import { MOTION_CONDITIONS, type MotionConditions, gsap, useGSAP } from './gsap';

/** Clase que marca los elementos que entran escalonados dentro del contenedor. */
export const REVEAL_ITEM_CLASS = 'kora-reveal';

type ScrollRevealOptions = {
  /** Selector de los hijos a revelar. Por defecto, `.kora-reveal`. */
  selector?: string;
  /** Dónde entra el contenedor para disparar. Por defecto, `top 82%`. */
  start?: string;
  /** Retraso entre elementos. Por defecto, el stagger base del design system. */
  stagger?: number;
};

/**
 * Revela los hijos marcados cuando el contenedor entra en viewport.
 *
 * Disparo **play-once**: no se repite al volver a subir, que es lo acordado
 * para el contenido (el scrub queda para las piezas grandes).
 *
 * En mobile el movimiento es más corto y el stagger más rápido: la misma
 * coreografía en una pantalla angosta se siente lenta.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const containerRef = useRef<T>(null);
  const { selector = `.${REVEAL_ITEM_CLASS}`, start = 'top 82%', stagger } = options;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, prefersReduced } = context.conditions as MotionConditions;

        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (items.length === 0) return;

        const { reducedMotion } = tokens.motion;
        const trigger = { trigger: containerRef.current, start, once: true };

        // Movimiento reducido: se conserva el fundido, se saca el desplazamiento.
        if (prefersReduced) {
          gsap.from(items, {
            opacity: 0,
            duration: reducedMotion.duration,
            ease: 'none',
            stagger: reducedMotion.stagger,
            scrollTrigger: trigger,
          });
          return;
        }

        gsap.from(items, {
          y: isDesktop ? tokens.motion.revealOffset : tokens.motion.revealOffset * 0.6,
          opacity: 0,
          duration: isDesktop ? tokens.motion.durations.reveal : tokens.motion.durations.base,
          ease: tokens.motion.easings.outExpoSoft,
          stagger:
            stagger ?? (isDesktop ? tokens.motion.staggers.base : tokens.motion.staggers.tight),
          scrollTrigger: trigger,
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [selector, start, stagger] },
  );

  return containerRef;
}
