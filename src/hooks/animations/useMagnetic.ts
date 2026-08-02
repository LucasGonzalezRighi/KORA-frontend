'use client';

import { useRef } from 'react';

import { tokens } from '@/design-system';

import { POINTER_CONDITIONS, type MotionConditions, gsap, useGSAP, motionIsReduced } from './gsap';

type MagneticOptions = {
  /** Fracción de la distancia al cursor que el elemento se deja arrastrar. */
  strength?: number;
  /** Radio de influencia alrededor del elemento, en px. */
  radius?: number;
  /** Tope duro de desplazamiento, en px. */
  maxOffset?: number;
};

/**
 * Atracción magnética leve hacia el cursor.
 *
 * Los valores por defecto salen de `tokens.motion.magnetic` y son
 * deliberadamente bajos: el efecto funciona cuando apenas se insinúa. Si el
 * botón "persigue" al cursor, está mal calibrado.
 *
 * Usa `gsap.quickTo`, que reutiliza un mismo tween en vez de crear uno nuevo en
 * cada `pointermove`. Con un listener a 120 Hz, crear tweens es la diferencia
 * entre fluido y trabado.
 *
 * No corre en touch: sin cursor el efecto no existe y el listener sería puro
 * costo.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const {
    strength = tokens.motion.magnetic.strength,
    radius = tokens.motion.magnetic.radius,
    maxOffset = tokens.motion.magnetic.maxOffset,
  } = options;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(POINTER_CONDITIONS, (context) => {
        const { hasFinePointer, prefersReduced } = context.conditions as MotionConditions;
        if (!hasFinePointer || motionIsReduced(prefersReduced)) return;

        const moveX = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
        const moveY = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });

        const clamp = gsap.utils.clamp(-maxOffset, maxOffset);

        const onMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const dx = event.clientX - (bounds.left + bounds.width / 2);
          const dy = event.clientY - (bounds.top + bounds.height / 2);
          const reach = radius + Math.max(bounds.width, bounds.height) / 2;

          if (Math.hypot(dx, dy) > reach) {
            moveX(0);
            moveY(0);
            return;
          }

          moveX(clamp(dx * strength));
          moveY(clamp(dy * strength));
        };

        const onLeave = () => {
          moveX(0);
          moveY(0);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        element.addEventListener('pointerleave', onLeave);

        return () => {
          window.removeEventListener('pointermove', onMove);
          element.removeEventListener('pointerleave', onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [strength, radius, maxOffset] },
  );

  return ref;
}
