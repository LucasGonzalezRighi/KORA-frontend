'use client';

import { Container } from '@/components/atoms/Container';
import { Overline } from '@/components/atoms/Overline';
import { RevealText } from '@/components/atoms/RevealText';
import { Section } from '@/components/atoms/Section';
import { REVEAL_ITEM_CLASS, useScrollReveal } from '@/hooks/animations';
import type { Dictionary } from '@/i18n';

import { FOUNDERS, FOUNDER_IDS } from '../../data/founders';
import { FounderCard } from './FounderCard';

/** "El equipo": overline, "Las personas detrás de Kora." y las tres cards. */
export function Founders({ dict }: { dict: Dictionary['about']['team'] }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <Section glow="right" tight>
      <Container>
        <div ref={ref} className="flex flex-col items-center gap-16 lg:gap-24">
          <div className="flex flex-col items-center gap-8 text-center">
            <Overline className={REVEAL_ITEM_CLASS}>{dict.overline}</Overline>
            <RevealText
              as="h2"
              className="font-display text-fluid-section-lg font-bold leading-snug tracking-tight text-heading"
            >
              {dict.title}
              <span className="text-accent-soft">.</span>
            </RevealText>
          </div>

          {/* 41px entre cards en el diseño. */}
          <ul className="grid w-full max-w-[72rem] gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDER_IDS.map((id) => (
              <li key={id} className={REVEAL_ITEM_CLASS}>
                <FounderCard
                  name={dict.members[id].name}
                  role={dict.members[id].role}
                  school={dict.members[id].school}
                  founder={FOUNDERS[id]}
                  linkedinLabel={dict.linkedinLabel}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
