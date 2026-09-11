"use client";

import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/submitForm";

const SERVICES = [
  "Animadores",
  "Mágicos",
  "Mascotes",
  "Pinturas Faciais",
  "Modelagem de Balões",
  "Insufláveis",
  "Decoração",
  "Fotografia",
  "DJ / Música",
];

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-magenta"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-inkSoft/50 focus:border-violet";

export function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [services, setServices] = useState<string[]>([]);

  function toggleService(s: string) {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const formData = new FormData(e.currentTarget);
      await submitForm(formData, "Nova candidatura de Parceiro — Yuppi");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl2 bg-teal-light px-8 py-12 text-center">
        <h3 className="font-display text-2xl font-medium text-ink">
          Candidatura recebida!
        </h3>
        <p className="mt-3 text-inkSoft">
          Obrigado pelo teu interesse. A nossa equipa vai analisar o teu perfil e
          entra em contacto em breve para os próximos passos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" required>
          <input name="nome" required className={inputClass} placeholder="O teu nome" />
        </Field>
        <Field label="Telefone" required>
          <input name="telefone" required type="tel" className={inputClass} placeholder="+351" />
        </Field>
        <Field label="Email" required>
          <input name="email" required type="email" className={inputClass} placeholder="o.teu@email.com" />
        </Field>
        <Field label="Cidade" required>
          <input name="cidade" required className={inputClass} placeholder="Ex: Setúbal" />
        </Field>
        <Field label="Distrito" required>
          <input name="distrito" required className={inputClass} placeholder="Ex: Setúbal" />
        </Field>
        <Field label="Disponibilidade">
          <select name="disponibilidade" className={inputClass} defaultValue="">
            <option value="" disabled>
              Seleciona
            </option>
            <option value="fins-de-semana">Fins de semana</option>
            <option value="semana">Durante a semana</option>
            <option value="ambos">Ambos</option>
          </select>
        </Field>
      </div>

      <Field label="Serviços" required>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => toggleService(s)}
              aria-pressed={services.includes(s)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                services.includes(s)
                  ? "border-violet bg-violet-light text-violet"
                  : "border-ink/15 text-inkSoft hover:border-ink/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input type="hidden" name="servicos" value={services.join(",")} />
      </Field>

      <Field label="Descrição" required>
        <textarea
          name="descricao"
          required
          rows={4}
          className={inputClass}
          placeholder="Conta-nos sobre o teu trabalho e o que te torna especial."
        />
      </Field>

      <Field label="Experiência">
        <textarea
          name="experiencia"
          rows={3}
          className={inputClass}
          placeholder="Há quanto tempo trabalhas com festas infantis? Alguns marcos relevantes."
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Website">
          <input name="website" type="url" className={inputClass} placeholder="https://" />
        </Field>
        <Field label="Instagram">
          <input name="instagram" className={inputClass} placeholder="@utilizador" />
        </Field>
        <Field label="Facebook">
          <input name="facebook" className={inputClass} placeholder="facebook.com/..." />
        </Field>
        <Field label="TikTok">
          <input name="tiktok" className={inputClass} placeholder="@utilizador" />
        </Field>
        <Field label="Link YouTube">
          <input name="youtube" type="url" className={inputClass} placeholder="https://" />
        </Field>
        <Field label="Portfólio">
          <input name="portfolio" type="url" className={inputClass} placeholder="https://" />
        </Field>
      </div>

      <Field label="Fotografias e vídeos">
        <input
          name="portfolio_media"
          type="url"
          className={inputClass}
          placeholder="Link Dropbox ou Google Drive"
        />
        <p className="mt-2 text-xs text-inkSoft">
          Partilha uma pasta com fotos e vídeos do teu trabalho, sem marca de água e
          sem contactos visíveis (telefone, email, redes sociais). Confirma que a
          partilha está definida como pública ("qualquer pessoa com o link").
        </p>
      </Field>

      <Field label="Mensagem">
        <textarea
          name="mensagem"
          rows={3}
          className={inputClass}
          placeholder="Algo mais que gostarias de partilhar connosco?"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-magenta">
          Não foi possível enviar a candidatura. Tenta novamente ou escreve para{" "}
          <a href="mailto:hello@yuppi.pt" className="underline">
            hello@yuppi.pt
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-violet px-7 py-4 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.01] hover:bg-violet-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "A enviar candidatura…" : "Candidatar-me"}
      </button>
    </form>
  );
}
