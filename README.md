# Kora 2.0

Sitio institucional de **Kora Advisory** — consultoría de procesos, digitalización e IA aplicada para PyMEs y startups.

Next.js 15 (App Router) · TypeScript estricto · Tailwind sobre un design system propio · GSAP.

## Arrancar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre en http://localhost:3000.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | Prettier |

## Estructura

```
src/
├── app/[locale]/     # una rama por idioma
├── app/api/          # BFF (Route Handlers)
├── components/       # atoms / molecules / organisms
├── constants/        # rutas, navegación, datos de marca
├── design-system/    # tokens, preset de Tailwind, CSS variables
├── features/         # home, contact
├── hooks/animations/ # reveals con GSAP
├── i18n/             # idiomas + diccionarios
├── lib/              # cliente Axios
└── utils/            # helpers
```

## Idiomas

Español (default), inglés y portugués. `/` redirige al idioma del navegador; cada idioma se sirve prerenderizado en `/es`, `/en` y `/pt`.

Para agregar un idioma: sumarlo a `src/i18n/config.ts` y crear su diccionario en `src/i18n/dictionaries/`. Está tipado contra el español, así que TypeScript marca cualquier clave sin traducir.

## Diseño

El sitio implementa el frame `TIPO 2` de la página **Webiste** del archivo de Figma `SGHzsJS717mdR0z1P5MKEF`.

Todos los valores visuales viven en `src/design-system/`. Para cambiar la paleta se editan **dos archivos**: `tokens/colors.ts` y `theme.css` — los componentes no se tocan.

## Backend

El backend (`kora_api`, NestJS) todavía no existe. Los Route Handlers de `/api/contact` y `/api/newsletter` validan y, si no hay `BACKEND_URL` configurada, responden `202` dejando el mensaje en el log del servidor. Cuando exista el backend, alcanza con setear la variable.

Ver `CLAUDE.md` para la arquitectura completa y las convenciones.
