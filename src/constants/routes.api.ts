/**
 * URLs del BFF (Route Handlers en `src/app/api/**`).
 * Es lo único que el navegador tiene permitido llamar.
 */

export const ROUTES_API = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  posts: '/api/posts',
  post: (slug: string) => `/api/posts/${slug}`,
} as const;
