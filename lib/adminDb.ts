import { slugify } from "@/lib/slugify";

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export class AdminInputError extends Error {}

function assertDb() {
  if (!url || !key) throw new Error("Supabase não configurado. Define SUPABASE_URL e SUPABASE_SECRET_KEY.");
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  assertDb();
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key!,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: init.method === "POST" ? "return=representation" : "return=representation",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return [] as T;
  return res.json() as Promise<T>;
}

export function normalizeProfile(input: any) {
  const nome = String(input.nome ?? "").trim();
  if (!nome) throw new AdminInputError("Nome é obrigatório.");
  const requestedSlug = String(input.slug ?? "").trim();
  const slug = slugify(requestedSlug || nome);
  if (!slug) throw new AdminInputError("Slug inválido.");
  return {
    slug,
    nome,
    categorias: Array.isArray(input.categorias) ? input.categorias.map(String).map((x: string) => x.trim()).filter(Boolean) : [],
    localidades: Array.isArray(input.localidades) ? input.localidades.map(String).map((x: string) => x.trim()).filter(Boolean) : [],
    preco_desde: String(input.precoDesde ?? "").trim(),
    resumo: String(input.resumo ?? "").trim(),
    content_html: String(input.contentHtml ?? "").trim(),
    cover_image: String(input.coverImage ?? "").trim() || null,
    foto_fonte: String(input.fotoFonte ?? "").trim() || null,
    fotos: Array.isArray(input.fotos) ? input.fotos.map(String).map((x: string) => x.trim()).filter(Boolean).slice(0, 6) : [],
    website: String(input.website ?? "").trim() || null,
    instagram: String(input.instagram ?? "").trim() || null,
    facebook: String(input.facebook ?? "").trim() || null,
    whatsapp: String(input.whatsapp ?? "").trim() || null,
    fonte: String(input.fonte ?? "").trim() || null,
    tipo_perfil: input.tipoPerfil === "parceiro" ? "parceiro" : "diretorio",
    status: input.status === "draft" ? "draft" : input.status === "archived" ? "archived" : "published",
    atualizado_em: new Date().toISOString(),
  };
}

export async function listAdminProfiles() {
  return request<any[]>("professionals?select=*&order=updated_at.desc");
}

async function assertUniqueSlug(slug: string, excludeSlug?: string) {
  const filter = excludeSlug && excludeSlug !== slug
    ? `&slug=neq.${encodeURIComponent(excludeSlug)}`
    : "";
  const rows = await request<any[]>(`professionals?select=slug&slug=eq.${encodeURIComponent(slug)}&limit=1${filter}`);
  if (rows.length) throw new AdminInputError(`Já existe um profissional com o slug \"${slug}\".`);
}

export async function createProfile(input: any) {
  const row = normalizeProfile(input);
  await assertUniqueSlug(row.slug);
  return (await request<any[]>("professionals", { method: "POST", body: JSON.stringify(row) }))[0];
}

export async function updateProfile(slug: string, input: any) {
  const row = normalizeProfile(input);
  await assertUniqueSlug(row.slug, slug);
  const rows = await request<any[]>(`professionals?slug=eq.${encodeURIComponent(slug)}`, { method: "PATCH", body: JSON.stringify(row) });
  if (!rows[0]) throw new Error("Profissional não encontrado.");
  return rows[0];
}

export async function deleteProfile(slug: string) {
  await request<any[]>(`professionals?slug=eq.${encodeURIComponent(slug)}`, { method: "DELETE" });
}

export async function listCandidates() {
  return request<any[]>("scrape_candidates?select=*&order=created_at.desc");
}

export async function createCandidate(input: any) {
  const row = {
    url: String(input.url ?? "").trim(),
    nome: String(input.nome ?? "").trim() || null,
    descricao: String(input.descricao ?? "").trim() || null,
    imagem: String(input.imagem ?? "").trim() || null,
    categoria_sugerida: String(input.categoriaSugerida ?? "").trim() || null,
    localidade_sugerida: String(input.localidadeSugerida ?? "").trim() || null,
    estado: "novo",
  };
  return (await request<any[]>("scrape_candidates", { method: "POST", body: JSON.stringify(row) }))[0];
}

export async function updateCandidate(id: string, input: any) {
  return (await request<any[]>(`scrape_candidates?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(input) }))[0];
}
