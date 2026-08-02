'use client';

import { LinkButton } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { Magnetic } from '@/components/atoms/Magnetic';
import { Overline } from '@/components/atoms/Overline';
import { RevealText } from '@/components/atoms/RevealText';
import { Section } from '@/components/atoms/Section';
import { ANCHORS } from '@/constants/routes.app';
import type { Dictionary } from '@/i18n';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';

/** Bloque centrado de cierre de la mitad superior: "Tu próximo paso". */
export function NextStep({ dict }: { dict: Dictionary['nextStep'] }) {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <Section tight>
      <Container>
        <div ref={containerRef} className="flex flex-col items-center gap-8 text-center">
          <Overline className={REVEAL_ITEM_CLASS}>{dict.overline}</Overline>

          <RevealText
            as="h2"
            className="max-w-[22ch] font-display text-fluid-section font-medium leading-snug tracking-tight text-heading"
          >
            {dict.title}
          </RevealText>

          <p
            className={`${REVEAL_ITEM_CLASS} font-display text-md font-medium leading-body tracking-tight text-body`}
          >
            {dict.description}
          </p>

          <Magnetic className={REVEAL_ITEM_CLASS}>
            <LinkButton href={ANCHORS.contacto} variant="solid" size="lg">
              {dict.cta}
            </LinkButton>
          </Magnetic>
        </div>
      </Container>
    </Section>
  );
}
