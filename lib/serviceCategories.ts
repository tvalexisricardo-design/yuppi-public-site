export interface ServiceCategory {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  intro: string;
  accent: "magenta" | "violet" | "teal" | "amber";
  activities: string[];
  idealFor: string[];
  tips: string[];
  relatedSlugs: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "animadores-infantis",
    name: "Animadores Infantis",
    seoTitle: "Animadores Infantis para Festas de Aniversário",
    description: "Encontra animadores infantis para festas de aniversário, em casa ou num espaço de eventos, com jogos, música e atividades adaptadas às crianças.",
    intro: "Uma boa animação infantil dá estrutura à festa, envolve as crianças e deixa os adultos com mais tempo para aproveitar o momento. Na Yuppi podes pedir ajuda para encontrar profissionais adequados à idade, número de convidados, local e tipo de festa.",
    accent: "magenta",
    activities: ["Jogos e brincadeiras em grupo", "Música, dança e jogos musicais", "Gincanas e desafios", "Caças ao tesouro", "Atividades temáticas", "Dinâmicas adaptadas à idade"],
    idealFor: ["Festas de aniversário infantis", "Festas em casa", "Festas em espaços de eventos", "Festas ao ar livre", "Grupos de diferentes idades"],
    tips: ["Indica a idade das crianças e o número aproximado de convidados.", "Confirma a duração da animação e o que está incluído.", "Escolhe atividades compatíveis com o espaço disponível."],
    relatedSlugs: ["magicos-para-festas", "pinturas-faciais", "modelagem-de-baloes"],
  },
  {
    slug: "magicos-para-festas",
    name: "Mágicos para Festas",
    seoTitle: "Mágicos para Festas Infantis e Aniversários",
    description: "Descobre mágicos para festas infantis com espetáculos interativos de magia e ilusionismo pensados para crianças e famílias.",
    intro: "Um espetáculo de magia pode ser o momento 'uau' da festa. O formato certo depende da idade das crianças, do tamanho do grupo e do espaço onde será realizado.",
    accent: "violet",
    activities: ["Magia interativa", "Ilusionismo para crianças", "Truques com participação do público", "Momentos cómicos e surpreendentes", "Magia de proximidade, quando adequada"],
    idealFor: ["Aniversários infantis", "Festas familiares", "Festas temáticas", "Eventos em casa ou em espaços de eventos"],
    tips: ["Pergunta pela duração prevista do espetáculo.", "Indica a idade predominante das crianças.", "Confirma se o profissional precisa de condições específicas no local."],
    relatedSlugs: ["animadores-infantis", "mascotes-para-festas", "fotografia-para-festas"],
  },
  {
    slug: "mascotes-para-festas",
    name: "Mascotes para Festas",
    seoTitle: "Mascotes para Festas Infantis e Aniversários",
    description: "Leva personagens e mascotes para a festa infantil, com momentos de interação, fotografias, dança e brincadeiras.",
    intro: "A entrada de uma mascote pode transformar uma festa temática num momento especial. O valor está na interação com as crianças, e não apenas na presença da personagem.",
    accent: "teal",
    activities: ["Receção das crianças", "Fotografias com a personagem", "Dança e interação", "Jogos simples", "Momentos temáticos", "Parabéns com a mascote"],
    idealFor: ["Festas temáticas", "Aniversários de crianças", "Festas com personagens favoritas", "Momentos especiais e fotografias"],
    tips: ["Confirma qual a personagem ou estilo de mascote disponível.", "Garante espaço suficiente para circulação e fotografias.", "Define o momento da entrada da mascote na programação."],
    relatedSlugs: ["animadores-infantis", "decoracao-de-festas", "fotografia-para-festas"],
  },
  {
    slug: "pinturas-faciais",
    name: "Pinturas Faciais",
    seoTitle: "Pinturas Faciais para Festas Infantis",
    description: "Pinturas faciais para aniversários e festas infantis, com designs divertidos para transformar as crianças nos seus personagens e animais favoritos.",
    intro: "A pintura facial é uma atividade criativa que pode complementar uma animação mais dinâmica. É especialmente útil para criar momentos individuais sem deixar de fazer parte da festa.",
    accent: "amber",
    activities: ["Animais e personagens", "Super-heróis e princesas", "Pinturas temáticas", "Desenhos simples e rápidos", "Opções adaptadas à idade"],
    idealFor: ["Festas de aniversário", "Festas temáticas", "Festas em casa", "Eventos infantis com várias atividades"],
    tips: ["Pergunta que materiais são utilizados.", "Estima quantas crianças irão participar para calcular o tempo necessário.", "Reserva uma zona com boa iluminação para a atividade."],
    relatedSlugs: ["animadores-infantis", "modelagem-de-baloes", "mascotes-para-festas"],
  },
  {
    slug: "modelagem-de-baloes",
    name: "Modelagem de Balões",
    seoTitle: "Modelagem de Balões para Festas Infantis",
    description: "Modelagem de balões para festas infantis: animais, espadas, flores, coroas e outras criações para oferecer às crianças.",
    intro: "A modelagem de balões combina entretenimento e uma pequena lembrança que cada criança pode levar consigo. É uma opção versátil para diferentes tipos de festa.",
    accent: "teal",
    activities: ["Animais em balão", "Espadas e acessórios", "Flores e coroas", "Figuras temáticas", "Criações personalizadas"],
    idealFor: ["Aniversários infantis", "Festas temáticas", "Eventos com muitas crianças", "Atividades complementares"],
    tips: ["Define previamente o número aproximado de crianças.", "Combina a atividade com jogos ou pinturas para evitar filas longas.", "Confirma se o profissional leva todos os materiais."],
    relatedSlugs: ["animadores-infantis", "pinturas-faciais", "mascotes-para-festas"],
  },
  {
    slug: "insuflaveis",
    name: "Insufláveis",
    seoTitle: "Insufláveis para Festas Infantis",
    description: "Insufláveis para festas infantis e aniversários, com opções para jardins, quintas e espaços amplos onde as crianças possam brincar.",
    intro: "Os insufláveis são uma solução para festas que precisam de mais movimento. A escolha deve ter em conta a idade das crianças, o espaço, a superfície e as condições de utilização definidas pelo fornecedor.",
    accent: "magenta",
    activities: ["Castelos insufláveis", "Estruturas de salto", "Insufláveis temáticos", "Opções para diferentes idades", "Instalação e recolha, quando incluídas"],
    idealFor: ["Festas ao ar livre", "Quintas e jardins", "Espaços amplos", "Festas com grupos de crianças"],
    tips: ["Confirma as dimensões da estrutura e o espaço necessário.", "Verifica as condições de instalação e utilização.", "Pergunta o que acontece em caso de chuva ou vento quando a festa é ao ar livre."],
    relatedSlugs: ["animadores-infantis", "decoracao-de-festas", "fotografia-para-festas"],
  },
  {
    slug: "decoracao-de-festas",
    name: "Decoração de Festas",
    seoTitle: "Decoração para Festas Infantis e Aniversários",
    description: "Decoração de festas infantis com balões, temas e detalhes personalizados para criar o ambiente certo para o aniversário.",
    intro: "A decoração define o ambiente da festa e pode transformar um espaço comum num cenário pensado para o aniversariante. O segredo é alinhar tema, cores, espaço e orçamento.",
    accent: "violet",
    activities: ["Arcos e instalações de balões", "Mesas temáticas", "Painéis e fundos para fotografias", "Decoração personalizada", "Temas infantis"],
    idealFor: ["Festas de aniversário", "Festas temáticas", "Festas em casa", "Salões e espaços de eventos"],
    tips: ["Define o tema e as cores antes de pedir propostas.", "Mede o espaço onde a decoração será instalada.", "Confirma montagem, desmontagem e materiais incluídos."],
    relatedSlugs: ["animadores-infantis", "mascotes-para-festas", "fotografia-para-festas"],
  },
  {
    slug: "fotografia-para-festas",
    name: "Fotografia para Festas",
    seoTitle: "Fotógrafos para Festas Infantis e Aniversários",
    description: "Fotógrafos para festas infantis que registam os momentos espontâneos, a decoração, as atividades e os parabéns.",
    intro: "Num aniversário, os melhores momentos acontecem depressa. Um fotógrafo pode concentrar-se nos detalhes e nas interações que os pais nem sempre conseguem registar enquanto acompanham a festa.",
    accent: "amber",
    activities: ["Fotografia documental", "Retratos do aniversariante", "Fotografias de família", "Registo das atividades", "Fotografias da decoração"],
    idealFor: ["Aniversários infantis", "Festas temáticas", "Eventos familiares", "Festas com produção especial"],
    tips: ["Define a duração da cobertura.", "Pergunta como e quando serão entregues as fotografias.", "Partilha previamente os momentos que não queres que faltem."],
    relatedSlugs: ["animadores-infantis", "decoracao-de-festas", "magicos-para-festas"],
  },
  {
    slug: "dj-musica",
    name: "DJ e Música para Festas",
    seoTitle: "DJ e Música para Festas Infantis",
    description: "DJ e música para festas infantis, com playlists adequadas à idade, jogos musicais e ambiente para dançar.",
    intro: "A música pode ligar diferentes momentos da festa, desde a chegada das crianças até aos jogos, dança e parabéns. O importante é adaptar o ambiente ao público e ao espaço.",
    accent: "teal",
    activities: ["Playlist infantil", "Jogos musicais", "Dança", "Música para momentos especiais", "Som adaptado ao espaço"],
    idealFor: ["Festas de aniversário", "Festas com crianças mais crescidas", "Eventos em salões", "Festas temáticas"],
    tips: ["Indica a idade das crianças e o estilo de música pretendido.", "Confirma o equipamento de som incluído.", "Verifica as condições acústicas e de energia do espaço."],
    relatedSlugs: ["animadores-infantis", "decoracao-de-festas", "fotografia-para-festas"],
  },
];

export function getServiceCategory(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}
