/**
 * Archivo editorial: consolida las colecciones verificadas de latamecommerce247@gmail.com.
 */
import { readFile, writeFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const readJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, root), "utf8"));

const [courses, realEstate, magento, shopifyA, shopifyB] = await Promise.all([
  readJson("data/latamecommerce247-cursos.json"),
  readJson("data/latamecommerce247-inmobiliaria.json"),
  readJson("data/latamecommerce247-magento-ii.json"),
  readJson("data/latamecommerce247-shopify-block-1.json"),
  readJson("data/latamecommerce247-shopify-block-2.json"),
]);

const shopifyTail = JSON.parse(
  await readFile("/home/ubuntu/Downloads/latamecommerce247-shopify-c-z.json", "utf8")
).map((item) => ({
  ...item,
  folder: "Shopify 1 - 10",
  sourceId: "latamecommerce247",
  isCollection: false,
  size: String(item.size ?? "Peso por confirmar").replace(/\u00a0/g, " ").trim(),
}));

const unique = new Map();
[...courses, ...realEstate, ...magento, ...shopifyA, ...shopifyB, ...shopifyTail].forEach((item) => {
  if (item.id && !unique.has(item.id)) unique.set(item.id, item);
});

const inventory = [...unique.values()].sort((a, b) => {
  const folderCompare = a.folder.localeCompare(b.folder, "es");
  return folderCompare || a.name.localeCompare(b.name, "en");
});

await writeFile(
  new URL("data/latamecommerce247-complete-inventory.json", root),
  JSON.stringify(inventory, null, 2)
);

const summary = inventory.reduce((count, item) => {
  count[item.folder] = (count[item.folder] ?? 0) + 1;
  return count;
}, {});
console.log(JSON.stringify({ total: inventory.length, summary }, null, 2));
