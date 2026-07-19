import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";
import { getAllCategoryCityCombos, getCombo } from "@/lib/professionals";
import { SHOW_PROFISSIONAIS } from "@/lib/featureFlags";

const SITE_URL = "https://www.yuppi.pt";

export function generateStaticParams() {
  return getAllCategoryCityCombos().map((combo) => ({
    categoria: combo.categoriaSlug,
    cidade: combo.cidadeSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; cidade: string }>;
}): Promise<Metadata> {
  const { categoria, cidade } = await params;
  const combo = getCombo(categoria, cidade);
  if (!combo) return {};

  const title = `${combo.categoriaNome} em ${combo.cidadeNome} | Yuppi`;
  const description = `Encontra ${combo.categoriaNome.toLowerCase()} para festas infantis em ${combo.cidadeNome}. Profissionais verificados, orçamento sem complicações.`;

  return {
    title,
    description,
    alternates: { canonical: `/profissionais/${combo.categoriaSlug}/${combo.cidadeSlug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/profissionais/${combo.categoriaSlug}/${combo.cidadeSlug}`,
    },
    robots: SHOW_PROFISSIONAIS ? undefined : { index: false, follow: false },
  };
}

export default async function CategoriaCidadePage({
  params,
}: {
  params: Promise<{ categoria: string; cidade: string }>;
}) {
  const { categoria, cidade } = await params;
  const combo = getCombo(categoria, cidade);
  if (!combo) notFound();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: combo.perfis.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nome,
      url: `${SITE_URL}/profissionais/perfil/${p.slug}`,
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
          <Link href="/profissionais" className="text-sm font-semibold text-violet hover:text-violet-dark">
            ← Ver todos os profissionais
          </Link>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            {combo.categoriaNome} em {combo.cidadeNome}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkSoft">
            Profissionais verificados de {combo.categoriaNome.toLowerCase()} disponíveis em{" "}
            {combo.cidadeNome}, prontos para tornar a tua festa infantil inesquecível.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-content">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {combo.perfis.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/profissionais/perfil/${p.slug}`}
                  className="block h-full overflow-hidden rounded-xl2 bg-canvasSoft shadow-card transition-transform hover:scale-[1.01]"
                >
                  {p.coverImage && (
                    <div className="relative aspect-square w-full">
                      <Image
                        src={p.coverImage}
                        alt={p.nome}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="px-6 py-6">
                    <div className="flex flex-wrap gap-1.5">
                      {p.categorias.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-violet-light px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-violet"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                      {p.localidades.join(" · ")}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-medium text-ink">{p.nome}</h2>
                    <p className="mt-1.5 text-sm text-inkSoft">{p.resumo}</p>
                    {p.precoDesde && (
                      <p className="mt-3 text-sm font-semibold text-ink">
                        Desde {p.precoDesde} €
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
