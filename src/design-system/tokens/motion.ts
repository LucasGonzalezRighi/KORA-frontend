/**
 * Movimiento. Consumido por los hooks de GSAP en `src/hooks/animations/`
 * y por las transiciones de Tailwind.
 */

export const durations = {
  instant: 0.12,
  fast: 0.24,
  base: 0.4,
  slow: 0.7,
  reveal: 0.9,
} as const;

export const easings = {
  /** Salida suave para reveals de scroll. */
  outExpoSoft: 'expo.out',
  outQuart: 'power2.out',
  inOut: 'power2.inOut',
  /** Equivalentes en CSS, para transiciones de Tailwind. */
  cssOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cssInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

/** Retrasos escalonados para listas que aparecen de a una. */
export const staggers = {
  tight: 0.06,
  base: 0.09,
  loose: 0.14,
} as const;

/** Distancia que recorre un elemento al aparecer desde abajo. */
export const revealOffset = 24;

/**
 * Qué queda cuando el usuario pide menos movimiento.
 *
 * `prefers-reduced-motion` significa **reducir**, no eliminar. Apagar todo deja
 * el sitio muerto para quien tenga esa preferencia activa — y en Windows se
 * activa sola con el ahorro de batería, así que es mucha más gente de la que
 * uno supone.
 *
 * Lo que marea es el *desplazamiento*: parallax, cosas que entran volando,
 * secciones que se fijan. Un fundido de opacidad no marea a nadie. Así que en
 * modo reducido se conservan los fundidos, sin movimiento y más cortos.
 */
export const reducedMotion = {
  /** Duración de los fundidos en modo reducido. */
  duration: 0.28,
  /** Escalonado mínimo, para que no aparezca todo de golpe. */
  stagger: 0.04,
} as const;

/**
 * Cuánto se desplaza cada capa de parallax, en px, a lo largo de todo su
 * recorrido de scroll. Positivo = baja más lento que la página.
 */
export const parallaxDepth = {
  subtle: 40,
  medium: 90,
  strong: 160,
} as const;

/**
 * Escala que gana la imagen del hero mientras se scrollea sobre ella.
 *
 * Tiene que dar más margen que el desplazamiento de su capa: con 1.15 sobre
 * 897px de alto sobran ~67px por lado, y la capa `subtle` se mueve 40px. Si se
 * sube el desplazamiento, hay que subir esto o se ve el borde de la imagen.
 */
export const heroZoom = 1.15;

/**
 * Coreografía de las transiciones. Estos son los números que separan una
 * animación que se siente cara de una que se siente hecha a las apuradas.
 *
 * Las tres reglas que codifican:
 *
 * 1. **Las cosas se van más rápido de lo que llegan.** Una salida lenta se lee
 *    como lag; una entrada lenta se lee como peso. De ahí `exit < enter`.
 * 2. **Las transiciones se solapan.** Lo que entra arranca antes de que termine
 *    de irse lo anterior: sin `overlap` hay un hueco muerto que se nota.
 * 3. **Hay tiempo muerto a propósito.** `dwell` es la porción del tramo donde
 *    nada se mueve y el contenido se puede leer. Sin esto todo está siempre en
 *    movimiento y no se entiende nada.
 */
export const choreography = {
  /** Duración de una entrada. */
  enter: 0.75,
  /** Duración de una salida. Deliberadamente menos de la mitad. */
  exit: 0.32,
  /** Cuánto se adelanta la entrada respecto del fin de la salida. */
  overlap: 0.22,
  /** Proporción del tramo en la que el paso queda quieto y legible. */
  dwell: 0.55,
  /**
   * Suavizado del scrub, en segundos de "alcance".
   *
   * `scrub: true` ata la animación 1:1 al scroll y se siente rígida y nerviosa.
   * Un valor chico hace que la animación *persiga* al scroll con un poco de
   * inercia. Es el cambio más barato que separa lo amateur de lo profesional.
   */
  scrubSmoothing: 0.8,
} as const;

/**
 * Atracción magnética de los CTA principales.
 *
 * `strength` es la fracción de la distancia al cursor que el botón se deja
 * arrastrar. Por encima de ~0.2 el botón "persigue" al cursor y se siente
 * agresivo; el efecto funciona cuando apenas se insinúa.
 *
 * `maxOffset` es un tope duro en px: aunque se suba `strength` o `radius`, el
 * botón nunca se despega tanto como para desalinearse de su contexto.
 */
export const magnetic = {
  strength: 0.14,
  radius: 70,
  maxOffset: 9,
} as const;

/** Easings de la coreografía: entrar decidido, salir rápido. */
export const choreographyEase = {
  enter: 'power3.out',
  exit: 'power2.in',
} as const;
