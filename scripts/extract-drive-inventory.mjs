import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath, collectionId, collectionName] = process.argv.slice(2);
if (!inputPath || !outputPath || !collectionId || !collectionName) {
  throw new Error("Uso: node scripts/extract-drive-inventory.mjs <html> <json> <folder-id> <nombre>");
}

const html = fs.readFileSync(inputPath, "utf8");
const bengaliDigits = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };
const decode = (value = "") => value
  .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
  .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const normalizeSize = (value = "") => decode(value)
  .replace(/[০-৯]/g, (digit) => bengaliDigits[digit])
  .replace(/জিবি/gi, "GB").replace(/এমবি/gi, "MB").replace(/কেবি/gi, "KB")
  .replace(/\s+/g, " ").trim();

const rows = html.match(/<tr\b[\s\S]*?<\/tr>/g) ?? [];
const entries = [];
const seen = new Set();
for (const row of rows) {
  const id = row.match(/data-id="([A-Za-z0-9_-]{15,})"/)?.[1];
  const name = decode(row.match(/<strong class="DNoYtb">([\s\S]*?)<\/strong>/)?.[1] ?? "");
  if (!id || !name || seen.has(id)) continue;
  seen.add(id);
  const sizeRaw = row.match(/aria-label="Size:\s*([\s\S]*?)(?:\n|Storage used:|Storage used|\")/)?.[1] ?? "";
  entries.push({
    id,
    kind: /<title>Folder<\/title>/i.test(row) ? "folder" : "file",
    name,
    size: normalizeSize(sizeRaw) || "Tamaño por confirmar",
  });
}

const inventory = [{ id: collectionId, name: collectionName, entries }];
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);
console.log(JSON.stringify({ rows: rows.length, entries: entries.length, sample: entries.slice(0, 5) }, null, 2));
