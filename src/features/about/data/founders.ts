import { CONTACT_INFO } from '@/constants/site';

/**
 * Las tres fundadoras, en el orden del diseño.
 *
 * Nombres, roles y universidades se traducen y viven en el diccionario. Acá
 * quedan la foto y el perfil.
 *
 * Los perfiles personales de LinkedIn todavía no están definidos: hasta que
 * lleguen, los tres apuntan al perfil de la empresa para no dejar links rotos.
 */
export const FOUNDER_IDS = ['clara', 'lucia', 'luciana'] as const;

export type FounderId = (typeof FOUNDER_IDS)[number];

export const FOUNDERS: Record<FounderId, { photo: string; linkedinUrl: string }> = {
  clara: { photo: '/images/team/clara.png', linkedinUrl: CONTACT_INFO.linkedinUrl },
  lucia: { photo: '/images/team/lucia.png', linkedinUrl: CONTACT_INFO.linkedinUrl },
  luciana: { photo: '/images/team/luciana.png', linkedinUrl: CONTACT_INFO.linkedinUrl },
};

/** Proporción de la foto en el diseño: 273 × 298. */
export const FOUNDER_PHOTO = { width: 273, height: 298 } as const;
