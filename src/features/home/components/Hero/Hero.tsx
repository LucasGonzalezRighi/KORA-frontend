'use client';

import Image from 'next/image';

import { LinkButton } from '@/components/atoms/Button';
import { RevealText } from '@/components/atoms/RevealText';
import { ANCHORS } from '@/constants/routes.app';
import { PARALLAX_ATTR, PARALLAX_ZOOM_ATTR, useParallax } from '@/hooks/animations';
import type { Dictionary } from '@/i18n';

/** Dimensiones del render exportado de Figma (nodo 1:1311). */
const HERO_IMAGE_WIDTH = 1355;
const HERO_IMAGE_HEIGHT = 897;

/**
 * Hero: tarjeta con la imagen de marca a sangre y el texto encima.
 * El nav va montado sobre esta tarjeta — de ahí el padding superior generoso.
 *
 * Al scrollear, la imagen escala apenas y el texto deriva a otra velocidad
 * (solo en desktop, ver `useParallax`).
 */
export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  const cardRef = useParallax<HTMLDivElement>();

  const ctas = [
    { label: dict.ctaWhat, href: ANCHORS.soluciones, variant: 'outline' as const },
    { label: dict.ctaHow, href: ANCHORS.metodo, variant: 'outline' as const },
    { label: dict.ctaTalk, href: ANCHORS.contacto, variant: 'soft' as const },
  ];

  return (
    <section data-i18n-block className="px-gutter pt-hero-card-inset">
      <div
        ref={cardRef}
        className="relative isolate mx-auto w-full max-w-wide overflow-hidden rounded-media"
      >
        <Image
          src="/images/hero-kora.png"
          alt={dict.imageAlt}
          width={HERO_IMAGE_WIDTH}
          height={HERO_IMAGE_HEIGHT}
          priority
          {...{ [PARALLAX_ATTR]: 'subtle', [PARALLAX_ZOOM_ATTR]: '' }}
          /*
            El encuadre se corre a la derecha a medida que la pantalla se
            angosta: a 1440 la figura queda al costado del texto, pero en un
            teléfono ese mismo encuadre la mete justo debajo del titular. Cuanto
            menos ancho, más hacia afuera.
          */
          className="absolute inset-0 -z-10 size-full object-cover object-[90%_center] sm:object-[82%_center] lg:object-[72%_center]"
        />
        {/*
          En desktop la imagen ya es clara del lado del texto, así que no lleva
          velo. En pantallas chicas la figura queda por detrás del texto, y ahí
          el velo es lo que sostiene el contraste.
        */}
        <div
          aria-hidden
          className="from-canvas/92 absolute inset-0 -z-10 bg-gradient-to-r via-canvas/60 to-canvas/10 lg:hidden"
        />

        {/*
          `px-card-gutter` es el mismo padding que usa el nav: por eso el logo
          queda a plomo con el título, en cualquier ancho.
        */}
        <div
          {...{ [PARALLAX_ATTR]: 'medium' }}
          className="flex min-h-[560px] flex-col justify-center gap-7 px-card-gutter pb-20 pt-36 sm:gap-6 sm:pt-40 lg:min-h-[860px] lg:pb-28"
        >
          <p className="font-mono text-base tracking-tight text-heading">{dict.eyebrow}</p>

          {/* `immediate`: está sobre el fold, no hay scroll que esperar. */}
          <RevealText
            as="h1"
            immediate
            className="max-w-[21ch] font-display text-fluid-hero font-medium leading-snug tracking-tight text-heading"
          >
            {dict.title}
          </RevealText>

          <p className="max-w-[52ch] font-display text-md font-medium leading-body tracking-tight text-body">
            {dict.subtitle}
          </p>

          {/*
            En mobile los tres CTA se apilan. En una sola fila se partían en un
            2+1 que se leía como un error de maquetado; apilados se leen como lo
            que son, tres opciones.
          */}
          <div className="mt-2 flex flex-col items-start gap-3 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {ctas.map((cta) => (
              <LinkButton key={cta.href} href={cta.href} variant={cta.variant} size="md">
                {cta.label}
              </LinkButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
