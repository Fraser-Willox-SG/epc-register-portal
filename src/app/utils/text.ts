/**
 * Converts a string to sentence case.
 *
 * Rules:
 * - First letter uppercase
 * - Remaining letters lowercase
 * - Preserves separators like "/", "-", etc.
 * - Trims whitespace
 */
export function toSentenceCase(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  // Lowercase everything first
  const lower = trimmed.toLowerCase();

  // Uppercase first alphabetical character
  return lower.replace(/^[a-z]/, (char) => char.toUpperCase());
}
