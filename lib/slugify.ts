/**
 * Converts any string into a clean, URL-safe slug. Used consistently across
 * categories, cities, and profile combination pages so the same input
 * always produces the same slug, wherever it's called from.
 */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
