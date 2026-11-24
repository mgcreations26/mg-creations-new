export function getShortDescription(
  rawDescription?: string | null,
  fallback = "Handcrafted with personal care",
  maxLength = 130
): string {
  if (!rawDescription) return fallback;
  const cleanSummary = rawDescription
    .split(/Product features\s*-|Care instructions\s*-/i)[0]
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanSummary) return fallback;
  return cleanSummary.length > maxLength
    ? `${cleanSummary.slice(0, maxLength - 3).trim()}...`
    : cleanSummary;
}
