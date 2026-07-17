"use client";

import { useState } from "react";
import {
  encodeProposal,
  totalProposal,
  type ProposalData,
  type ProposalProfessional,
} from "@/lib/proposal";

const emptyProfissional: ProposalProfessional = { nome: "", categoria: "", preco: "", link: "" };

const CONDICOES_DEFAULT = `Sinal de 30% para confirmar a reserva, restante no dia do evento.
Cancelamento gratuito até 7 dias antes do evento.
Proposta válida por 7 dias a partir da data de envio.`;

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-inkSoft/50 focus:border-violet";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminOrcamentoPage() {
  const [cliente, setCliente] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [slug, setSlug] = useState("");
  const [profissionais, setProfissionais] = useState<ProposalProfessional[]>([
    { ...emptyProfissional },
  ]);
  const [outrosCustos, setOutrosCustos] = useState("");
  const [outrosCustosDescricao, setOutrosCustosDescricao] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("Transferência Bancária / MB WAY");
  const [condicoes, setCondicoes] = useState(CONDICOES_DEFAULT);
  const [validade, setValidade] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  function updateProfissional(index: number, field: keyof ProposalProfessional, value: string) {
    setProfissionais((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  function addProfissional() {
    setProfissionais((prev) => [...prev, { ...emptyProfissional }]);
  }

  function removeProfissional(index: number) {
    setProfissionais((prev) => prev.filter((_, i) => i !== index));
  }

  function generateLink() {
    const data: ProposalData = {
      cliente,
      dataEvento,
      profissionais: profissionais.filter((p) => p.nome.trim() !== ""),
      outrosCustos,
      outrosCustosDescricao,
      metodoPagamento,
      condicoes,
      validade,
    };
    const encoded = encodeProposal(data);
    const cleanSlug = slugify(slug);
    const url = cleanSlug
      ? `${window.location.origin}/orcamento/${cleanSlug}?d=${encodeURIComponent(encoded)}`
      : `${window.location.origin}/orcamento?d=${encodeURIComponent(encoded)}`;
    setLink(url);
    setCopied(false);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const total = totalProposal({
    cliente,
    dataEvento,
    profissionais,
    outrosCustos,
    outrosCustosDescricao,
    metodoPagamento,
    condicoes,
    validade,
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-2xl font-medium text-ink">Criar Proposta</h1>
      <p className="mt-2 text-sm text-inkSoft">
        Ferramenta interna — preenche os dados e gera um link para enviar ao cliente.
        Ninguém encontra esta página por acaso, mas não tem password. Ver README para
        detalhes.
      </p>

      <div className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-ink">Nome do cliente</span>
            <input
              className={`mt-1.5 ${inputClass}`}
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ex: Ana Silva"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Data do evento</span>
            <input
              type="date"
              className={`mt-1.5 ${inputClass}`}
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
            />
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-ink">Identificador do link (opcional)</span>
          <input
            className={`mt-1.5 ${inputClass}`}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Ex: proposta006-26"
          />
          <p className="mt-1.5 text-xs text-inkSoft">
            Só a parte visível do link — os dados da proposta continuam codificados no
            link, isto é apenas para o tornar mais reconhecível. Espaços viram traços
            automaticamente.
          </p>
        </label>

        <div>
          <span className="text-sm font-medium text-ink">Profissionais selecionados</span>
          <div className="mt-2 space-y-3">
            {profissionais.map((p, i) => (
              <div key={i} className="rounded-xl border border-ink/10 bg-canvasSoft p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={inputClass}
                    placeholder="Nome do profissional"
                    value={p.nome}
                    onChange={(e) => updateProfissional(i, "nome", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="Categoria (ex: Animador)"
                    value={p.categoria}
                    onChange={(e) => updateProfissional(i, "categoria", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="Preço (€)"
                    type="number"
                    value={p.preco}
                    onChange={(e) => updateProfissional(i, "preco", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="Link do portfólio (opcional)"
                    value={p.link}
                    onChange={(e) => updateProfissional(i, "link", e.target.value)}
                  />
                </div>
                {profissionais.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProfissional(i)}
                    className="mt-2 text-xs font-medium text-magenta hover:underline"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addProfissional}
            className="mt-3 text-sm font-semibold text-violet hover:text-violet-dark"
          >
            + Adicionar profissional
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-ink">Outros custos (€, opcional)</span>
            <input
              className={`mt-1.5 ${inputClass}`}
              type="number"
              value={outrosCustos}
              onChange={(e) => setOutrosCustos(e.target.value)}
              placeholder="0"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Descrição desses custos</span>
            <input
              className={`mt-1.5 ${inputClass}`}
              value={outrosCustosDescricao}
              onChange={(e) => setOutrosCustosDescricao(e.target.value)}
              placeholder="Ex: Deslocação"
            />
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-medium text-ink">Método de pagamento</span>
          <input
            className={`mt-1.5 ${inputClass}`}
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-ink">Condições</span>
          <textarea
            className={`mt-1.5 ${inputClass}`}
            rows={4}
            value={condicoes}
            onChange={(e) => setCondicoes(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-ink">Proposta válida até (opcional)</span>
          <input
            type="date"
            className={`mt-1.5 ${inputClass}`}
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
          />
        </label>

        <p className="text-sm font-medium text-ink">Total estimado: {total.toFixed(2)} €</p>

        <button
          type="button"
          onClick={generateLink}
          className="w-full rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02] hover:bg-violet-dark sm:w-auto"
        >
          Gerar link da proposta
        </button>

        {link && (
          <div className="rounded-xl2 bg-teal-light px-5 py-4">
            <p className="break-all text-sm text-ink">{link}</p>
            <button
              type="button"
              onClick={copyLink}
              className="mt-3 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white hover:bg-ink/90"
            >
              {copied ? "Copiado!" : "Copiar link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
