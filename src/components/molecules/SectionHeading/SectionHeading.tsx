import type { ReactNode } from 'react';

import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Overline } from '@/components/atoms/Overline';
import { RevealText } from '@/components/atoms/RevealText';
import { cn } from '@/utils/cn';

/** `lg` = 48px (titulares centrados); `md` = 36px (titular en línea). */
type SectionHeadingSize = 'md' | 'lg';

/**
 * El `leading-*` va acá y no en la clase base a propósito: `tailwind-merge`
 * trata a un `text-{size}` como que pisa cualquier `leading-*` anterior
 * (porque en Tailwind un fontSize puede traer line-height propio). Si el
 * line-height viniera antes del tamaño, se perdería.
 */
const TITLE_SIZES: Record<SectionHeadingSize, string> = {
  md: 'text-fluid-section-sm leading-snug',
  lg: 'text-fluid-section leading-snug',
};

type SectionHeadingProps = {
  /** Etiqueta monoespaciada con cuadradito ámbar. */
  eyebrow?: ReactNode;
  /** Igual que `eyebrow` pero sin el cuadradito (encabezados sueltos del diseño). */
  eyebrowPlain?: ReactNode;
  /** Etiqueta en mayúsculas, usada en las secciones centradas. */
  overline?: ReactNode;
  title: ReactNode;
  /** Tramo del título en peso fuerte — "Una sola mirada de **ingeniería**". */
  titleHighlight?: ReactNode;
  /** Lo que va después del tramo fuerte, en peso normal (el "?" del diseño). */
  titleSuffix?: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  size?: SectionHeadingSize;
  /** Ancho máximo del titular en caracteres. Por defecto se ajusta al `align`. */
  titleMaxWidth?: string;
  className?: string;
};

/** Encabezado de sección: eyebrow + título + bajada, con las variantes del diseño. */
export function SectionHeading({
  eyebrow,
  eyebrowPlain,
  overline,
  title,
  titleHighlight,
  titleSuffix,
  description,
  align = 'left',
  size = 'lg',
  titleMaxWidth,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-heading-gap',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {eyebrowPlain ? <Eyebrow withMark={false}>{eyebrowPlain}</Eyebrow> : null}
      {overline ? <Overline>{overline}</Overline> : null}

      <RevealText
        as="h2"
        className={cn(
          'font-display font-medium tracking-tight text-heading',
          TITLE_SIZES[size],
          titleMaxWidth ?? (centered ? 'max-w-[20ch]' : 'max-w-[24ch]'),
        )}
      >
        {title}
        {titleHighlight ? <span className="font-bold"> {titleHighlight}</span> : null}
        {titleSuffix}
      </RevealText>

      {description ? (
        <p className="max-w-[60ch] font-display text-md leading-body tracking-tight text-body">
          {description}
        </p>
      ) : null}
    </div>
  );
}
