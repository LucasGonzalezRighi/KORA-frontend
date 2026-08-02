/**
 * Orden de las preguntas frecuentes. Preguntas y respuestas viven en los
 * diccionarios, indexadas por estos ids.
 *
 * Nota: las **preguntas** salen del diseño de Figma (nodo `196:476`); las
 * **respuestas** no están en el diseño — el acordeón aparece siempre colapsado —
 * así que son redacción propia. Confirmarlas con Kora antes de publicar.
 */
export const FAQ_IDS = [
  'implementan',
  'tecnologica',
  'capacitacionPuntual',
  'duracion',
  'rubros',
  'dependencia',
] as const;

export type FaqId = (typeof FAQ_IDS)[number];
