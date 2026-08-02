/**
 * Configuración de idiomas.
 *
 * Español es el default (mercado argentino). Inglés y portugués quedan para la
 * expansión regional. Agregar un idioma es: sumarlo acá + crear su diccionario
 * en `dictionaries/`; el resto (rutas, middleware, selector) se deriva solo.
 */

export const LOCALES = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'pt', label: 'Português', short: 'PT' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];

export const LOCALE_CODES = LOCALES.map((locale) => locale.code) as readonly Locale[];

export const DEFAULT_LOCALE: Locale = 'es';

/** Etiqueta `lang` del `<html>` por idioma. */
export const HTML_LANG: Record<Locale, string> = {
  es: 'es-AR',
  en: 'en',
  pt: 'pt-BR',
};

export function isLocale(value: string): value is Locale {
  return (LOCALE_CODES as readonly string[]).includes(value);
}

/** Devuelve el `short` ("ES") del idioma, para el selector del nav. */
export function localeShort(locale: Locale): string {
  return LOCALES.find((candidate) => candidate.code === locale)?.short ?? locale.toUpperCase();
}
