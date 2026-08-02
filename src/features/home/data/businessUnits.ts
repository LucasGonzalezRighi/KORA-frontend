import { SOLUTION_SLUGS, type SolutionSlug } from '@/constants/routes.app';

/**
 * Las tres unidades de negocio, en el orden del diseño.
 *
 * Los ids coinciden con los slugs de ruta y con las claves del diccionario:
 * un solo identificador para las tres cosas.
 */
export const BUSINESS_UNIT_IDS = SOLUTION_SLUGS;

export type BusinessUnitId = SolutionSlug;
