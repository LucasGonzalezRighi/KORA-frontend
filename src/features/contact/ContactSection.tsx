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
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface-inverse pb-contact-bottom pt-contact-top"
    >
      <ContactGlow />
      {/* La capa `ruido` del diseño (nodo 1:1369): le saca lo plano al sólido. */}
      <NoiseOverlay />

      {/*
        Geometría del frame `bottom of page` (1127px de ancho): columna
        izquierda de 455, derecha de 514 y 158 entre ambas. La línea divisoria
        no es el borde de la columna: mide 337px y cuelga 64px por debajo del
        tope de la columna derecha, 78px a su izquierda.
      */}
      <Container className="grid gap-16 lg:grid-cols-[455fr_514fr] lg:gap-x-[9.875rem]">
        <div className="flex flex-col gap-[4.375rem]">
          <div className="flex flex-col gap-8">
            <Eyebrow withMark={false} tone="accent" size="sm" className="font-bold uppercase">
              {dict.eyebrow}
            </Eyebrow>

            <RevealText
              as="h2"
              className="text-wrap font-display text-fluid-contact font-bold leading-relaxed tracking-tight text-on-inverse"
            >
              {dict.title} <span className="text-on-inverse-accent">{dict.titleHighlight}</span>
            </RevealText>

            <p className="max-w-[23.125rem] font-display text-xl font-medium leading-relaxed tracking-tight text-on-inverse">
              {dict.description}
            </p>
          </div>

          {/* La lista va 20px adentro y sus filas cada 48px (26 de texto + 22). */}
          <ul className="flex flex-col gap-[1.375rem] pl-5">
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

        <div className="relative">
          <span
            aria-hidden
            className="absolute -left-[4.875rem] top-16 hidden h-[21.0625rem] w-0.5 bg-hairline-inverse lg:block"
          />
          <ContactForm dict={dict} />
        </div>
      </Container>
    </section>
  );
}
