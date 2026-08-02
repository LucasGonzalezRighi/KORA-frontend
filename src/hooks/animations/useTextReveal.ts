'use client';

import { useRef } from 'react';

import { tokens } from '@/design-system';

import {
  MOTION_CONDITIONS,
  type MotionConditions,
  SplitText,
  gsap,
  useGSAP,
  whenFontsReady,
} from './gsap';

type TextRevealOptions = {
  /** Dónde entra el elemento para disparar. */
  start?: string;
  /** Retraso antes de arrancar, para encadenar con otros reveals. */
  delay?: number;
  /**
   * Anima al montar, sin ScrollTrigger.
   *
   * Para texto sobre el fold. El reveal arranca con las líneas ocultas detrás
   * de la máscara, así que atar el titular del hero a un trigger de scroll
   * significa que cualquier falla del trigger lo deja invisible. Sobre el fold
   * no hay nada que esperar: se anima y listo.
   */
  immediate?: boolean;
};

/**
 * Revela un titular **línea por línea**, subiendo desde detrás de una máscara.
 *
 * Usa `mask: 'lines'` de SplitText (GSAP 3.13+), que envuelve cada línea en un
 * contenedor con `overflow: hidden` — así el texto aparece recortado en vez de
 * simplemente aparecer.
 *
 * Dos cuidados que hacen que esto no se rompa:
 * - Espera a `document.fonts.ready`. Satoshi viene de un CDN, y partir líneas
 *   con la fuente de fallback da cortes en lugares equivocados.
 * - `autoSplit: true` vuelve a partir al cambiar el ancho o la fuente, lo cual
 *   importa acá porque el mismo titular tiene largos distintos en es/en/pt.
 */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: TextRevealOptions = {},
) {
  const targetRef = useRef<T>(null);
  const { start = 'top 85%', delay = 0, immediate = false } = options;

  useGSAP(
    () => {
      const element = targetRef.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      let cancelFonts: (() => void) | undefined;

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, prefersReduced } = context.conditions as MotionConditions;

        /*
         * Movimiento reducido: fundido simple, sin partir el texto en líneas.
         * La máscara por línea es desplazamiento puro, que es justo lo que la
         * preferencia pide evitar — y además partir el texto altera el DOM sin
         * necesidad. Con un fundido el titular igual "llega", no aparece de golpe.
         */
        if (prefersReduced) {
          const { reducedMotion } = tokens.motion;
          gsap.from(element, {
            opacity: 0,
            duration: reducedMotion.duration,
            ease: 'none',
            ...(immediate ? {} : { scrollTrigger: { trigger: element, start, once: true } }),
          });
          return;
        }

        cancelFonts = whenFontsReady(() => {
          SplitText.create(element, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            linesClass: 'kora-line',
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: isDesktop ? tokens.motion.durations.slow : tokens.motion.durations.base,
                ease: tokens.motion.easings.outExpoSoft,
                stagger: isDesktop ? tokens.motion.staggers.base : tokens.motion.staggers.tight,
                delay,
                ...(immediate
                  ? {}
                  : { scrollTrigger: { trigger: element, start, once: true } }),
              }),
          });
        });
      });

      return () => {
        cancelFonts?.();
        mm.revert();
      };
    },
    { scope: targetRef, dependencies: [start, delay, immediate] },
  );

  return targetRef;
}
