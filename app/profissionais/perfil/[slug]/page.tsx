import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { PhotoGallery } from "@/components/PhotoGallery";
import { getProfileBySlug, extractYouTubeId } from "@/lib/professionals";
import { SHOW_PROFISSIONAIS } from "@/lib/featureFlags";
import { AdUnit } from "@/components/AdUnit";
import { slugify } from "@/lib/slugify";
import { ProfileImage } from "@/components/ProfileImage";

const SITE_URL = "https://www.yuppi.pt";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) return {};

  return {
    title: `${profile.nome} | ${profile.categorias.join(", ")} em ${profile.localidades.join(", ")}`,
    description: profile.resumo,
    alternates: { canonical: `/profissionais/perfil/${profile.slug}` },
    openGraph: {
      title: profile.nome,
      description: profile.resumo,
      url: `${SITE_URL}/profissionais/perfil/${profile.slug}`,
      images: profile.coverImage ? [{ url: profile.coverImage, width: 1200, height: 1200 }] : undefined,
    },
    robots: SHOW_PROFISSIONAIS ? undefined : { index: false, follow: false },
  };
}

export default async function ProfissionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: profile.nome,
    areaServed: profile.localidades,
    description: profile.resumo,
    image: profile.coverImage ? `${SITE_URL}${profile.coverImage}` : undefined,
    url: `${SITE_URL}/profissionais/perfil/${profile.slug}`,
  };

  const youtubeId = profile.youtube ? extractYouTubeId(profile.youtube) : null;

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
              <div className="h-40 w-40 shrink-0 overflow-hidden rounded-xl2 shadow-card sm:h-44 sm:w-44"><ProfileImage src={profile.coverImage} alt={profile.nome} className="h-full w-full object-cover" /></div>
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.categorias.map((cat) =>
                    profile.localidades.map((cid) => (
                      <Link
                        key={`${cat}-${cid}`}
                        href={`/profissionais/${slugify(cat)}/${slugify(cid)}`}
                        className="rounded-full bg-violet-light px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-violet hover:bg-violet hover:text-white"
                      >
                        {cat} · {cid}
                      </Link>
                    ))
                  )}
                </div>
                <h1 className="mt-3 font-display text-3xl font-medium leading-[1.15] text-ink text-balance md:text-4xl">
                  {profile.nome}
                </h1>
                {profile.precoDesde && (
                  <p className="mt-2 text-lg font-semibold text-ink">Desde {profile.precoDesde} €</p>
                )}
                <p className="mt-2 text-xs text-inkSoft">Perfil de diretório. A informação pode mudar; confirma dados diretamente com o profissional.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BlogArticleContent html={profile.contentHtml} />
          </Reveal>

          <div className="mt-10"><AdUnit /></div>

          {profile.fotos && profile.fotos.length > 0 && (
            <Reveal delay={130}>
              <div className="mt-10">
                <PhotoGallery fotos={profile.fotos} nome={profile.nome} />
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
            <div className="mt-10 rounded-xl2 bg-canvasSoft p-7 shadow-card">
              <h2 className="font-display text-2xl font-medium text-ink">Queres contactar este profissional?</h2>
              <p className="mt-2 text-sm leading-relaxed text-inkSoft">A Yuppi é um diretório. A disponibilidade, preço e contratação são tratados diretamente com o profissional.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {profile.website && <a href={profile.website} target="_blank" rel="noopener noreferrer nofollow" className="rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white hover:bg-violet-dark">Visitar website →</a>}
                {profile.instagram && <a href={profile.instagram} target="_blank" rel="noopener noreferrer nofollow" className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:bg-white">Instagram</a>}
                {profile.whatsapp && <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer nofollow" className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:bg-white">WhatsApp</a>}
              </div>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
