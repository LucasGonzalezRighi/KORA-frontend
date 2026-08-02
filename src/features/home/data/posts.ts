/**
 * Vista previa de los últimos artículos.
 *
 * Fixture: acá vive solo lo que no se traduce (slug, portada, fecha). Categoría,
 * título y extracto salen del diccionario. Cuando exista `kora_api`, esto se
 * reemplaza por una llamada al BFF (`ROUTES_API.posts`).
 */
export const POST_SLUGS = [
  'implementar-claude-en-tu-equipo',
  'cuellos-de-botella-en-pymes',
  'de-papel-a-la-nube',
] as const;

export type PostSlug = (typeof POST_SLUGS)[number];

export type PostMeta = {
  /** Fecha ISO — se formatea según el idioma, nunca se guarda ya formateada. */
  readonly publishedAt: string;
  readonly cover: string;
};

export const POST_META: Record<PostSlug, PostMeta> = {
  'implementar-claude-en-tu-equipo': {
    publishedAt: '2026-05-10',
    cover: '/images/blog-cover.png',
  },
  'cuellos-de-botella-en-pymes': {
    publishedAt: '2026-05-10',
    cover: '/images/blog-cover.png',
  },
  'de-papel-a-la-nube': {
    publishedAt: '2026-05-10',
    cover: '/images/blog-cover.png',
  },
};
