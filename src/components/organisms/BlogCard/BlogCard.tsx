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
      className="flex h-full flex-col rounded-panel border border-card bg-surface p-8 shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover"
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

      {/* Medidas del nodo `texto card`: pill 129×27 a 27px de la imagen, título a 22, cuerpo a 32. */}
      <span className="mt-7 w-fit rounded-pill border border-ink/60 px-[15px] py-1 font-display text-sm font-medium leading-relaxed text-heading">
        {category}
      </span>

      <h3 className="mt-[1.375rem] max-w-[19.3125rem] font-display text-lg font-bold leading-relaxed tracking-tight text-heading">
        <Link href={href} className="transition-colors duration-200 ease-out hover:text-accent">
          {title}
        </Link>
      </h3>

      <p className="mt-8 px-1 font-display text-sm font-medium leading-body text-body">{excerpt}</p>

      {/* El pie va anclado al fondo de la card: entre el cuerpo y él queda el aire que sobre. */}
      <footer className="mt-auto flex items-end justify-between gap-4 px-2.5 pt-10">
        <time dateTime={publishedAt} className="font-display text-xs leading-relaxed text-body">
          {formattedDate}
        </time>
        <Link
          href={href}
          className="font-display text-sm font-bold leading-relaxed text-heading underline underline-offset-4 transition-colors duration-200 ease-out hover:text-accent"
        >
          {readMoreLabel}
        </Link>
      </footer>
    </article>
  );
}
