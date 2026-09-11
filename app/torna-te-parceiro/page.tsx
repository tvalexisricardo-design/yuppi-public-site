import type { Metadata } from "next";
import Link from "next/link";
import { ConfettiField } from "@/components/Confetti";
import { AdUnit } from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Adicionar o teu negócio à Yuppi | Yuppi",
  description: "És profissional de animação infantil ou espetáculos? Envia os teus dados para a Yuppi e candidata-te a aparecer no diretório.",
  alternates: { canonical: "/torna-te-parceiro" },
};

const categories = [
  "Animadores infantis",
  "Mágicos e ilusionistas",
  "Mascotes e personagens",
  "Pinturas faciais",
  "Modelagem de balões",
  "Insufláveis",
  "Espetáculos infantis",
  "Decoração e fotografia",
  "Música e entretenimento",
];

export default function TornaTeParceiroPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <span className="inline-flex items-center rounded-full bg-teal-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
            Para profissionais
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            Queres aparecer no diretório da Yuppi?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-inkSoft">
            A Yuppi reúne profissionais e negócios de animação infantil e espetáculos em Portugal. Se tens um negócio nesta área, envia-nos os teus dados e analisamos a inclusão do teu perfil.
          </p>
          <a href="mailto:hello@yuppi.pt?subject=Adicionar%20negócio%20à%20Yuppi" className="mt-8 inline-flex rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft hover:bg-violet-dark">
            Enviar dados por email
          </a>
        </div>
      </section>

      <section className="border-y border-black/5 bg-canvasSoft px-6 py-10">
        <div className="mx-auto max-w-content"><AdUnit /></div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content">
          <h2 className="font-display text-3xl font-medium text-ink">Que profissionais procuramos?</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category} className="rounded-xl2 bg-canvasSoft p-6 shadow-card">
                <p className="font-medium text-ink">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvasSoft px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-medium text-ink">O que enviar</h2>
          <ul className="mt-7 space-y-4 text-inkSoft">
            <li>• Nome comercial e nome do responsável</li>
            <li>• Website e/ou redes sociais</li>
            <li>• Categorias de serviço</li>
            <li>• Cidades ou regiões onde trabalha</li>
            <li>• Uma breve descrição do serviço</li>
            <li>• Links para o teu website, Instagram, Facebook ou portefólio online</li>
          </ul>
          <p className="mt-8 text-sm text-inkSoft">
            A Yuppi pode pedir confirmação adicional antes de publicar um perfil. A inclusão no diretório não implica recomendação, verificação ou representação comercial pela Yuppi.
          </p>
          <a href="mailto:hello@yuppi.pt?subject=Adicionar%20negócio%20à%20Yuppi" className="mt-8 inline-flex rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink hover:bg-white">
            hello@yuppi.pt
          </a>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-content rounded-xl2 bg-violet-light px-8 py-12 text-center shadow-card">
          <h2 className="font-display text-3xl font-medium text-ink">Já procuras um profissional?</h2>
          <p className="mt-3 text-inkSoft">Explora o diretório e contacta diretamente quem presta o serviço.</p>
          <Link href="/profissionais" className="mt-7 inline-flex rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white hover:bg-violet-dark">
            Explorar profissionais
          </Link>
        </div>
      </section>
    </>
  );
}
