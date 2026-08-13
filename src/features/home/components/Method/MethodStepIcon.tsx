import type { MethodStepId } from '@/features/home/data/method';

/**
 * Diagramas de los cuatro pasos del método.
 *
 * Reconstruidos en SVG a partir del render de Figma (nodo `63:1098`), que es
 * una imagen plana. No son idénticos al píxel: son la misma **idea** —
 * desorden que converge, foco, construcción, sistema emitiendo — dibujada con
 * geometría limpia. A cambio quedan nítidos a cualquier tamaño, se pueden
 * animar y no arrastran una imagen de 285 KB.
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
 * elemento mismo. Es a propósito — el bucle de ambiente y el scrub de la línea
 * animan transformaciones distintas del mismo nodo visual, y si compartieran
 * elemento se pisarían en cada scroll.
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
 * Va *por fuera* del anillo exterior (r=66), no sobre él: así el punto se lee
 * como algo que da vueltas alrededor del sistema y no como una marca pegada a
 * la circunferencia. Es la misma relación que tiene el HTML de referencia,
 * donde la órbita (42) queda afuera del anillo dibujado (38).
 */
const ORBIT_RADIUS = 70;

/** Posiciones de la nube de puntos del paso 1, en coordenadas del viewBox. */
const SCATTER = [
  [18, 52],
  [34, 34],
  [12, 86],
  [40, 70],
  [26, 108],
  [50, 96],
  [16, 124],
  [44, 132],
  [62, 50],
  [58, 116],
  [30, 90],
  [66, 78],
] as const;

function Entendemos() {
  return (
    <>
      {SCATTER.map(([x, y]) => (
        <line
          key={`l-${x}-${y}`}
          x1={x}
          y1={y}
          x2={CENTER + 6}
          y2={CENTER}
          className="kora-node-line kora-node-flicker stroke-heading/25"
          strokeWidth="0.8"
        />
      ))}
      {SCATTER.map(([x, y], index) => (
        <circle
          key={`d-${x}-${y}`}
          cx={x}
          cy={y}
          r={index % 3 === 0 ? 3.2 : 2.2}
          className="kora-node-dot kora-node-flicker fill-heading/70"
        />
      ))}
      <circle cx={CENTER + 6} cy={CENTER} r="11" className="kora-node-mark fill-accent" />
    </>
  );
}

function Priorizamos() {
  return (
    <>
      <line
        x1="14"
        y1={CENTER}
        x2={VIEW - 14}
        y2={CENTER}
        className="kora-node-line stroke-heading/20"
        strokeWidth="0.8"
      />
      <line
        x1={CENTER}
        y1="14"
        x2={CENTER}
        y2={VIEW - 14}
        className="kora-node-line stroke-heading/20"
        strokeWidth="0.8"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="66"
        className="stroke-heading/18 kora-node-ring fill-none"
        strokeWidth="0.9"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="42"
        className="kora-node-ring fill-none stroke-heading/45"
        strokeWidth="1.1"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="24"
        className="kora-node-ring fill-none stroke-heading/30"
        strokeWidth="0.9"
      />
      <circle cx={CENTER} cy="46" r="3.4" className="kora-node-dot fill-heading/80" />
      <circle cx="140" cy="118" r="2.8" className="kora-node-dot fill-heading/50" />
      {/* El punto que orbita. El `<g>` es la capa que gira; el círculo solo se deja llevar. */}
      <g className="kora-node-orbit">
        <circle
          cx={CENTER + ORBIT_RADIUS}
          cy={CENTER}
          r="3"
          className="kora-node-dot fill-heading/60"
        />
      </g>
      <circle cx={CENTER} cy={CENTER} r="10" className="kora-node-mark fill-accent" />
    </>
  );
}

function Construimos() {
  return (
    <>
      <path
        d="M40 40 H136 M40 76 H136 M40 112 H136 M64 28 V140 M100 28 V140"
        className="kora-node-line stroke-heading/15"
        strokeWidth="0.8"
        fill="none"
      />
      <rect x="26" y="52" width="18" height="18" className="kora-node-dot fill-heading" />
      <rect x="26" y="104" width="18" height="18" className="kora-node-dot fill-heading" />
      <rect
        x="120"
        y="52"
        width="16"
        height="16"
        className="kora-node-line fill-none stroke-heading/50"
        strokeWidth="1.1"
      />
      <path
        d="M140 60 H156 M150 55 L156 60 L150 65"
        className="kora-node-line stroke-heading/60"
        strokeWidth="1.1"
        fill="none"
      />
      {/* El bloque que se está construyendo respira. La escala del scrub vive en el `<rect>`. */}
      <g className="kora-node-breathe">
        <rect x="84" y="82" width="22" height="22" className="kora-node-mark fill-accent" />
      </g>
    </>
  );
}

function Funcionando() {
  return (
    <>
      <circle
        cx={CENTER}
        cy={CENTER}
        r="70"
        className="kora-node-ring fill-none stroke-heading/15"
        strokeWidth="0.9"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="52"
        className="kora-node-ring fill-none stroke-accent/30"
        strokeWidth="1"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="34"
        className="kora-node-ring fill-none stroke-accent/50"
        strokeWidth="1.2"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="20"
        className="kora-node-ring fill-surface stroke-accent/40"
        strokeWidth="1"
      />
      {/*
        Los halos van *después* del anillo con `fill-surface`: si fueran antes,
        ese relleno opaco los taparía. Van de mayor a menor porque el bucle los
        escalona desde el final, y así el pulso sale de adentro hacia afuera.

        El relleno es acento sólido a propósito, sin `/15` ni `/30`. La opacidad
        es lo que anima el bucle, y si además viniera bajada por la clase las dos
        se multiplicarían: el halo quedaría en un 5% real y no se vería nada.
      */}
      <circle cx={CENTER} cy={CENTER} r="45" className="kora-node-pulse fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="30" className="kora-node-pulse fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="18" className="kora-node-pulse fill-accent" />
      <circle cx="128" cy="58" r="3" className="kora-node-dot fill-heading/60" />
      <circle cx="52" cy="122" r="2.6" className="kora-node-dot fill-heading/45" />
      <circle cx={CENTER} cy={CENTER} r="9" className="kora-node-mark fill-accent" />
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
