import { Container } from '@/components/atoms/Container';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { NoiseOverlay } from '@/components/atoms/NoiseOverlay';
import { RevealText } from '@/components/atoms/RevealText';
import { SquareMark } from '@/components/atoms/SquareMark';
import { SECTION_IDS } from '@/constants/routes.app';
import { CONTACT_INFO } from '@/constants/site';
import type { Dictionary } from '@/i18n';

import { ContactForm } from './components/ContactForm';
import { ContactGlow } from './components/ContactGlow';

const CONTACT_LINES = [
  { label: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { label: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}` },
  { label: CONTACT_INFO.linkedin, href: CONTACT_INFO.linkedinUrl },
  { label: CONTACT_INFO.location, href: null },
] as const;

/**
 * Bloque oscuro de cierre: datos de contacto a la izquierda, formulario a la
 * derecha, con los glows ámbar y azul del diseño.
 */
export function ContactSection({ dict }: { dict: Dictionary['contact'] }) {
  return (
    <section
      id={SECTION_IDS.contacto}
      data-i18n-block
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface-inverse py-section-y"
    >
      <ContactGlow />
      {/* La capa `ruido` del diseño (nodo 1:1369): le saca lo plano al sólido. */}
      <NoiseOverlay />

      <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <Eyebrow withMark={false} tone="accent" size="sm" className="font-bold uppercase">
              {dict.eyebrow}
            </Eyebrow>

            <RevealText
              as="h2"
              className="font-display text-fluid-contact font-bold leading-snug tracking-tight text-on-inverse"
            >
              {dict.title} <span className="text-on-inverse-accent">{dict.titleHighlight}</span>
            </RevealText>

            <p className="max-w-[26ch] font-display text-xl font-medium leading-relaxed tracking-tight text-on-inverse">
              {dict.description}
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {CONTACT_LINES.map((line) => (
              <li key={line.label} className="flex items-center gap-4">
                <SquareMark size="sm" />
                {line.href ? (
                  <a
                    href={line.href}
                    className="font-display text-lg font-medium leading-relaxed tracking-tight text-on-inverse transition-colors duration-200 ease-out hover:text-accent-soft"
                  >
                    {line.label}
                  </a>
                ) : (
                  <span className="font-display text-lg font-medium leading-relaxed tracking-tight text-on-inverse">
                    {line.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l lg:border-hairline-inverse lg:pl-20">
          <ContactForm dict={dict} />
        </div>
      </Container>
    </section>
  );
}
