const SITE_URL = "https://www.yuppi.pt";

/**
 * Normalizes a user-entered link so it never resolves as relative to the
 * current page. Accepts full URLs, site-relative paths ("/profissionais/x"),
 * or bare paths ("profissionais/x") and always returns an absolute URL.
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `${SITE_URL}${trimmed}`;
  }
  return `${SITE_URL}/${trimmed}`;
}
