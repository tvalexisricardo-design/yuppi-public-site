import Image from "next/image";
import { decodeProposal, totalProposal } from "@/lib/proposal";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ProposalView({ d }: { d?: string }) {
  const data = d ? decodeProposal(d) : null;

  if (!data) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-medium text-ink">
          Proposta não encontrada
        </h1>
        <p className="mt-3 text-inkSoft">
          O link pode estar incompleto ou incorreto. Contacta{" "}
          <a href="mailto:hello@yuppi.pt" className="text-violet underline">
            hello@yuppi.pt
          </a>{" "}
          para receberes a proposta novamente.
        </p>
      </div>
    );
  }

  const total = totalProposal(data);
  const whatsappMessage = encodeURIComponent(
    `Olá! Quero confirmar a proposta para ${data.cliente || "o meu evento"}.`
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Image src="/yuppi-logo.png" alt="Yuppi" width={132} height={81} className="h-10 w-auto" />

      <h1 className="mt-8 font-display text-3xl font-medium text-ink">
        Proposta para {data.cliente || "a tua festa"}
      </h1>
      {data.dataEvento && (
        <p className="mt-2 text-inkSoft">Data do evento: {formatDate(data.dataEvento)}</p>
      )}

      <div className="mt-8 space-y-3">
        {data.profissionais.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl2 bg-canvasSoft px-6 py-4"
          >
            <div>
              <p className="font-display text-lg font-medium text-ink">{p.nome}</p>
              {p.categoria && <p className="text-sm text-inkSoft">{p.categoria}</p>}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet hover:underline"
                >
                  Ver portfólio
                </a>
              )}
            </div>
            {p.preco && (
              <p className="font-display text-lg font-medium text-ink">{p.preco} €</p>
            )}
          </div>
        ))}

        {data.outrosCustos && parseFloat(data.outrosCustos) > 0 && (
          <div className="flex items-center justify-between rounded-xl2 bg-canvasSoft px-6 py-4">
            <p className="text-inkSoft">{data.outrosCustosDescricao || "Outros custos"}</p>
            <p className="font-medium text-ink">{data.outrosCustos} €</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl2 bg-violet-light px-6 py-5">
        <p className="font-display text-lg font-medium text-ink">Total</p>
        <p className="font-display text-2xl font-medium text-violet">{total.toFixed(2)} €</p>
      </div>

      {data.metodoPagamento && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-medium text-ink">Método de pagamento</h2>
          <p className="mt-1 text-inkSoft">{data.metodoPagamento}</p>
        </div>
      )}

      {data.condicoes && (
        <div className="mt-6">
          <h2 className="font-display text-lg font-medium text-ink">Condições</h2>
          <p className="mt-1 whitespace-pre-line text-inkSoft">{data.condicoes}</p>
        </div>
      )}

      {data.validade && (
        <p className="mt-6 text-sm text-inkSoft">
          Proposta válida até {formatDate(data.validade)}.
        </p>
      )}

      <a
        href={`https://wa.me/351922008673?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-violet px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-violet-dark"
      >
        Confirmar via WhatsApp
      </a>

      <p className="mt-4 text-xs text-inkSoft">
        Dúvidas? Escreve para{" "}
        <a href="mailto:hello@yuppi.pt" className="text-violet underline">
          hello@yuppi.pt
        </a>
      </p>
    </div>
  );
}
