import fs from "node:fs";
const value = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const targets = new Set(process.argv.slice(3));
const visit = (node) => {
  if (!node || typeof node !== "object") return;
  if (typeof node.name === "string" && targets.has(node.name)) console.log(JSON.stringify({ name: node.name, id: node.id ?? node.dataId ?? null, href: node.href ?? null }));
  for (const child of Object.values(node)) visit(child);
};
visit(value);
