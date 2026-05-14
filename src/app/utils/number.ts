/**
 * Formats a number with thousand separators.
 * Example: 3456 -> "3,456"
 */
export function formatNumberWithCommas(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return new Intl.NumberFormat("en-GB").format(value);
}
