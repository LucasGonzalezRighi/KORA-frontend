'use client';

import { useRef } from 'react';

import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { SECTION_IDS } from '@/constants/routes.app';
import { METHOD_STEP_IDS } from '@/features/home/data/method';
import { tokens } from '@/design-system';
import {
  MOTION_CONDITIONS,
  type MotionConditions,
  gsap,
  useGSAP,
  motionIsReduced,
} from '@/hooks/animations/gsap';
import type { Dictionary } from '@/i18n';

import { MethodPath } from './MethodPath';
import { MethodStepIcon } from './MethodStepIcon';

/** Cuánto avanza la línea por cada paso. Cuatro pasos → 0.25 cada uno. */
const STEP_SPAN = 1 / METHOD_STEP_IDS.length;

/**
 * El método en cuatro pasos.
 *
 * Era un PNG de 285 KB: no era responsive, el texto no se podía seleccionar y
 * quedaba en español en `/en` y `/pt`.
 *
 * **La animación son dos capas separadas, y eso es deliberado:**
 *
 * 1. La *estructura* de cada diagrama (puntos, anillos, líneas) entra al
 *    aparecer la sección, sin atarse al scroll. Antes todo estaba con `scrub`,
 *    y el resultado era que los diagramas estaban invisibles justo cuando los
 *    tenías en pantalla: el progreso arranca en 0 cuando la sección entra, así
 *    que solo se completaban después de haber scrolleado de largo.
 * 2. Solo la *línea* y los *nodos ámbar* siguen al scroll. Eso conserva la idea
 *    —el sistema se va conectando— sin esconder el contenido.
 *
 * El recorrido del scrub además termina cuando el centro de la sección llega al
 * medio de la pantalla, no cuando ya te fuiste: la línea se completa mientras
 * la estás mirando.
 */
export function Method({ dict }: { dict: Dictionary['method'] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (context) => {
        const { isDesktop, prefersReduced } = context.conditions as MotionConditions;
        if (motionIsReduced(prefersReduced)) return;

        const { durations, easings, choreography } = tokens.motion;

        // — Capa 1: la estructura, al entrar. Play-once, no atada al scroll. —
        gsap.from(scope.querySelectorAll('.kora-node-dot, .kora-node-ring, .kora-node-line'), {
          opacity: 0,
          duration: durations.base,
          ease: easings.outQuart,
          stagger: { each: 0.012, from: 'start' },
          scrollTrigger: { trigger: scope, start: 'top 80%', once: true },
        });

        // — Capa 2: la línea y los acentos, atadas al scroll. Solo desktop. —
        if (!isDesktop) {
          gsap.set(scope.querySelectorAll('.kora-node-mark'), { scale: 1, opacity: 1 });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: 'top 80%',
            end: 'center 45%',
            scrub: choreography.scrubSmoothing,
          },
        });

        const mask = scope.querySelector('[data-method-mask]');
        if (mask) {
          timeline.fromTo(mask, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
        }

        scope.querySelectorAll<HTMLElement>('[data-method-step]').forEach((column) => {
          const index = Number(column.dataset.methodStep ?? 0);
          timeline.fromTo(
            column.querySelectorAll('.kora-node-mark'),
            { scale: 0, opacity: 0, transformOrigin: 'center' },
            { scale: 1, opacity: 1, duration: 0.1, ease: 'back.out(2.2)' },
            index * STEP_SPAN,
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Section id={SECTION_IDS.metodo} tight>
      <Container>
        <ol
          ref={ref}
          aria-label={dict.diagramLabel}
          className="grid gap-14 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto] lg:gap-x-8 lg:gap-y-8"
        >
          {/* La línea ocupa la fila de los diagramas, por detrás. */}
          <li
            aria-hidden
            style={{ gridColumn: '1 / -1', gridRow: 2 }}
            className="pointer-events-none relative -z-10 hidden lg:block"
          >
            <MethodPath className="absolute inset-x-0 top-1/2 h-[7.5rem] w-full -translate-y-1/2" />
          </li>

          {METHOD_STEP_IDS.map((id, index) => (
            <li
              key={id}
              data-method-step={index}
              className="flex flex-col items-start gap-6 lg:contents"
            >
              <p
                style={{ gridColumn: index + 1, gridRow: 1 }}
                className="font-mono text-base tracking-tight text-heading"
              >
                <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
                <span className="px-2 text-heading/40">·</span>
                <span className="uppercase">{dict.steps[id].label}</span>
              </p>

              <div
                style={{ gridColumn: index + 1, gridRow: 2 }}
                className="flex w-full justify-center"
              >
                <MethodStepIcon step={id} />
              </div>

              <p
                style={{ gridColumn: index + 1, gridRow: 3 }}
                className="max-w-[30ch] font-display text-sm font-medium leading-body text-body"
              >
                {dict.steps[id].description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
