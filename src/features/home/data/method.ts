/**
 * Los cuatro pasos del método, en orden.
 *
 * Acá vive solo el orden y el identificador; las etiquetas y descripciones
 * salen del diccionario del idioma activo. El número (`01`…`04`) se deriva de
 * la posición, no se escribe a mano.
 */
export const METHOD_STEP_IDS = [
  'entendemos',
  'priorizamos',
  'construimos',
  'funcionando',
] as const;

export type MethodStepId = (typeof METHOD_STEP_IDS)[number];
