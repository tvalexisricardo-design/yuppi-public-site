import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Dicas para Festas Infantis",
  description:
    "Guias, ideias e dicas práticas para organizar a festa de aniversário infantil perfeita.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Yuppi | Dicas para Festas Infantis",
    description: "Guias, ideias e dicas práticas para organizar festas infantis memoráveis.",
    url: "https://www.yuppi.pt/blog",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">
            Blog
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            Dicas para festas infantis inesquecíveis.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkSoft">
            Guias práticos, ideias e checklists para organizares tudo com mais calma.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-content">
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full overflow-hidden rounded-xl2 bg-canvasSoft shadow-card transition-transform hover:scale-[1.01]"
                >
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="px-7 py-8">
                    <p className="text-xs font-medium uppercase tracking-wide text-inkSoft/70">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-medium text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-inkSoft">{post.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-violet">
                      Ler artigo →
                    </span>
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
