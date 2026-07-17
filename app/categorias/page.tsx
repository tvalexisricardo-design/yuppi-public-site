import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";

export const metadata: Metadata = {
  title: "Categorias | Animadores, Mágicos, Mascotes e Mais",
  description:
    "Explora todas as categorias de profissionais de festas infantis disponíveis na Yuppi: animadores, mágicos, mascotes, pinturas faciais, insufláveis, decoração e mais.",
  alternates: { canonical: "/categorias" },
  openGraph: {
    title: "Categorias Yuppi | Profissionais de Festas Infantis",
    description:
      "Animadores, mágicos, mascotes, pinturas faciais, insufláveis, decoração e mais, tudo num só lugar.",
    url: "https://www.yuppi.pt/categorias",
  },
};

const categories = [
  {
    slug: "animadores",
    name: "Animadores",
    tint: "bg-magenta-light",
    accent: "text-magenta",
    description:
      "Animadores infantis experientes que trazem jogos, música e energia para o coração da festa. Ideal para grupos de todas as idades, em casa, em salões ou ao ar livre.",
  },
  {
    slug: "magicos",
    name: "Mágicos",
    tint: "bg-violet-light",
    accent: "text-violet",
    description:
      "Espetáculos de magia e ilusionismo pensados para encantar as crianças e surpreender os adultos. Um momento que fica na memória de toda a família.",
  },
  {
    slug: "mascotes",
    name: "Mascotes",
    tint: "bg-teal-light",
    accent: "text-teal",
    description:
      "Os heróis e personagens favoritos das crianças, em carne e osso, prontos para dançar, brincar e tirar fotografias inesquecíveis.",
  },
  {
    slug: "pinturas-faciais",
    name: "Pinturas Faciais",
    tint: "bg-amber-light",
    accent: "text-amber",
    description:
      "Artistas de pintura facial que transformam cada criança no seu personagem preferido, com materiais seguros e hipoalergénicos.",
  },
  {
    slug: "modelagem-de-baloes",
    name: "Modelagem de Balões",
    tint: "bg-teal-light",
    accent: "text-teal",
    description:
      "Espadas, animais, coroas e criações à medida em balões — uma atividade interativa que mantém as crianças entretidas do início ao fim.",
  },
  {
    slug: "insuflaveis",
    name: "Insufláveis",
    tint: "bg-magenta-light",
    accent: "text-magenta",
    description:
      "Castelos insufláveis e estruturas de diversão para libertar energia em segurança, com instalação e supervisão profissional.",
  },
  {
    slug: "decoracao",
    name: "Decoração",
    tint: "bg-violet-light",
    accent: "text-violet",
    description:
      "Decoradores especializados em festas infantis, de balões personalizados a temas completos, para transformar o espaço na festa que imaginaste.",
  },
  {
    slug: "fotografia",
    name: "Fotografia",
    tint: "bg-amber-light",
    accent: "text-amber",
    description:
      "Fotógrafos especializados em festas infantis, para guardar os sorrisos, os momentos espontâneos e as memórias do grande dia.",
  },
  {
    slug: "dj-musica",
    name: "DJ / Música",
    tint: "bg-teal-light",
    accent: "text-teal",
    description:
      "DJs e músicos que animam a pista de dança e criam o ambiente certo, do início da festa ao último parabéns.",
  },
];

export default function CategoriasPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cat.name,
      url: `https://www.yuppi.pt/categorias#${cat.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">
            Categorias
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            Escolhe o profissional certo para a tua festa.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkSoft">
            Da animação à decoração, reunimos profissionais verificados em cada
            categoria para tornar a tua festa infantil inesquecível.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-content space-y-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 60}>
              <div
                id={cat.slug}
                className={`flex flex-col gap-4 rounded-xl2 ${cat.tint} px-8 py-10 shadow-card sm:flex-row sm:items-center sm:justify-between`}
              >
                <div className="max-w-2xl">
                  <h2 className={`font-display text-2xl font-medium ${cat.accent}`}>
                    {cat.name}
                  </h2>
                  <p className="mt-2 text-inkSoft">{cat.description}</p>
                </div>
                <Link
                  href="/#pedir-orcamento"
                  className="shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-ink/90"
                >
                  Pedir Orçamento
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-black/5 bg-canvasSoft px-6 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
            És um profissional numa destas áreas?
          </h2>
          <p className="mt-3 text-inkSoft">
            Candidata-te a Parceiro Fundador e começa a receber pedidos assim que o
            teu perfil estiver disponível.
          </p>
          <Link
            href="/torna-te-parceiro"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
          >
            Torna-te Parceiro
          </Link>
        </Reveal>
      </section>
    </>
  );
}
