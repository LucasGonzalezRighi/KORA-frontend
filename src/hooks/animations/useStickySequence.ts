'use client';

import { useCallback, useRef, useState } from 'react';

import { tokens } from '@/design-system';

import {
  MOTION_CONDITIONS,
  type MotionConditions,
  SplitText,
  gsap,
  motionIsReduced,
  roomForDescenders,
  useGSAP,
  whenFontsReady,
} from './gsap';
import { STEP } from './sequenceParts';

/**
 * Cuánto scroll ocupa cada paso, en alturas de viewport.
 *
 * Bajado de 150 a 110. Con 150 cada unidad pedía vuelta y media de pantalla
 * para pasar a la siguiente, y como la mayor parte de ese tramo es `dwell`
 * —tiempo en el que a propósito no se mueve nada— la sensación era de estar
 * scrolleando contra algo trabado. 110 mantiene la pausa de lectura pero
 * acorta la espera entre paso y paso.
 */
const VH_PER_STEP = 110;

/** Alto del escenario donde se superponen los pasos. */
const STAGE_HEIGHT = '24rem';

/**
 * Alto de la zona que queda fija mientras se relevan los pasos.
 *
 * Tiene que ser `100vh`. Probé bajarlo para recortar el aire que queda arriba y
 * abajo del contenido, y el efecto secundario es peor que el problema: con el
 * escenario más corto que la ventana, al terminar el recorrido se despega y el
 * contenido se va scrolleando a la vista antes de que entre la sección
 * siguiente. Ocupando la pantalla entera, la transición es limpia.
 *
 * El aire sobrante se ataca desde los `padding` de las secciones, no desde acá.
 */
const STAGE_VIEWPORT = '100vh';

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
 * **El layout de superposición lo aplica este hook, no el CSS.** Es la
 * corrección de un bug real: antes el apilado vivía en clases (`lg:absolute`) y
 * el ocultamiento en GSAP, así que cualquier motivo por el que GSAP no corriera
 * dejaba los tres pasos dibujados uno encima del otro y la sección ilegible.
 * Ahora el estado por defecto es el legible —pasos apilados en flujo normal— y
 * la animación es la que opta por el layout riesgoso.
 *
 * Lo que la diferencia de un cross-fade: se anima cada parte por separado —el
 * título con máscara, la regla escalando, los bullets escalonados—, hay una
 * fase de lectura (`dwell`) donde nada se mueve, las salidas son más cortas que
 * las entradas y se solapan, y el `scrub` lleva suavizado en vez de ir clavado
 * al scroll.
 *
 * El "pin" es CSS `sticky` y no `ScrollTrigger.pin`, que inyecta un
 * `pin-spacer` y pelea con los anchors de la página.
 */
export function useStickySequence<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const readParts = useCallback((root: HTMLElement): StepParts => {
    const titleEl = root.querySelector<HTMLElement>(`[${STEP.title}]`);
    const lines = titleEl ? Array.from(titleEl.querySelectorAll('.kora-line')) : [];

    return {
      root,
      // Si SplitText ya corrió hay líneas; si no, el título entero es la "línea".
      titleLines: lines.length > 0 ? lines : titleEl ? [titleEl] : [],
      rule: root.querySelector(`[${STEP.rule}]`),
      body: root.querySelector(`[${STEP.body}]`),
      bullets: Array.from(root.querySelectorAll(`[${STEP.bullets}] > *`)),
      cta: root.querySelector(`[${STEP.cta}]`),
    };
  }, []);

  useGSAP(
    () => {
      const track = containerRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      let cancelFonts: (() => void) | undefined;

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, prefersReduced } = context.conditions as MotionConditions;

        const roots = gsap.utils.toArray<HTMLElement>(`[${STEP.root}]`);
        const stage = track.querySelector<HTMLElement>(`[${STEP.stage}]`);
        if (roots.length === 0 || !stage) return;

        // Sin secuencia: no se toca nada y los pasos quedan apilados y legibles.
        if (!isDesktop || motionIsReduced(prefersReduced)) {
          setActiveIndex(0);
          setProgress(0);
          return;
        }

        const stepsWrapper = roots[0]?.parentElement;

        // El layout de superposición se aplica acá, y `matchMedia` lo revierte solo.
        gsap.set(track, { height: `${roots.length * VH_PER_STEP}vh` });
        gsap.set(stage, {
          position: 'sticky',
          top: 0,
          height: STAGE_VIEWPORT,
          display: 'flex',
          alignItems: 'center',
        });
        if (stepsWrapper) gsap.set(stepsWrapper, { position: 'relative', height: STAGE_HEIGHT });
        gsap.set(roots, { position: 'absolute', top: 0, left: 0, width: '100%' });

        cancelFonts = whenFontsReady(() => {
          // Partir los títulos primero: la máscara por línea es el gesto principal.
          roots.forEach((root) => {
            const titleEl = root.querySelector<HTMLElement>(`[${STEP.title}]`);
            if (titleEl) {
              /*
                Los títulos de unidad usan `leading-tight` (1.05), todavía más
                apretado que el hero, así que acá la máscara recorta más: sin
                este aire, a "Digitalizamos tu negocio" le falta el pie de la g.
              */
              roomForDescenders(
                SplitText.create(titleEl, {
                  type: 'lines',
                  mask: 'lines',
                  linesClass: 'kora-line',
                }),
              );
            }
          });

          const steps = roots.map(readParts);
          const { enter, exit, overlap, dwell, sequenceScrub } = tokens.motion.choreography;
          const ease = tokens.motion.choreographyEase;

          // Estado inicial: solo el primer paso visible.
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
              trigger: track,
              start: 'top top',
              end: 'bottom bottom',
              scrub: sequenceScrub,
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
              .to(
                previous.titleLines,
                { yPercent: -110, duration: exit, ease: ease.exit, stagger: 0.03 },
                exitAt,
              )
              .to(
                previous.bullets,
                { autoAlpha: 0, y: -16, duration: exit * 0.8, ease: ease.exit, stagger: 0.03 },
                exitAt,
              )
              .to(
                [previous.body, previous.cta].filter(Boolean),
                { autoAlpha: 0, y: -16, duration: exit * 0.8, ease: ease.exit },
                exitAt,
              )
              .to(previous.rule, { scaleX: 0, duration: exit * 0.6, ease: ease.exit }, exitAt)
              .set(previous.root, { autoAlpha: 0 }, exitAt + exit)

              .set(step.root, { autoAlpha: 1 }, enterAt)
              .to(
                step.titleLines,
                { yPercent: 0, duration: enter, ease: ease.enter, stagger: 0.07 },
                enterAt,
              )
              .to(step.rule, { scaleX: 1, duration: enter * 0.5, ease: ease.enter }, enterAt + 0.1)
              .to(
                step.body,
                { autoAlpha: 1, y: 0, duration: enter * 0.8, ease: ease.enter },
                enterAt + 0.12,
              )
              .to(
                step.bullets,
                { autoAlpha: 1, y: 0, duration: enter * 0.7, ease: ease.enter, stagger: 0.07 },
                enterAt + 0.18,
              )
              .to(
                step.cta,
                { autoAlpha: 1, y: 0, duration: enter * 0.6, ease: ease.enter },
                enterAt + 0.3,
              );
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
