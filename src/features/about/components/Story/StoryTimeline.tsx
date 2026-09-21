'use client';

import type { CSSProperties } from 'react';

import { cn } from '@/utils/cn';

import { STORY, useStoryTimeline } from '../../hooks/useStoryTimeline';

type Side = 'left' | 'right';

/** Separación de cada punto respecto de la línea central, en px (Figma: 17.5). */
const DOT_OFFSET = 17.5;

/**
 * Recorrido de "Sobre nosotras": una línea vertical al centro y los párrafos
 * alternando a izquierda y derecha, cada uno enganchado a la línea con un par
 * de puntos y un conector.
 *
 * Es una grilla de tres columnas —texto · riel · texto— donde cada párrafo
 * ocupa su propia fila y se coloca en la columna de su lado. El marcador va en
 * la columna del medio de esa misma fila, alineado con la primera línea del
 * párrafo. Así la geometría del diseño sale sola del layout, sin medir nada.
 *
 * En mobile se pliega a una sola columna con el riel a la izquierda y un solo
 * punto por párrafo.
 *
 * El padding inferior es para la línea: en el diseño sigue bastante más abajo
 * del último párrafo, como si el recorrido continuara.
 */
export function StoryTimeline({ paragraphs }: { paragraphs: readonly string[] }) {
  const ref = useStoryTimeline<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-6 gap-y-14 pb-24 lg:grid-cols-[minmax(0,1fr)_12.25rem_minmax(0,1fr)] lg:gap-x-0 lg:gap-y-16 lg:pb-64"
    >
      {/* La línea. En mobile va sobre el riel izquierdo; en desktop, al centro. */}
      <span
        {...{ [STORY.line]: '' }}
        aria-hidden
        className="absolute inset-y-0 left-[0.625rem] w-px -translate-x-1/2 bg-heading/50 lg:left-1/2"
      />

      {paragraphs.map((paragraph, index) => {
        const side: Side = index % 2 === 0 ? 'left' : 'right';
        const row: CSSProperties = { gridRow: index + 1 };

        return (
          <div key={paragraph} className="contents">
            <Marker side={side} style={row} />
            <p
              {...{ [STORY.paragraph]: '' }}
              style={row}
              className={cn(
                'col-start-2 font-display text-lg font-medium leading-relaxed tracking-tight text-body sm:text-xl',
                side === 'left' ? 'lg:col-start-1' : 'lg:col-start-3',
              )}
            >
              {paragraph}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Dos puntos a caballo de la línea y el conector que sale hacia el párrafo.
 * `mt-2` deja los puntos a la altura de la primera línea del texto.
 */
function Marker({ side, style }: { side: Side; style: CSSProperties }) {
  return (
    <span
      {...{ [STORY.marker]: '' }}
      data-side={side}
      aria-hidden
      style={style}
      className="relative col-start-1 mt-2 block h-[15px] lg:col-start-2"
    >
      {/* Punto único de mobile. */}
      <Dot className="left-[0.625rem] lg:hidden" />

      {/* Par de puntos + conector de desktop. */}
      <Dot className="hidden lg:block" style={{ left: `calc(50% - ${DOT_OFFSET}px)` }} />
      <Dot className="hidden lg:block" style={{ left: `calc(50% + ${DOT_OFFSET}px)` }} />
      <span
        {...{ [STORY.connector]: '' }}
        className={cn(
          'absolute top-1/2 hidden h-0.5 w-20 -translate-y-1/2 bg-accent-bright lg:block',
          side === 'left' ? 'left-0' : 'right-0',
        )}
      />
    </span>
  );
}

function Dot({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      {...{ [STORY.dot]: '' }}
      style={style}
      className={cn(
        'absolute top-1/2 size-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright',
        className,
      )}
    />
  );
}
