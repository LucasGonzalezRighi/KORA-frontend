import type { Dictionary } from './es';

/** Diccionario portugués (pt-BR). Tipado contra `es`: si falta una clave, no compila. */
export const pt: Dictionary = {
  meta: {
    tagline: 'Engenharia · Software · IA aplicada',
    description:
      'Visão sistêmica para que PMEs e startups se modernizem com tecnologia acessível e consultoria inteligente.',
  },

  nav: {
    home: 'Início',
    solutions: 'Soluções',
    method: 'Nosso método',
    blog: 'Blog',
    contact: 'Contato',
    cta: 'Agendar consultoria',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    skipToContent: 'Pular para o conteúdo',
    changeLanguage: 'Mudar idioma',
    mainNavigation: 'Navegação principal',
  },

  hero: {
    eyebrow: 'Engenharia · Software · IA aplicada',
    title:
      'Visão sistêmica para que PMEs e startups se modernizem com tecnologia acessível e consultoria inteligente.',
    subtitle:
      'Desenhamos processos replicáveis e fáceis de manter, para que o sistema continue funcionando sem depender de nós.',
    imageAlt:
      'Figura com capacete reflexivo e sobretudo bege, com um painel de dados projetado sobre a viseira.',
    ctaWhat: 'O que fazemos',
    ctaHow: 'Como fazemos',
    ctaTalk: 'Vamos conversar',
  },

  whyKora: {
    eyebrow: 'Há processos que funcionam,\naté que deixam de funcionar.',
    title: 'Por que as empresas escolhem',
    titleHighlight: 'Kora Advisory',
    titleSuffix: '?',
    cards: {
      entendemos: {
        title: 'Entendemos como sua empresa trabalha',
        description: 'Mapeamos o dia a dia para encontrar atritos e oportunidades de melhoria',
      },
      ordenamos: {
        title: 'Organizamos seus processos',
        description: 'Organizamos a informação e deixamos seus processos mais claros',
      },
      digital: {
        title: 'Levamos tudo para o digital',
        description: 'Consolidamos papéis e planilhas em ferramentas fáceis de usar',
      },
      automatizamos: {
        title: 'Automatizamos o repetitivo',
        description: 'Usamos IA para que seu time foque no que realmente importa',
      },
      visibilidad: {
        title: 'Damos visibilidade',
        description: 'Desenvolvemos dashboards para você ver seu negócio em tempo real',
      },
      autonomia: {
        title: 'Deixamos autonomia',
        description: 'Documentamos e capacitamos para que tudo funcione sem nós',
      },
    },
  },

  solutions: {
    eyebrow: 'Nossas soluções',
    overline: 'Três unidades de negócio',
    title: 'Um único olhar de',
    titleHighlight: 'engenharia',
    seeMore: 'Ver mais',
    units: {
      consultoria: {
        tab: 'Consultoria',
        title: 'Otimizamos processos',
        description:
          'Estruturamos seus processos e logística para eliminar ineficiências, simplificar tarefas e organizar o dia a dia do seu negócio.',
        bullets: ['Diagnóstico de processos', 'Plano de ação', 'Acompanhamento de resultados'],
      },
      automatizaciones: {
        tab: 'Automações',
        title: 'Digitalizamos seu negócio',
        description:
          'Oferecemos ferramentas digitais acessíveis e simples para modernizar sua empresa. Implementação ágil adaptada a PMEs e startups que querem crescer.',
        bullets: ['Software sob medida', 'Implementação simples', 'Acompanhamento de resultados'],
      },
      capacitaciones: {
        tab: 'Capacitações',
        title: 'IA aplicada',
        description:
          'Formamos seu time em Claude Code, do geral até programas sob medida, com implementação incluída. Desenhamos um roadmap com cursos certificados da UTN, a preço preferencial.',
        bullets: [
          'Capacitações in-company: ministradas por instrutor certificado pela Anthropic.',
          'Capacitações da UTN',
        ],
      },
    },
  },

  nextStep: {
    overline: 'Seu próximo passo',
    title: 'Sistemas que trabalham sozinhos, não dependem de você',
    description: 'Todo projeto começa com uma conversa.',
    cta: 'Fale com a gente',
  },

  method: {
    diagramLabel:
      'Método da Kora em quatro passos: entendemos, priorizamos, construímos e deixamos funcionando.',
    steps: {
      entendemos: {
        label: 'Entendemos',
        description: 'Vemos como funciona hoje. Sem supor que tudo precisa mudar.',
      },
      priorizamos: {
        label: 'Priorizamos',
        description: 'Encontramos onde uma melhoria pode gerar mais impacto.',
      },
      construimos: {
        label: 'Construímos',
        description: 'Automatizamos, conectamos ou desenvolvemos o que for preciso.',
      },
      funcionando: {
        label: 'Deixamos funcionando',
        description: 'Implementamos, documentamos e capacitamos seu time.',
      },
    },
  },

  blog: {
    eyebrow: 'Blog',
    title: 'Ideias para modernizar sua empresa',
    cta: 'Ver todos os artigos',
    readMore: 'Ler artigo',
    posts: {
      'implementar-claude-en-tu-equipo': {
        category: 'IA nas empresas',
        title: 'Como implementar o Claude no seu time sem que ninguém rejeite',
        excerpt:
          'A adoção de IA não é um problema técnico, é um problema de mudança organizacional. Contamos o que funciona e o que não funciona em PMEs...',
      },
      'cuellos-de-botella-en-pymes': {
        category: 'Processos',
        title: 'Os 3 gargalos mais comuns que freiam o crescimento das PMEs',
        excerpt:
          'Depois de trabalhar com dezenas de empresas, encontramos padrões que se repetem. Identificá-los é o primeiro passo para...',
      },
      'de-papel-a-la-nube': {
        category: 'Digitalização',
        title: 'Do papel à nuvem: um guia prático para digitalizar sua operação',
        excerpt:
          'Migrar processos analógicos para o digital não precisa ser traumático. Foi isso que aprendemos acompanhando empresas...',
      },
    },
  },

  newsletter: {
    title: 'Receba nossos artigos no seu email',
    description: 'Ideias práticas sobre IA, processos e digitalização. Sem spam.',
    placeholder: 'voce@empresa.com',
    submitLabel: 'Assinar a newsletter',
    success: 'Pronto, sua assinatura está confirmada.',
    error: 'Não conseguimos concluir a assinatura. Tente de novo em instantes.',
  },

  faqs: {
    eyebrow: 'Perguntas frequentes',
    title: 'Perguntas que você tem todo o direito de fazer',
    items: {
      implementan: {
        question: 'Vocês implementam ou só aconselham o que fazer?',
        answer:
          'Implementamos. O diagnóstico é o ponto de partida, não a entrega: deixamos os processos redesenhados, as ferramentas funcionando e seu time capacitado para sustentá-las.',
      },
      tecnologica: {
        question: 'Precisamos ser uma empresa de tecnologia para trabalhar com vocês?',
        answer:
          'Não. Trabalhamos com empresas que hoje operam com papel, planilhas e WhatsApp. É justamente aí que um olhar de engenharia gera mais impacto.',
      },
      capacitacionPuntual: {
        question: 'E se precisarmos só de uma capacitação pontual, não de um projeto completo?',
        answer:
          'Também dá. As capacitações são contratadas separadamente, in-company ou com certificação da UTN, sem precisar contratar um projeto de consultoria.',
      },
      duracion: {
        question: 'Quanto dura um projeto de consultoria?',
        answer:
          'Depende do escopo, mas um projeto típico leva de 8 a 16 semanas. Definimos prazo e entregas na primeira conversa, antes de você assinar qualquer coisa.',
      },
      rubros: {
        question: 'Vocês atendem qualquer setor ou só indústria?',
        answer:
          'Qualquer setor. O método é o mesmo: entender como você trabalha hoje, achar onde trava e organizar. O que muda é o vocabulário, não a abordagem.',
      },
      dependencia: {
        question: 'Depois que o projeto termina, continuamos dependendo da Kora?',
        answer:
          'Não, e isso é proposital. Documentamos tudo e capacitamos seu time para que o sistema siga funcionando sem nós. Continuar acompanhado é uma escolha sua, não uma necessidade.',
      },
    },
  },

  contact: {
    eyebrow: 'Contato',
    title: 'Vamos começar a trabalhar',
    titleHighlight: 'juntos',
    description: 'Conte o que você precisa e responderemos em breve.',
    fieldName: 'Nome*',
    fieldCompany: 'Empresa*',
    fieldEmail: 'Email*',
    fieldMessage: 'O que está acontecendo?*',
    submitLabel: 'Vamos conversar',
    submitting: 'Enviando…',
    success: 'Mensagem enviada. Respondemos em breve.',
    error: 'Não conseguimos enviar a mensagem. Escreva para info@kora.ar enquanto verificamos.',
    validation: {
      name: 'Diga seu nome.',
      company: 'Diga de qual empresa você é.',
      email: 'Revise o email, não parece válido.',
      messageShort: 'Conte um pouco mais — pelo menos 10 caracteres.',
      messageLong: 'Máximo de 2000 caracteres.',
    },
  },
};
