import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";
import { StatCounter } from "@/components/StatCounter";

const SITE_URL = "https://www.yuppi.pt";

export const metadata: Metadata = {
  title: "Sobre Nós | A História da Yuppi",
  description:
    "Conhece a história da Yuppi, criada por um profissional com mais de 20 anos de experiência internacional em entretenimento e eventos para famílias.",
  alternates: { canonical: "/sobre-nos" },
  openGraph: {
    title: "Sobre Nós | A História da Yuppi",
    description:
      "Uma plataforma criada por quem vive o entretenimento há mais de 20 anos.",
    url: `${SITE_URL}/sobre-nos`,
    images: [{ url: "/sobre/hero-qatar.jpg", width: 1920, height: 1080 }],
  },
};

const valores = [
  {
    titulo: "Confiança",
    texto: "Ligamos famílias a profissionais de confiança.",
    tint: "bg-violet-light",
    accent: "text-violet",
  },
  {
    titulo: "Qualidade",
    texto: "Promovemos experiências memoráveis.",
    tint: "bg-teal-light",
    accent: "text-teal",
  },
  {
    titulo: "Transparência",
    texto: "Reservas simples e comunicação clara.",
    tint: "bg-amber-light",
    accent: "text-amber",
  },
  {
    titulo: "Proximidade",
    texto: "Acompanhamos famílias e parceiros em todas as etapas.",
    tint: "bg-magenta-light",
    accent: "text-magenta",
  },
];

const porqueConfiar = [
  "Plataforma especializada exclusivamente em festas infantis.",
  "Criada por um profissional com mais de duas décadas de experiência no setor.",
  "Processo transparente para famílias e parceiros.",
  "Seleção criteriosa dos profissionais.",
  "Acompanhamento antes, durante e depois da reserva.",
];

export default function SobreNosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Nós | Yuppi",
    url: `${SITE_URL}/sobre-nos`,
    mainEntity: {
      "@type": "Organization",
      name: "Yuppi",
      url: SITE_URL,
      founder: {
        "@type": "Person",
        name: "Aléxis Ricardo",
        jobTitle: "Fundador",
        description:
          "Profissional com mais de 20 anos de experiência internacional em entretenimento, eventos e criação de experiências para famílias em Portugal, Reino Unido e Qatar.",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative flex min-h-[600px] items-end overflow-hidden md:min-h-[720px]">
        <Image
          src="/sobre/hero-qatar.jpg"
          alt="Fundador da Yuppi com a equipa internacional no Qatar"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-hero-kenburns"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,16,48,0.78)_0%,rgba(28,16,48,0.38)_28%,rgba(28,16,48,0.08)_55%,rgba(28,16,48,0)_72%)]" />
        <style>{`
          @keyframes hero-kenburns {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }
          .animate-hero-kenburns {
            animation: hero-kenburns 15s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-hero-kenburns { animation: none; }
          }
        `}</style>

        <div className="relative mx-auto max-w-content px-6 pb-20 pt-32 md:pb-28">
          <Reveal>
            <h1
              className="max-w-xl font-display text-[2.1rem] font-medium leading-[1.25] text-white text-balance md:text-[3.375rem] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            >
              Uma plataforma criada por quem vive o entretenimento há mais de
              20 anos.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
              Depois de mais de duas décadas dedicadas ao entretenimento, aos
              eventos e à criação de experiências para famílias em Portugal,
              Reino Unido e Qatar, nasceu a Yuppi. Uma plataforma criada para
              tornar a organização de festas infantis mais simples, segura e
              transparente.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/categorias"
                className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
              >
                Encontrar um profissional
              </Link>
              <Link
                href="/torna-te-parceiro"
                className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Tornar-me parceiro
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="px-6 py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium text-ink text-balance md:text-4xl">
            Acreditamos que cada festa merece ser inesquecível.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-inkSoft">
            Na Yuppi acreditamos que organizar uma festa infantil deve ser um
            momento de entusiasmo, não de preocupação. Criámos uma plataforma
            onde as famílias podem encontrar profissionais de confiança e
            onde os melhores profissionais conseguem fazer crescer o seu
            negócio.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-inkSoft">
            O nosso compromisso passa por aproximar quem procura qualidade de
            quem dedica diariamente o seu talento a criar momentos
            inesquecíveis.
          </p>
        </Reveal>
      </section>

      {/* VALORES */}
      <section className="bg-canvasSoft px-6 py-24">
        <div className="mx-auto max-w-content">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 80}>
                <div className={`h-full rounded-xl2 ${v.tint} px-7 py-8 shadow-card`}>
                  <h3 className={`font-display text-lg font-medium ${v.accent}`}>
                    {v.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-inkSoft">{v.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM ESTÁ POR TRÁS DA YUPPI */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-content gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 shadow-soft">
              <Image
                src="/sobre/trocadero.jpg"
                alt="Aléxis Ricardo a apresentar um evento do Trocadéro"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="text-xs font-semibold uppercase tracking-wide text-violet">
              Quem está por trás da Yuppi
            </span>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink text-balance">
              Aléxis Ricardo
            </h2>
            <p className="text-sm font-medium text-inkSoft">Fundador da Yuppi</p>

            <div className="mt-6 space-y-4 text-inkSoft">
              <p>
                A Yuppi foi fundada por Aléxis Ricardo, profissional com mais
                de 20 anos de experiência internacional na área do
                entretenimento, eventos e criação de experiências para
                famílias.
              </p>
              <p>
                Ao longo da sua carreira trabalhou em Portugal, Reino Unido e
                Qatar, liderando equipas multidisciplinares, desenvolvendo
                espetáculos, gerindo operações de entretenimento e criando
                experiências para milhares de visitantes.
              </p>
              <p>
                Entre os projetos mais relevantes destaca-se a liderança do
                departamento de Entertainment &amp; Events do Trocadéro, no
                Place Vendôme Mall, no Qatar, onde participou desde a fase de
                pré-abertura, desenvolvendo operações, recrutando equipas
                internacionais e criando experiências para visitantes de todo
                o mundo.
              </p>
              <p>
                Anteriormente fundou a Animarte Entertainment, liderou
                projetos internacionais, foi Entertainment Manager no Reino
                Unido, integrou equipas de pré-abertura de parques de
                entretenimento, foi professor do Chapitô e colaborou em
                inúmeros espetáculos e eventos ao longo da sua carreira.
              </p>
              <p>
                Toda esta experiência permitiu-lhe conhecer profundamente os
                desafios das famílias, dos artistas e dos profissionais do
                entretenimento.
              </p>
              <p className="font-medium text-ink">
                Foi precisamente dessa experiência que nasceu a Yuppi. Não
                apenas como uma plataforma digital, mas como um projeto
                criado por alguém que acredita que encontrar profissionais
                para uma festa infantil deve ser simples, seguro e
                transparente.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIÊNCIA QUE FAZ A DIFERENÇA */}
      <section className="relative overflow-hidden bg-ink px-6 py-24 md:py-28">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-medium text-white md:text-3xl">
              Experiência que faz a diferença
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <p className="font-display text-4xl font-medium text-white">
                <StatCounter target={20} prefix="+" suffix=" anos" />
              </p>
              <p className="mt-2 text-sm text-white/70">
                Experiência internacional em entretenimento e eventos
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="font-display text-4xl font-medium text-white">
                <StatCounter target={3} suffix=" países" />
              </p>
              <p className="mt-2 text-sm text-white/70">
                Portugal, Reino Unido e Qatar
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-display text-4xl font-medium text-white">Centenas</p>
              <p className="mt-2 text-sm text-white/70">
                de espetáculos, eventos e experiências desenvolvidas
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-display text-4xl font-medium text-white">
                Equipas internacionais
              </p>
              <p className="mt-2 text-sm text-white/70">
                Liderança, recrutamento e formação de artistas e profissionais
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PORQUE CONFIAR NA YUPPI */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-medium text-ink text-balance md:text-4xl">
              Porque confiar na Yuppi?
            </h2>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-2xl gap-4">
            {porqueConfiar.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <div className="flex items-start gap-3 rounded-xl2 bg-canvasSoft px-6 py-5 shadow-card">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet text-xs text-white">
                    ✓
                  </span>
                  <p className="text-inkSoft">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-violet-light px-6 py-24">
        <ConfettiField variant="divider" />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium text-ink text-balance md:text-4xl">
            Vamos criar momentos inesquecíveis?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-inkSoft">
            Na Yuppi acreditamos que as melhores memórias começam com pessoas
            extraordinárias. Quer estejas à procura do profissional ideal
            para uma festa ou pretendas fazer parte da nossa comunidade de
            parceiros, teremos todo o gosto em ajudar.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/categorias"
              className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
            >
              Encontrar um profissional
            </Link>
            <Link
              href="/torna-te-parceiro"
              className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-white"
            >
              Tornar-me parceiro
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
