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
import { ICON_ORIGIN, MethodStepIcon } from './MethodStepIcon';

/** Cuánto avanza la línea por cada paso. Cuatro pasos → 0.25 cada uno. */
const STEP_SPAN = 1 / METHOD_STEP_IDS.length;

/**
 * Ritmo de la capa de ambiente.
 *
 * **Estos números no son a gusto: son los `@keyframes` del prototipo HTML,
 * traducidos.** Ahí las animaciones se declaran con la duración del ciclo
 * *completo*; acá van con `yoyo`, que recorre el ciclo en dos mitades. Por eso
 * cada duración es la mitad de la del CSS original: `fadeIn 3.2s` es
 * `flickerDuration: 1.6`, `pop 2.8s` es `breatheDuration: 1.4`, `pulse 2.6s` es
 * `pulseDuration: 1.3`. Si alguien "corrige" esto al valor del CSS, todo va a
 * latir al doble de lento.
 *
 * Las que no llevan `yoyo` —la órbita y el recorrido— van con la duración tal
 * cual del prototipo.
 */
const AMBIENT = {
  /** `fadeIn`: opacidad mínima del parpadeo del paso 1. Nunca llega a apagarse. */
  flickerOpacity: 0.3,
  flickerDuration: 1.6,
  /** El escalonado del prototipo, `nth-child` por `nth-child`. */
  flickerStagger: 0.25,
  /** `orbit`: una vuelta completa del punto del paso 2. */
  orbitDuration: 5,
  /** `pop`: cuánto se achica y se apaga el bloque del paso 3 al respirar. */
  breatheScale: 0.9,
  breatheOpacity: 0.55,
  breatheDuration: 1.4,
  /** `pulse`: recorrido de los halos del paso 4, de contraído a expandido. */
  pulseFromScale: 0.7,
  pulseFromOpacity: 0.12,
  pulseToScale: 1.08,
  pulseToOpacity: 0.5,
  pulseDuration: 1.3,
  /** Los `animation-delay` de `.r2` y `.r3`: medio segundo entre halo y halo. */
  pulseStagger: 0.5,
  /**
   * `flow`: cuánto tarda un punto en recorrer la línea entera.
   *
   * Acá el prototipo no se puede copiar literal y hay que decir por qué. Allá
   * cada punto cruza el hueco *entre dos columnas* en 2.8s; acá la línea es una
   * sola onda que cruza las cuatro. Copiar el 2.8 daría un punto disparado.
   *
   * Lo que se conserva es la **cadencia**, que es lo que el ojo registra: con
   * tres puntos repartidos a lo largo del recorrido, `2.8 × 3` hace que por
   * cualquier punto de la línea pase uno cada 2.8s. El mismo pulso que el
   * original, sobre una geometría distinta.
   */
  flowDuration: 8.4,
  /** El `10%` y `90%` del keyframe `flow`, donde el punto entra y sale. */
  flowFade: 0.84,
} as const;

/**
 * El método en cuatro pasos.
 *
 * Era un PNG de 285 KB: no era responsive, el texto no se podía seleccionar y
 * quedaba en español en `/en` y `/pt`.
 *
 * **La animación son tres capas separadas, y eso es deliberado:**
 *
 * 1. La *estructura* de cada diagrama (puntos, anillos, líneas) entra al
 *    aparecer la sección, sin atarse al scroll. Antes todo estaba con `scrub`,
 *    y el resultado era que los diagramas estaban invisibles justo cuando los
 *    tenías en pantalla: el progreso arranca en 0 cuando la sección entra, así
 *    que solo se completaban después de haber scrolleado de largo.
 * 2. Solo la *línea* y los *nodos ámbar* siguen al scroll. Eso conserva la idea
 *    —el sistema se va conectando— sin esconder el contenido.
 * 3. El *ambiente*: bucles suaves que no terminan nunca —parpadeo, órbita,
 *    respiración, halos, y los puntos que viajan por la línea—. Se crean en
 *    pausa y arrancan recién cuando termina la capa 1. Si arrancaran antes,
 *    competirían con la entrada por las mismas propiedades y se verían saltos.
 *
 * El recorrido del scrub además termina cuando el centro de la sección llega al
 * medio de la pantalla, no cuando ya te fuiste: la línea se completa mientras
 * la estás mirando.
 *
 * **Por qué las capas 2 y 3 no comparten elemento.** El scrub anima la escala de
 * `.kora-node-mark`, y la vuelve a fijar en cada scroll. Un bucle de
 * ambiente sobre la misma propiedad del mismo nodo quedaría pisado. Por eso los
 * ganchos `kora-node-breathe` y `kora-node-orbit` son `<g>` envolventes: cada
 * capa anima su propia matriz de transformación y el navegador las compone.
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

        // — Capa 3: el ambiente. Se arma en pausa; la capa 1 le da el arranque. —
        const ambient: gsap.core.Animation[] = [];

        const flicker = scope.querySelectorAll('.kora-node-flicker');
        if (flicker.length) {
          ambient.push(
            gsap.to(flicker, {
              opacity: AMBIENT.flickerOpacity,
              duration: AMBIENT.flickerDuration,
              ease: easings.inOut,
              repeat: -1,
              yoyo: true,
              paused: true,
              stagger: { each: AMBIENT.flickerStagger, from: 'start' },
            }),
          );
        }

        const orbit = scope.querySelectorAll('.kora-node-orbit');
        if (orbit.length) {
          ambient.push(
            gsap.to(orbit, {
              rotation: 360,
              svgOrigin: ICON_ORIGIN,
              duration: AMBIENT.orbitDuration,
              ease: 'none',
              repeat: -1,
              paused: true,
            }),
          );
        }

        const breathe = scope.querySelectorAll('.kora-node-breathe');
        if (breathe.length) {
          ambient.push(
            gsap.to(breathe, {
              scale: AMBIENT.breatheScale,
              opacity: AMBIENT.breatheOpacity,
              transformOrigin: 'center',
              duration: AMBIENT.breatheDuration,
              ease: easings.inOut,
              repeat: -1,
              yoyo: true,
              paused: true,
            }),
          );
        }

        const pulse = scope.querySelectorAll('.kora-node-pulse');
        if (pulse.length) {
          ambient.push(
            gsap.fromTo(
              pulse,
              {
                scale: AMBIENT.pulseFromScale,
                opacity: AMBIENT.pulseFromOpacity,
                /*
                  El `svgOrigin` va acá **y** abajo, y no es repetición al pedo.

                  En un `fromTo`, GSAP renderiza el estado inicial apenas se crea
                  el tween. Ese primer render es el que fija el origen de la
                  transformación, y si solo está declarado del lado `to` todavía
                  no lo leyó: cae en el default y escala desde la esquina de la
                  caja. Los halos quedan corridos ~13px arriba a la izquierda,
                  descentrados del anillo, y lo peor es que no se mueven — quedan
                  quietos ahí, así que parece un error de maquetado y no de
                  animación. Medido, no supuesto.

                  La capa 2 acá abajo ya lo hace bien con su `transformOrigin`.
                */
                svgOrigin: ICON_ORIGIN,
              },
              {
                scale: AMBIENT.pulseToScale,
                opacity: AMBIENT.pulseToOpacity,
                svgOrigin: ICON_ORIGIN,
                duration: AMBIENT.pulseDuration,
                ease: easings.inOut,
                repeat: -1,
                yoyo: true,
                paused: true,
                stagger: { each: AMBIENT.pulseStagger, from: 'end' },
              },
            ),
          );
        }

        /*
          Los puntos que viajan por la línea. Solo desktop: en mobile la línea
          no se dibuja (`hidden lg:block`), pero sigue estando en el DOM, así que
          sin esta condición GSAP animaría algo que nadie ve.

          Cada punto tiene su propia línea de tiempo en vez de un `stagger`
          compartido, porque el escalonado se siembra con `progress()`: eso los
          reparte a lo largo del recorrido desde el primer frame, sin el hueco
          muerto que deja esperar a que arranque el segundo y el tercero.
        */
        const flowPath = scope.querySelector<SVGPathElement>('[data-method-flow-path]');
        const flowDots = scope.querySelectorAll<SVGCircleElement>('.kora-path-flow');

        if (isDesktop && flowPath && flowDots.length) {
          flowDots.forEach((dot, index) => {
            const trip = gsap.timeline({ paused: true, repeat: -1 });

            trip
              .to(
                dot,
                {
                  duration: AMBIENT.flowDuration,
                  ease: 'none',
                  motionPath: { path: flowPath },
                },
                0,
              )
              .fromTo(
                dot,
                { opacity: 0 },
                { opacity: 1, duration: AMBIENT.flowFade, ease: 'none' },
                0,
              )
              .to(
                dot,
                { opacity: 0, duration: AMBIENT.flowFade, ease: 'none' },
                AMBIENT.flowDuration - AMBIENT.flowFade,
              );

            trip.progress(index / flowDots.length);
            ambient.push(trip);
          });
        }

        const startAmbient = () => ambient.forEach((animation) => animation.play());

        // — Capa 1: la estructura, al entrar. Play-once, no atada al scroll. —
        gsap.from(scope.querySelectorAll('.kora-node-dot, .kora-node-ring, .kora-node-line'), {
          opacity: 0,
          duration: durations.base,
          ease: easings.outQuart,
          stagger: { each: 0.012, from: 'start' },
          scrollTrigger: { trigger: scope, start: 'top 80%', once: true },
          onComplete: startAmbient,
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
