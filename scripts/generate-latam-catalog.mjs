/** Archivo editorial: traduce los sitios web de latamecommerce247 a fichas de catálogo en español. */
import { readFile, writeFile } from "node:fs/promises";

const root = "/home/ubuntu/drive-inventory-organizer";
const inventory = JSON.parse(
  await readFile(`${root}/data/latamecommerce247-complete-inventory.json`, "utf8")
);

const cleanSlug = (name) => name
  .replace(/-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-utc(?:\s*\(\d+\))?\.zip$/i, "")
  .replace(/\.zip$/i, "")
  .replace(/-/g, " ")
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const nicheFor = (name) => {
  const n = name.toLowerCase();
  if (/beauty|cosmetic|perfume/.test(n)) return "belleza y cosmética";
  if (/fashion|clothing|wear|jewel|jewell|bags|handbag/.test(n)) return "moda y accesorios";
  if (/food|cake|bakery|coffee|fruit|restaurant|honey/.test(n)) return "alimentación y cafetería";
  if (/pet|dog|animal/.test(n)) return "mascotas";
  if (/furniture|decor|interior|lights/.test(n)) return "hogar e interiores";
  if (/shoe|sneaker|sport|bike|bicycle/.test(n)) return "deporte y movilidad";
  if (/education|course|school|lms|learn|college/.test(n)) return "formación";
  if (/real-estate|property|home|villa|apartment|house/.test(n)) return "propiedades";
  return "comercio especializado";
};

const profile = (item) => {
  const label = cleanSlug(item.name);
  const niche = nicheFor(item.name);
  if (item.folder === "cursos") return {
    name: `Tema WordPress para cursos y formación · ${label}`,
    category: "Web & CMS",
    resourceType: "Tema WordPress para educación",
    tags: ["WordPress", "LMS", "cursos", "educación", niche],
    purpose: "Da una base lista para presentar programas, clases, docentes y llamadas a inscripción, evitando diseñar desde cero la arquitectura de una academia online.",
    projects: ["Academia online", "Escuela profesional", "Programa de cursos"],
    color: "geometry",
  };
  if (item.folder === "Inmobiliaria") return {
    name: `Tema WordPress para propiedades · ${label}`,
    category: "Web & CMS",
    resourceType: "Tema WordPress inmobiliario",
    tags: ["WordPress", "inmobiliaria", "propiedades", "listados", niche, ...(item.name.toLowerCase().includes("elementor") ? ["Elementor"] : [])],
    purpose: "Acelera la creación de un portal de propiedades con fichas, listados y llamadas de contacto, útil para agencias que necesitan publicar inventario inmobiliario con claridad.",
    projects: ["Web de inmobiliaria", "Portal de propiedades", "Landing para proyecto residencial"],
    color: "material",
  };
  if (item.folder === "Magento II") return {
    name: `Tema Magento 2 para ecommerce · ${label}`,
    category: "Ecommerce & tiendas",
    resourceType: "Tema Magento 2",
    tags: ["Magento 2", "Adobe Commerce", "ecommerce", "PHP", niche],
    purpose: "Proporciona una base comercial para organizar catálogo, navegación y fichas de producto en una instalación Magento, reduciendo el trabajo inicial de interfaz de tienda.",
    projects: ["Tienda con catálogo amplio", "Ecommerce de moda o tecnología", "Migración visual de Magento"],
    color: "ember",
  };
  return {
    name: `Tema Shopify para ecommerce · ${label}`,
    category: "Ecommerce & tiendas",
    resourceType: "Tema Shopify",
    tags: ["Shopify", "ecommerce", "Liquid", niche, ...(item.name.toLowerCase().includes("2-0") || item.name.toLowerCase().includes("os-2-0") ? ["Online Store 2.0"] : [])],
    purpose: "Aporta una estructura comercial para lanzar una tienda Shopify con catálogo, colecciones y producto, permitiendo adaptar la identidad antes de activar la versión publicada.",
    projects: ["Tienda de nicho", "Lanzamiento de producto", "Rediseño de storefront Shopify"],
    color: "flora",
  };
};

const items = inventory.map((item) => ({
  id: item.id,
  ...profile(item),
  originalName: item.name,
  sourceFolder: item.folder,
  sourceId: "latamecommerce247",
  size: item.size,
  modified: "10 oct 2024",
}));

const output = `${root}/client/src/data/latamecommerce247Catalog.ts`;
await writeFile(
  output,
  `/** Archivo editorial: sitios web reales de Webs · latamecommerce247@gmail.com. */\nimport type { CatalogItem } from "@/data/catalog";\n\nexport const latamecommerce247Catalog: CatalogItem[] = [\n${items.map((item) => `  ${JSON.stringify(item)},`).join("\n")}\n];\n`
);
console.log(`Catálogo generado: ${items.length} fichas en ${output}`);
