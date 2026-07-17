import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { BlogArticleContent } from "@/components/BlogArticleContent";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

const SITE_URL = "https://www.yuppi.pt";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 675 }] : undefined,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
    author: { "@type": "Organization", name: "Yuppi" },
    publisher: { "@type": "Organization", name: "Yuppi" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm font-semibold text-violet hover:text-violet-dark">
            ← Voltar ao blog
          </Link>

          <Reveal>
            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-inkSoft/70">
              {formatDate(post.date)}
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-[1.15] text-ink text-balance md:text-4xl">
              {post.title}
            </h1>
          </Reveal>

          {post.coverImage && (
            <Reveal delay={60}>
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl2 shadow-card">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            <BlogArticleContent html={post.contentHtml} />
          </Reveal>
        </div>
      </article>
    </>
  );
}
