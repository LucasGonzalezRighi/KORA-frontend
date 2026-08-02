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
          className="absolute inset-0 -z-10 size-full object-cover object-[72%_center]"
        />
        {/*
          En desktop la imagen ya es clara del lado del texto, así que no lleva
          velo. En pantallas chicas la figura se corre hacia el texto, y ahí sí
          se aclara el fondo para no perder contraste.
        */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-canvas/75 via-canvas/30 to-transparent lg:hidden"
        />

        {/*
          `px-card-gutter` es el mismo padding que usa el nav: por eso el logo
          queda a plomo con el título, en cualquier ancho.
        */}
        <div
          {...{ [PARALLAX_ATTR]: 'medium' }}
          className="flex min-h-[540px] flex-col justify-center gap-6 px-card-gutter pb-16 pt-40 lg:min-h-[860px] lg:pb-28"
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

          <div className="mt-4 flex flex-wrap items-center gap-4">
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
