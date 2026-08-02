/**
 * Atributos que marcan las partes animables de un paso de la secuencia.
 *
 * Cada parte se anima con su propio timing: el título con máscara, la regla
 * escalando, los bullets escalonados. Animar el bloque entero con una sola
 * opacidad es lo que hace que una transición se vea genérica.
 */
export const STEP = {
  root: 'data-sequence-step',
  title: 'data-step-title',
  rule: 'data-step-rule',
  body: 'data-step-body',
  bullets: 'data-step-bullets',
  cta: 'data-step-cta',
} as const;

/** Helper para escribir el atributo en JSX sin repetir el objeto vacío. */
export const stepPart = (part: keyof typeof STEP) => ({ [STEP[part]]: '' });
