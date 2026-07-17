import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

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
  categoria: string;
  cidade: string;
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
    return {
      slug,
      nome: data.nome as string,
      categoria: data.categoria as string,
      cidade: data.cidade as string,
      precoDesde: data.precoDesde as string,
      resumo: data.resumo as string,
      coverImage: data.coverImage as string | undefined,
      fotos: (data.fotos as string[] | undefined)?.slice(0, 6),
      youtube: data.youtube as string | undefined,
      whatsapp: data.whatsapp as string | undefined,
      instagram: data.instagram as string | undefined,
      website: data.website as string | undefined,
    };
  });
}

export function getProfileBySlug(slug: string): Profile | null {
  const fullPath = path.join(PROFILES_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = marked.parse(content, { async: false }) as string;

  return {
    slug,
    nome: data.nome as string,
    categoria: data.categoria as string,
    cidade: data.cidade as string,
    precoDesde: data.precoDesde as string,
    resumo: data.resumo as string,
    coverImage: data.coverImage as string | undefined,
    fotos: (data.fotos as string[] | undefined)?.slice(0, 6),
    youtube: data.youtube as string | undefined,
    whatsapp: data.whatsapp as string | undefined,
    instagram: data.instagram as string | undefined,
    website: data.website as string | undefined,
    contentHtml,
  };
}
