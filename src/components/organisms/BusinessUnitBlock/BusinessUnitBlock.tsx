import { ArrowRight } from 'lucide-react';

import { LinkButton } from '@/components/atoms/Button';
import { BulletItem } from '@/components/molecules/BulletItem';
import { stepPart } from '@/hooks/animations/sequenceParts';

type BusinessUnitBlockProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
  ctaLabel: string;
};

/**
 * El contenido de una unidad de negocio: título, regla, descripción, bullets y
 * CTA.
 *
 * Cada parte lleva su atributo `data-step-*` para que la secuencia pueda
 * animarlas por separado. El índice de unidades **no** vive acá: es persistente
 * y lo renderiza `SolutionsSequence` una sola vez, porque un índice que se
 * desvanece y reaparece en cada cambio se ve sucio.
 */
export function BusinessUnitBlock({
  title,
  description,
  bullets,
  href,
  ctaLabel,
}: BusinessUnitBlockProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,25rem)] lg:gap-20">
      <div className="flex flex-col gap-6">
        <h3
          {...stepPart('title')}
          className="font-display text-fluid-unit font-medium leading-tight tracking-tighter text-heading"
        >
          {title}
        </h3>
        <span
          {...stepPart('rule')}
          aria-hidden
          className="block h-0.5 w-[71px] origin-left bg-accent"
        />
        <p
          {...stepPart('body')}
          className="font-display text-md font-medium leading-body tracking-tight text-body"
        >
          {description}
        </p>
      </div>

      <div className="flex flex-col items-start gap-8">
        <ul {...stepPart('bullets')} className="flex flex-col gap-6">
          {bullets.map((bullet) => (
            <BulletItem key={bullet}>{bullet}</BulletItem>
          ))}
        </ul>

        <div {...stepPart('cta')}>
          <LinkButton
            href={href}
            variant="outline"
            size="lg"
            trailingIcon={<ArrowRight aria-hidden className="size-5" />}
          >
            {ctaLabel}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
