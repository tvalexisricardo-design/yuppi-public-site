import type { Metadata } from "next";
import Link from "next/link";
import { ConfettiField } from "@/components/Confetti";
import { Reveal } from "@/components/Reveal";
import { AdUnit } from "@/components/AdUnit";
import { getServiceCategory, serviceCategories, type ServiceCategory } from "@/lib/serviceCategories";
import { getAllProfiles } from "@/lib/professionals";

const SITE_URL = "https://www.yuppi.pt";

const accentClasses = {
  magenta: { badge: "bg-magenta-light text-magenta", card: "bg-magenta-light", button: "bg-magenta" },
  violet: { badge: "bg-violet-light text-violet", card: "bg-violet-light", button: "bg-violet" },
  teal: { badge: "bg-teal-light text-teal", card: "bg-teal-light", button: "bg-teal" },
  amber: { badge: "bg-amber-light text-amber", card: "bg-amber-light", button: "bg-amber" },
};

export function serviceMetadata(category: ServiceCategory): Metadata {
  return {
    title: category.seoTitle,
    description: category.description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: {
      title: `${category.seoTitle} | Yuppi`,
      description: category.description,
      url: `${SITE_URL}/${category.slug}`,
      type: "website",
    },
  };
}

export async function ServiceLandingPage({ category }: { category: ServiceCategory }) {
  const profiles = (await getAllProfiles()).filter((p) => p.categorias.includes(category.name) || p.categorias.some((c) => c.toLowerCase().includes(category.name.toLowerCase().split(" ")[0]))).slice(0, 12);
  const styles = accentClasses[category.accent];
  const related = category.relatedSlugs
    .map((slug) => getServiceCategory(slug))
    .filter(Boolean) as ServiceCategory[];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.seoTitle,
    description: category.description,
    provider: { "@type": "Organization", name: "Yuppi", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Portugal" },
    url: `${SITE_URL}/${category.slug}`,
  };

  const faqItems = [
    {
      question: `O que inclui ${category.name.toLowerCase()}?`,
      answer: category.description,
    },
    {
      question: `Para que festas são indicados ${category.name.toLowerCase()}?`,
      answer: `São uma opção para festas de aniversário infantis e outros eventos com crianças. A escolha concreta depende da idade, número de convidados, local e objetivo da festa.`,
    },
    {
      question: "Como escolher um profissional?",
      answer: "Compara a oferta disponível, verifica a zona de atuação e consulta diretamente o profissional sobre disponibilidade, preço, duração e condições.",
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Categorias", item: `${SITE_URL}/categorias` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/${category.slug}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-24 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <Link href="/categorias" className="text-sm font-semibold text-violet hover:text-violet-dark">
            ← Ver todas as categorias
          </Link>
          <span className={`mt-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${styles.badge}`}>
            Yuppi · {category.name}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.08] text-ink text-balance md:text-6xl">
            {category.seoTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-inkSoft">
            {category.intro} Consulta a informação disponível e visita diretamente os profissionais para confirmar disponibilidade e condições.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/profissionais" className={`rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] ${styles.button}`}>
              Ver profissionais
            </Link>
            <Link href="/blog/animacao-festas-infantis" className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-canvasSoft">
              Guia de animação infantil
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-content px-6 pb-16">
        <AdUnit id={`service-top-${category.slug}`} />
      </div>

      {profiles.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-content">
            <Reveal><h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Profissionais de {category.name.toLowerCase()}</h2></Reveal>
            <p className="mt-3 max-w-2xl text-inkSoft">Consulta alguns profissionais presentes no diretório da Yuppi e visita os respetivos perfis para obter mais informação.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((p) => (
                <Link key={p.slug} href={`/profissionais/perfil/${p.slug}`} className="overflow-hidden rounded-xl2 bg-canvasSoft shadow-card transition-transform hover:scale-[1.01]">
                  <div className="aspect-[4/3] w-full bg-white">{p.coverImage ? <img src={p.coverImage} alt={p.nome} className="h-full w-full object-cover" loading="lazy" /> : <div className="flex h-full items-center justify-center px-6 text-center font-display text-xl text-inkSoft">{p.nome}</div>}</div>
                  <div className="p-5"><h3 className="font-display text-xl font-medium text-ink">{p.nome}</h3><p className="mt-2 text-sm text-inkSoft">{p.resumo}</p><span className="mt-4 inline-block text-sm font-semibold text-violet">Ver perfil →</span></div>
                </Link>
              ))}
            </div>
            {Array.from(new Set(profiles.flatMap((p) => p.localidades))).length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-xl font-medium text-ink">Encontra por localização</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from(new Set(profiles.flatMap((p) => p.localidades))).map((cidade) => (
                    <Link key={cidade} href={`/profissionais/${category.slug}/${cidade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`} className="rounded-full border border-ink/10 bg-canvasSoft px-4 py-2 text-sm text-ink hover:border-violet/40">{category.name} em {cidade}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-content gap-6 md:grid-cols-2">
          <Reveal className={`rounded-xl2 ${styles.card} p-8 shadow-card`}>
            <h2 className="font-display text-2xl font-medium text-ink">O que podes encontrar</h2>
            <ul className="mt-5 space-y-3 text-inkSoft">
              {category.activities.map((item) => <li key={item}>✓ {item}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={80} className="rounded-xl2 bg-canvasSoft p-8 shadow-card">
            <h2 className="font-display text-2xl font-medium text-ink">Ideal para</h2>
            <ul className="mt-5 space-y-3 text-inkSoft">
              {category.idealFor.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-black/5 bg-canvasSoft px-6 py-24">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Como escolher o serviço certo</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-inkSoft">
              Uma boa escolha começa pelas características concretas da tua festa. Quanto mais informação deres, mais fácil é comparar opções adequadas.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {category.tips.map((tip, i) => (
              <Reveal key={tip} delay={i * 70} className="rounded-xl2 bg-white/70 p-7 shadow-card">
                <span className="font-display text-4xl text-violet-light">{i + 1}</span>
                <p className="mt-4 text-inkSoft">{tip}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-content px-6 pb-2">
        <AdUnit id={`service-mid-${category.slug}`} />
      </div>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Perguntas frequentes</h2>
          </Reveal>
          <div className="mt-10 space-y-7">
            {faqItems.map((item) => (
              <Reveal key={item.question}>
                <h3 className="font-display text-xl font-medium text-ink">{item.question}</h3>
                <p className="mt-2 leading-relaxed text-inkSoft">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 px-6 py-24">
        <Reveal className="mx-auto max-w-content">
          <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Também podes precisar de</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} className="rounded-xl2 bg-canvasSoft p-6 shadow-card transition-transform hover:scale-[1.01]">
                <h3 className="font-display text-xl font-medium text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inkSoft">{item.description}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden px-6 pb-28 pt-4">
        <Reveal className="mx-auto max-w-2xl rounded-xl2 bg-violet-light px-8 py-12 text-center shadow-card">
          <h2 className="font-display text-3xl font-medium text-ink">Queres comparar profissionais?</h2>
          <p className="mt-4 text-inkSoft">Explora o diretório da Yuppi e contacta diretamente os profissionais que fazem sentido para a tua festa.</p>
          <Link href="/profissionais" className="mt-7 inline-flex rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft hover:bg-violet-dark">
            Ver profissionais
          </Link>
        </Reveal>
      </section>
    </>
  );
}
