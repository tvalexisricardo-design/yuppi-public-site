"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import type { ProfileMeta } from "@/lib/professionals";

export function ProfessionalsFilter({ profiles }: { profiles: ProfileMeta[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categoria, setCategoria] = useState(searchParams.get("categoria") ?? "");
  const [localidade, setLocalidade] = useState(searchParams.get("localidade") ?? "");

  const categorias = useMemo(() => {
    const set = new Set<string>();
    profiles.forEach((p) => p.categorias.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [profiles]);

  const localidades = useMemo(() => {
    const set = new Set<string>();
    profiles.forEach((p) => p.localidades.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [profiles]);

  const filtered = profiles.filter((p) => {
    const matchesCategoria = !categoria || p.categorias.includes(categoria);
    const matchesLocalidade = !localidade || p.localidades.includes(localidade);
    return matchesCategoria && matchesLocalidade;
  });

  function updateFilters(nextCategoria: string, nextLocalidade: string) {
    setCategoria(nextCategoria);
    setLocalidade(nextLocalidade);
    const params = new URLSearchParams();
    if (nextCategoria) params.set("categoria", nextCategoria);
    if (nextLocalidade) params.set("localidade", nextLocalidade);
    const query = params.toString();
    router.replace(query ? `/profissionais?${query}` : "/profissionais", { scroll: false });
  }

  const selectClass =
    "rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink focus:border-violet";

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <select
          value={categoria}
          onChange={(e) => updateFilters(e.target.value, localidade)}
          className={selectClass}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={localidade}
          onChange={(e) => updateFilters(categoria, e.target.value)}
          className={selectClass}
        >
          <option value="">Todas as localidades</option>
          {localidades.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        {(categoria || localidade) && (
          <button
            type="button"
            onClick={() => updateFilters("", "")}
            className="text-sm font-medium text-violet hover:text-violet-dark"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-inkSoft">
          Ainda não há profissionais nesta combinação. Experimenta outra categoria ou
          localidade.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
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
                    <p className="mt-3 text-sm font-semibold text-ink">Desde {p.precoDesde} €</p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
