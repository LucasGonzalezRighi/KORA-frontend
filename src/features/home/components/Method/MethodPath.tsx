import { useId } from 'react';

/**
 * La línea punteada que conecta los cuatro pasos.
 *
 * Se dibuja revelándola con una **máscara**, no con DrawSVG: DrawSVG anima
 * `stroke-dasharray`, que es justamente lo que hace que la línea sea punteada.
 * Usar los dos a la vez se pisa. La máscara conserva los puntos y da el mismo
 * resultado visual.
 *
 * Debajo queda una copia tenue del mismo trazo, para que se lea el recorrido
 * completo antes de que la parte ámbar lo alcance.
 *
 * Encima viajan los puntos de `.kora-path-flow`. No se mueven solos: `Method`
 * los manda por `data-method-flow-path` con MotionPath. Arrancan en `opacity 0`
 * a propósito — si GSAP no corre, no queda un punto suelto pegado a la
 * izquierda de la línea.
 */

const VIEW_W = 1200;
const VIEW_H = 120;

/**
 * Centros reales de las cuatro columnas, en unidades del viewBox.
 *
 * **No son los mismos números que usa `PATH`, y esa diferencia es el punto.**
 * La onda está dibujada sobre cuartos limpios del ancho —150, 450, 750, 1050—
 * pero la grilla que tiene los diagramas lleva `gap-x-8` entre columnas. Esos
 * tres huecos de 32px empujan el centro de cada columna hacia adentro: el
 * primero queda a 138 y no a 150, y el último a 1062 y no a 1050.
 *
 * Medido, el desvío crecía de 4 a 28px de la primera columna a la cuarta. Sobre
 * la onda no importa —queda tapada por el ícono igual—, pero sobre los huecos
 * sí: un hueco corrido 12px deja la línea cruzando el borde del diagrama justo
 * del lado en que se corrió.
 *
 * El cálculo asume el contenedor de desktop (~1200px). Como el `gap` está en
 * píxeles y el viewBox es fijo, la conversión se mueve un poco con el ancho de
 * pantalla; el difuminado de abajo está dimensionado para absorber ese resto.
 */
const STEP_CENTERS = [138, 446, 754, 1062] as const;

/** Onda suave que pasa por los cuatro centros. */
const PATH = 'M150 60 Q250 24 350 60 T550 60 T750 60 T950 60 T1150 60';

const DASH = '2 9';
const STROKE = 2.5;

/**
 * Ancho del hueco que se le abre a la línea en cada diagrama.
 *
 * El diagrama mide 180px de lado y la línea le pasa por el centro exacto, así
 * que sin esto el punteado le cruza los anillos por la mitad y los puntos
 * viajeros aparecen *adentro* del ícono. Se lee como si dos capas se hubieran
 * superpuesto mal, no como un recorrido.
 *
 * El prototipo evitaba el problema por construcción: allá eran tres rayas
 * sueltas *entre* columnas, nunca una línea continua. Acá la onda es una sola y
 * hay que abrirle el hueco a mano.
 *
 * 230 y no 180: el ícono tiene contenido hasta 70px de su centro (el anillo
 * exterior), y los `FADE_STOPS` de abajo dejan el tapado pleno recién a 73.6px
 * del centro del hueco. Así el corte llega completo justo antes del anillo, con
 * unos pixeles de sobra para la variación de ancho de pantalla.
 *
 * Entre hueco y hueco quedan ~78px de línea a la vista. Suena poco y es
 * deliberado: en el prototipo el conector entre columnas medía 50px sobre una
 * fila de ~1100. La línea corta *es* el gesto original.
 */
const GAP_WIDTH = 230;

/**
 * Dónde empieza y termina el tapado pleno dentro de cada hueco, en fracción.
 *
 * Fuera de estos dos valores el degradado va desvaneciendo, así que el trazo se
 * apaga entrando al ícono en vez de cortarse en seco.
 */
const FADE_STOPS = [0.18, 0.82] as const;

/** Extremos del recorrido: fuera de ellos la línea no se dibuja. */
const FIRST_CENTER = STEP_CENTERS[0];
const LAST_CENTER = STEP_CENTERS[STEP_CENTERS.length - 1] as number;

/** Cuántos puntos recorren la línea a la vez. */
const FLOW_DOTS = 3;

export function MethodPath({ className }: { className?: string }) {
  const id = useId();
  const revealId = `${id}-reveal`;
  const gapsId = `${id}-gaps`;
  const fadeId = `${id}-fade`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      aria-hidden
      role="presentation"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={revealId}>
          <rect
            data-method-mask
            x="0"
            y="0"
            width={VIEW_W}
            height={VIEW_H}
            fill="white"
            style={{ transformOrigin: 'left center' }}
          />
        </mask>

        {/*
          El degradado que difumina cada hueco. En una máscara manda la
          luminancia: blanco deja ver, negro tapa. Blanco en los extremos y
          negro en el medio hace que la línea se apague entrando al ícono en
          vez de cortarse de golpe — un corte duro se lee como un error de
          recorte, un desvanecido se lee como profundidad.
        */}
        <linearGradient id={fadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" />
          <stop offset={FADE_STOPS[0]} stopColor="black" />
          <stop offset={FADE_STOPS[1]} stopColor="black" />
          <stop offset="1" stopColor="white" />
        </linearGradient>

        <mask id={gapsId} maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW_W} height={VIEW_H}>
          <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="white" />
          {STEP_CENTERS.map((center) => (
            <rect
              key={`gap-${center}`}
              x={center - GAP_WIDTH / 2}
              y="0"
              width={GAP_WIDTH}
              height={VIEW_H}
              fill={`url(#${fadeId})`}
            />
          ))}
          {/*
            Fuera del primer y del último paso no hay nada que conectar, así que
            ahí la línea directamente no existe.

            Sin esto quedaba una cola: el trazo llega hasta 1150 pero el último
            paso está en 1062, así que asomaba un punto suelto a la derecha del
            cuarto diagrama, colgando de la nada. El degradado del hueco no lo
            tapaba porque justo ahí ya está volviendo a blanco.
          */}
          <rect x="0" y="0" width={FIRST_CENTER} height={VIEW_H} fill="black" />
          <rect x={LAST_CENTER} y="0" width={VIEW_W - LAST_CENTER} height={VIEW_H} fill="black" />
        </mask>
      </defs>

      {/*
        Los huecos se aplican al grupo entero y no a cada trazo: así el punteado
        tenue, el ámbar y los puntos viajeros se apagan todos en el mismo lugar.
        Enmascarar solo la línea dejaría los puntos cruzando el ícono igual.
      */}
      <g mask={`url(#${gapsId})`}>
        <path
          d={PATH}
          data-method-flow-path
          fill="none"
          strokeDasharray={DASH}
          strokeLinecap="round"
          strokeWidth={STROKE}
          className="stroke-heading/20"
        />
        <path
          d={PATH}
          fill="none"
          strokeDasharray={DASH}
          strokeLinecap="round"
          strokeWidth={STROKE}
          mask={`url(#${revealId})`}
          className="stroke-accent"
        />

        {Array.from({ length: FLOW_DOTS }, (_, index) => (
          <circle
            key={`flow-${index}`}
            cx="0"
            cy="0"
            r="4"
            opacity="0"
            className="kora-path-flow fill-accent"
          />
        ))}
      </g>
    </svg>
  );
}
