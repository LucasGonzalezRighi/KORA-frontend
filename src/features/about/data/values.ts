import { HeartHandshake, Lightbulb, Rocket, Target, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Las cinco mini cards de "Lo que nos mueve". El diseño solo define el icono
 * de la primera (`rocket`); los demás siguen el mismo trazo de lucide.
 */
export const VALUE_IDS = ['compromiso', 'empatia', 'innovacion', 'exito', 'agilidad'] as const;

export type ValueId = (typeof VALUE_IDS)[number];

export const VALUE_ICONS: Record<ValueId, LucideIcon> = {
  compromiso: Rocket,
  empatia: HeartHandshake,
  innovacion: Lightbulb,
  exito: Target,
  agilidad: Zap,
};
