import { Clock, Globe, LayoutGrid, Shuffle, Users, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Las seis cards de "¿Por qué eligen Kora?".
 *
 * Acá vive solo lo que **no** se traduce: el orden y el icono. Los textos salen
 * del diccionario del idioma activo, indexados por estos mismos ids.
 */
export const VALUE_CARD_IDS = [
  'entendemos',
  'ordenamos',
  'digital',
  'automatizamos',
  'visibilidad',
  'autonomia',
] as const;

export type ValueCardId = (typeof VALUE_CARD_IDS)[number];

export const VALUE_CARD_ICONS: Record<ValueCardId, LucideIcon> = {
  entendemos: Globe,
  ordenamos: Clock,
  digital: Users,
  automatizamos: Shuffle,
  visibilidad: Workflow,
  autonomia: LayoutGrid,
};
