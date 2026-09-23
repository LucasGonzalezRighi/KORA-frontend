/**
 * Las tres cards de "¿Cómo lo hacemos?".
 *
 * Solo lo que no se traduce: orden, icono y tono. Los textos salen del
 * diccionario, indexados por estos ids.
 *
 * El tono alterna como en el diseño: la card del medio ("Implementación") lleva
 * el tile, el icono y el numeral en acero; las otras dos, en ámbar.
 */
export const PROCESS_STEP_IDS = ['diagnostico', 'implementacion', 'sistema'] as const;

export type ProcessStepId = (typeof PROCESS_STEP_IDS)[number];

export type ProcessTone = 'warm' | 'cool';

/** Iconos propios, portados de Figma — ver `components/Process/ProcessIcon`. */
export type ProcessIconId = 'find' | 'tools' | 'chart';

export const PROCESS_STEPS: Record<ProcessStepId, { icon: ProcessIconId; tone: ProcessTone }> = {
  diagnostico: { icon: 'find', tone: 'warm' },
  implementacion: { icon: 'tools', tone: 'cool' },
  sistema: { icon: 'chart', tone: 'warm' },
};
