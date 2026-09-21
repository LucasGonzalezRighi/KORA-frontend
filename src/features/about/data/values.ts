import { Heart, Lightbulb, Rocket, Trophy, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Las cinco mini cards de "Lo que nos mueve". Los iconos siguen los del render
 * de Figma (cohete, corazón, lamparita, trofeo, rayo) con el trazo de lucide.
 */
export const VALUE_IDS = ['compromiso', 'empatia', 'innovacion', 'exito', 'agilidad'] as const;

export type ValueId = (typeof VALUE_IDS)[number];

export const VALUE_ICONS: Record<ValueId, LucideIcon> = {
  compromiso: Rocket,
  empatia: Heart,
  innovacion: Lightbulb,
  exito: Trophy,
  agilidad: Zap,
};
