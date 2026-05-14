import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const srcStatic = path.join(ROOT, ".next", "static");
const dstStatic = path.join(ROOT, ".next", "standalone", ".next", "static");
fs.rmSync(dstStatic, { recursive: true, force: true });
fs.mkdirSync(dstStatic, { recursive: true });
if (fs.existsSync(srcStatic))
  fs.cpSync(srcStatic, dstStatic, { recursive: true });

const srcPublic = path.join(ROOT, "public");
const dstPublic = path.join(ROOT, ".next", "standalone", "public");
fs.rmSync(dstPublic, { recursive: true, force: true });
if (fs.existsSync(srcPublic)) {
  fs.mkdirSync(dstPublic, { recursive: true });
  fs.cpSync(srcPublic, dstPublic, { recursive: true });
}

console.log(
  "[prepare-standalone] copied .next/static and public into standalone."
);
