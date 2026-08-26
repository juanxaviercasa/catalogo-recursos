/** Archivo editorial: deriva el formato remoto que consume el explorador de colecciones de Drive. */
import { readFile, writeFile } from "node:fs/promises";

const root = "/home/ubuntu/drive-inventory-organizer";
const inventory = JSON.parse(
  await readFile(`${root}/data/latamecommerce24-complete-inventory.json`, "utf8")
);

const collections = Array.from(
  inventory.reduce((groups, item) => {
    const current = groups.get(item.folder) ?? {
      id: item.folderId,
      name: item.folder,
      entries: [],
    };
    current.entries.push({ id: item.id, kind: "file", name: item.name, size: item.size });
    groups.set(item.folder, current);
    return groups;
  }, new Map()).values()
);

await writeFile(
  `${root}/data/latamecommerce24-collections-inventory.json`,
  `${JSON.stringify(collections, null, 2)}\n`
);
console.log(`Inventario de explorador generado: ${collections.length} colecciones y ${inventory.length} archivos.`);
