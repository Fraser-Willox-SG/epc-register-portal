function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th"; // 11th–13th special case

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDecLongDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);

  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
}

export function formatDecDate(rawDate?: string | null): string {
  const value = (rawDate ?? "").trim();

  if (!value) return "—";

  const date = new Date(value);

  if (isNaN(date.getTime())) return "—";

  const day = date.getDate();

  const suffix =
    day > 3 && day < 21
      ? "th"
      : ["th", "st", "nd", "rd"][Math.min(day % 10, 3)];

  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();

  return `${day}${suffix} ${month} ${year}`;
}

export function formatIsoDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso; // fallback
  const date = new Date(Date.UTC(y, m - 1, d)); // avoid TZ shifts
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isExpiredDate(dateOfExpiry?: string | null): boolean {
  if (!dateOfExpiry) return false;

  const expiry = new Date(dateOfExpiry);

  if (isNaN(expiry.getTime())) return false;

  const now = new Date();

  // Treat certificate as valid until end of expiry day
  expiry.setHours(23, 59, 59, 999);

  return expiry < now;
}
