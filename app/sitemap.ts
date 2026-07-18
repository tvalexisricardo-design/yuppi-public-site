import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProfiles } from "@/lib/professionals";
import { SHOW_PROFISSIONAIS } from "@/lib/featureFlags";

const SITE_URL = "https://www.yuppi.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const profiles = getAllProfiles();

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
            url: `${SITE_URL}/profissionais/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
        ]
      : []),
    // Add city/category landing pages here as they're built
    // (programmatic SEO: /animadores/lisboa, /magicos/porto, etc.)
  ];
}
