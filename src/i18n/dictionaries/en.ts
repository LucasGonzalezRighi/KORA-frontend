import type { Dictionary } from './es';

/** Diccionario inglés. Tipado contra `es`: si falta una clave, no compila. */
export const en: Dictionary = {
  meta: {
    tagline: 'Engineering · Software · Applied AI',
    description:
      'A systems view so SMEs and startups can modernise with accessible technology and intelligent consulting.',
  },

  nav: {
    home: 'Home',
    solutions: 'Solutions',
    method: 'Our method',
    blog: 'Blog',
    contact: 'Contact',
    cta: 'Book a consultation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
    changeLanguage: 'Change language',
    mainNavigation: 'Main navigation',
  },

  hero: {
    eyebrow: 'Engineering · Software · Applied AI',
    title:
      'A systems view so SMEs and startups can modernise with accessible technology and intelligent consulting.',
    subtitle:
      'We design repeatable processes that are easy to maintain, so the system keeps running without depending on us.',
    imageAlt:
      'Figure wearing a reflective helmet and beige overcoat, with a data dashboard projected across the visor.',
    ctaWhat: 'What we do',
    ctaHow: 'How we do it',
    ctaTalk: "Let's talk",
  },

  whyKora: {
    eyebrow: 'Some processes work,\nuntil they stop working.',
    title: 'Why companies choose',
    titleHighlight: 'Kora Advisory',
    titleSuffix: '?',
    cards: {
      entendemos: {
        title: 'We learn how your company works',
        description: 'We map your day-to-day to find friction and room to improve',
      },
      ordenamos: {
        title: 'We put your processes in order',
        description: 'We organise the information and make your processes clearer',
      },
      digital: {
        title: 'We move everything to digital',
        description: 'We consolidate paperwork and spreadsheets into tools that are easy to use',
      },
      automatizamos: {
        title: 'We automate the repetitive',
        description: 'We use AI so your team can focus on what actually matters',
      },
      visibilidad: {
        title: 'We give you visibility',
        description: 'We build dashboards so you can see your business in real time',
      },
      autonomia: {
        title: 'We leave you autonomous',
        description: 'We document and train your team so everything works without us',
      },
    },
  },

  solutions: {
    eyebrow: 'Our solutions',
    overline: 'Three business units',
    title: 'A single lens of',
    titleHighlight: 'engineering',
    seeMore: 'Learn more',
    units: {
      consultoria: {
        tab: 'Consulting',
        title: 'We optimise processes',
        description:
          'We structure your processes and logistics to remove inefficiencies, simplify tasks and bring order to your day-to-day.',
        bullets: ['Process diagnosis', 'Action plan', 'Results tracking'],
      },
      automatizaciones: {
        tab: 'Automation',
        title: 'We digitalise your business',
        description:
          'We provide accessible, simple digital tools to modernise your company. Agile implementation adapted to SMEs and startups that want to grow.',
        bullets: ['Custom software', 'Simple implementation', 'Results tracking'],
      },
      capacitaciones: {
        tab: 'Training',
        title: 'Applied AI',
        description:
          'We train your team on Claude Code, from the fundamentals through bespoke programmes, implementation included. We design a roadmap with UTN-certified courses at preferential pricing.',
        bullets: [
          'In-company training: delivered by an Anthropic-certified instructor.',
          'UTN-certified training',
        ],
      },
    },
  },

  nextStep: {
    overline: 'Your next step',
    title: 'Systems that run on their own, not on you',
    description: 'Every project starts with a conversation.',
    cta: 'Get in touch',
  },

  method: {
    diagramLabel:
      "Kora's four-step method: we understand, we prioritise, we build and we leave it running.",
    steps: {
      entendemos: {
        label: 'We understand',
        description: 'We look at how it works today. Without assuming everything must change.',
      },
      priorizamos: {
        label: 'We prioritise',
        description: 'We find where one improvement can make the biggest difference.',
      },
      construimos: {
        label: 'We build',
        description: 'We automate, connect or develop whatever is needed.',
      },
      funcionando: {
        label: 'We leave it running',
        description: 'We implement, document and train your team.',
      },
    },
  },

  blog: {
    eyebrow: 'Blog',
    title: 'Ideas to modernise your company',
    cta: 'See all articles',
    readMore: 'Read article',
    posts: {
      'implementar-claude-en-tu-equipo': {
        category: 'AI in business',
        title: 'How to roll out Claude in your team without anyone pushing back',
        excerpt:
          'AI adoption is not a technical problem, it is an organisational change problem. Here is what works and what does not in SMEs...',
      },
      'cuellos-de-botella-en-pymes': {
        category: 'Processes',
        title: 'The 3 most common bottlenecks holding SMEs back',
        excerpt:
          'After working with dozens of companies, we found patterns that repeat. Spotting them is the first step towards...',
      },
      'de-papel-a-la-nube': {
        category: 'Digitalisation',
        title: 'From paper to the cloud: a practical guide to digitalising your operation',
        excerpt:
          'Migrating analogue processes to digital does not have to hurt. This is what we learned working alongside companies...',
      },
    },
  },

  newsletter: {
    title: 'Get our articles in your inbox',
    description: 'Practical ideas on AI, processes and digitalisation. No spam.',
    placeholder: 'you@company.com',
    submitLabel: 'Subscribe to the newsletter',
    success: 'Done, you are subscribed.',
    error: 'We could not subscribe you. Please try again in a moment.',
  },

  faqs: {
    eyebrow: 'Frequently asked',
    title: 'Questions you have every right to ask',
    items: {
      implementan: {
        question: 'Do you implement, or do you only advise us on what to do?',
        answer:
          'We implement. The diagnosis is the starting point, not the deliverable: we leave the processes redesigned, the tools running and your team trained to sustain them.',
      },
      tecnologica: {
        question: 'Do we need to be a tech company to work with you?',
        answer:
          'No. We work with companies that today run on paper, spreadsheets and WhatsApp. That is exactly where an engineering lens makes the biggest difference.',
      },
      capacitacionPuntual: {
        question: 'What if we only need one specific training, not a full project?',
        answer:
          'That works too. Training is contracted separately, in-company or with UTN certification, with no need to take on a consulting project.',
      },
      duracion: {
        question: 'How long does a consulting project take?',
        answer:
          'It depends on scope, but a typical project runs 8 to 16 weeks. We agree the timeline and deliverables in the first conversation, before you sign anything.',
      },
      rubros: {
        question: 'Do you work with any industry, or only with manufacturing?',
        answer:
          'Any industry. The method is the same: understand how you work today, find where it jams and put it in order. The vocabulary changes, the approach does not.',
      },
      dependencia: {
        question: 'Once the project ends, do we still depend on Kora?',
        answer:
          'No, and that is deliberate. We document everything and train your team so the system keeps running without us. Staying with us afterwards is your choice, not a requirement.',
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's start working",
    titleHighlight: 'together',
    description: 'Tell us what you need and we will get back to you shortly.',
    fieldName: 'Name*',
    fieldCompany: 'Company*',
    fieldEmail: 'Email*',
    fieldMessage: 'What is going on?*',
    submitLabel: "Let's talk",
    submitting: 'Sending…',
    success: 'Message sent. We will get back to you shortly.',
    error: 'We could not send your message. Email us at info@kora.ar while we look into it.',
    validation: {
      name: 'Please tell us your name.',
      company: 'Please tell us which company you are from.',
      email: 'That email does not look valid.',
      messageShort: 'Tell us a bit more — at least 10 characters.',
      messageLong: 'Maximum 2000 characters.',
    },
  },
};
