/** Archivo editorial: adapta la quinta fuente al contrato del explorador de colecciones. */
import { readFile, writeFile } from "node:fs/promises";

const root = "/home/ubuntu/drive-inventory-organizer";
const inventory = JSON.parse(
  await readFile(`${root}/data/latamecommerce247-complete-inventory.json`, "utf8")
);

const folderIds = {
  cursos: "1sLt96zU8wNi8dPn9r_zTnYD7YbwxXuaT",
  Inmobiliaria: "1SBUU1fx7Z_0P2RHNPuXic-PgI3alUHol",
  "Magento II": "1fXsqshyCrp8A0Vikz_QC2oc0gvkC0b1K",
  "Shopify 1 - 10": "1LpCJg0EKGF0pRgvhjL1yEkUCAIXIvHYo",
};

const collections = Object.entries(folderIds).map(([name, id]) => ({
  id,
  name,
  entries: inventory
    .filter((item) => item.folder === name)
    .map((item) => ({ id: item.id, name: item.name, size: item.size, kind: "file" })),
}));

await writeFile(
  `${root}/data/latamecommerce247-collections-inventory.json`,
  JSON.stringify(collections, null, 2)
);
console.log(`${collections.length} colecciones y ${inventory.length} archivos preparados para el explorador`);
