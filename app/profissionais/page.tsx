import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";
import { getAllProfiles } from "@/lib/professionals";

export const metadata: Metadata = {
  title: "Profissionais | Yuppi",
  description: "Conhece os profissionais de festas infantis disponíveis na Yuppi.",
  alternates: { canonical: "/profissionais" },
};

export default function ProfissionaisIndexPage() {
  const profiles = getAllProfiles();

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">
            Profissionais
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            Conhece quem vai animar a tua festa.
          </h1>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-content">
          {profiles.length === 0 ? (
            <p className="text-inkSoft">Ainda não há profissionais publicados.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link
                    href={`/profissionais/${p.slug}`}
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
                      <p className="text-xs font-medium uppercase tracking-wide text-violet">
                        {p.categoria} · {p.cidade}
                      </p>
                      <h2 className="mt-2 font-display text-lg font-medium text-ink">
                        {p.nome}
                      </h2>
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
          )}
        </div>
      </section>
    </>
  );
}
