import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";
import { AdUnit } from "@/components/AdUnit";
import { getAllProfiles } from "@/lib/professionals";
import { serviceCategories } from "@/lib/serviceCategories";
import { ProfileImage } from "@/components/ProfileImage";

export const metadata: Metadata = {
  title: "Yuppi | Festas Infantis em Portugal",
  description: "Descobre animadores, mágicos, mascotes, espetáculos e outros profissionais para festas infantis em Portugal.",
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const profiles = await getAllProfiles();
  const categories = serviceCategories.slice(0, 9);
  const cities = Array.from(new Set(profiles.flatMap((p) => p.localidades))).sort();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem", position: i + 1, name: c.name, url: `https://www.yuppi.pt/${c.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-content">
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">Yuppi · Diretório de festas infantis</span>
              <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] text-ink text-balance md:text-6xl">
                Encontra ideias, espetáculos e profissionais para a tua festa infantil.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkSoft">
                Explora categorias, compara opções e visita diretamente os profissionais que fazem festas infantis em Portugal.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/profissionais" className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark">
                  Encontrar profissionais
                </Link>
                <Link href="/categorias" className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink hover:bg-canvasSoft">
                  Explorar categorias
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <ConfettiField variant="hero" />
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl2 shadow-soft">
                <img src="/hero-photo.jpg" alt="Crianças a celebrar uma festa de aniversário" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-canvasSoft px-6 py-10">
        <div className="mx-auto max-w-content">
          <AdUnit />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <Reveal><h2 className="font-display text-3xl font-medium text-ink md:text-4xl">O que estás à procura?</h2></Reveal>
          <p className="mt-3 max-w-2xl text-inkSoft">Escolhe uma categoria para veres o que existe e, quando houver oferta disponível, encontra profissionais por localização.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 50}>
                <Link href={`/${cat.slug}`} className="block rounded-xl2 bg-canvasSoft px-6 py-7 shadow-card transition-transform hover:scale-[1.02]">
                  <h3 className="font-display text-lg font-medium text-ink">{cat.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-inkSoft">{cat.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-canvasSoft px-6 py-10">
        <div className="mx-auto max-w-content"><AdUnit /></div>
      </section>

      <section className="border-y border-black/5 bg-canvasSoft px-6 py-20">
        <div className="mx-auto max-w-content">
          <Reveal><h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Profissionais para descobrir</h2></Reveal>
          <p className="mt-3 max-w-2xl text-inkSoft">Uma seleção inicial de profissionais presentes na Yuppi. A disponibilidade e condições devem ser confirmadas diretamente com cada profissional.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p) => (
              <Link key={p.slug} href={`/profissionais/perfil/${p.slug}`} className="rounded-xl2 bg-white p-6 shadow-card transition-transform hover:scale-[1.01]">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl"><ProfileImage src={p.coverImage} alt={p.nome} className="h-full w-full object-cover" /></div>
                <div className="flex flex-wrap gap-1.5">{p.categorias.slice(0,3).map((c)=><span key={c} className="rounded-full bg-violet-light px-2.5 py-1 text-[11px] font-medium text-violet">{c}</span>)}</div>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">{p.nome}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inkSoft">{p.resumo}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-violet">Ver perfil →</span>
              </Link>
            ))}
          </div>
          <Link href="/profissionais" className="mt-8 inline-block text-sm font-semibold text-violet">Ver todo o diretório →</Link>
        </div>
      </section>

      {cities.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-content">
            <Reveal><h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Encontra por localização</h2></Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {cities.map((city) => <Link key={city} href={`/profissionais?localidade=${encodeURIComponent(city)}`} className="rounded-full border border-ink/10 bg-canvasSoft px-4 py-2 text-sm text-ink hover:border-violet/40">Profissionais em {city}</Link>)}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-black/5 bg-canvasSoft px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Estás a organizar uma festa?</h2>
          <p className="mt-4 text-lg leading-relaxed text-inkSoft">Usa a Yuppi para pesquisar opções. Não fazemos a reserva por ti: o contacto e a contratação são feitos diretamente com o profissional.</p>
          <Link href="/profissionais" className="mt-7 inline-flex rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft hover:bg-violet-dark">Começar a pesquisar</Link>
        </Reveal>
      </section>
    </>
  );
}
