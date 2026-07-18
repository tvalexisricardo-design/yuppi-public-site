"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { submitForm } from "@/lib/submitForm";

const TIPOS = ["Animadores", "Mágicos", "Mascotes", "Pinturas Faciais", "Modelagem de Balões", "Insufláveis", "Decoração", "Fotografia", "DJ / Música", "Pacote / Vários Serviços"];

const EVENTOS = ["Aniversário", "Batizado", "Comunhão", "Festa Escolar", "Festa de Fim de Ano", "Outro"];

const WHATSAPP_NUMBER = "351922008673";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-inkSoft/50 focus:border-violet";

function buildWhatsAppMessage(formData: FormData, profissionalRef: string | null) {
  const get = (key: string) => (formData.get(key) as string)?.trim();

  const lines = [
    "Olá! Gostava de pedir um orçamento para uma festa infantil.",
    "",
    profissionalRef && `Perfil de referência: ${profissionalRef}`,
    get("nome") && `Nome: ${get("nome")}`,
    get("telefone") && `Telefone: ${get("telefone")}`,
    get("cidade") && `Cidade: ${get("cidade")}`,
    get("data") && `Data: ${get("data")}`,
    get("hora") && `Hora: ${get("hora")}`,
    get("evento") && `Tipo de evento: ${get("evento")}`,
    get("tipo") && `Tipo de animação: ${get("tipo")}`,
    get("mensagem") && `Mensagem: ${get("mensagem")}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export function QuoteRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const profissionalRef = searchParams.get("profissional");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const formData = new FormData(e.currentTarget);
      await submitForm(formData, "Novo pedido de orçamento — Yuppi");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function handleWhatsApp() {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const message = buildWhatsAppMessage(formData, profissionalRef);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (status === "done") {
    return (
      <p className="rounded-xl2 bg-teal-light px-6 py-6 text-center font-medium text-ink">
        Pedido recebido! A nossa equipa vai analisar e entra em contacto contigo com as
        melhores propostas.
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-left">
      {profissionalRef && (
        <>
          <input type="hidden" name="profissional_referencia" value={profissionalRef} />
          <p className="rounded-lg bg-teal-light px-4 py-2 text-xs text-ink">
            A pedir orçamento com referência ao perfil: <strong>{profissionalRef}</strong>
          </p>
        </>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="nome" required placeholder="O teu nome" className={inputClass} />
        <input name="email" required type="email" placeholder="o.teu@email.com" className={inputClass} />
        <input name="telefone" type="tel" placeholder="Telefone" className={inputClass} />
        <input name="cidade" placeholder="Cidade" className={inputClass} />
        <input name="data" type="date" aria-label="Data da festa" className={inputClass} />
        <input name="hora" type="time" aria-label="Hora pretendida" className={inputClass} />
        <select name="evento" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Tipo de evento
          </option>
          {EVENTOS.map((ev) => (
            <option key={ev} value={ev}>
              {ev}
            </option>
          ))}
        </select>
        <select name="tipo" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Tipo de animação
          </option>
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="mensagem"
        rows={3}
        placeholder="Conta-nos mais sobre a festa que tens em mente (opcional)"
        className={inputClass}
      />
      {status === "error" && (
        <p className="text-sm text-magenta">
          Não foi possível enviar o pedido. Tenta novamente ou escreve para{" "}
          <a href="mailto:hello@yuppi.pt" className="underline">
            hello@yuppi.pt
          </a>
          .
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02] hover:bg-violet-dark disabled:opacity-60"
        >
          {status === "loading" ? "A enviar…" : "Pedir Orçamento"}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-canvasSoft"
        >
          Enviar por WhatsApp
        </button>
      </div>
    </form>
  );
}
