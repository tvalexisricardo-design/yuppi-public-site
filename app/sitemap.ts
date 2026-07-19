import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProfiles, getAllCategoryCityCombos } from "@/lib/professionals";
import { SHOW_PROFISSIONAIS } from "@/lib/featureFlags";

const SITE_URL = "https://www.yuppi.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const profiles = getAllProfiles();
  const combos = getAllCategoryCityCombos();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/torna-te-parceiro`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contactos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/categorias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(SHOW_PROFISSIONAIS
      ? [
          {
            url: `${SITE_URL}/profissionais`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
          ...profiles.map((p) => ({
            url: `${SITE_URL}/profissionais/perfil/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
          ...combos.map((combo) => ({
            url: `${SITE_URL}/profissionais/${combo.categoriaSlug}/${combo.cidadeSlug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.65,
          })),
        ]
      : []),
    // Programmatic SEO: /profissionais/[categoria]/[cidade] pages are
    // generated automatically above, one per category+city combination
    // that has at least one real profile.
  ];
}
