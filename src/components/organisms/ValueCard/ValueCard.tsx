'use client';

import type { LucideIcon } from 'lucide-react';

import { useTilt } from '@/hooks/animations';
import { cn } from '@/utils/cn';

/** El círculo del icono alterna entre azulado y crema a lo largo de la grilla. */
export type ValueCardTone = 'cool' | 'warm';

const TONES: Record<ValueCardTone, string> = {
  cool: 'bg-icon-wash',
  warm: 'bg-icon-wash-warm',
};

/**
 * Card de "¿Por qué eligen Kora?": icono en círculo, título en peso black y
 * una bajada.
 *
 * La inclinación va en la card y el parallax en el `<li>` que la envuelve —
 * elementos distintos a propósito: los dos animan `y`, y en el mismo nodo se
 * pisarían.
 */
export function ValueCard({
  icon: Icon,
  title,
  description,
  tone = 'cool',
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: ValueCardTone;
}) {
  const ref = useTilt<HTMLElement>();

  return (
    <article
      ref={ref}
      className="flex h-full flex-col gap-4 rounded-card border border-card bg-surface p-card-padding shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover"
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'flex size-[49px] shrink-0 items-center justify-center rounded-avatar',
            TONES[tone],
          )}
        >
          <Icon aria-hidden className="size-6 text-heading" strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-xl font-black leading-tight tracking-tighter text-heading">
          {title}
        </h3>
      </div>

      <p className="font-display text-lg leading-body tracking-tight text-body">{description}</p>
    </article>
  );
}
