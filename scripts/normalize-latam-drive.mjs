/**
 * Archivo editorial: convierte una salida JSON escapada de la consola de Drive
 * en registros limpios para el explorador. Uso: node scripts/normalize-latam-drive.mjs <raw> <output> <folder>
 */
import { readFile, writeFile } from "node:fs/promises";

const [rawPath, outputPath, folder] = process.argv.slice(2);

if (!rawPath || !outputPath || !folder) {
  throw new Error("Uso: node scripts/normalize-latam-drive.mjs <raw> <output> <folder>");
}

const raw = (await readFile(rawPath, "utf8")).trim();
const parsed = JSON.parse(raw);
const items = typeof parsed === "string" ? JSON.parse(parsed) : parsed;

const normalized = items.map((item) => ({
  id: item.id,
  name: String(item.name).trim(),
  size: String(item.size ?? "Peso por confirmar").replace(/\u00a0/g, " ").trim(),
  folder,
  sourceId: "latamecommerce247",
  isCollection: false,
}));

await writeFile(outputPath, JSON.stringify(normalized, null, 2));
console.log(`${normalized.length} registros normalizados para ${folder}`);
