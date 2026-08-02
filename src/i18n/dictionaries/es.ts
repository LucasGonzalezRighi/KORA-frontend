/**
 * Diccionario español — **fuente de verdad del tipo `Dictionary`**.
 *
 * Los otros idiomas se tipan contra este, así que si acá se agrega una clave,
 * TypeScript obliga a traducirla en `en` y `pt`. El copy sale del diseño de
 * Figma (frame `TIPO 2`).
 */
export const es = {
  meta: {
    tagline: 'Ingeniería · Software · AI aplicada',
    description:
      'Visión sistémica para que PyMEs y startups se modernicen con tecnología accesible y consultoría inteligente.',
  },

  nav: {
    home: 'Inicio',
    solutions: 'Soluciones',
    method: 'Nuestro método',
    blog: 'Blog',
    contact: 'Contacto',
    cta: 'Agendar consulta',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    skipToContent: 'Saltar al contenido',
    changeLanguage: 'Cambiar idioma',
    mainNavigation: 'Navegación principal',
  },

  hero: {
    eyebrow: 'Ingeniería · Software · AI aplicada',
    title:
      'Visión sistémica para que PyMEs y startups se modernicen con tecnología accesible y consultoría inteligente.',
    subtitle:
      'Diseñamos procesos replicables y fáciles de mantener, para que el sistema siga funcionando sin depender de nosotras.',
    imageAlt:
      'Figura con casco reflectante y sobretodo beige, con un tablero de datos proyectado sobre la visera.',
    ctaWhat: 'Qué hacemos',
    ctaHow: 'Cómo lo hacemos',
    ctaTalk: 'Hablemos',
  },

  whyKora: {
    eyebrow: 'Hay procesos que funcionan,\nhasta que dejan de hacerlo.',
    title: '¿Por qué las empresas eligen',
    titleHighlight: 'Kora Advisory',
    titleSuffix: '?',
    cards: {
      entendemos: {
        title: 'Entendemos cómo trabaja tu empresa',
        description: 'Mapeamos tu diaria para encontrar fricciones y oportunidades de mejora',
      },
      ordenamos: {
        title: 'Ordenamos tus procesos',
        description: 'Organizamos la información y hacemos más claros tus procesos',
      },
      digital: {
        title: 'Pasamos todo a digital',
        description: 'Consolidamos papeles y planillas en herramientas fáciles de usar',
      },
      automatizamos: {
        title: 'Automatizamos lo repetitivo',
        description: 'Usamos IA para que tu equipo se enfoque en lo que realmente importa',
      },
      visibilidad: {
        title: 'Damos visibilidad',
        description: 'Desarrollamos dashboards para que veas tu negocio en tiempo real',
      },
      autonomia: {
        title: 'Dejamos autonomía',
        description: 'Documentamos y capacitamos para que todo funcione sin nosotras',
      },
    },
  },

  solutions: {
    eyebrow: 'Nuestras soluciones',
    overline: 'Tres unidades de negocio',
    title: 'Una sola mirada de',
    titleHighlight: 'ingeniería',
    seeMore: 'Ver más',
    units: {
      consultoria: {
        tab: 'Consultoría',
        title: 'Optimizamos procesos',
        description:
          'Estructuramos tus procesos y logística para eliminar ineficiencias, simplificar tareas y ordenar el día a día de tu negocio.',
        bullets: ['Diagnóstico de procesos', 'Plan de acción', 'Seguimiento de resultados'],
      },
      automatizaciones: {
        tab: 'Automatizaciones',
        title: 'Digitalizamos tu negocio',
        description:
          'Brindamos herramientas digitales accesibles y simples para modernizar tu empresa. Implementación ágil adaptada a PyMEs y startups que quieren crecer.',
        bullets: ['Software a medida', 'Implementación simple', 'Seguimiento de resultados'],
      },
      capacitaciones: {
        tab: 'Capacitaciones',
        title: 'IA aplicada',
        description:
          'Formamos a tu equipo en Claude Code, desde lo general hasta programas diseñados a medida, con implementación incluida. Diseñamos un roadmap con cursos certificados de UTN, a precio preferencial.',
        bullets: [
          'Capacitaciones in-company: dictadas por instructor certificado de Anthropic.',
          'Capacitaciones de UTN',
        ],
      },
    },
  },

  nextStep: {
    overline: 'Tu próximo paso',
    title: 'Sistemas que trabajan solos, no dependen de vos',
    description: 'Cada proyecto empieza con una conversación.',
    cta: 'Contactanos',
  },

  method: {
    /** Describe el diagrama completo para lectores de pantalla. */
    diagramLabel:
      'Método de Kora en cuatro pasos: entendemos, priorizamos, construimos y lo dejamos funcionando.',
    steps: {
      entendemos: {
        label: 'Entendemos',
        description: 'Vemos cómo funciona hoy. Sin asumir que hay que cambiar todo.',
      },
      priorizamos: {
        label: 'Priorizamos',
        description: 'Encontramos dónde una mejora puede generar más impacto.',
      },
      construimos: {
        label: 'Construimos',
        description: 'Automatizamos, conectamos o desarrollamos lo que haga falta.',
      },
      funcionando: {
        label: 'Lo dejamos funcionando',
        description: 'Implementamos, documentamos y capacitamos a tu equipo.',
      },
    },
  },

  blog: {
    eyebrow: 'Blog',
    title: 'Ideas para modernizar tu empresa',
    cta: 'Ver todos los artículos',
    readMore: 'Leer artículo',
    posts: {
      'implementar-claude-en-tu-equipo': {
        category: 'AI en empresas',
        title: 'Cómo implementar Claude en tu equipo sin que nadie lo rechace',
        excerpt:
          'La adopción de IA no es un problema técnico, es un problema de cambio organizacional. Te contamos qué funciona y qué no en PyMEs...',
      },
      'cuellos-de-botella-en-pymes': {
        category: 'Procesos',
        title: 'Los 3 cuellos de botella más comunes en PyMEs que frenan el crecimiento',
        excerpt:
          'Después de trabajar con decenas de empresas, encontramos patrones que se repiten. Identificarlos es el primer paso para...',
      },
      'de-papel-a-la-nube': {
        category: 'Digitalización',
        title: 'De papel a la nube: una guía práctica para digitalizar tu operación',
        excerpt:
          'Migrar procesos analógicos a digital no tiene que ser traumático. Esto es lo que aprendimos acompañando empresas...',
      },
    },
  },

  newsletter: {
    title: 'Recibí nuestros artículos en tu email',
    description: 'Ideas prácticas sobre IA, procesos y digitalización. Sin spam.',
    placeholder: 'tu@empresa.com',
    submitLabel: 'Suscribirme al newsletter',
    success: 'Listo, ya estás suscripto.',
    error: 'No pudimos suscribirte. Probá de nuevo en un momento.',
  },

  faqs: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Preguntas que tenés derecho a hacer',
    items: {
      implementan: {
        question: '¿Ustedes implementan o solo nos aconsejan qué hacer?',
        answer:
          'Implementamos. El diagnóstico es el punto de partida, no el entregable: dejamos los procesos rediseñados, las herramientas funcionando y tu equipo capacitado para sostenerlas.',
      },
      tecnologica: {
        question: '¿Necesitamos ser una empresa tecnológica para trabajar con ustedes?',
        answer:
          'No. Trabajamos con empresas que hoy operan con papel, planillas y WhatsApp. Justamente ahí es donde una mirada de ingeniería genera más impacto.',
      },
      capacitacionPuntual: {
        question: '¿Y si solo necesitamos una capacitación puntual, no un proyecto completo?',
        answer:
          'También. Las capacitaciones se contratan por separado, in-company o con certificación de UTN, sin necesidad de tomar un proyecto de consultoría.',
      },
      duracion: {
        question: '¿Cuánto dura un proyecto de consultoría?',
        answer:
          'Depende del alcance, pero un proyecto típico va de 8 a 16 semanas. Definimos el plazo y los entregables en la primera conversación, antes de que firmes nada.',
      },
      rubros: {
        question: '¿Trabajan con cualquier rubro o solo con industria?',
        answer:
          'Con cualquier rubro. El método es el mismo: entender cómo trabajás hoy, encontrar dónde se traba y ordenarlo. Lo que cambia es el vocabulario, no el enfoque.',
      },
      dependencia: {
        question: 'Una vez finalizado el proyecto, ¿seguimos dependiendo de Kora?',
        answer:
          'No, y es deliberado. Documentamos todo y capacitamos a tu equipo para que el sistema siga funcionando sin nosotras. Si querés seguir acompañado, es una decisión tuya, no una necesidad.',
      },
    },
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Empecemos a trabajar',
    titleHighlight: 'juntos',
    description: 'Contanos qué necesitás y te responderemos a la brevedad.',
    fieldName: 'Nombre*',
    fieldCompany: 'Empresa*',
    fieldEmail: 'Email*',
    fieldMessage: '¿Qué está pasando?*',
    submitLabel: 'Hablemos',
    submitting: 'Enviando…',
    success: 'Mensaje enviado. Te respondemos a la brevedad.',
    error: 'No pudimos enviar el mensaje. Escribinos a info@kora.ar mientras lo revisamos.',
    validation: {
      name: 'Decinos tu nombre.',
      company: 'Decinos de qué empresa sos.',
      email: 'Revisá el email, no parece válido.',
      messageShort: 'Contanos un poco más — al menos 10 caracteres.',
      messageLong: 'Máximo 2000 caracteres.',
    },
  },
} as const;

/**
 * Ensancha los literales de `es` a `string`, conservando la estructura de
 * claves. Sin esto, tipar `en: Dictionary` exigiría que el inglés repitiera
 * *textualmente* el texto en español.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

/** Forma que deben cumplir todos los diccionarios. */
export type Dictionary = Widen<typeof es>;
