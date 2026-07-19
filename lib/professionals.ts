import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { slugify } from "@/lib/slugify";

const PROFILES_DIR = path.join(process.cwd(), "content", "profissionais");

/** Accepts a full YouTube URL (any common format) or a bare video ID. */
export function extractYouTubeId(input: string): string | null {
  const idMatch = input.match(/^[a-zA-Z0-9_-]{11}$/);
  if (idMatch) return input;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export interface ProfileMeta {
  slug: string;
  nome: string;
  categorias: string[];
  localidades: string[];
  precoDesde: string;
  resumo: string;
  coverImage?: string;
  fotos?: string[];
  youtube?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
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

/**
 * Reads categorias/localidades as lists, but also accepts the older
 * singular `categoria`/`cidade` string fields for backwards compatibility
 * with profiles written before this supported multiple categories/cities.
 */
function readListField(data: Record<string, unknown>, listKey: string, singularKey: string): string[] {
  const list = data[listKey];
  if (Array.isArray(list)) return list as string[];
  const single = data[singularKey];
  if (typeof single === "string" && single.trim()) return [single];
  return [];
}

function parseProfileMeta(slug: string, data: Record<string, unknown>): ProfileMeta {
  return {
    slug,
    nome: data.nome as string,
    categorias: readListField(data, "categorias", "categoria"),
    localidades: readListField(data, "localidades", "cidade"),
    precoDesde: data.precoDesde as string,
    resumo: data.resumo as string,
    coverImage: data.coverImage as string | undefined,
    fotos: (data.fotos as string[] | undefined)?.slice(0, 6),
    youtube: data.youtube as string | undefined,
    whatsapp: data.whatsapp as string | undefined,
    instagram: data.instagram as string | undefined,
    website: data.website as string | undefined,
  };
}

export function getAllProfileSlugs(): string[] {
  if (!fs.existsSync(PROFILES_DIR)) return [];
  return fs
    .readdirSync(PROFILES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllProfiles(): ProfileMeta[] {
  return getAllProfileSlugs().map((slug) => {
    const fullPath = path.join(PROFILES_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return parseProfileMeta(slug, data);
  });
}

export function getProfileBySlug(slug: string): Profile | null {
  const fullPath = path.join(PROFILES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = marked.parse(content, { async: false }) as string;

  return {
    ...parseProfileMeta(slug, data),
    contentHtml,
  };
}

/**
 * Every categoria+cidade combination that has at least one real profile.
 * This is the source of truth for which /profissionais/[categoria]/[cidade]
 * pages actually get generated — a combination with zero profiles simply
 * doesn't exist as a page.
 */
export function getAllCategoryCityCombos(): CategoryCityCombo[] {
  const profiles = getAllProfiles();
  const combos = new Map<string, CategoryCityCombo>();

  for (const profile of profiles) {
    for (const categoriaNome of profile.categorias) {
      for (const cidadeNome of profile.localidades) {
        const categoriaSlug = slugify(categoriaNome);
        const cidadeSlug = slugify(cidadeNome);
        const key = `${categoriaSlug}/${cidadeSlug}`;

        if (!combos.has(key)) {
          combos.set(key, { categoriaSlug, categoriaNome, cidadeSlug, cidadeNome, perfis: [] });
        }
        combos.get(key)!.perfis.push(profile);
      }
    }
  }

  return Array.from(combos.values());
}

export function getCombo(categoriaSlug: string, cidadeSlug: string): CategoryCityCombo | null {
  return (
    getAllCategoryCityCombos().find(
      (c) => c.categoriaSlug === categoriaSlug && c.cidadeSlug === cidadeSlug
    ) ?? null
  );
}
