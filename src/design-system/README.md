# Design system — Kora 2.0

Única fuente de valores de diseño del repo. Cero hexcodes, cero `100px`, cero `Satoshi` sueltos en componentes.

Los valores salen del archivo de Figma `SGHzsJS717mdR0z1P5MKEF`, página **Webiste**, frame `TIPO 2` (`1:1306`).

## Dos capas

| Capa | Dónde | Cuándo cambia |
|---|---|---|
| **Primitivos** | `tokens/colors.ts → colorPrimitives`, `tokens/radii.ts → radii` | Solo si se redefine la marca |
| **Semánticos** | `semanticColors`, `semanticRadii`, `semanticSpacing` | Cuando cambia el *uso* de un valor |

Los componentes consumen **semánticos**. Si un componente importa un primitivo, es un bug.

## Tres formas de consumirlo

1. **Clases de Tailwind** (preferido) — `bg-canvas`, `text-heading`, `border-card`, `rounded-card`, `shadow-card-rest`, `font-mono`, `max-w-container`.
2. **Objeto `tokens`** — `import { tokens } from '@/design-system'` para estilos inline y para los hooks de GSAP.
3. **CSS variables** — `var(--kora-accent)`, `var(--kora-glow-hero)`, definidas en `theme.css`.

## Cómo cambiar la paleta

Se editan **dos archivos**: `tokens/colors.ts` y `theme.css`. Nada más.

## Tipografía

| Familia | Uso | Origen |
|---|---|---|
| **Satoshi** | Titulares y cuerpo | Fontshare (CDN, `<link>` en `src/app/layout.tsx`) |
| **IBM Plex Mono** | Eyebrows y etiquetas de sección | `next/font/google` — auto-hospedada, expone `--font-plex-mono` |

> **Ojo:** IBM Plex Mono **no** está en Fontshare. Pedirla ahí devuelve `200` pero sin `@font-face`, así que la fuente cae en silencio a la monoespaciada del sistema. Por eso va por `next/font/google`.

> **Pendiente:** Satoshi todavía depende del CDN de Fontshare. Para producción conviene bajarla a `public/fonts/` y pasar a `next/font/local`, eliminando el request a un tercero y el FOUT.
