import { BUSINESS_UNIT_IDS } from '@/features/home/data/businessUnits';
import type { Dictionary, Locale } from '@/i18n';

import { ANCHORS, ROUTES_APP } from './routes.app';

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
 * dependen del idioma activo. Las unidades de negocio del submenú se derivan de
 * `BUSINESS_UNIT_IDS`, así que agregar una unidad la agrega al nav sola.
 */
export function buildNavItems(locale: Locale, dict: Dictionary): readonly NavItem[] {
  return [
    { id: 'home', label: dict.nav.home, href: ROUTES_APP.home(locale) },
    {
      id: 'solutions',
      label: dict.nav.solutions,
      href: ANCHORS.soluciones,
      children: BUSINESS_UNIT_IDS.map((unitId) => ({
        label: dict.solutions.units[unitId].tab,
        href: ROUTES_APP.solution(locale, unitId),
      })),
    },
    { id: 'method', label: dict.nav.method, href: ANCHORS.metodo },
    { id: 'blog', label: dict.nav.blog, href: ANCHORS.blog },
    { id: 'contact', label: dict.nav.contact, href: ANCHORS.contacto },
  ];
}
