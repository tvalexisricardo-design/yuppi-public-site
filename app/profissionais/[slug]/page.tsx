import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { getAllProfileSlugs, getProfileBySlug, extractYouTubeId } from "@/lib/professionals";

const SITE_URL = "https://www.yuppi.pt";

export function generateStaticParams() {
  return getAllProfileSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) return {};

  return {
    title: `${profile.nome} | ${profile.categoria} em ${profile.cidade}`,
    description: profile.resumo,
    alternates: { canonical: `/profissionais/${profile.slug}` },
    openGraph: {
      title: profile.nome,
      description: profile.resumo,
      url: `${SITE_URL}/profissionais/${profile.slug}`,
      images: profile.coverImage ? [{ url: profile.coverImage, width: 1200, height: 1200 }] : undefined,
    },
  };
}

export default async function ProfissionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: profile.nome,
    areaServed: profile.cidade,
    description: profile.resumo,
    image: profile.coverImage ? `${SITE_URL}${profile.coverImage}` : undefined,
    url: `${SITE_URL}/profissionais/${profile.slug}`,
  };

  const youtubeId = profile.youtube ? extractYouTubeId(profile.youtube) : null;
  const emailHref = `mailto:hello@yuppi.pt?subject=${encodeURIComponent(
    `Pedido de informações — ${profile.nome}`
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Link href="/profissionais" className="text-sm font-semibold text-violet hover:text-violet-dark">
            ← Voltar a Profissionais
          </Link>

          <Reveal>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
              {profile.coverImage && (
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl2 shadow-card">
                  <Image
                    src={profile.coverImage}
                    alt={profile.nome}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-violet">
                  {profile.categoria} · {profile.cidade}
                </p>
                <h1 className="mt-2 font-display text-3xl font-medium leading-[1.15] text-ink text-balance md:text-4xl">
                  {profile.nome}
                </h1>
                {profile.precoDesde && (
                  <p className="mt-2 text-lg font-semibold text-ink">
                    Desde {profile.precoDesde} €
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BlogArticleContent html={profile.contentHtml} />
          </Reveal>

          {profile.fotos && profile.fotos.length > 0 && (
            <Reveal delay={130}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {profile.fotos.map((foto, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl2 shadow-card">
                    <Image
                      src={foto}
                      alt={`${profile.nome} — foto ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {youtubeId && (
            <Reveal delay={140}>
              <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-xl2 shadow-card">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={`Vídeo de ${profile.nome}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/#pedir-orcamento"
                className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
              >
                Pedir Orçamento
              </Link>
              <a
                href={emailHref}
                className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-canvasSoft"
              >
                Contactar por Email
              </a>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
