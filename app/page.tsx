import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ConfettiField } from "@/components/Confetti";
import { Reveal } from "@/components/Reveal";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";

const steps = [
  {
    n: "1",
    title: "Diz-nos o que procuras",
    body: "Indica a data, a localização e o tipo de animação que sonhas para a festa.",
  },
  {
    n: "2",
    title: "Nós encontramos os profissionais certos",
    body: "Selecionamos profissionais verificados, com o estilo certo para a tua festa.",
  },
  {
    n: "3",
    title: "Aproveita o grande dia",
    body: "Menos tempo a procurar. Mais tempo para aproveitar a festa com quem importa.",
  },
];

const categories = [
  { name: "Animadores", tint: "bg-magenta-light" },
  { name: "Mágicos", tint: "bg-violet-light" },
  { name: "Mascotes", tint: "bg-teal-light" },
  { name: "Pinturas Faciais", tint: "bg-amber-light" },
  { name: "Modelagem de Balões", tint: "bg-teal-light" },
  { name: "Insufláveis", tint: "bg-magenta-light" },
  { name: "Decoração", tint: "bg-violet-light" },
  { name: "Fotografia", tint: "bg-amber-light" },
  { name: "DJ / Música", tint: "bg-teal-light" },
];

const reasons = [
  {
    title: "Profissionais verificados",
    body: "Selecionamos cuidadosamente cada parceiro antes de o apresentarmos à tua família.",
  },
  {
    title: "Processo simples",
    body: "Menos mensagens trocadas, menos tempo perdido a comparar opções sozinho.",
  },
  {
    title: "Qualidade em primeiro lugar",
    body: "Trabalhamos para criar festas memoráveis, não apenas para preencher uma data.",
  },
  {
    title: "Apoio do início ao fim",
    body: "Estamos disponíveis durante todo o processo, da primeira mensagem ao dia da festa.",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como funciona a Yuppi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indicas a data, localização e tipo de animação que procuras. A Yuppi seleciona profissionais verificados para a tua festa infantil.",
        },
      },
      {
        "@type": "Question",
        name: "Que tipos de profissionais posso encontrar na Yuppi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Animadores, mágicos, mascotes, pinturas faciais, modelagem de balões, insufláveis, decoração, fotografia, DJ/música e muito mais, tudo num só lugar.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-content">
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative z-10">
              <h1 className="font-display text-4xl font-medium leading-[1.08] text-ink text-balance md:text-6xl">
                Organizar a festa perfeita nunca foi tão simples.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-inkSoft">
                Encontramos os melhores profissionais para festas infantis e tratamos de
                todo o processo por ti. Animadores, mágicos, mascotes, pinturas faciais e
                muito mais, tudo num só lugar.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="#pedir-orcamento"
                  className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
                >
                  Pedir Orçamento
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <ConfettiField variant="hero" />
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl2 shadow-soft">
                <Image
                  src="/hero-photo.jpg"
                  alt="Crianças a celebrar uma festa de aniversário, felizes e a sorrir"
                  fill
                  sizes="(min-width: 768px) 384px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="border-y border-black/5 bg-canvasSoft px-6 py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xl text-ink text-balance md:text-2xl">
            A rede de profissionais de confiança para festas infantis em Portugal.
          </p>
          <p className="mt-3 text-sm text-inkSoft">
            Profissionais cuidadosamente selecionados, prontos para tornar a tua festa
            inesquecível.
          </p>
        </Reveal>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="px-6 py-24">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
              Como funciona
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 120}>
                <div className="relative pl-1">
                  <span className="font-display text-5xl font-medium text-violet-light">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-inkSoft">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PEDIR ORÇAMENTO */}
      <section id="pedir-orcamento" className="px-6 pb-24">
        <Reveal className="mx-auto max-w-xl rounded-xl2 bg-violet-light px-8 py-12 text-center shadow-card">
          <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
            Pede já o teu orçamento.
          </h2>
          <p className="mt-3 text-inkSoft">
            Conta-nos o que precisas e a nossa equipa encontra os profissionais certos
            para a tua festa.
          </p>
          <div className="mt-7">
            <Suspense fallback={<div className="h-64" />}>
              <QuoteRequestForm />
            </Suspense>
          </div>
        </Reveal>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="bg-canvasSoft px-6 py-24">
        <div className="mx-auto max-w-content">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
                Todas as categorias da tua festa, num só lugar
              </h2>
            </Reveal>
            <Link href="/categorias" className="text-sm font-semibold text-violet hover:text-violet-dark">
              Ver todas as categorias →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 60}>
                <Link
                  href="/categorias"
                  className={`block rounded-xl2 ${cat.tint} px-6 py-8 text-center shadow-card transition-transform hover:scale-[1.02]`}
                >
                  <span className="font-display text-lg font-medium text-ink">
                    {cat.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORQUE ESCOLHER */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
              Porque escolher a Yuppi
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 100}>
                <h3 className="font-display text-xl font-medium text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2 text-inkSoft">{reason.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="border-y border-black/5 bg-canvasSoft px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
            Sobre a Yuppi
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-inkSoft">
            Acreditamos que organizar uma festa infantil deve ser simples, seguro e
            emocionante. A Yuppi nasceu para aproximar famílias dos melhores
            profissionais de festas infantis em Portugal.
          </p>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" className="relative overflow-hidden px-6 py-28">
        <ConfettiField variant="divider" />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium text-ink text-balance md:text-4xl">
            Vamos criar festas inesquecíveis.
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/torna-te-parceiro"
              className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
            >
              Torna-te Parceiro
            </Link>
            <Link
              href="/categorias"
              className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-canvasSoft"
            >
              Encontrar um Profissional
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
