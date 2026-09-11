import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export interface ProposalProfessional {
  nome: string;
  categoria: string;
  preco: string;
  link: string;
}

export interface ProposalData {
  cliente: string;
  dataEvento: string;
  profissionais: ProposalProfessional[];
  outrosCustos: string;
  outrosCustosDescricao: string;
  metodoPagamento: string;
  condicoes: string;
  validade: string;
}

/**
 * Compact representation used only for the URL: short keys, and each
 * professional is an array (not an object) to avoid repeating field names.
 * This roughly halves the payload before compression even kicks in.
 */
type CompactProfessional = [nome: string, categoria: string, preco: string, link: string];

interface CompactProposal {
  c: string; // cliente
  d: string; // dataEvento
  p: CompactProfessional[]; // profissionais
  x: string; // outrosCustos
  xd: string; // outrosCustosDescricao
  m: string; // metodoPagamento
  co: string; // condicoes
  v: string; // validade
}

function toCompact(data: ProposalData): CompactProposal {
  return {
    c: data.cliente,
    d: data.dataEvento,
    p: data.profissionais.map((p) => [p.nome, p.categoria, p.preco, p.link]),
    x: data.outrosCustos,
    xd: data.outrosCustosDescricao,
    m: data.metodoPagamento,
    co: data.condicoes,
    v: data.validade,
  };
}

function fromCompact(compact: CompactProposal): ProposalData {
  return {
    cliente: compact.c ?? "",
    dataEvento: compact.d ?? "",
    profissionais: (compact.p ?? []).map(([nome, categoria, preco, link]) => ({
      nome: nome ?? "",
      categoria: categoria ?? "",
      preco: preco ?? "",
      link: link ?? "",
    })),
    outrosCustos: compact.x ?? "",
    outrosCustosDescricao: compact.xd ?? "",
    metodoPagamento: compact.m ?? "",
    condicoes: compact.co ?? "",
    validade: compact.v ?? "",
  };
}

/** Encodes proposal data into a short, URL-safe compressed string. */
export function encodeProposal(data: ProposalData): string {
  const json = JSON.stringify(toCompact(data));
  return compressToEncodedURIComponent(json);
}

/** Decodes a compressed string back into proposal data. */
export function decodeProposal(encoded: string): ProposalData | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return fromCompact(JSON.parse(json) as CompactProposal);
  } catch {
    return null;
  }
}

export function totalProposal(data: ProposalData): number {
  const profTotal = data.profissionais.reduce(
    (sum, p) => sum + (parseFloat(p.preco) || 0),
    0
  );
  const extra = parseFloat(data.outrosCustos) || 0;
  return profTotal + extra;
}
