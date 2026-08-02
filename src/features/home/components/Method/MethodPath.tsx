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
 */

const VIEW_W = 1200;
const VIEW_H = 120;

/** Onda suave que pasa por los cuatro centros (x ≈ 150, 450, 750, 1050). */
const PATH = 'M150 60 Q250 24 350 60 T550 60 T750 60 T950 60 T1150 60';

const DASH = '2 9';
const STROKE = 2.5;

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
    </svg>
  );
}
