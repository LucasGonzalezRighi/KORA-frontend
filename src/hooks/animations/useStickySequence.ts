'use client';

import { useCallback, useRef, useState } from 'react';

import { tokens } from '@/design-system';

import {
  MOTION_CONDITIONS,
  type MotionConditions,
  SplitText,
  gsap,
  useGSAP,
  whenFontsReady,
} from './gsap';
import { STEP } from './sequenceParts';

/** Partes de un paso, ya resueltas a elementos. */
type StepParts = {
  root: HTMLElement;
  titleLines: Element[];
  rule: Element | null;
  body: Element | null;
  bullets: Element[];
  cta: Element | null;
};

/**
 * Secuencia coreografiada: los pasos se relevan mientras la sección queda fija.
 *
 * Lo que la diferencia de un cross-fade:
 *
 * - **Se anima cada parte por separado.** El título sale enmascarado hacia
 *   arriba y el siguiente entra desde abajo; la regla ámbar escala; los bullets
 *   entran escalonados. Un bloque entero con una sola opacidad se ve genérico.
 * - **Hay fase de lectura.** Cada tramo dedica `dwell` a no mover nada. Sin eso
 *   el contenido está siempre en tránsito y no se llega a leer.
 * - **Salidas cortas, entradas con peso**, y solapadas: lo que entra arranca
 *   antes de que termine de irse lo anterior.
 * - **`scrub` con suavizado**, no 1:1: la animación persigue al scroll con algo
 *   de inercia en vez de ir clavada a él.
 *
 * El "pin" es CSS `sticky`, no `ScrollTrigger.pin`: `pin` inyecta un
 * `pin-spacer` que reescribe el layout y pelea con los anchors.
 *
 * Devuelve el índice activo y el progreso para que el índice lateral los use.
 */
export function useStickySequence<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const readParts = useCallback((root: HTMLElement): StepParts => {
    const titleEl = root.querySelector<HTMLElement>(`[${STEP.title}]`);

    return {
      root,
      // Si SplitText ya corrió hay líneas; si no, el título entero es la "línea".
      titleLines: titleEl
        ? Array.from(titleEl.querySelectorAll('.kora-line')).length > 0
          ? Array.from(titleEl.querySelectorAll('.kora-line'))
          : [titleEl]
        : [],
      rule: root.querySelector(`[${STEP.rule}]`),
      body: root.querySelector(`[${STEP.body}]`),
      bullets: Array.from(root.querySelectorAll(`[${STEP.bullets}] > *`)),
      cta: root.querySelector(`[${STEP.cta}]`),
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();
      let cancelFonts: (() => void) | undefined;

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, prefersReduced } = context.conditions as MotionConditions;

        const roots = gsap.utils.toArray<HTMLElement>(`[${STEP.root}]`);
        if (roots.length === 0) return;

        // Sin secuencia: los pasos quedan apilados y visibles. Nada oculto.
        if (!isDesktop || prefersReduced) {
          gsap.set(roots, { clearProps: 'all' });
          setActiveIndex(0);
          setProgress(0);
          return;
        }

        cancelFonts = whenFontsReady(() => {
          // Partir los títulos primero: la máscara por línea es el gesto principal.
          roots.forEach((root) => {
            const titleEl = root.querySelector<HTMLElement>(`[${STEP.title}]`);
            if (titleEl) {
              SplitText.create(titleEl, { type: 'lines', mask: 'lines', linesClass: 'kora-line' });
            }
          });

          const steps = roots.map(readParts);
          const { enter, exit, overlap, dwell, scrubSmoothing } = tokens.motion.choreography;
          const ease = tokens.motion.choreographyEase;

          // Estado inicial: solo el primer paso montado y visible.
          steps.forEach((step, index) => {
            const hidden = index > 0;
            gsap.set(step.root, { autoAlpha: hidden ? 0 : 1 });
            if (!hidden) return;
            gsap.set(step.titleLines, { yPercent: 110 });
            gsap.set(step.rule, { scaleX: 0 });
            gsap.set([step.body, step.cta].filter(Boolean), { autoAlpha: 0, y: 24 });
            gsap.set(step.bullets, { autoAlpha: 0, y: 24 });
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom bottom',
              scrub: scrubSmoothing,
              onUpdate: ({ progress: value }) => {
                setProgress(value);
                setActiveIndex(
                  Math.min(steps.length - 1, Math.floor(value * steps.length + 0.001)),
                );
              },
            },
          });

          steps.forEach((step, index) => {
            if (index === 0) return;

            const previous = steps[index - 1] as StepParts;
            // Cada tramo dura 1: primero se lee (`dwell`), después se transiciona.
            const exitAt = index - 1 + dwell;
            const enterAt = exitAt + exit - overlap;

            timeline
              .to(previous.titleLines, {
                yPercent: -110,
                duration: exit,
                ease: ease.exit,
                stagger: 0.03,
              }, exitAt)
              .to(previous.bullets, {
                autoAlpha: 0,
                y: -16,
                duration: exit * 0.8,
                ease: ease.exit,
                stagger: 0.03,
              }, exitAt)
              .to([previous.body, previous.cta].filter(Boolean), {
                autoAlpha: 0,
                y: -16,
                duration: exit * 0.8,
                ease: ease.exit,
              }, exitAt)
              .to(previous.rule, { scaleX: 0, duration: exit * 0.6, ease: ease.exit }, exitAt)
              .set(previous.root, { autoAlpha: 0 }, exitAt + exit)

              .set(step.root, { autoAlpha: 1 }, enterAt)
              .to(step.titleLines, {
                yPercent: 0,
                duration: enter,
                ease: ease.enter,
                stagger: 0.07,
              }, enterAt)
              .to(step.rule, { scaleX: 1, duration: enter * 0.5, ease: ease.enter }, enterAt + 0.1)
              .to(step.body, {
                autoAlpha: 1,
                y: 0,
                duration: enter * 0.8,
                ease: ease.enter,
              }, enterAt + 0.12)
              .to(step.bullets, {
                autoAlpha: 1,
                y: 0,
                duration: enter * 0.7,
                ease: ease.enter,
                stagger: 0.07,
              }, enterAt + 0.18)
              .to(step.cta, {
                autoAlpha: 1,
                y: 0,
                duration: enter * 0.6,
                ease: ease.enter,
              }, enterAt + 0.3);
          });
        });
      });

      return () => {
        cancelFonts?.();
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [readParts] },
  );

  return { containerRef, activeIndex, progress };
}
