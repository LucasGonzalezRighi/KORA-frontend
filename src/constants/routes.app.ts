import type { Locale } from '@/i18n/config';

/**
 * URLs de las páginas del front. Prohibido escribir un path literal en un
 * `<Link>`, un `router.push` o un `href` — siempre se importa de acá.
 *
 * Todas las rutas llevan prefijo de idioma: `/es`, `/en/blog`, etc. Por eso
 * son funciones que reciben el `locale` activo.
 */

export const ROUTES_APP = {
  home: (locale: Locale) => `/${locale}`,
  blog: (locale: Locale) => `/${locale}/blog`,
  blogPost: (locale: Locale, slug: string) => `/${locale}/blog/${slug}`,
  contacto: (locale: Locale) => `/${locale}/contacto`,
  metodo: (locale: Locale) => `/${locale}/metodo`,
  solution: (locale: Locale, unit: SolutionSlug) => `/${locale}/soluciones/${unit}`,
} as const;

/** Los slugs de las unidades de negocio no se traducen — son identificadores. */
export const SOLUTION_SLUGS = ['consultoria', 'automatizaciones', 'capacitaciones'] as const;
export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

/** IDs de las secciones de la home. Se usan en el nav y en los CTA del hero. */
export const SECTION_IDS = {
  soluciones: 'soluciones',
  porQueKora: 'por-que-kora',
  metodo: 'metodo',
  blog: 'blog',
  faqs: 'faqs',
  contacto: 'contacto',
} as const;

export const ANCHORS = {
  soluciones: `#${SECTION_IDS.soluciones}`,
  porQueKora: `#${SECTION_IDS.porQueKora}`,
  metodo: `#${SECTION_IDS.metodo}`,
  blog: `#${SECTION_IDS.blog}`,
  faqs: `#${SECTION_IDS.faqs}`,
  contacto: `#${SECTION_IDS.contacto}`,
} as const;
