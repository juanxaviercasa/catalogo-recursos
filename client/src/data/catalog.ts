/**
 * Archivo editorial: taxonomía de recursos visuales orientada a descubrir usos, no solo archivos.
 */
import { inventory, type ArchiveItem } from "@/data/inventory";

export type ResourceCategory =
  | "Naturaleza & flora"
  | "Geometría & gráfico"
  | "Texturas & materiales"
  | "Atmósferas & overlays"
  | "Retro & decorativo"
  | "Modelado & 3D"
  | "Video & Motion"
  | "Iconos & UI"
  | "Audio & Música"
  | "Mockups & Plantillas"
  | "Web & CMS"
  | "Ecommerce & tiendas";

export type CatalogItem = Omit<ArchiveItem, "category"> & {
  resourceType: string;
  category: ResourceCategory;
  tags: string[];
  purpose: string;
  projects: string[];
  color: string;
  sourceFolder?: string;
  sourceId?: string;
  isCollection?: boolean;
  originalName?: string;
};

type ResourceProfile = Pick<CatalogItem, "resourceType" | "category" | "tags" | "purpose" | "projects" | "color">;

const profiles: { matches: RegExp; profile: ResourceProfile }[] = [
  {
    matches: /floating-embers|fire-flames/,
    profile: {
      resourceType: "Overlay atmosférico",
      category: "Atmósferas & overlays",
      tags: ["fuego", "energía", "contraste", "oscuro"],
      purpose: "Añade intensidad, calidez y sensación de movimiento sobre composiciones oscuras o fotografías planas.",
      projects: ["Portadas musicales", "Campañas de eventos", "Lanzamientos gaming"],
      color: "ember",
    },
  },
  {
    matches: /galaxy|space-grid/,
    profile: {
      resourceType: "Fondo espacial",
      category: "Atmósferas & overlays",
      tags: ["espacio", "futurista", "profundidad", "tecnología"],
      purpose: "Crea una sensación de amplitud y exploración para conceptos tecnológicos, científicos o de ficción.",
      projects: ["Webs de tecnología", "Presentaciones startup", "Piezas sci-fi"],
      color: "cosmos",
    },
  },
  {
    matches: /black-and-gold|art-deco|goldfinch|folk-gouache/,
    profile: {
      resourceType: "Motivo decorativo",
      category: "Retro & decorativo",
      tags: ["elegante", "vintage", "ornamental", "editorial"],
      purpose: "Aporta carácter ornamental y una dirección estética reconocible sin depender de ilustración personalizada.",
      projects: ["Invitaciones", "Packaging premium", "Identidad de restaurantes"],
      color: "gold",
    },
  },
  {
    matches: /watercolor|autumn-in-the-forest/,
    profile: {
      resourceType: "Fondo pictórico",
      category: "Naturaleza & flora",
      tags: ["acuarela", "orgánico", "suave", "artesanal"],
      purpose: "Ofrece una base expresiva y amable para marcas con un tono humano, creativo o estacional.",
      projects: ["Papelería creativa", "Marcas artesanales", "Editorial infantil"],
      color: "watercolor",
    },
  },
  {
    matches: /flower|floral|garden|bloom|berry|eucalyptus|tropical|jungle|daisy/,
    profile: {
      resourceType: "Patrón botánico",
      category: "Naturaleza & flora",
      tags: ["floral", "naturaleza", "repetible", "alegre"],
      purpose: "Resuelve fondos, superficies y detalles de marca con un lenguaje natural, rico y fácilmente adaptable.",
      projects: ["Packaging cosmético", "Textil y papelería", "Redes de lifestyle"],
      color: "flora",
    },
  },
  {
    matches: /bird|exotic-birds/,
    profile: {
      resourceType: "Ilustración naturalista",
      category: "Naturaleza & flora",
      tags: ["aves", "vintage", "naturaleza", "detalle"],
      purpose: "Introduce un punto focal ilustrado y naturalista en proyectos que necesitan un acabado coleccionable o narrativo.",
      projects: ["Portadas editoriales", "Branding boutique", "Productos de regalo"],
      color: "bird",
    },
  },
  {
    matches: /geometric|halftone|doodle|camouflage|e-waste/,
    profile: {
      resourceType: "Patrón gráfico",
      category: "Geometría & gráfico",
      tags: ["geométrico", "moderno", "repetible", "gráfico"],
      purpose: "Construye sistemas visuales dinámicos y escalables para fondos, acentos y aplicaciones de marca de alto ritmo.",
      projects: ["Identidad visual", "Landing pages", "Material de eventos"],
      color: "geometry",
    },
  },
  {
    matches: /marble|concrete|stone|old-paper|broken-glass|glass-waste/,
    profile: {
      resourceType: "Textura de superficie",
      category: "Texturas & materiales",
      tags: ["material", "táctil", "fondo", "superficie"],
      purpose: "Da cuerpo y profundidad a composiciones digitales sin añadir demasiados elementos gráficos.",
      projects: ["Mockups de marca", "Fondos de presentación", "Packaging y etiquetas"],
      color: "material",
    },
  },
  {
    matches: /abstract/,
    profile: {
      resourceType: "Patrón abstracto",
      category: "Geometría & gráfico",
      tags: ["abstracto", "versátil", "contemporáneo", "fondo"],
      purpose: "Funciona como lenguaje visual flexible cuando el proyecto necesita energía gráfica sin un tema literal.",
      projects: ["Sitios portfolio", "Posts sociales", "Presentaciones creativas"],
      color: "abstract",
    },
  },
];

const defaultProfile: ResourceProfile = {
  resourceType: "Fondo decorativo",
  category: "Retro & decorativo",
  tags: ["decorativo", "patrón", "versátil", "editorial"],
  purpose: "Aporta una capa visual preparada para usar como fondo, acento o superficie dentro de una composición.",
  projects: ["Social media", "Presentaciones", "Piezas impresas"],
  color: "default",
};

function profileFor(name: string) {
  return profiles.find(({ matches }) => matches.test(name.toLowerCase()))?.profile ?? defaultProfile;
}

export const catalog: CatalogItem[] = inventory.map(({ category: _legacyCategory, ...item }) => ({ ...item, ...profileFor(item.name) }));

export const catalogCategories: ResourceCategory[] = [
  "Naturaleza & flora",
  "Geometría & gráfico",
  "Texturas & materiales",
  "Atmósferas & overlays",
  "Retro & decorativo",
  "Modelado & 3D",
  "Video & Motion",
  "Iconos & UI",
  "Audio & Música",
  "Mockups & Plantillas",
  "Web & CMS",
  "Ecommerce & tiendas",
];

export function displayTitle(name: string) {
  return name
    .replace(/-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-utc\.zip$/, "")
    .replace(/\.zip$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
