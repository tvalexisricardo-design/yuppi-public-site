import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfettiField } from "@/components/Confetti";
import { ProfessionalsFilter } from "@/components/ProfessionalsFilter";
import { getAllProfiles } from "@/lib/professionals";
import { SHOW_PROFISSIONAIS } from "@/lib/featureFlags";

export const metadata: Metadata = {
  title: "Profissionais | Yuppi",
  description: "Conhece os profissionais de festas infantis disponíveis na Yuppi.",
  alternates: { canonical: "/profissionais" },
  robots: SHOW_PROFISSIONAIS ? undefined : { index: false, follow: false },
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
            <Suspense fallback={<div className="h-48" />}>
              <ProfessionalsFilter profiles={profiles} />
            </Suspense>
          )}
        </div>
      </section>
    </>
  );
}
