import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PartnerForm } from "@/components/PartnerForm";
import { ConfettiField } from "@/components/Confetti";

export const metadata: Metadata = {
  title: "Torna-te Parceiro Yuppi | Recebe Clientes para Festas Infantis",
  description:
    "A Yuppi encontra clientes para animadores, mágicos, mascotes e outros profissionais de festas infantis em Portugal. Candidata-te a Parceiro Fundador.",
  alternates: { canonical: "/torna-te-parceiro" },
  openGraph: {
    title: "Torna-te Parceiro Yuppi",
    description:
      "A Yuppi encontra clientes para profissionais de qualidade. Candidata-te a Parceiro Fundador.",
    url: "https://www.yuppi.pt/torna-te-parceiro",
  },
};

const audience = [
  "Animadores infantis com experiência comprovada",
  "Mágicos e ilusionistas para festas",
  "Mascotes profissionais",
  "Artistas de pinturas faciais",
  "Especialistas em modelagem de balões",
  "Fornecedores de insufláveis",
  "Especialistas em decoração de festas",
  "Fotógrafos especializados em festas infantis",
  "DJs e músicos para festas",
];

const advantages = [
  {
    title: "Clientes, não leads frios",
    body: "Trazemos-te famílias que já sabem o que procuram e estão prontas para reservar — não contactos genéricos.",
  },
  {
    title: "A tua agenda, as tuas condições",
    body: "Defines a tua disponibilidade e os teus serviços. A Yuppi trabalha à volta do teu negócio, não o contrário.",
  },
  {
    title: "Reputação protegida",
    body: "Um perfil cuidado, com o teu portefólio em destaque, junto de uma marca que os pais já reconhecem e em quem confiam.",
  },
  {
    title: "Sem custos de entrada",
    body: "A candidatura como Parceiro Fundador é gratuita — e vai ser sempre gratuita. Queremos os melhores profissionais na fundação da Yuppi.",
  },
];

const process = [
  { n: "1", title: "Candidatura", body: "Preenches o formulário abaixo com o teu perfil e portefólio." },
  { n: "2", title: "Análise", body: "A nossa equipa revê cada candidatura para garantir a qualidade da rede Yuppi." },
  { n: "3", title: "Confirmação", body: "Entramos em contacto contigo para confirmar os detalhes e ativar o teu perfil." },
  { n: "4", title: "Primeiros clientes", body: "Começas a receber pedidos assim que o teu perfil estiver disponível." },
];

export default function TornaTeParceiroPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
        <ConfettiField variant="divider" />
        <div className="relative mx-auto max-w-content">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
            Parceiros Fundadores
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            Encontramos os clientes. Tu fazes a magia acontecer.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkSoft">
            A Yuppi é uma empresa especializada em ligar famílias a profissionais de
            festas infantis de qualidade. Não somos um diretório — trabalhamos para te
            trazer clientes certos, para que tu te possas focar no que fazes melhor.
          </p>
        </div>
      </section>

      {/* QUEM PROCURAMOS */}
      <section className="border-y border-black/5 bg-canvasSoft px-6 py-20">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Quem procuramos
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {audience.map((item, i) => (
              <Reveal key={item} delay={i * 60} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                <span className="text-inkSoft">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VANTAGENS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Porque trabalhar com a Yuppi
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <h3 className="font-display text-lg font-medium text-ink">{a.title}</h3>
                <p className="mt-2 text-inkSoft">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO DE SELEÇÃO */}
      <section className="bg-canvasSoft px-6 py-24">
        <div className="mx-auto max-w-content">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Como funciona a candidatura
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <span className="font-display text-4xl font-medium text-violet-light">
                  {p.n}
                </span>
                <h3 className="mt-3 font-display text-base font-medium text-ink">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-inkSoft">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="candidatura" className="px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
              Candidata-te a Parceiro Fundador
            </h2>
            <p className="mt-3 text-inkSoft">
              Demora cerca de 5 minutos. Quanto mais completo o teu perfil, mais rápida
              é a análise.
            </p>
          </Reveal>
          <div className="mt-10">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
