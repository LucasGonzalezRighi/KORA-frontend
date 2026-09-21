'use client';

import Image from 'next/image';

import { LinkButton } from '@/components/atoms/Button';
import { RevealText } from '@/components/atoms/RevealText';
import { ANCHORS } from '@/constants/routes.app';
import { cn } from '@/utils/cn';
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
            En mobile el encuadre muestra la figura casi completa: es la imagen
            de marca y tiene que verse. La legibilidad del texto no se resuelve
            escondiéndola sino con el panel de vidrio de más abajo.
          */
          className="absolute inset-0 -z-10 size-full object-cover object-[85%_center] lg:object-[72%_center]"
        />
        {/*
          Único velo, y solo arriba: el nav se apoya sobre la imagen, y con la
          figura centrada sus etiquetas oscuras pueden caer sobre el casco. No
          va un velo general — la figura tiene que verse.
        */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-canvas/85 to-transparent lg:hidden"
        />

        {/*
          Los colores cálidos del hero (grupo `Colores hero` en Figma).

          Va después de la imagen y con el mismo `-z-10`: comparten capa, así
          que manda el orden del DOM y este queda encima de la foto pero debajo
          del texto. Sin esto el hero se veía gris — los glows cálidos de la
          página viven en `<AmbientGlow>`, detrás de todo, y la foto es opaca,
          así que nunca la alcanzaban. En Figma este grupo está sobre la imagen.
        */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-glow-hero" />

        {/*
          `px-card-gutter` es el mismo padding que usa el nav: por eso el logo
          queda a plomo con el título, en cualquier ancho.
        */}
        <div
          {...{ [PARALLAX_ATTR]: 'medium' }}
          className="flex min-h-[560px] flex-col justify-center px-card-gutter pb-20 pt-36 sm:pt-40 lg:min-h-[860px] lg:pb-28"
        >
          {/*
            Panel de vidrio, solo en mobile.

            Es lo que permite que la figura se vea entera y el texto igual se
            lea: en vez de tapar la imagen con un velo, el bloque de texto se
            apoya sobre una superficie esmerilada propia. El `backdrop-blur`
            desenfoca lo que pasa por detrás, así que el titular no compite con
            el detalle del casco.

            En desktop desaparece: ahí la imagen ya es clara del lado del texto
            y el diseño no lleva panel.

            Ojo con cómo se apaga: es `lg:backdrop-filter-none` y **no**
            `lg:backdrop-blur-none`. En Tailwind el blur y el saturate son dos
            variables CSS distintas que se componen en un mismo
            `backdrop-filter`, así que apagar solo el blur dejaba vivo el
            `backdrop-saturate-150` en desktop. El panel seguía saturando todo
            lo que tenía detrás dentro de su caja —y con `lg:rounded-none`, una
            caja de esquinas rectas—, así que dibujaba una línea recta sobre la
            foto justo debajo de los botones. Medido en el borde: el fondo del
            estudio saltaba +2 en el canal azul, y sobre el abrigo, que es mucho
            más saturado, el escalón se veía a simple vista.
          */}
          <div
            className={cn(
              'flex flex-col gap-7 sm:gap-6',
              'rounded-panel border border-glass bg-glass-panel p-6 shadow-panel backdrop-blur-xl backdrop-saturate-150 sm:p-8',
              'lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-filter-none',
            )}
          >
            <p className="font-mono text-base tracking-tight text-heading">{dict.eyebrow}</p>

            {/* `immediate`: está sobre el fold, no hay scroll que esperar. */}
            {/*
              Ancho del titular: 815px, el ancho del **marco** en Figma.

              Antes era `max-w-[21ch]`, que a 36px son 481px — poco más de la
              mitad. Con ese ancho el título entraba en cuatro renglones y
              partía "con tecnología accesible y consultoría inteligente" al
              medio. Con 773 corta donde corta el diseño: "…startups se" /
              "…accesible y" / "consultoría inteligente.".

              815 y no 773. En Figma la capa de texto dice 773, pero ese es el
              ancho *resultante*: la caja se ajusta al renglón más largo, así
              que 773 es exactamente el largo de "…startups se". Usarlo de tope
              deja cero margen — cualquier diferencia de una fracción de píxel
              entre cómo mide Figma y cómo mide el navegador empuja "se" abajo y
              vuelven los cuatro renglones. 815 es el marco que lo contiene, y
              cae con aire dentro de la ventana que conserva el corte del
              diseño: entre 773 (el renglón 1 entero) y ~844 (donde "consultoría"
              empezaría a subir al renglón 2).

              Va en px y no en `ch` porque `ch` mide el ancho del cero de la
              tipografía activa, así que el corte cambiaba según cuál hubiera
              cargado. El diseño da un ancho, no una cantidad de caracteres.
            */}
            <RevealText
              as="h1"
              immediate
              className="max-w-[815px] font-display text-fluid-hero font-medium leading-snug tracking-tight text-heading"
            >
              {dict.title}
            </RevealText>

            <p className="max-w-[52ch] font-display text-md font-medium leading-body tracking-tight text-body">
              {dict.subtitle}
            </p>

            {/*
              En mobile los tres CTA se apilan. En una sola fila se partían en
              un 2+1 que se leía como un error de maquetado; apilados se leen
              como lo que son, tres opciones.
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
      </div>
    </section>
  );
}
