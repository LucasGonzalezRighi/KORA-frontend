'use client';

import { useRef } from 'react';

import { tokens } from '@/design-system';
import {
  MOTION_CONDITIONS,
  type MotionConditions,
  gsap,
  motionIsReduced,
  useGSAP,
} from '@/hooks/animations/gsap';

/** Atributos que marcan las piezas del recorrido. */
export const STORY = {
  line: 'data-story-line',
  marker: 'data-story-marker',
  dot: 'data-story-dot',
  connector: 'data-story-connector',
  paragraph: 'data-story-paragraph',
} as const;

/** Qué tan abajo del borde superior del viewport "llega" el recorrido. */
const REACH = '70%';

/**
 * Coreografía del recorrido de "Sobre nosotras".
 *
 * La línea vertical se **dibuja con el scroll** (scrub) y cada marcador se
 * enciende cuando la línea lo alcanza: los dos puntos aparecen con un pequeño
 * rebote y el conector se extiende desde la línea hacia el párrafo, que entra
 * detrás. Todo se dispara con la posición de cada fila, no con la del bloque:
 * son cinco párrafos repartidos en casi mil píxeles, y un solo disparador los
 * haría aparecer todos juntos apenas asoma el primero.
 */
export function useStoryTimeline<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { prefersReduced } = context.conditions as MotionConditions;
        const { durations, easings, revealOffset } = tokens.motion;

        const line = root.querySelector<HTMLElement>(`[${STORY.line}]`);
        const markers = gsap.utils.toArray<HTMLElement>(`[${STORY.marker}]`);
        const paragraphs = gsap.utils.toArray<HTMLElement>(`[${STORY.paragraph}]`);

        if (motionIsReduced(prefersReduced)) {
          paragraphs.forEach((paragraph) => {
            gsap.from(paragraph, {
              opacity: 0,
              duration: tokens.motion.reducedMotion.duration,
              ease: 'none',
              scrollTrigger: { trigger: paragraph, start: `top ${REACH}`, once: true },
            });
          });
          return;
        }

        if (line) {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: `top ${REACH}`,
              end: `bottom ${REACH}`,
              scrub: tokens.motion.choreography.scrubSmoothing,
            },
          });
        }

        markers.forEach((marker) => {
          const dots = marker.querySelectorAll(`[${STORY.dot}]`);
          const connector = marker.querySelector(`[${STORY.connector}]`);
          const side = marker.dataset.side === 'right' ? 'left center' : 'right center';

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: marker, start: `top ${REACH}`, once: true },
          });

          timeline
            .from(dots, {
              scale: 0,
              duration: durations.base,
              ease: easings.outBack,
              stagger: 0.06,
            })
            .from(
              connector,
              {
                scaleX: 0,
                transformOrigin: side,
                duration: durations.base,
                ease: easings.outQuart,
              },
              '-=0.2',
            );
        });

        paragraphs.forEach((paragraph) => {
          gsap.from(paragraph, {
            y: revealOffset,
            opacity: 0,
            duration: durations.reveal,
            ease: easings.outExpoSoft,
            scrollTrigger: { trigger: paragraph, start: `top ${REACH}`, once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
