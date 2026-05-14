/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const fsp = require("fs/promises");
const path = require("path");

const PKG = "@scottish-government/designsystem-react";
const typesRoot = path.resolve("node_modules", PKG, "@types");
const outFile = path.resolve("src/types/sgds-ambient.generated.d.ts");

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true }).catch(() => {});
}

async function listDts(dir, acc = []) {
  let entries = [];
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await listDts(full, acc);
    else if (e.isFile() && e.name.endsWith(".d.ts")) acc.push(full);
  }
  return acc;
}

(async () => {
  await ensureDir(path.dirname(outFile));

  try {
    await fsp.access(typesRoot);
  } catch {
    await fsp.writeFile(outFile, `/* generated: ${PKG} not installed yet */\n`);
    console.log(
      "[gen-sgds-ambient] wrote stub:",
      path.relative(process.cwd(), outFile)
    );
    return;
  }

  const files = await listDts(typesRoot);
  const lines = [
    "/* eslint-disable @typescript-eslint/triple-slash-reference */",
    "/* AUTO-GENERATED: Do not edit by hand. */",
    "",
    ...files.map((abs) => {
      const rel = path
        .relative(path.dirname(outFile), abs)
        .split(path.sep)
        .join("/");
      return `/// <reference path="${rel}" />`;
    }),
    "",
  ];

  await fsp.writeFile(outFile, lines.join("\n"));
  console.log(
    `[gen-sgds-ambient] referenced ${files.length} .d.ts files →`,
    path.relative(process.cwd(), outFile)
  );
})();
