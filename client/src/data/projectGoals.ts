/**
 * Archivo editorial: los objetivos permiten iniciar la exploración por necesidad de proyecto y no solo por formato de archivo.
 */
import type { CatalogItem } from "@/data/catalog";

export const projectGoals = [
  { id: "marca-campana", label: "Marca y campaña", description: "Crear identidad, anuncios, empaques o lanzamientos." },
  { id: "tienda-online", label: "Vender online", description: "Organizar productos, catálogo y recorrido de compra." },
  { id: "video-redes", label: "Vídeo y redes", description: "Editar, animar y captar atención en formatos cortos." },
  { id: "web-contenido", label: "Web y contenido", description: "Publicar un sitio, portal, blog o landing administrable." },
  { id: "presentar-idea", label: "Presentar una idea", description: "Defender una propuesta, producto o pitch ante otras personas." },
  { id: "producto-ux", label: "Producto y UX", description: "Explicar flujos, crear interfaces o hacer una app más clara." },
  { id: "tono-audiovisual", label: "Tono audiovisual", description: "Definir el ritmo y la emoción de una pieza audiovisual." },
] as const;

export type ProjectGoalId = (typeof projectGoals)[number]["id"];

const categoryGoals: Record<CatalogItem["category"], ProjectGoalId[]> = {
  "Naturaleza & flora": ["marca-campana", "presentar-idea"],
  "Geometría & gráfico": ["marca-campana", "presentar-idea", "producto-ux"],
  "Texturas & materiales": ["marca-campana", "presentar-idea"],
  "Atmósferas & overlays": ["marca-campana", "video-redes", "tono-audiovisual"],
  "Retro & decorativo": ["marca-campana", "presentar-idea"],
  "Modelado & 3D": ["video-redes", "presentar-idea", "producto-ux"],
  "Video & Motion": ["video-redes", "marca-campana", "presentar-idea"],
  "Iconos & UI": ["producto-ux", "presentar-idea"],
  "Audio & Música": ["tono-audiovisual", "video-redes"],
  "Mockups & Plantillas": ["presentar-idea", "marca-campana"],
  "Web & CMS": ["web-contenido", "marca-campana"],
  "Ecommerce & tiendas": ["tienda-online", "web-contenido", "marca-campana"],
};

export function goalsForResource(item: CatalogItem): ProjectGoalId[] {
  return categoryGoals[item.category];
}
