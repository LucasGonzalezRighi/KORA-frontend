'use client';

import Image from 'next/image';

import { useTilt } from '@/hooks/animations';

import { FOUNDER_PHOTO } from '../../data/founders';
import { LinkedInMark } from './LinkedInMark';

type FounderCardProps = {
  name: string;
  role: string;
  school: string;
  photo: string;
  linkedinUrl: string;
  /** Texto accesible del link: "Ver el perfil de LinkedIn de". */
  linkedinLabel: string;
};

/**
 * Card de fundadora, como en el diseño: foto con esquinas redondeadas, nombre,
 * la fila `ROL • Universidad` en acero y debajo el "in" de LinkedIn en ámbar,
 * suelto, sin tile.
 *
 * El borde es de 3px — más grueso que el filete de las otras cards a
 * propósito: son las únicas con foto y el marco las separa del fondo.
 */
export function FounderCard({
  name,
  role,
  school,
  photo,
  linkedinUrl,
  linkedinLabel,
}: FounderCardProps) {
  const ref = useTilt<HTMLElement>();

  return (
    <article
      ref={ref}
      className="flex h-full flex-col gap-6 rounded-card-soft border-[3px] border-peach bg-surface p-9 shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover sm:p-10"
    >
      <div
        className="relative w-full overflow-hidden rounded-media"
        style={{ aspectRatio: `${FOUNDER_PHOTO.width} / ${FOUNDER_PHOTO.height}` }}
      >
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 273px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display text-xl font-black leading-relaxed tracking-tight text-heading">
          {name}
        </h3>

        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-steel">
          <span className="font-display text-base font-bold uppercase leading-relaxed tracking-tight">
            {role}
          </span>
          <span aria-hidden className="size-[5px] shrink-0 rounded-full bg-steel" />
          <span className="font-display text-smd font-medium leading-relaxed tracking-tight">
            {school}
          </span>
        </p>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${linkedinLabel} ${name}`}
          className="mt-1 inline-flex w-fit text-accent-bright transition-colors duration-200 ease-out hover:text-accent"
        >
          <LinkedInMark className="h-7 w-auto" />
        </a>
      </div>
    </article>
  );
}
