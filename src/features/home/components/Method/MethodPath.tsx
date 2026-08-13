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

/** Onda suave que pasa por los cuatro centros (x ≈ 150, 450, 750, 1050). */
const PATH = 'M150 60 Q250 24 350 60 T550 60 T750 60 T950 60 T1150 60';

const DASH = '2 9';
const STROKE = 2.5;

/**
 * Cuántos puntos recorren la línea a la vez.
 *
 * Tres es lo que hace que se lea como un flujo continuo: con uno se siente un
 * evento aislado, y con más el recorrido se convierte en una fila de luces.
 */
const FLOW_DOTS = 3;

export function MethodPath({ className }: { className?: string }) {
  const maskId = useId();

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      aria-hidden
      role="presentation"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={maskId}>
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
      </defs>

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
        mask={`url(#${maskId})`}
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
    </svg>
  );
}
