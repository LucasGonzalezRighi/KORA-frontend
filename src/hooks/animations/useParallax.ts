'use client';

import { useRef } from 'react';

import { tokens } from '@/design-system';

import { MOTION_CONDITIONS, type MotionConditions, gsap, useGSAP } from './gsap';

/** Atributo que marca una capa de parallax y con qué profundidad. */
export const PARALLAX_ATTR = 'data-parallax';
/** Atributo opcional: además de desplazarse, la capa escala (el hero). */
export const PARALLAX_ZOOM_ATTR = 'data-parallax-zoom';

type Depth = keyof typeof tokens.motion.parallaxDepth;

type ParallaxOptions = {
  start?: string;
  end?: string;
  /**
   * Cada capa se dispara con su propia posición en vez de con la del
   * contenedor. Es lo que hace falta cuando el contenedor agrupa varias piezas
   * repetidas —las cards del blog, por ejemplo— y cada una tiene que moverse
   * según dónde está ella, no dónde está la grilla.
   */
  triggerSelf?: boolean;
};

/**
 * Parallax **atado al scroll** (scrub) para las capas dentro del contenedor.
 *
 * Es declarativo: cualquier descendiente con `data-parallax="subtle | medium |
 * strong"` se mueve a su propia velocidad, y si además lleva
 * `data-parallax-zoom` escala mientras lo hace. Así una sección nueva no
 * necesita un hook nuevo — solo marcar sus capas.
 *
 * Solo corre en desktop: el parallax atado al scroll es lo primero que se
 * rompe con la barra de direcciones de iOS, que cambia la altura del viewport
 * mientras scroleás.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {},
) {
  const containerRef = useRef<T>(null);
  const { start = 'top top', end = 'bottom top', triggerSelf = false } = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, prefersReduced } = context.conditions as MotionConditions;
        if (!isDesktop || prefersReduced) return;

        const layers = gsap.utils.toArray<HTMLElement>(`[${PARALLAX_ATTR}]`);
        if (layers.length === 0) return;

        layers.forEach((layer) => {
          const depth = (layer.getAttribute(PARALLAX_ATTR) ?? 'subtle') as Depth;
          const distance = tokens.motion.parallaxDepth[depth] ?? tokens.motion.parallaxDepth.subtle;
          const zooms = layer.hasAttribute(PARALLAX_ZOOM_ATTR);

          gsap.to(layer, {
            y: distance,
            ...(zooms ? { scale: tokens.motion.heroZoom } : {}),
            ease: 'none',
            scrollTrigger: {
              trigger: triggerSelf ? layer : container,
              start,
              end,
              // Con suavizado, no 1:1: `scrub: true` se siente rígido y nervioso.
              scrub: tokens.motion.choreography.scrubSmoothing,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [start, end, triggerSelf] },
  );

  return containerRef;
}
