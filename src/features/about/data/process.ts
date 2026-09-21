import { BarChart3, Search, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Las tres cards de "¿Cómo lo hacemos?".
 *
 * Solo lo que no se traduce: orden, icono, numeral y tono. Los textos salen del
 * diccionario, indexados por estos ids.
 *
 * El tono alterna como en el diseño: la card del medio ("Implementación") lleva
 * el tile y el numeral en acero; las otras dos, en durazno.
 */
export const PROCESS_STEP_IDS = ['diagnostico', 'implementacion', 'sistema'] as const;

export type ProcessStepId = (typeof PROCESS_STEP_IDS)[number];

export type ProcessTone = 'warm' | 'cool';

export const PROCESS_STEPS: Record<ProcessStepId, { icon: LucideIcon; tone: ProcessTone }> = {
  diagnostico: { icon: Search, tone: 'warm' },
  implementacion: { icon: Wrench, tone: 'cool' },
  sistema: { icon: BarChart3, tone: 'warm' },
};
