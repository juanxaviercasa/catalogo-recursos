import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(projectRoot, "data");
const sources = [
  {
    input: "/home/ubuntu/console_outputs/exec_result_2026-08-26_00-15-22_733.txt",
    output: "latamecommerce24-magento.json",
    folder: "Magento",
    folderId: "1GnxVzF1YGrbCITI07g3YWS71xqz5HnF-",
  },
  {
    input: "/home/ubuntu/console_outputs/exec_result_2026-08-26_00-15-58_121.txt",
    output: "latamecommerce24-prestashop.json",
    folder: "prestashop (3)",
    folderId: "1fTRHgvZOqyAFnuerU1jmwerxBI5LvJ99",
  },
];

const all = sources.flatMap(source => {
  const rows = JSON.parse(fs.readFileSync(source.input, "utf8"));
  const normalized = rows
    .filter(row => row?.id && row?.name && /\.zip$/i.test(row.name))
    .map(row => ({
      id: row.id,
      name: row.name,
      size: row.size || "Tamaño por confirmar",
      folder: source.folder,
      folderId: source.folderId,
      sourceId: "latamecommerce24",
      isCollection: false,
    }));
  fs.writeFileSync(
    path.join(dataDir, source.output),
    `${JSON.stringify(normalized, null, 2)}\n`
  );
  return normalized;
});

const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
fs.writeFileSync(
  path.join(dataDir, "latamecommerce24-complete-inventory.json"),
  `${JSON.stringify(unique, null, 2)}\n`
);

console.log(JSON.stringify({ total: unique.length, byFolder: Object.groupBy(unique, item => item.folder) }, null, 2));
