'use client';

import Image from 'next/image';

import { useTilt } from '@/hooks/animations';

import { FOUNDER_PHOTO, type Founder } from '../../data/founders';
import { LinkedInMark } from './LinkedInMark';

type FounderCardProps = {
  name: string;
  role: string;
  school: string;
  founder: Founder;
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
export function FounderCard({ name, role, school, founder, linkedinLabel }: FounderCardProps) {
  const ref = useTilt<HTMLElement>();
  const { photo, width, height, frame, linkedinUrl } = founder;

  return (
    <article
      ref={ref}
      className="flex h-full flex-col gap-6 rounded-card-soft border-[3px] border-peach bg-surface p-9 shadow-card-rest transition-shadow duration-300 ease-out hover:shadow-card-hover sm:p-10"
    >
      {/*
        La máscara. La foto adentro NO va con `object-cover`: en Figma cada una
        está ampliada y corrida a mano (ver `frame` en `data/founders.ts`), y
        un cover centrado mostraba el medio de la foto en vez de la cara.
      */}
      <div
        className="relative w-full overflow-hidden rounded-media"
        style={{ aspectRatio: `${FOUNDER_PHOTO.width} / ${FOUNDER_PHOTO.height}` }}
      >
        <Image
          src={photo}
          alt={name}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 55vw, 100vw"
          className="absolute h-auto max-w-none"
          style={{
            width: `${frame.scale * 100}%`,
            left: `${frame.x * 100}%`,
            top: `${frame.y * 100}%`,
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display text-xl font-black leading-relaxed tracking-tight text-heading">
          {name}
        </h3>

        {/*
          Una sola línea, como en el diseño. La fila mide ~267px y el interior de
          la card 269: por eso el gap es de 8px y no de 10, y no se permite el
          salto — si un idioma la alarga, prefiere asomar unos px en el padding
          antes que partir "UTN Buenos Aires" abajo.
        */}
        <p className="flex flex-nowrap items-center gap-x-2 whitespace-nowrap text-steel">
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
