import { ContactSection } from '@/features/contact';
import type { Dictionary, Locale } from '@/i18n';

import { BlogSection } from './components/BlogSection';
import { Faqs } from './components/Faqs';
import { Hero } from './components/Hero';
import { Method } from './components/Method';
import { NextStep } from './components/NextStep';
import { Solutions } from './components/Solutions';
import { WhyKora } from './components/WhyKora';

/**
 * Composición de la landing, en el orden del diseño de Figma.
 *
 * Cada sección recibe solo su porción del diccionario — así ninguna puede
 * leer texto que no le corresponde, y el tipo dice exactamente qué usa.
 */
export function Home({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <Hero dict={dict.hero} />
      <WhyKora dict={dict.whyKora} />
      <Solutions locale={locale} dict={dict.solutions} />
      <NextStep dict={dict.nextStep} />
      <Method dict={dict.method} />
      <BlogSection locale={locale} dict={dict.blog} newsletterDict={dict.newsletter} />
      <Faqs dict={dict.faqs} />
      <ContactSection dict={dict.contact} />
    </>
  );
}
