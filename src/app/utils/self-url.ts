export function selfUrl(path: string) {
  if (typeof window === "undefined") {
    const base = "http://127.0.0.1:3000"; // works for dev/preview and EC2
    return new URL(path, base).toString();
  }
  return path;
}
