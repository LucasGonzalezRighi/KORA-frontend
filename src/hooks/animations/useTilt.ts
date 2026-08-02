'use client';

import { useRef } from 'react';

import { POINTER_CONDITIONS, type MotionConditions, gsap, useGSAP } from './gsap';

type TiltOptions = {
  /** Inclinación máxima en grados. Bajo a propósito: de más, marea. */
  maxTilt?: number;
  /** Cuánto se levanta la card al pasar el cursor, en px. */
  lift?: number;
};

/**
 * Inclinación 3D leve siguiendo al cursor.
 *
 * `maxTilt` está deliberadamente bajo (4°). El efecto se arruina por exceso:
 * pasados unos 8° deja de leerse como profundidad y empieza a leerse como
 * distorsión, sobre todo con texto encima.
 *
 * El movimiento se aplica al contenedor con `transformPerspective`, así el
 * navegador lo resuelve en una sola capa compuesta.
 */
export function useTilt<T extends HTMLElement = HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const { maxTilt = 4, lift = 6 } = options;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(POINTER_CONDITIONS, (context) => {
        const { hasFinePointer, prefersReduced } = context.conditions as MotionConditions;
        if (!hasFinePointer || prefersReduced) return;

        const settings = { duration: 0.6, ease: 'power3.out' };
        const rotateX = gsap.quickTo(element, 'rotationX', settings);
        const rotateY = gsap.quickTo(element, 'rotationY', settings);
        const moveY = gsap.quickTo(element, 'y', settings);

        gsap.set(element, { transformPerspective: 900, transformOrigin: 'center' });

        const onMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const px = (event.clientX - bounds.left) / bounds.width - 0.5;
          const py = (event.clientY - bounds.top) / bounds.height - 0.5;

          rotateY(px * maxTilt * 2);
          rotateX(-py * maxTilt * 2);
          moveY(-lift);
        };

        const onLeave = () => {
          rotateX(0);
          rotateY(0);
          moveY(0);
        };

        element.addEventListener('pointermove', onMove, { passive: true });
        element.addEventListener('pointerleave', onLeave);

        return () => {
          element.removeEventListener('pointermove', onMove);
          element.removeEventListener('pointerleave', onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [maxTilt, lift] },
  );

  return ref;
}
