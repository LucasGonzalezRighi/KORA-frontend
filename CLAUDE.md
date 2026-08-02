# CLAUDE.md — Kora 2.0

Guía para Claude Code (claude.ai/code) al trabajar en este repositorio.

---

## 1. Qué es esto

**Kora 2.0** es el sitio institucional de **Kora Advisory**, reescrito desde cero sobre el diseño aprobado en Figma. Es un proyecto **separado** de `kora_App_Web` (el sitio anterior, que además tenía plataforma de cursos).

Diferencias de posicionamiento respecto de `kora_App_Web`:

| | `kora_App_Web` | **`kora2.0`** |
|---|---|---|
| Foco | Consultoría **+** plataforma de cursos (catálogo, player, pagos) | Consultoría, landing única |
| Nav | Capacitaciones, Consultoría, Software, Nosotras, Contacto | Inicio, Soluciones, Nuestro método, Blog, Contacto |
| Estructura | Multi-página con auth y checkout | Landing + Blog |
| Pagos | MercadoPago + Stripe | **Ninguno** — el funnel es el formulario de contacto |

Las capacitaciones no desaparecen: pasan a ser **una de las tres unidades de negocio** (Consultoría / Automatizaciones / Capacitaciones), no una plataforma aparte.

---

## 2. Fuente de diseño

Archivo de Figma **`SGHzsJS717mdR0z1P5MKEF`** ("Kora."), página **Webiste**, frame **`TIPO 2`** (`1:1306`, 1440×7983).

Se accede vía el MCP oficial de Figma. Nodos de referencia:

| Sección | Nodo |
|---|---|
| Navbar | `173:89` |
| Hero (texto) | `173:92` |
| Hero (imagen) | `1:1311` |
| Cards de valor | `197:53` (card individual: `126:269`) |
| Unidades de negocio | `194:316` |
| Banner del método | `63:1098` |
| Blog | `197:55` |
| Newsletter | `196:512` |
| FAQs | `196:476` |
| Contacto | `197:51` |

**Regla:** el diseño es la fuente de **copys, paleta y comportamiento**. La estructura del código la define este documento, no el árbol de capas de Figma.

---

## 3. Stack

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Lenguaje | **TypeScript** estricto (`strict` + `noUncheckedIndexedAccess`) |
| Estilos | **Tailwind CSS** alimentado por el design system |
| HTTP | **Axios** — nunca `fetch` suelto en componentes |
| Estado global | **React Context** (todavía no hace falta ninguno) |
| Animaciones | **GSAP** + `@gsap/react` |
| Iconos | **lucide-react** |
| Formularios | **react-hook-form** + **zod** |
| Toasts | **sonner** |
| Backend | **NestJS** en repo aparte (`kora_api`) — todavía no existe |

Decisiones explícitas: App Router (no Pages), Axios (no fetch), Context (no Redux/Zustand/Tanstack Query), GSAP (no Framer Motion).

---

## 4. Arquitectura

### 4.1 Flujo de datos (regla dura)

```
Navegador → Axios → Route Handlers en /app/api/** (BFF) → Axios → NestJS → PostgreSQL
```

El navegador **nunca** llama directo al backend. `src/constants/routes.backend.ts` solo puede importarse desde `src/app/api/**`; si aparece en un componente, es un bug.

### 4.2 Estructura

```
src/
├── app/
│   ├── [locale]/         # una rama por idioma: layout + page
│   ├── api/              # BFF (contact, newsletter) — fuera del prefijo de idioma
│   └── globals.css
├── components/           # UI reutilizable (Atomic Design)
│   ├── atoms/            # Button, Container, Section, Eyebrow, Overline, SquareMark, Logo, UnderlineField, RevealText
│   ├── molecules/        # SectionHeading, FaqItem, BulletItem
│   └── organisms/        # Nav/, ValueCard, BlogCard, BusinessUnitBlock, FaqAccordion, NewsletterPanel
├── constants/            # routes.app, routes.api, routes.backend, navigation, site
├── design-system/        # tokens + preset de Tailwind + theme.css
├── features/             # lógica por dominio
│   ├── home/             # la landing: secciones + data estructural
│   └── contact/          # formulario, schema zod, service
├── hooks/animations/     # sistema GSAP: reveal, texto, parallax, secuencia
├── i18n/                 # config de idiomas + diccionarios
├── lib/                  # cliente Axios
├── middleware.ts         # redirige al idioma correspondiente
└── utils/                # cn()
```

**Regla de import entre features:** solo a través del `index.ts` del feature.

El organism `Nav/` está partido en piezas: `Nav.tsx` (orquesta), `NavDropdown`, `LocaleSwitcher`, `MobileMenu`, `useNav` (todo el estado) y `Nav.styles.ts` (la clase compartida de los links).

### 4.3 Presentacionales vs. lógica

Los componentes de `src/components/` son presentacionales: reciben props y renderizan. La lógica (estado, llamadas al BFF) vive en los features o en hooks (`useNav`, `useScrollReveal`).

### 4.4 Animaciones — GSAP

GSAP es la **única** librería de animación. Todo vive en `src/hooks/animations/` y se consume por hooks o por atributos, nunca inline en el JSX.

| Pieza | Qué hace | Cómo se usa |
|---|---|---|
| `useScrollReveal` | Revela hijos escalonados al entrar (play-once) | `ref` en el contenedor + clase `kora-reveal` en los hijos |
| `useTextReveal` / `<RevealText>` | Titular línea por línea desde detrás de una máscara | `<RevealText as="h2">` |
| `useParallax` | Capas a distinta velocidad, atadas al scroll | `data-parallax="subtle\|medium\|strong"`, opcional `data-parallax-zoom` |
| `useStickySequence` | Pasos que se cruzan con la sección fija | `ref` en el contenedor + `data-sequence-step` en cada paso |

Reglas que sostienen esto:

- **`gsap.matchMedia()` para todo.** Es lo que implementa "mobile reducido" y `prefers-reduced-motion`: GSAP crea y revierte solo mientras la condición se cumple. Nada de leer `window.innerWidth` a mano.
- **Los plugins se registran en `hooks/animations/gsap.ts`**, no en cada archivo. Importar GSAP desde ahí.
- **SplitText espera a `document.fonts.ready`.** Satoshi viene de un CDN; partir líneas con la fuente de fallback da cortes en lugares equivocados. `autoSplit: true` además re-parte al cambiar el ancho, lo cual importa porque el mismo titular tiene largos distintos en es/en/pt.
- **El "pin" es CSS `sticky`, no `ScrollTrigger.pin`.** `pin` inyecta un `pin-spacer` que reescribe el layout y pelea con los anchors. `sticky` no toca el DOM.
- **Texto sobre el fold usa `immediate`.** El reveal arranca con las líneas ocultas detrás de la máscara: atar el `h1` del hero a un ScrollTrigger significa que cualquier falla del trigger lo deja invisible.
- **Los valores viven en `tokens/motion.ts`** (duraciones, easings, staggers, `parallaxDepth`, `heroZoom`). Ninguna duración ni distancia hardcodeada en un hook.
- **`heroZoom` tiene que dar más margen que el desplazamiento de su capa**, o se ve el borde de la imagen. Está documentado en el token.

### 4.5 Sin strings mágicos

Rutas → `constants/routes.*.ts`. Datos de la marca → `constants/site.ts`. **Todo texto visible → los diccionarios de `src/i18n/dictionaries/`.** Ningún path literal en un `<Link>` ni ningún texto de UI inline en JSX.

---

### 4.6 Internacionalización

Tres idiomas: **es** (default), **en**, **pt**. Patrón nativo de App Router, sin dependencias extra.

- `src/i18n/config.ts` — lista de idiomas, default, `lang` de HTML. Agregar un idioma es sumarlo acá y crear su diccionario; rutas, selector y `generateStaticParams` se derivan solos.
- `src/i18n/dictionaries/es.ts` es la **fuente de verdad del tipo**. `en` y `pt` se tipan contra él: si falta una clave, no compila.
- `src/middleware.ts` redirige cualquier ruta sin prefijo al idioma del `Accept-Language`, o al default.
- Cada idioma se **prerenderiza estático** (`/es`, `/en`, `/pt`) vía `generateStaticParams`.

Los Server Components leen el diccionario con `getDictionary(locale)` y pasan **solo la porción que corresponde** a cada sección (`dict.hero`, `dict.faqs`, …). No hay Context de i18n: el texto baja por props, que es lo que permite prerenderizar.

Las rutas de `ROUTES_APP` son funciones que reciben el `locale`, porque toda URL lleva prefijo de idioma.

> Los slugs (`consultoria`, `automatizaciones`, `capacitaciones`, y los del blog) **no** se traducen: son identificadores, y sirven de clave tanto en el diccionario como en la ruta.

---

## 5. Design system

Vive en `src/design-system/` y es la **única** fuente de valores visuales. Cero hexcodes en componentes.

Dos capas: **primitivos** (`colorPrimitives`, `radii`) y **semánticos** (`semanticColors`, `semanticRadii`). Los componentes consumen semánticos.

Tres formas de consumirlo: clases de Tailwind (preferido), objeto `tokens`, CSS variables.

Para repintar el sitio se editan **dos archivos**: `tokens/colors.ts` y `theme.css`.

Detalle en `src/design-system/README.md`.

### Tipografía

**Satoshi** (display/cuerpo) e **IBM Plex Mono** (eyebrows) se sirven desde Fontshare vía `<link>` en `app/layout.tsx`. **Pendiente:** auto-hospedarlas y pasar a `next/font/local`.

---

## 6. Estado de implementación

| Sección | Estado |
|---|---|
| Hero | ✅ |
| ¿Por qué Kora? (6 cards) | ✅ |
| Soluciones (3 unidades de negocio) | ✅ |
| Tu próximo paso (CTA) | ✅ |
| Método (banner) | ✅ imagen exportada |
| Blog (3 cards) + Newsletter | ✅ con fixture |
| FAQs | ✅ |
| Contacto (form + datos) | ✅ |
| Nav (desktop + mobile) + selector de idioma | ✅ |
| i18n es / en / pt | ✅ prerenderizado por idioma |
| BFF `/api/contact`, `/api/newsletter` | ✅ degradan a 202 sin backend |
| Páginas `/[locale]/blog`, `/[locale]/soluciones/*` | ⛔ **no existen** — el nav enlaza a rutas sin página |

### Deuda conocida

- **Traducciones en/pt**: hechas por Claude, no revisadas por un hablante nativo ni por Kora. Revisar antes de publicar.
- **Respuestas de las FAQs**: redacción propia, el diseño solo trae las preguntas. Confirmar con Kora.
- **Iconos de las cards de valor**: se usan equivalentes de `lucide-react`; los originales son de un design kit de Figma.
- **Banner del método**: es una imagen, y por lo tanto **no se traduce**. Si se necesita responsive real, texto seleccionable o multilenguaje, hay que reconstruirlo en HTML.
- **Blog**: los artículos son un fixture. Reemplazar por una llamada al BFF (`ROUTES_API.posts`) cuando exista `kora_api`.
- **Nav sobre el hero**: en Figma va dentro de la tarjeta de imagen; acá es `fixed` transparente que pasa a sólido al scrollear.

### Trampas ya pisadas (no repetir)

- **`tailwind-merge` no conoce las escalas custom.** Sin registrarlas en `utils/cn.ts`, clasifica `text-fluid-*` como *color* y las borra en cuanto sigue un `text-heading`. Ya está resuelto — si se agrega un tamaño nuevo al preset, hay que sumarlo también al `classGroups` de `cn.ts`.
- **El orden importa dentro de `cn()`**: un `text-{size}` pisa cualquier `leading-*` anterior. El line-height va *después* del tamaño.
- **No correr `npm run build` con el dev server levantado**: se pisan los artefactos de `.next` y el dev empieza a tirar errores de React Client Manifest. Parar el dev primero.

---

## 7. Convenciones

### 7.1 Commits — Conventional Commits en español

Tipos: `agregar`, `corregir`, `refactorizar`, `estilo`, `documentar`, `probar`, `tarea`, `eliminar`.

```
<tipo>(<alcance>): <descripción en imperativo, minúsculas>
```

Ejemplo: `agregar(home): implementar seccion de faqs con acordeon`

### 7.2 TypeScript

`strict: true`. Nada de `any` salvo en límites del sistema, con un comentario `// why:`. Tipos de dominio con sustantivo (`BusinessUnit`, `PostPreview`); inputs con sufijo (`ContactInput`).

### 7.3 Clean code

Una función, una cosa. Nombres autoexplicativos. Sin código muerto ni `console.log` sueltos (los `console.warn` del BFF son logging deliberado).

---

## 8. Comandos

```bash
npm install       # instalación
npm run dev       # desarrollo
npm run build     # build de producción
npm run start     # servir el build
npm run lint      # eslint
npm run type-check # tsc --noEmit
npm run format    # prettier
```

Variables de entorno — copiar `.env.example` a `.env.local`:

```
NEXT_PUBLIC_APP_URL=
BACKEND_URL=       # solo server-side
BACKEND_TOKEN=
```

Nada con prefijo `NEXT_PUBLIC_` puede contener secretos: se inlinea al bundle del cliente.

---

## 9. Cómo evolucionar este documento

Cuando una decisión cambie, editar la sección correspondiente — no agregar un addendum al final. Si el cambio invalida una convención previa, dejar un commit `documentar(claude): ...` explicando el porqué.
