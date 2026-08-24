import fs from "node:fs";

const root = "/home/ubuntu/drive-inventory-organizer";
const parse = (file) => {
  const raw = fs.readFileSync(file, "utf8").trim();
  let value = JSON.parse(raw);
  if (typeof value === "string") value = JSON.parse(value);
  return value;
};
const fromRows = (file, id, name) => {
  const value = parse(file);
  const rows = Array.isArray(value) ? value : value.entries ?? [];
  const entries = rows.map((row) => {
    const text = row.text ?? row.name ?? "";
    const size = text.match(/(\d+(?:[.,]\d+)?\s*(?:Ko|Mo|Go|KB|MB|GB))/i)?.[1] ?? row.size ?? "";
    const cleanName = (text.split(/\s+(?:Partagé|Shared|Archive compressée)\b/i)[0] || text).replace(/^Compressed archive/i, "").trim();
    return { id: row.id, kind: row.kind ?? "file", name: cleanName, size };
  }).filter((entry) => entry.id && entry.id !== "_gd" && entry.name);
  return { id, name, entries };
};
const collections = [
  fromRows(`${root}/../console_outputs/exec_result_2026-08-24_01-08-48_372.txt`, "137KBWcJDZonm4XkyWO8fYBigMih9w2O8", "plantillas elementor ecommerce"),
  fromRows(`${root}/../console_outputs/exec_result_2026-08-24_01-09-26_413.txt`, "1UzauNB91iruzLfQ0hSBUydWE7ZyyPXAr", "Podcast y radio"),
  fromRows(`${root}/../console_outputs/exec_result_2026-08-24_01-10-28_729.txt`, "1GCDgycr_a2OXrhLcUt-twHNuliSwT_2T", "React Native"),
  fromRows(`${root}/../console_outputs/exec_result_2026-08-24_01-16-47_747.txt`, "1LTD6b5L6XuN39rAw5fNOCPTed2q7ICOS", "Temas Clasificados"),
  parse(`${root}/data/juanxaviercasa-veterinary-inventory.json`),
];
const output = `${root}/data/juanxaviercasa-complete-inventory.json`;
fs.writeFileSync(output, `${JSON.stringify(collections, null, 2)}\n`);
console.log(`Consolidado ${collections.map((c) => `${c.name}:${c.entries.length}`).join(", ")} en ${output}`);
