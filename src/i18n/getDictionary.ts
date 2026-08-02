import type { Locale } from './config';
import { type Dictionary, es } from './dictionaries/es';
import { en } from './dictionaries/en';
import { pt } from './dictionaries/pt';

const DICTIONARIES: Record<Locale, Dictionary> = { es, en, pt };

/** Devuelve el diccionario del idioma. Se llama desde Server Components. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
