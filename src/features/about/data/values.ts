import { Heart, Lightbulb, Trophy, Zap } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

import { RocketIcon } from '../components/Values/RocketIcon';

/**
 * Las cinco mini cards de "Lo que nos mueve". Los iconos siguen los del
 * diseño: cohete (trazo propio), corazón, lamparita, trofeo y rayo.
 */
export const VALUE_IDS = ['compromiso', 'empatia', 'innovacion', 'exito', 'agilidad'] as const;

export type ValueId = (typeof VALUE_IDS)[number];

/** Lo que tienen en común un icono de lucide y uno propio: props de SVG. */
export type ValueIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const VALUE_ICONS: Record<ValueId, ValueIcon> = {
  compromiso: RocketIcon,
  empatia: Heart,
  innovacion: Lightbulb,
  exito: Trophy,
  agilidad: Zap,
};
