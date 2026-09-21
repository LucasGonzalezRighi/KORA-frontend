'use client';

import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useTilt } from '@/hooks/animations';
import { cn } from '@/utils/cn';

import type { ProcessTone } from '../../data/process';

const TILE_TONES: Record<ProcessTone, string> = {
  warm: 'border-tile bg-tile',
  cool: 'border-tile-cool bg-tile-cool',
};

/** El numeral y el icono comparten color: ámbar en las cálidas, acero en la fría. */
const INK_TONES: Record<ProcessTone, string> = {
  warm: 'text-accent-bright',
  cool: 'text-steel',
};

type ProcessCardProps = {
  icon: LucideIcon;
  /** "01", "02"… — el punto lo agrega la card, más grande, como en el diseño. */
  number: string;
  title: string;
  description: string;
  resultLabel: string;
  result: string;
  tone: ProcessTone;
};

/**
 * Card de "¿Cómo lo hacemos?": tile de icono + numeral, título en peso black,
 * bajada, filete durazno y la línea de resultado con flecha.
 *
 * La card mide 380px de alto en el diseño y el contenido queda arriba; acá se
 * respeta el padding pero la altura la da el contenido, así los tres textos
 * de distinto largo no dejan huecos raros.
 */
export function ProcessCard({
  icon: Icon,
  number,
  title,
  description,
  resultLabel,
  result,
  tone,
}: ProcessCardProps) {
  const ref = useTilt<HTMLElement>();

  return (
    <article
      ref={ref}
      className="flex h-full flex-col gap-5 rounded-card-soft border border-peach bg-surface-warm px-7 pb-12 pt-14 shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover sm:px-8"
    >
      <div className="flex items-end gap-2">
        <span
          className={cn(
            'flex size-[42px] shrink-0 items-center justify-center rounded-tile border',
            TILE_TONES[tone],
          )}
        >
          <Icon aria-hidden className={cn('size-6', INK_TONES[tone])} strokeWidth={1.75} />
        </span>
        <span className={cn('font-display font-medium leading-none', INK_TONES[tone])}>
          <span className="text-base">{number}</span>
          <span className="text-lg">.</span>
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="font-display text-xl font-black leading-relaxed tracking-tight text-heading">
          {title}
        </h3>
        <p className="font-display text-base font-medium leading-[1.6] tracking-tight text-body">
          {description}
        </p>

        <hr className="border-t border-peach" />

        <p className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-px flex size-[27px] shrink-0 items-center justify-center rounded-tile border border-tile bg-tile"
          >
            <ArrowRight className="size-3.5 text-accent-bright" strokeWidth={2} />
          </span>
          <span className="font-display text-smd font-bold leading-relaxed tracking-tight text-accent">
            {resultLabel} {result}
          </span>
        </p>
      </div>
    </article>
  );
}
