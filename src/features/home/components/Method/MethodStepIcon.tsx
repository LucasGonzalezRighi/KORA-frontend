import type { MethodStepId } from '@/features/home/data/method';

/**
 * Diagramas de los cuatro pasos del método.
 *
 * Son la geometría del prototipo (`kora_proceso_4_pasos.html`), que es la que
 * está publicada: un abanico que converge en un punto, un círculo con cuatro
 * marcas de encuadre y un punto que orbita, bloques sueltos que se ordenan, y
 * halos llenos que laten desde el centro.
 *
 * Acá solo vive la **geometría y el marcado**. Ninguna animación se declara en
 * este archivo: los diagramas exponen ganchos por clase y `Method` decide qué
 * hacer con ellos. Así el diagrama sigue siendo legible sin JavaScript.
 *
 * Ganchos disponibles:
 *
 * | Clase | Qué hace `Method` con ella |
 * |---|---|
 * | `kora-node-mark` | Aparece cuando la línea del método llega a ese paso. |
 * | `kora-node-dot` / `kora-node-ring` / `kora-node-line` | Entran al aparecer la sección. |
 * | `kora-node-flicker` | Late suave, en desorden: la señal todavía sin ordenar. |
 * | `kora-node-orbit` | Gira alrededor del centro del viewBox. |
 * | `kora-node-breathe` | Respira sobre su propio centro. |
 * | `kora-node-pulse` | Halos que se expanden desde el centro del viewBox. |
 *
 * Los tres últimos son **capas de transformación propias**: `kora-node-orbit` y
 * `kora-node-breathe` son `<g>` que envuelven al elemento en lugar de ser el
 * elemento mismo. Es a propósito — el bucle de ambiente y la entrada de la
 * línea animan transformaciones distintas del mismo nodo visual, y si
 * compartieran elemento se pisarían.
 */

const VIEW = 180;
const CENTER = VIEW / 2;

/**
 * Centro del viewBox como `svgOrigin` de GSAP.
 *
 * Va como string y no como número porque todo lo que gira o pulsa lo hace
 * alrededor del centro del *diagrama*, no del centro de su propia caja. Para
 * `<g>` envolventes las dos cosas no coinciden, y `transformOrigin: 'center'`
 * daría un giro descentrado.
 */
export const ICON_ORIGIN = `${CENTER} ${CENTER}`;

/**
 * Radio de la órbita del paso 2.
 *
 * Va *por fuera* del círculo (r=50), no sobre él: así el punto se lee como
 * algo que da vueltas alrededor del sistema y no como una marca pegada a la
 * circunferencia. Es la relación del prototipo, donde la órbita (42) queda
 * afuera del círculo dibujado (38).
 */
const ORBIT_RADIUS = 62;

/** Dónde converge el abanico del paso 1. */
const FOCUS: readonly [number, number] = [109, 90];

/**
 * Los puntos del abanico del paso 1: posición, radio y cuánta tinta lleva
 * cada uno. Son seis, en desorden a propósito, y uno solo es el que pesa.
 */
const FAN = [
  { x: 38, y: 4, r: 3, ink: 'fill-heading/45' },
  { x: 11, y: 24, r: 4, ink: 'fill-heading/60' },
  { x: 6, y: 63, r: 5.5, ink: 'fill-heading/90' },
  { x: 30, y: 111, r: 4, ink: 'fill-heading/60' },
  { x: 6, y: 143, r: 4, ink: 'fill-heading/60' },
  { x: 46, y: 166, r: 3, ink: 'fill-heading/45' },
] as const;

/** Las cuatro marcas de encuadre del paso 2, una por esquina. */
const CORNER_MARKS = [
  'M45 53 L38 53 L38 60',
  'M135 53 L142 53 L142 60',
  'M45 127 L38 127 L38 120',
  'M135 127 L142 127 L142 120',
] as const;

/** Esquinas del paso 4: los cuatro puntos que enmarcan los halos. */
const FRAME_DOTS = [
  [35, 38],
  [148, 38],
  [35, 144],
  [148, 144],
] as const;

function Entendemos() {
  const [fx, fy] = FOCUS;

  return (
    <>
      {FAN.map(({ x, y }) => (
        <line
          key={`l-${x}-${y}`}
          x1={x}
          y1={y}
          x2={fx}
          y2={fy}
          className="kora-node-line kora-node-flicker stroke-heading/25"
          strokeWidth="1.1"
        />
      ))}
      {FAN.map(({ x, y, r, ink }) => (
        <circle
          key={`d-${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          className={`kora-node-dot kora-node-flicker ${ink}`}
        />
      ))}
      {/* Los dos `>`: la señal ya tiene dirección. */}
      <path
        d="M52 53 L57 58 L52 63 M54 121 L59 126 L54 131"
        className="kora-node-line stroke-heading/50"
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx={fx} cy={fy} r="17" className="kora-node-mark fill-accent" />
    </>
  );
}

function Priorizamos() {
  return (
    <>
      <circle
        cx={CENTER}
        cy={CENTER}
        r="50"
        className="kora-node-ring fill-none stroke-heading/60"
        strokeWidth="1"
      />
      {CORNER_MARKS.map((d) => (
        <path
          key={d}
          d={d}
          className="kora-node-line stroke-heading/50"
          strokeWidth="1"
          fill="none"
        />
      ))}
      <circle cx="64" cy="47" r="4.5" className="kora-node-dot fill-heading/85" />
      <circle cx="168" cy="66" r="3.5" className="kora-node-dot fill-heading/50" />
      {/* El punto que orbita. El `<g>` es la capa que gira; el círculo solo se deja llevar. */}
      <g className="kora-node-orbit">
        <circle
          cx={CENTER + ORBIT_RADIUS}
          cy={CENTER}
          r="3"
          className="kora-node-dot fill-heading/60"
        />
      </g>
      <circle cx={CENTER} cy={CENTER} r="15" className="kora-node-mark fill-accent" />
    </>
  );
}

function Construimos() {
  return (
    <>
      {/* Lo que ya está resuelto: dos bloques sólidos. */}
      <rect x="10" y="28" width="20" height="20" className="kora-node-dot fill-heading" />
      <rect x="10" y="133" width="20" height="20" className="kora-node-dot fill-heading" />
      {/* Lo que falta: tres bloques vacíos, todavía sueltos. */}
      <rect
        x="73"
        y="9"
        width="21"
        height="21"
        className="kora-node-line fill-none stroke-heading/40"
        strokeWidth="1.1"
      />
      <rect
        x="53"
        y="75"
        width="21"
        height="21"
        className="kora-node-line fill-none stroke-heading/40"
        strokeWidth="1.1"
      />
      <rect
        x="90"
        y="112"
        width="21"
        height="21"
        className="kora-node-line fill-none stroke-heading/40"
        strokeWidth="1.1"
      />
      {/* `□→`: el siguiente bloque, ya en camino. */}
      <rect
        x="147"
        y="57"
        width="15"
        height="15"
        className="kora-node-line fill-none stroke-heading/50"
        strokeWidth="1.1"
      />
      <path
        d="M165 64.5 H177 M172.5 60 L177 64.5 L172.5 69"
        className="kora-node-line stroke-heading/55"
        strokeWidth="1.1"
        fill="none"
      />
      {/* El bloque que se está construyendo respira. La escala de la entrada vive en el `<rect>`. */}
      <g className="kora-node-breathe">
        <rect x="108" y="62" width="25" height="25" className="kora-node-mark fill-accent" />
      </g>
    </>
  );
}

function Funcionando() {
  return (
    <>
      {/*
        Los halos van de mayor a menor porque el bucle los escalona desde el
        final, y así el pulso sale de adentro hacia afuera. Son rellenos y se
        apilan: donde se superponen la tinta se suma, y por eso el centro se lee
        más cargado que el borde sin dibujar anillos.

        El relleno es acento sólido a propósito, sin `/15` ni `/30`. La opacidad
        es lo que anima el bucle, y si además viniera bajada por la clase las dos
        se multiplicarían: el halo quedaría en un 5% real y no se vería nada.
      */}
      <circle cx={CENTER} cy={CENTER} r="64" className="kora-node-pulse fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="42" className="kora-node-pulse fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="24" className="kora-node-pulse fill-accent" />
      {FRAME_DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className="kora-node-dot fill-heading/45" />
      ))}
      <circle cx={CENTER} cy={CENTER} r="13" className="kora-node-mark fill-accent" />
    </>
  );
}

const DIAGRAMS: Record<MethodStepId, () => React.JSX.Element> = {
  entendemos: Entendemos,
  priorizamos: Priorizamos,
  construimos: Construimos,
  funcionando: Funcionando,
};

export function MethodStepIcon({ step }: { step: MethodStepId }) {
  const Diagram = DIAGRAMS[step];

  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      aria-hidden
      className="h-auto w-full max-w-[180px]"
      role="presentation"
    >
      <Diagram />
    </svg>
  );
}
