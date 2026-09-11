import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { slugify } from "@/lib/slugify";

const PROFILES_DIR = path.join(process.cwd(), "content", "profissionais");
const DB_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const DB_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const USE_DB = Boolean(DB_URL && DB_KEY);

export interface ProfileMeta {
  slug: string;
  nome: string;
  categorias: string[];
  localidades: string[];
  precoDesde: string;
  resumo: string;
  coverImage?: string;
  fotoFonte?: string;
  fotos?: string[];
  youtube?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  facebook?: string;
  fonte?: string;
  atualizadoEm?: string;
  tipoPerfil?: "parceiro" | "diretorio";
  status?: "draft" | "published" | "archived";
}

export interface Profile extends ProfileMeta {
  contentHtml: string;
}

export interface CategoryCityCombo {
  categoriaSlug: string;
  categoriaNome: string;
  cidadeSlug: string;
  cidadeNome: string;
  perfis: ProfileMeta[];
}

function readListField(data: Record<string, unknown>, listKey: string, singularKey: string): string[] {
  const list = data[listKey];
  if (Array.isArray(list)) return list.map(String).filter(Boolean);
  const single = data[singularKey];
  if (typeof single === "string" && single.trim()) return [single.trim()];
  return [];
}

function parseProfileMeta(slug: string, data: Record<string, unknown>): ProfileMeta {
  return {
    slug,
    nome: String(data.nome ?? slug),
    categorias: readListField(data, "categorias", "categoria"),
    localidades: readListField(data, "localidades", "cidade"),
    precoDesde: String(data.precoDesde ?? ""),
    resumo: String(data.resumo ?? ""),
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    fotoFonte: typeof data.fotoFonte === "string" ? data.fotoFonte : undefined,
    fotos: Array.isArray(data.fotos) ? data.fotos.map(String).slice(0, 6) : undefined,
    youtube: typeof data.youtube === "string" ? data.youtube : undefined,
    whatsapp: typeof data.whatsapp === "string" ? data.whatsapp : undefined,
    instagram: typeof data.instagram === "string" ? data.instagram : undefined,
    website: typeof data.website === "string" ? data.website : undefined,
    facebook: typeof data.facebook === "string" ? data.facebook : undefined,
    fonte: typeof data.fonte === "string" ? data.fonte : undefined,
    atualizadoEm: typeof data.atualizadoEm === "string" ? data.atualizadoEm : undefined,
    tipoPerfil: (data.tipoPerfil as "parceiro" | "diretorio" | undefined) ?? "diretorio",
    status: (data.status as ProfileMeta["status"] | undefined) ?? "published",
  };
}

function readFileProfiles(): Profile[] {
  if (!fs.existsSync(PROFILES_DIR)) return [];
  return fs.readdirSync(PROFILES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(path.join(PROFILES_DIR, file), "utf8");
      const { data, content } = matter(fileContents);
      return { ...parseProfileMeta(slug, data), contentHtml: marked.parse(content, { async: false }) as string };
    })
    .filter((profile) => profile.status !== "archived");
}

async function dbRequest<T>(endpoint: string, init: RequestInit = {}): Promise<T> {
  if (!USE_DB) throw new Error("Supabase não configurado");
  const response = await fetch(`${DB_URL}/rest/v1/${endpoint}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: DB_KEY!,
      Authorization: `Bearer ${DB_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`);
  if (response.status === 204) return [] as T;
  return response.json() as Promise<T>;
}

function dbRowToMeta(row: Record<string, unknown>): ProfileMeta {
  return {
    slug: String(row.slug),
    nome: String(row.nome ?? row.slug),
    categorias: Array.isArray(row.categorias) ? row.categorias.map(String) : [],
    localidades: Array.isArray(row.localidades) ? row.localidades.map(String) : [],
    precoDesde: String(row.preco_desde ?? ""),
    resumo: String(row.resumo ?? ""),
    coverImage: row.cover_image ? String(row.cover_image) : undefined,
    fotoFonte: row.foto_fonte ? String(row.foto_fonte) : undefined,
    fotos: Array.isArray(row.fotos) ? row.fotos.map(String).slice(0, 6) : undefined,
    youtube: row.youtube ? String(row.youtube) : undefined,
    whatsapp: row.whatsapp ? String(row.whatsapp) : undefined,
    instagram: row.instagram ? String(row.instagram) : undefined,
    website: row.website ? String(row.website) : undefined,
    facebook: row.facebook ? String(row.facebook) : undefined,
    fonte: row.fonte ? String(row.fonte) : undefined,
    atualizadoEm: row.atualizado_em ? String(row.atualizado_em) : undefined,
    tipoPerfil: row.tipo_perfil === "parceiro" ? "parceiro" : "diretorio",
    status: row.status === "draft" ? "draft" : row.status === "archived" ? "archived" : "published",
  };
}

async function dbProfiles(includeDrafts = false): Promise<ProfileMeta[]> {
  const status = includeDrafts ? "" : "&status=eq.published";
  const rows = await dbRequest<Record<string, unknown>[]>(`professionals?select=*&order=nome.asc${status}`);
  return rows.map(dbRowToMeta);
}

export async function getAllProfiles(): Promise<ProfileMeta[]> {
  if (!USE_DB) return readFileProfiles().map(({ contentHtml: _html, ...meta }) => meta);
  return dbProfiles(false);
}

export async function getAllProfileSlugs(): Promise<string[]> {
  return (await getAllProfiles()).map((p) => p.slug);
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  if (!USE_DB) return readFileProfiles().find((p) => p.slug === slug) ?? null;
  const rows = await dbRequest<Record<string, unknown>[]>(`professionals?select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
  if (!rows[0]) return null;
  const meta = dbRowToMeta(rows[0]);
  return { ...meta, contentHtml: String(rows[0].content_html ?? "") };
}

export async function getAllCategoryCityCombos(): Promise<CategoryCityCombo[]> {
  const profiles = await getAllProfiles();
  const combos = new Map<string, CategoryCityCombo>();
  for (const profile of profiles) {
    for (const categoriaNome of profile.categorias) {
      for (const cidadeNome of profile.localidades) {
        const categoriaSlug = slugify(categoriaNome);
        const cidadeSlug = slugify(cidadeNome);
        const key = `${categoriaSlug}/${cidadeSlug}`;
        if (!combos.has(key)) combos.set(key, { categoriaSlug, categoriaNome, cidadeSlug, cidadeNome, perfis: [] });
        combos.get(key)!.perfis.push(profile);
      }
    }
  }
  return Array.from(combos.values());
}

export async function getCombo(categoriaSlug: string, cidadeSlug: string): Promise<CategoryCityCombo | null> {
  return (await getAllCategoryCityCombos()).find((c) => c.categoriaSlug === categoriaSlug && c.cidadeSlug === cidadeSlug) ?? null;
}

export function isDatabaseConfigured() { return USE_DB; }

export function extractYouTubeId(input: string): string | null {
  const idMatch = input.match(/^[a-zA-Z0-9_-]{11}$/);
  if (idMatch) return input;
  const patterns = [/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/, /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/, /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/, /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/];
  for (const pattern of patterns) { const match = input.match(pattern); if (match) return match[1]; }
  return null;
}
