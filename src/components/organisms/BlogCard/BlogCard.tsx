'use client';

import Image from 'next/image';
import Link from 'next/link';

import { PARALLAX_ATTR, useTilt } from '@/hooks/animations';
import { HTML_LANG, type Locale } from '@/i18n/config';

/** Dimensiones de la portada tal como está exportada de Figma (nodo 194:369). */
const COVER_WIDTH = 335;
const COVER_HEIGHT = 150;

type BlogCardProps = {
  locale: Locale;
  href: string;
  cover: string;
  category: string;
  title: string;
  excerpt: string;
  /** Fecha ISO (`YYYY-MM-DD`). */
  publishedAt: string;
  readMoreLabel: string;
};

/** Card de artículo del blog: portada, categoría, título, extracto y pie. */
export function BlogCard({
  locale,
  href,
  cover,
  category,
  title,
  excerpt,
  publishedAt,
  readMoreLabel,
}: BlogCardProps) {
  const ref = useTilt<HTMLElement>({ maxTilt: 3, lift: 4 });

  /*
   * `timeZone: 'UTC'` es deliberado: las fechas vienen como `YYYY-MM-DD`, que se
   * parsean a medianoche UTC. Sin esto, en Argentina (UTC-3) se mostraría el día
   * anterior.
   */
  const formattedDate = new Intl.DateTimeFormat(HTML_LANG[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(publishedAt));

  return (
    <article
      ref={ref}
      className="flex h-full flex-col gap-5 rounded-card border border-card bg-surface p-card-padding shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover"
    >
      {/*
        La portada es más alta que su marco y se desplaza dentro de él al
        scrollear. Es la técnica editorial de siempre: la imagen se mueve más
        lento que la card, y el recorte fijo es lo que lo hace legible.
      */}
      <div className="h-[150px] w-full overflow-hidden rounded-md">
        <Image
          src={cover}
          alt=""
          width={COVER_WIDTH}
          height={COVER_HEIGHT}
          {...{ [PARALLAX_ATTR]: 'subtle' }}
          className="h-[200px] w-full object-cover"
        />
      </div>

      <span className="w-fit rounded-pill border border-hairline px-4 py-1 font-display text-xs font-medium text-heading">
        {category}
      </span>

      <h3 className="font-display text-md font-bold leading-heading tracking-tight text-heading">
        <Link href={href} className="transition-colors duration-200 ease-out hover:text-accent">
          {title}
        </Link>
      </h3>

      <p className="flex-1 font-display text-sm font-medium leading-body text-body">{excerpt}</p>

      <footer className="flex items-center justify-between gap-4 pt-2">
        <time dateTime={publishedAt} className="font-display text-xs text-body">
          {formattedDate}
        </time>
        <Link
          href={href}
          className="font-display text-sm font-medium text-heading underline underline-offset-4 transition-colors duration-200 ease-out hover:text-accent"
        >
          {readMoreLabel}
        </Link>
      </footer>
    </article>
  );
}
