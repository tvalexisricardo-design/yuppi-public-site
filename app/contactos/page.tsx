import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ConfettiField } from "@/components/Confetti";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Fala com a equipa Yuppi. Estamos disponíveis para famílias e profissionais de festas infantis em Portugal.",
  alternates: { canonical: "/contactos" },
};

export default function ContactosPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contactos Yuppi",
    url: "https://www.yuppi.pt/contactos",
    mainEntity: {
      "@type": "Organization",
      name: "Yuppi",
      email: "hello@yuppi.pt",
      telephone: "+351922008673",
      // Assumimos todos os dias da semana — ajusta se o horário só se aplicar
      // a dias úteis (ex: remover Saturday/Sunday).
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <ConfettiField variant="divider" />
        <Reveal className="relative mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet">
            Contactos
          </span>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] text-ink text-balance md:text-5xl">
            Estamos aqui para ajudar.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-inkSoft">
            Seja para organizar a festa perfeita ou para te tornares Parceiro Yuppi,
            escreve-nos — respondemos o mais depressa possível.
          </p>

          <a
            href="mailto:hello@yuppi.pt"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-violet px-8 py-4 text-base font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
          >
            hello@yuppi.pt
          </a>

          <p className="mt-6">
            <a href="tel:+351922008673" className="text-lg font-medium text-ink hover:text-violet">
              922 008 673
            </a>
          </p>

          <p className="mt-4 text-sm text-inkSoft">Horário de atendimento: 10h – 18h</p>

          <p className="mt-6 text-sm text-inkSoft">
            Por email, respondemos tipicamente em 1 a 2 dias úteis. Para algo urgente,
            usa o WhatsApp.
          </p>
        </Reveal>
      </section>
    </>
  );
}
