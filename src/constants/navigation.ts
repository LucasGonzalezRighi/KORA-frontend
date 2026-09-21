import { BUSINESS_UNIT_IDS } from '@/features/home/data/businessUnits';
import type { Dictionary, Locale } from '@/i18n';

import { ROUTES_APP, homeAnchor } from './routes.app';

export type NavChild = {
  readonly label: string;
  readonly href: string;
};

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavChild[];
};

/**
 * Arma el menú del nav para un idioma.
 *
 * Es una función y no una constante porque tanto las etiquetas como los hrefs
 * dependen del idioma activo. Las anclas van con la ruta de la home delante
 * para que el menú funcione también desde las páginas interiores.
 *
 * Las unidades de negocio del submenú se derivan de `BUSINESS_UNIT_IDS`, así
 * que agregar una unidad la agrega al nav sola.
 */
export function buildNavItems(locale: Locale, dict: Dictionary): readonly NavItem[] {
  return [
    { id: 'home', label: dict.nav.home, href: ROUTES_APP.home(locale) },
    {
      id: 'solutions',
      label: dict.nav.solutions,
      href: homeAnchor(locale, 'soluciones'),
      children: BUSINESS_UNIT_IDS.map((unitId) => ({
        label: dict.solutions.units[unitId].tab,
        href: ROUTES_APP.solution(locale, unitId),
      })),
    },
    { id: 'method', label: dict.nav.method, href: homeAnchor(locale, 'metodo') },
    { id: 'about', label: dict.nav.about, href: ROUTES_APP.nosotras(locale) },
    { id: 'blog', label: dict.nav.blog, href: homeAnchor(locale, 'blog') },
    { id: 'contact', label: dict.nav.contact, href: homeAnchor(locale, 'contacto') },
  ];
}
