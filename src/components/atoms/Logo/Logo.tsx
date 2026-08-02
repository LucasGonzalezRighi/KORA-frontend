'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { ROUTES_APP } from '@/constants/routes.app';
import { SITE } from '@/constants/site';
import { tokens } from '@/design-system';
import { MOTION_MEDIA, gsap, useGSAP, motionIsReduced } from '@/hooks/animations/gsap';
import type { Locale } from '@/i18n/config';
import { cn } from '@/utils/cn';

import { DOT_CLASS, DOT_RING_CLASS, KoraWordmark, LETTER_CLASS } from './KoraWordmark';

/** Hasta dónde crece el anillo antes de disolverse. */
const RING_SCALE = 4.2;

/**
 * Wordmark de Kora, animado.
 *
 * **El punto no se mueve.** Es el acento de la marca: si salta o crece, el logo
 * se lee como un botón. En su lugar *emite* — un anillo se expande desde su
 * centro y se disuelve, como el indicador de un sistema encendido. Es el mismo
 * gesto que el cuarto nodo del método ("lo dejamos funcionando"), que no es
 * casualidad: el punto de `kora.` es esa idea reducida a su mínimo.
 *
 * Al cargar: las letras entran escalonadas de izquierda a derecha, el punto
 * aparece y recién ahí emite. Al pasar el cursor: emite de nuevo, y nada más.
 */
export function Logo({ locale, className }: { locale: Locale; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  /** Un pulso del anillo. Reutilizado por la entrada y por el hover. */
  const emit = () => {
    if (motionIsReduced()) return;

    gsap.fromTo(
      `.${DOT_RING_CLASS}`,
      { scale: 1, opacity: 0.85 },
      {
        scale: RING_SCALE,
        opacity: 0,
        duration: tokens.motion.durations.slow,
        ease: tokens.motion.easings.outExpoSoft,
        overwrite: true,
      },
    );
  };

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add({ reduced: MOTION_MEDIA.reduced }, (context) => {
        // Sin animación de entrada: la marca ya está visible, no hay nada que revelar.
        if ((context.conditions as { reduced?: boolean }).reduced) return;

        const { durations, easings } = tokens.motion;

        gsap
          .timeline()
          .from(`.${LETTER_CLASS}`, {
            yPercent: 34,
            autoAlpha: 0,
            duration: durations.base,
            ease: easings.outQuart,
            stagger: 0.055,
          })
          .from(
            `.${DOT_CLASS}`,
            { autoAlpha: 0, duration: durations.fast, ease: easings.outQuart },
            '-=0.1',
          )
          .add(emit);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Link
      ref={ref}
      href={ROUTES_APP.home(locale)}
      aria-label={SITE.name}
      onMouseEnter={emit}
      className="shrink-0 rounded-sm focus-visible:shadow-focus focus-visible:outline-none"
    >
      {/*
        Más chico en mobile: con el CTA ahora presente en la barra, a 375px el
        logo a tamaño completo dejaba al botón sin lugar.
      */}
      <KoraWordmark className={cn('h-[32px] w-[90px] sm:h-[42px] sm:w-[118px]', className)} />
    </Link>
  );
}
