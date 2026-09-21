import { ContactSection } from '@/features/contact';
import type { Dictionary, Locale } from '@/i18n';

import { AboutHero } from './components/AboutHero/AboutHero';
import { Founders } from './components/Founders/Founders';
import { Process } from './components/Process/Process';
import { Story } from './components/Story/Story';
import { TeamIntro } from './components/TeamIntro/TeamIntro';
import { Values } from './components/Values/Values';

/**
 * Composición de Nosotras, en el orden del frame `TIPO 3` de Figma.
 *
 * Igual que la home, cada sección recibe solo su porción del diccionario.
 */
export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <AboutHero dict={dict.about.hero} />
      <Process locale={locale} dict={dict.about.process} />
      <TeamIntro dict={dict.about.intro} />
      <Story dict={dict.about.story} />
      <Founders dict={dict.about.team} />
      <Values dict={dict.about.values} />
      <ContactSection dict={dict.contact} />
    </>
  );
}
