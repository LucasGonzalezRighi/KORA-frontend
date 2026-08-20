import type { MethodStepId } from '@/features/home/data/method';

/**
 * Diagramas de los cuatro pasos del método.
 *
 * **Portados literalmente del prototipo `kora_proceso_4_pasos.html`**: mismas
 * coordenadas, mismo `viewBox` de 120, mismas animaciones. Lo único traducido
 * es la paleta — el prototipo usa azules y beiges (`#305B7E`, `#AFCBE3`,
 * `#E3D9C8`) que no existen en el design system, así que se conservan las
 * *relaciones* de contraste con los tokens del sitio:
 *
 * | Prototipo          | Acá          |
 * |--------------------|--------------|
 * | `--text-primary`   | `heading`    |
 * | `--text-secondary` | `heading/55` |
 * | `--text-muted`     | `heading/30` |
 * | `--border`         | `heading/12` |
 * | `--border-strong`  | `heading/22` |
 * | `--accent`         | `accent`     |
 *
 * Las animaciones son las clases `kora-loop-*` de `theme.css`, portadas del
 * prototipo. Al ser CSS, **ganan sobre cualquier tween de GSAP** sobre el mismo
 * nodo: por eso los elementos con bucle no llevan `kora-node-*`, que es lo que
 * consulta `Method` para animar con el scroll.
 *
 * El centro ámbar de los pasos 1, 2 y 4 sí lleva `kora-node-mark`: es estático
 * en el prototipo, así que puede seguir encendiéndose cuando la línea del
 * método lo alcanza. El del paso 3 no, porque ahí el prototipo lo anima.
 */

const VIEW = 120;
const CENTER = VIEW / 2;

/** La nube de puntos del paso 1, con su desfase de parpadeo. */
const FAN = [
  { x: 18, y: 26, r: 2, tone: 'fill-heading', delay: '' },
  { x: 30, y: 16, r: 1.5, tone: 'fill-heading/30', delay: 'kora-delay-1' },
  { x: 14, y: 46, r: 2.5, tone: 'fill-heading', delay: 'kora-delay-2' },
  { x: 26, y: 70, r: 2, tone: 'fill-heading/55', delay: 'kora-delay-3' },
  { x: 14, y: 86, r: 2, tone: 'fill-heading/55', delay: 'kora-delay-4' },
  { x: 34, y: 98, r: 1.5, tone: 'fill-heading/30', delay: 'kora-delay-5' },
] as const;

function Entendemos() {
  return (
    <>
      {FAN.map((dot) => (
        <line
          key={`l-${dot.x}-${dot.y}`}
          x1={dot.x}
          y1={dot.y}
          x2="66"
          y2={CENTER}
          strokeWidth="0.75"
          className={`kora-loop-fade ${dot.delay} stroke-heading/30`}
        />
      ))}
      <path
        d="M40 42 L44 44 L40 47"
        fill="none"
        strokeWidth="0.75"
        className="kora-loop-fade kora-delay-6 stroke-heading/30"
      />
      <path
        d="M42 80 L46 78 L42 76"
        fill="none"
        strokeWidth="0.75"
        className="kora-loop-fade kora-delay-6 stroke-heading/30"
      />
      {FAN.map((dot) => (
        <circle
          key={`d-${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          className={`kora-loop-fade ${dot.delay} ${dot.tone}`}
        />
      ))}
      <circle cx="66" cy={CENTER} r="8" className="kora-node-mark fill-accent" />
    </>
  );
}

function Priorizamos() {
  return (
    <>
      <circle
        cx={CENTER}
        cy={CENTER}
        r="38"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/22"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="24"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/55"
      />
      <line
        x1={CENTER}
        y1="22"
        x2={CENTER}
        y2="98"
        strokeWidth="0.5"
        className="stroke-heading/12"
      />
      <line
        x1="22"
        y1={CENTER}
        x2="98"
        y2={CENTER}
        strokeWidth="0.5"
        className="stroke-heading/12"
      />
      <path d="M84 42 L88 40 L86 44" fill="none" strokeWidth="0.75" className="stroke-heading/30" />
      <path d="M36 78 L32 80 L34 76" fill="none" strokeWidth="0.75" className="stroke-heading/30" />
      <path d="M84 78 L88 80 L86 76" fill="none" strokeWidth="0.75" className="stroke-heading/30" />
      <path d="M36 42 L32 40 L34 44" fill="none" strokeWidth="0.75" className="stroke-heading/30" />
      <circle cx="46" cy="38" r="2" className="fill-heading" />
      <circle cx={CENTER} cy={CENTER} r="8" className="kora-node-mark fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="2" className="kora-loop-orbit fill-heading/55" />
    </>
  );
}

function Construimos() {
  return (
    <>
      <rect x="20" y="30" width="9" height="9" className="fill-heading" />
      <rect x="20" y="82" width="9" height="9" className="fill-heading" />
      <rect
        x="52"
        y="20"
        width="10"
        height="10"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/30"
      />
      <rect
        x="42"
        y="52"
        width="10"
        height="10"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/30"
      />
      <rect
        x="60"
        y="70"
        width="10"
        height="10"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/30"
      />
      <rect
        x="86"
        y="42"
        width="9"
        height="9"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/30"
      />
      {/* El cuadrado que respira. En el prototipo es `.build-sq` con `pop`. */}
      <rect x="70" y="46" width="13" height="13" className="kora-loop-pop fill-accent" />
      <line x1="29" y1="34" x2="52" y2="25" strokeWidth="0.5" className="stroke-heading/12" />
      <line x1="29" y1="86" x2="42" y2="62" strokeWidth="0.5" className="stroke-heading/12" />
      <line x1="52" y1="62" x2="60" y2="70" strokeWidth="0.5" className="stroke-heading/12" />
      <line x1="62" y1="25" x2="70" y2="46" strokeWidth="0.5" className="stroke-heading/12" />
      <line x1="83" y1="52" x2="86" y2="46" strokeWidth="0.5" className="stroke-heading/12" />
      <path
        d="M95 46 L103 46 M99 43 L103 46 L99 49"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/30"
      />
    </>
  );
}

function Funcionando() {
  return (
    <>
      <circle
        cx={CENTER}
        cy={CENTER}
        r="38"
        fill="none"
        strokeWidth="0.75"
        className="stroke-heading/22"
      />
      <circle cx={CENTER} cy={CENTER} r="30" className="kora-loop-pulse kora-delay-4 fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="20" className="kora-loop-pulse kora-delay-2 fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="12" className="kora-loop-pulse fill-accent" />
      <circle cx={CENTER} cy={CENTER} r="8" className="kora-node-mark fill-accent" />
      <circle cx="88" cy="34" r="1.5" className="fill-heading/30" />
      <circle cx="32" cy="34" r="1.5" className="fill-heading/30" />
      <circle cx="88" cy="86" r="1.5" className="fill-heading/30" />
      <circle cx="32" cy="86" r="1.5" className="fill-heading/30" />
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
      role="presentation"
      className="h-auto w-full max-w-[180px]"
    >
      <Diagram />
    </svg>
  );
}
