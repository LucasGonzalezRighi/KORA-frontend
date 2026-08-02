/**
 * Atributos que marcan las piezas de la secuencia de pasos.
 *
 * `track` y `stage` existen para que **el layout de superposición lo aplique el
 * hook y no el CSS**. Es una lección aprendida a los golpes: si el apilado vive
 * en clases (`lg:absolute`) y el ocultamiento en GSAP, cualquier motivo por el
 * que GSAP no corra —movimiento reducido, un error, JS deshabilitado— deja los
 * tres pasos visibles encima del otro y la sección ilegible.
 *
 * La regla: **el estado por defecto tiene que ser el legible**, y la animación
 * opta por el layout riesgoso. Nunca al revés.
 */
export const STEP = {
  /** Contenedor que define el recorrido de scroll. */
  track: 'data-sequence-track',
  /** El escenario que queda fijo mientras los pasos se relevan. */
  stage: 'data-sequence-stage',
  root: 'data-sequence-step',
  title: 'data-step-title',
  rule: 'data-step-rule',
  body: 'data-step-body',
  bullets: 'data-step-bullets',
  cta: 'data-step-cta',
} as const;

/** Helper para escribir el atributo en JSX sin repetir el objeto vacío. */
export const stepPart = (part: keyof typeof STEP) => ({ [STEP[part]]: '' });
