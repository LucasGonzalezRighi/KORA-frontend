/**
 * URLs del backend NestJS (`kora_api`).
 *
 * SOLO se importan dentro de Route Handlers (`src/app/api/**`). Si este archivo
 * aparece importado desde un componente, es un bug: el navegador nunca habla
 * directo con el backend.
 */

export const ROUTES_BACKEND = {
  contact: '/contact',
  newsletter: '/newsletter/subscribe',
  posts: '/posts',
  post: (slug: string) => `/posts/${slug}`,
} as const;
