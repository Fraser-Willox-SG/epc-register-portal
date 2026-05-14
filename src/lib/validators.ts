/* ---------------------------------- Postcode ---------------------------------- */

/**
 * Normalise a UK postcode: trim, uppercase, and remove internal spaces.
 * Example: " da8 1fd " -> "DA81FD"
 */
export function normalizePostcode(input: string): string {
  return (input ?? "").trim().toUpperCase().replace(/\s+/g, "");
}

/**
 * Lightweight UK postcode validation.
 * This is intentionally permissive and covers the common outward/inward patterns.
 * Tightening can be done later with a full ONS/BS7666 regex if needed.
 */
export function isValidUKPostcode(input: string): boolean {
  const v = normalizePostcode(input);

  // Basic shapes like: AA9A9AA, A9A9AA, A99AA, AA99AA, etc.
  // Ensures last 3 chars are digit + two letters and overall length 5–7.
  // Examples that pass: EH12 8LP, DA8 1FD, SW1A 1AA (after normalization).
  if (!/^[A-Z0-9]{5,7}$/.test(v)) return false;
  if (!/^\w+\d[A-Z]{2}$/.test(v)) return false;

  return true;
}

/* ------------------------------------- RRN ------------------------------------ */

/**
 * Normalise a Report Reference Number (RRN).
 * - strips non-digits
 * - always formats 20 digits as 5×4 groups
 */
export function normalizeRRN(input: string): string {
  const digits = (input ?? "").replace(/\D+/g, "");

  if (digits.length === 20) {
    return digits.match(/.{1,4}/g)!.join("-");
  }

  return digits; // leave unchanged if not exactly 20
}

/**
 * Validate a Report Reference Number (RRN).
 * Accepts only 20 digits:
 *  - 5×4 hyphenated, e.g. 0000-0000-0000-0000-0000
 *  - plain 20 digits, e.g. 00000000000000000000
 */
export function isValidRRN(input: string): boolean {
  const v = (input ?? "").trim();

  // Hyphenated 5×4 groups
  if (/^(?:\d{4}-){4}\d{4}$/.test(v)) return true;

  // Plain 20 digits
  if (/^\d{20}$/.test(v)) return true;

  return false;
}

/* ---------------------------------- Numbers ----------------------------------- */

/**
 * Parse a positive integer (>=1) from a string. Returns a fallback if invalid.
 * Useful for querystring page numbers.
 */
export function parsePositiveInt(
  input: string | undefined,
  fallback = 1
): number {
  const n = Number(input);
  return Number.isInteger(n) && n >= 1 ? n : fallback;
}
