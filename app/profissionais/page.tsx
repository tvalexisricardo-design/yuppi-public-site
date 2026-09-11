import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";
import { AdUnit } from "@/components/AdUnit";
import { ProfessionalsFilter } from "@/components/ProfessionalsFilter";
import { getAllProfiles } from "@/lib/professionals";

export const metadata: Metadata = {
  title: "Profissionais de Festas Infantis em Portugal | Yuppi",
  description: "Pesquisa profissionais de festas infantis em Portugal: animadores, mágicos, mascotes, espetáculos e muito mais.",
  alternates: { canonical: "/profissionais" },
};

export const dynamic = "force-dynamic";

export default async function ProfissionaisPage() {
  const profiles = await getAllProfiles();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: profiles.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.nome, url: `https://www.yuppi.pt/profissionais/perfil/${p.slug}` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <section className="relative overflow-hidden px-6 pb-14 pt-16 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <span className="inline-flex rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">Diretório Yuppi</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.08] text-ink text-balance md:text-6xl">Profissionais para festas infantis em Portugal</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-inkSoft">Pesquisa por categoria e localização. A Yuppi organiza informação pública e perfis submetidos por profissionais. Confirma sempre disponibilidade, preços e condições diretamente.</p>
        </div>
      </section>
      <section className="border-y border-black/5 bg-canvasSoft px-6 py-8"><div className="mx-auto max-w-content"><AdUnit /></div></section>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <Reveal><h2 className="font-display text-2xl font-medium text-ink">Pesquisar profissionais</h2></Reveal>
          <div className="mt-7"><Suspense fallback={<div className="h-48" />}><ProfessionalsFilter profiles={profiles} /></Suspense></div>
        </div>
      </section>
    </>
  );
}
