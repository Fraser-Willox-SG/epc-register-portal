export function formatFileSizeKb(value?: number | null): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "—";
  }

  if (value >= 1024) {
    return `${(value / 1024).toFixed(1)} MB`;
  }

  return `${value} KB`;
}
