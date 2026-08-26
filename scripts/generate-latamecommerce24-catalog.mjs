/** Archivo editorial: traduce los sitios web de latamecommerce24 a fichas de catálogo en español. */
import { readFile, writeFile } from "node:fs/promises";

const root = "/home/ubuntu/drive-inventory-organizer";
const inventory = JSON.parse(
  await readFile(`${root}/data/latamecommerce24-complete-inventory.json`, "utf8")
);

const cleanSlug = name =>
  name
    .replace(/-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-utc(?:\s*\(\d+\))?\.zip$/i, "")
    .replace(/\.zip$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, letter => letter.toUpperCase());

const nicheFor = name => {
  const value = name.toLowerCase();
  if (/beauty|cosmetic|health/.test(value)) return "belleza y bienestar";
  if (/fashion|clothing|shoe|sneaker|watch/.test(value)) return "moda y accesorios";
  if (/car|auto|parts/.test(value)) return "automoción y repuestos";
  if (/food|cake|restaurant|fruit|organic/.test(value)) return "alimentación";
  if (/pet|animal/.test(value)) return "mascotas";
  if (/furniture|home|bedroom/.test(value)) return "hogar e interiores";
  if (/digital|hitech|tech/.test(value)) return "tecnología";
  return "comercio especializado";
};

const profile = item => {
  const label = cleanSlug(item.name);
  const niche = nicheFor(item.name);
  if (item.folder === "Magento") {
    return {
      name: `Tema Magento para ecommerce · ${label}`,
      category: "Ecommerce & tiendas",
      resourceType: "Tema Magento / Adobe Commerce",
      tags: ["Magento", "Adobe Commerce", "ecommerce", "PHP", niche],
      purpose:
        "Ofrece una base de tienda para catálogo, navegación y fichas de producto en Magento o Adobe Commerce, reduciendo el trabajo inicial de interfaz comercial.",
      projects: ["Tienda con catálogo amplio", "Ecommerce de nicho", "Migración visual de Magento"],
      color: "ember",
    };
  }
  return {
    name: `Tema PrestaShop para ecommerce · ${label}`,
    category: "Ecommerce & tiendas",
    resourceType: "Tema PrestaShop",
    tags: ["PrestaShop", "ecommerce", "PHP", "tienda online", niche],
    purpose:
      "Aporta una estructura visual para construir una tienda PrestaShop con categorías, producto y recorridos de compra, útil cuando se necesita lanzar una tienda sin partir de una interfaz vacía.",
    projects: ["Tienda online especializada", "Catálogo de productos", "Rediseño de PrestaShop"],
    color: "flora",
  };
};

const items = inventory.map(item => ({
  id: item.id,
  ...profile(item),
  originalName: item.name,
  sourceFolder: item.folder,
  sourceId: "latamecommerce24",
  size: item.size,
  modified: "10 oct 2024",
}));

const output = `${root}/client/src/data/latamecommerce24Catalog.ts`;
await writeFile(
  output,
  `/** Archivo editorial: sitios web reales de Webs · latamecommerce24@gmail.com. */\nimport type { CatalogItem } from "@/data/catalog";\n\nexport const latamecommerce24Catalog: CatalogItem[] = [\n${items.map(item => `  ${JSON.stringify(item)},`).join("\n")}\n];\n`
);
console.log(`Catálogo generado: ${items.length} fichas en ${output}`);
