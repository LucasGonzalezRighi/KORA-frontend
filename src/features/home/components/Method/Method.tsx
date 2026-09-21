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
  ScrollTrigger,
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
 * Cuándo entra el diagrama dentro del reveal de un paso en móvil.
 *
 * No arranca en 0 a propósito: primero sube el bloque y recién después se
 * dibuja el diagrama. Que las dos cosas pasen juntas se lee como un solo
 * fundido; escalonadas se leen como que el paso *se está armando*.
 */
const MOBILE_MARK_AT = 0.18;

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
/** Ritmo del viaje de los puntos por la línea del método. */
const AMBIENT = {
  flowDuration: 8.4,
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
 * **Todo eso es la versión de desktop, donde los cuatro pasos entran juntos en
 * pantalla.** En móvil van apilados y la lista mide varias pantallas, así que
 * agrupar por sección deja de tener sentido: un disparador único arranca con el
 * paso 1 y anima también al 3 y al 4, que todavía están muy abajo. Cuando
 * llegás, ya pasó todo. Por eso la rama de móvil dispara **por columna** y cada
 * paso enciende su propio ambiente al entrar.
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

        const { durations, easings, choreography, staggers, revealOffset } = tokens.motion;

        /**
         * Los bucles de ambiente de los diagramas ya no se arman acá.
         *
         * Viven como animaciones CSS en `theme.css` (`kora-loop-*`), portadas
         * del prototipo. Una animación CSS gana sobre el estilo inline, así que
         * un tween de GSAP sobre los mismos nodos quedaría pisado: tener las dos
         * cosas sería código que corre sin efecto.
         *
         * Lo único que sigue siendo de GSAP es el viaje de los puntos por la
         * línea, que necesita `MotionPath` y no tiene equivalente en CSS.
         */
        const buildAmbient = (_root: ParentNode): gsap.core.Animation[] => [];

        const structureOf = (root: ParentNode) =>
          root.querySelectorAll('.kora-node-dot, .kora-node-ring, .kora-node-line');

        const columns = scope.querySelectorAll<HTMLElement>('[data-method-step]');

        /*
          — Móvil: cada paso se cuenta solo. —

          Acá los cuatro pasos van apilados, así que la lista mide varias
          pantallas de alto. Un único disparador sobre el `<ol>` —que es lo que
          había— arranca cuando asoma el paso 1 y anima los cuatro de una: para
          cuando llegás scrolleando al 3 y al 4, su animación ya pasó hace rato y
          los encontrás quietos. La sección se sentía muerta justo en la mitad
          que más se mira en teléfono.

          La corrección es que el disparador sea por columna. De paso, la marca
          ámbar recupera su entrada: antes en móvil se le hacía un `set` y
          aparecía de golpe, porque la capa 2 que la anima es solo de desktop.
        */
        if (!isDesktop) {
          columns.forEach((column) => {
            const loops = buildAmbient(column);

            gsap
              .timeline({
                scrollTrigger: { trigger: column, start: 'top 85%', once: true },
                onComplete: () => loops.forEach((loop) => loop.play()),
              })
              /*
                El bloque entero sube apenas: es lo que da la sensación de que
                el paso *llega* en vez de estar ahí.

                Los valores no son propios, son los que ya fija `useScrollReveal`
                para móvil: recorrido más corto (`revealOffset * 0.6`), duración
                `base` en vez de `reveal` y `staggers.tight`. Esa regla está
                escrita en ese hook y dice por qué: la misma coreografía que en
                desktop se siente elegante, en una pantalla angosta se siente
                lenta, porque el recorrido ocupa proporcionalmente mucho más.
              */
              .from(
                column.children,
                {
                  opacity: 0,
                  y: revealOffset * 0.6,
                  duration: durations.base,
                  ease: easings.outExpoSoft,
                  stagger: staggers.tight,
                },
                0,
              )
              .from(
                structureOf(column),
                {
                  opacity: 0,
                  duration: durations.base,
                  ease: easings.outQuart,
                  stagger: { each: 0.02, from: 'start' },
                },
                MOBILE_MARK_AT,
              )
              .fromTo(
                column.querySelectorAll('.kora-node-mark'),
                { scale: 0, opacity: 0, transformOrigin: 'center' },
                { scale: 1, opacity: 1, duration: durations.base, ease: 'back.out(2.2)' },
                MOBILE_MARK_AT + 0.1,
              );
          });

          return;
        }

        // — Capa 3: el ambiente. Se arma en pausa; la capa 1 le da el arranque. —
        const ambient = buildAmbient(scope);

        /*
          Los puntos que viajan por la línea. Viven solo en desktop: en móvil la
          línea no se dibuja (`hidden lg:block`), pero sigue estando en el DOM,
          así que sin esta rama GSAP animaría algo que nadie ve.

          Cada punto tiene su propia línea de tiempo en vez de un `stagger`
          compartido, porque el escalonado se siembra con `progress()`: eso los
          reparte a lo largo del recorrido desde el primer frame, sin el hueco
          muerto que deja esperar a que arranque el segundo y el tercero.
        */
        const flowPath = scope.querySelector<SVGPathElement>('[data-method-flow-path]');
        const flowDots = scope.querySelectorAll<SVGCircleElement>('.kora-path-flow');

        if (flowPath && flowDots.length) {
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

        // — Capa 1: la estructura, al entrar. Play-once, no atada al scroll. —
        gsap.from(structureOf(scope), {
          opacity: 0,
          duration: durations.base,
          ease: easings.outQuart,
          stagger: { each: 0.012, from: 'start' },
          scrollTrigger: { trigger: scope, start: 'top 80%', once: true },
        });

        /*
          El ambiente tiene su propio disparador, y no cuelga del `onComplete`
          de la capa 1.

          Antes dependía de él, y eso lo hacía frágil por dos motivos: si esa
          animación no completaba —targets vacíos, un refresh de ScrollTrigger a
          destiempo— **ningún** bucle arrancaba nunca, sin error visible; y los
          elementos del paso 1 están en las dos capas a la vez, así que el orden
          entre una y otra decidía si el parpadeo se veía o no.

          Con `toggleActions` los bucles además se pausan al salir de pantalla y
          se reanudan al volver, que es lo que hacía falta para no tener cuatro
          diagramas latiendo mientras el visitante lee otra sección.
        */
        ScrollTrigger.create({
          trigger: scope,
          start: 'top 90%',
          end: 'bottom top',
          onEnter: () => ambient.forEach((animation) => animation.play()),
          onEnterBack: () => ambient.forEach((animation) => animation.play()),
          onLeave: () => ambient.forEach((animation) => animation.pause()),
          onLeaveBack: () => ambient.forEach((animation) => animation.pause()),
        });

        // — Capa 2: la línea y los acentos, atadas al scroll. —
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

        columns.forEach((column) => {
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
