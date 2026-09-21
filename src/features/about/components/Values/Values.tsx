'use client';

import { Container } from '@/components/atoms/Container';
import { Overline } from '@/components/atoms/Overline';
import { RevealText } from '@/components/atoms/RevealText';
import { Section } from '@/components/atoms/Section';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';
import type { Dictionary } from '@/i18n';

import { VALUE_ICONS, VALUE_IDS } from '../../data/values';
import { ValueMiniCard } from './ValueMiniCard';

/** "Nuestros valores": overline, "Lo que nos mueve" y cinco mini cards. */
export function Values({ dict }: { dict: Dictionary['about']['values'] }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    /* `pb-page-tail`: los ~490px de aire que el diseño deja antes del contacto. */
    <Section tight className="pb-page-tail">
      <Container>
        <div ref={ref} className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-8 text-center">
            <Overline className={`${REVEAL_ITEM_CLASS} text-xl font-black normal-case tracking-tight`}>
              {dict.overline.toUpperCase()}
            </Overline>
            <RevealText
              as="h2"
              className="font-display text-fluid-section-lg font-bold leading-snug tracking-tight text-heading"
            >
              {dict.title}
            </RevealText>
          </div>

          {/* 32px entre cards en el diseño; 214px cada una. */}
          <ul className="grid w-full max-w-[75rem] grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {VALUE_IDS.map((id) => (
              <li key={id} className={REVEAL_ITEM_CLASS}>
                <ValueMiniCard
                  icon={VALUE_ICONS[id]}
                  title={dict.items[id].title}
                  description={dict.items[id].description}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
