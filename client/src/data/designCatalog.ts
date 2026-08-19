/**
 * Archivo editorial: recursos verificados dentro de Diseño Grafico. La carpeta de reels motivacionales se excluye por solicitud del usuario.
 */
import { catalog, type CatalogItem } from "@/data/catalog";
import { individualPackages } from "@/data/designPackages";
import { plantillasWebCatalog } from "@/data/plantillasWebCatalog";
import { webCatalog } from "@/data/webCatalog";

type Row = [id: string, name: string, sourceFolder: string, category: CatalogItem["category"], type: string, tags: string[], purpose: string, projects: string[], color: string, collection?: boolean];

const builderPurpose = "Acelera la creación de escenas, piezas explicativas y contenidos con estética tridimensional sin empezar desde cero.";
const builderProjects = ["Vídeos explicativos", "Campañas animadas", "Contenido de producto"];
const audioPurpose = "Aporta una base musical con un estado de ánimo definido para dar ritmo y coherencia a una pieza audiovisual.";
const audioProjects = ["Reels y vídeos cortos", "Presentaciones", "Campañas audiovisuales"];

const rows: Row[] = [
  ["1404OfRV_NqdY6PdC3MJ_O3508d8i-22c", "14 Pixar-Style 3D Video Templates", "3D BUILDER", "Modelado & 3D", "Plantillas de vídeo 3D", ["3D", "personajes", "estilo animado"], builderPurpose, builderProjects, "geometry"],
  ["1-wgP-pfJGO7ARnq_7mRLUO29nRS-YkUn", "20 Jaw Dropping Scroll Stopper Videos", "3D BUILDER", "Video & Motion", "Vídeos 3D de impacto", ["vídeo", "scroll stopper", "3D"], "Ofrece piezas visuales de alto contraste pensadas para captar atención durante los primeros segundos.", ["Reels", "Anuncios sociales", "Lanzamientos"], "ember"],
  ["1MWvMR9H0KkMpdLwpSNpNTYjFGktdPHOe", "50 Premade Scenes Video Templates", "3D BUILDER", "Modelado & 3D", "Escenas 3D prediseñadas", ["escenas", "3D", "plantillas"], builderPurpose, builderProjects, "geometry"],
  ["1H8KNW4OZl2Zhqzzzk3aZxFhs-SynWj24", "20 Gorgeous 3D Rooms", "3D BUILDER", "Modelado & 3D", "Interiores 3D", ["interiores", "3D", "escenas"], "Proporciona ambientes tridimensionales para presentar personajes, productos o narrativas en contexto.", ["Vídeos de producto", "Stories animadas", "Expositores digitales"], "material"],
  ["11QZhZtPkQRqCbjHV7hH1dfsCOwLosn8U", "100 Superb Quality 3D Objects", "3D BUILDER", "Modelado & 3D", "Objetos 3D", ["objetos", "3D", "assets"], builderPurpose, builderProjects, "geometry"],
  ["1WaOAFUkY1rn_DkY8rFkU1m3-QZyDlSZq", "20 Premium Transportation 3D Animations", "3D BUILDER", "Modelado & 3D", "Animaciones 3D", ["transporte", "3D", "animación"], "Resuelve escenas de movilidad y logística con movimiento tridimensional listo para integrar.", ["Presentaciones corporativas", "Vídeos explicativos", "Anuncios"], "geometry"],
  ["1rUoI78cdvA6csMljlVdP_Xggq3qYAvCh", "50 New 3D Hand Gestures", "3D BUILDER", "Modelado & 3D", "Gestos 3D", ["manos", "gestos", "3D"], "Añade señalización humana, énfasis y dirección visual a interfaces o vídeos sin filmación adicional.", ["Tutoriales", "Onboarding", "Social media"], "bird"],
  ["1M4aLgngefgDiuR8EnKdziEr3MKQIRuuT", "60 Cute and Playful 3D Emoji Pack", "3D BUILDER", "Iconos & UI", "Emojis 3D", ["emoji", "3D", "lúdico"], "Aporta reacciones y señales de tono amable para contenidos que necesitan cercanía y dinamismo.", ["Redes sociales", "Presentaciones", "Comunidades"], "flora"],
  ["15s7srkIFzi2fAoSB58SSzdefdmS37_O7", "60 3D Splash Comic Bubble", "3D BUILDER", "Modelado & 3D", "Burbujas 3D", ["cómic", "burbujas", "3D"], "Crea llamadas de atención y énfasis expresivo con un acabado de cómic tridimensional.", ["Anuncios sociales", "Promociones", "Vídeo juvenil"], "ember"],
  ["1bsDBJE9zQH4ToAaZQ-bXJhfqSQqj8w-J", "60 3D Comic Bubble", "3D BUILDER", "Modelado & 3D", "Burbujas 3D", ["cómic", "burbujas", "3D"], "Crea llamadas de atención y énfasis expresivo con un acabado de cómic tridimensional.", ["Anuncios sociales", "Promociones", "Vídeo juvenil"], "ember"],
  ["1-930Fk5KxamDtyj3xIdvU7jpBgilPund", "50 3D Social Media Icons", "3D BUILDER", "Iconos & UI", "Iconos 3D", ["social media", "iconos", "3D"], "Da a piezas sociales y tutoriales un conjunto de iconos reconocibles con volumen y consistencia.", ["Reels", "Tutoriales", "Portadas sociales"], "geometry"],
  ["1G3TKc4nFdCw8SvvQQX7UmEHmZaOZrQUj", "Tutorial 3DToonMaker", "3D BUILDER", "Modelado & 3D", "Tutorial", ["tutorial", "3D", "aprendizaje"], "Sirve como guía de referencia para entender y aprovechar el conjunto de recursos 3D de la carpeta.", ["Formación interna", "Onboarding creativo", "Aprendizaje"], "default"],
  ["1AbfTh6nBN4u_Um68Ov74p2B01Evqvmml", "Personajes 3D por rol", "3D BUILDER", "Modelado & 3D", "Colección de personajes 3D", ["personajes", "familia", "negocios", "3D"], "Agrupa 15 personajes 3D por perfiles familiares, casuales y profesionales para construir escenas coherentes.", ["Vídeos explicativos", "Historias animadas", "Formación"], "bird", true],
  ["1VUxf8sFqQZiifY5IEBlEadh0XIWD1asK", "capcut pro · Motion y edición", "capcut pro", "Video & Motion", "Colección de motion graphics", ["transiciones", "títulos", "FCPX", "social media"], "Reúne cerca de 50 paquetes de edición: transiciones, títulos, lower thirds, efectos, interfaces, iconos y plantillas para vídeo.", ["Edición de Reels", "YouTube", "Vídeos corporativos"], "atmosphere", true],
  ["1P1JceR3MYBJilc2kF50UWKhSkUNfBLiB", "iconos · Colecciones temáticas", "iconos", "Iconos & UI", "Biblioteca de iconos", ["iconos", "3D", "UI", "temáticos"], "Centraliza 50 paquetes de iconos: 3D, lineales, filled, geométricos y temáticos para sectores concretos.", ["Interfaces", "Infografías", "Presentaciones"], "geometry", true],
  ["1r_N3vwCTVWBiMhM9HCbo3pnV5XHq7xO9", "photoshop · Mockups y plantillas", "photoshop", "Mockups & Plantillas", "Colección de mockups", ["mockups", "branding", "editorial", "Photoshop"], "Agrupa 50 paquetes de mockups, tarjetas, revistas, guías de marca, UI kits y efectos tipográficos.", ["Presentación de marca", "Diseño editorial", "Portfolios"], "material", true],
  ["1OYND_HtRgz_cYFTWcea5LZMb4B5rfW7N", "An Epical", "musicas", "Audio & Música", "Colección de audio", ["épico", "cinemático", "motivación"], audioPurpose, ["Tráilers", "Presentaciones", "Momentos de impacto"], "cosmos", true],
  ["1b43qEf3LDwKzB5yPaSoa8U5eQnGmS2W6", "Bright Dance Background", "musicas", "Audio & Música", "Colección de audio", ["dance", "alegre", "energía"], audioPurpose, ["Reels", "Eventos", "Contenido lifestyle"], "ember", true],
  ["1oT-e3pOUVIb3w4sMPczq8ICpSeF8YA3c", "Corporate Upbeat", "musicas", "Audio & Música", "Colección de audio", ["corporativo", "positivo", "upbeat"], audioPurpose, ["Vídeos de empresa", "Presentaciones", "Producto"], "geometry", true],
  ["1cKi8SxOtvFhjKRo8BbU3-9l53X-V8FOI", "Corporated", "musicas", "Audio & Música", "Colección de audio", ["corporativo", "neutral", "profesional"], audioPurpose, ["Comunicación interna", "Servicios", "Vídeo institucional"], "geometry", true],
  ["1X5ALc5MqbPTB7aPZIl_6qlM76DiSOwpr", "Epic Motivation", "musicas", "Audio & Música", "Colección de audio", ["épico", "motivación", "energía"], audioPurpose, ["Deporte", "Campañas", "Hitos de marca"], "ember", true],
  ["18eIq18Mm3Grif9-SeYA9VifVsLUDgXhi", "Funk N Groove", "musicas", "Audio & Música", "Colección de audio", ["funk", "groove", "ritmo"], audioPurpose, ["Lifestyle", "Promociones", "Contenido social"], "retro", true],
  ["1ygaLidSKyncqFHMiLP4Zxhg0Q0GgiT7J", "Happy and Calm", "musicas", "Audio & Música", "Colección de audio", ["calma", "feliz", "suave"], audioPurpose, ["Bienestar", "Tutoriales", "Presentaciones"], "flora", true],
  ["1b56QPVx3_ozW2Z-SKprDrvDslhXn2uPN", "Hard Sport Motivation", "musicas", "Audio & Música", "Colección de audio", ["deporte", "motivación", "intenso"], audioPurpose, ["Fitness", "Retos", "Anuncios de energía"], "ember", true],
  ["1S8bvZ9rOY0EPwviMhPY_VlEpAW1fFfEM", "Inspiring Epicness", "musicas", "Audio & Música", "Colección de audio", ["inspirador", "épico", "cinemático"], audioPurpose, ["Presentaciones", "Historias de marca", "Tráilers"], "cosmos", true],
  ["1hG4w5EZcsRrFg9Z9G1hJm2lx0D8o1v7y", "Inspiring Slideshow Background", "musicas", "Audio & Música", "Colección de audio", ["slideshow", "inspirador", "fondo"], audioPurpose, ["Slideshows", "Portfolios", "Resumen de eventos"], "watercolor", true],
  ["13Mh2qDb5go-DuokjH7lV8Jl3m_I2gpjP", "Inspiring Strings", "musicas", "Audio & Música", "Colección de audio", ["cuerdas", "inspirador", "emocional"], audioPurpose, ["Historias de marca", "Documentales", "Presentaciones"], "watercolor", true],
  ["19_EBoI6qpXJPC127BXSzeA0abbfyMLCX", "Motivational Cinematic Corporate", "musicas", "Audio & Música", "Colección de audio", ["corporativo", "cinemático", "motivación"], audioPurpose, ["Casos de éxito", "Lanzamientos", "Vídeo corporativo"], "cosmos", true],
  ["1GsUTHc2mQgwHKoe1LwtPvQoE5Us8em3j", "Rock News", "musicas", "Audio & Música", "Colección de audio", ["rock", "noticias", "energía"], audioPurpose, ["Noticias", "Promociones", "Clips dinámicos"], "ember", true],
  ["1QrfdUDgVMPf0cA17KKCnBma2khqKAZT_", "Rock Weather News", "musicas", "Audio & Música", "Colección de audio", ["rock", "noticias", "intenso"], audioPurpose, ["Actualidad", "Clips de clima", "Promociones"], "cosmos", true],
  ["1RVxKqjIeQZ2WvBxl39hej5W8-k34JeZg", "Summer Action", "musicas", "Audio & Música", "Colección de audio", ["verano", "acción", "energía"], audioPurpose, ["Viajes", "Deporte", "Anuncios"], "ember", true],
  ["1DvbFZMmSH9q4GDSuj3sLvN9BbuiGwUys", "Summer Holidays", "musicas", "Audio & Música", "Colección de audio", ["verano", "vacaciones", "alegre"], audioPurpose, ["Viajes", "Lifestyle", "Reels"], "flora", true],
  ["1qH9gDcOUDSkq-Y4nV7OP5xEnBpQ1QFgQ", "Summer Rock", "musicas", "Audio & Música", "Colección de audio", ["verano", "rock", "energía"], audioPurpose, ["Promociones", "Turismo", "Contenido juvenil"], "retro", true],
];

export const designCatalog: CatalogItem[] = rows.map(([id, name, sourceFolder, category, resourceType, tags, purpose, projects, color, isCollection]) => ({
  id, name, sourceFolder, category, resourceType, tags, purpose, projects, color, isCollection, size: isCollection ? "Colección" : "ZIP", modified: "2024",
}));

const characterRows: Array<[string, string]> = [
  ["1wdcId4f5QCzLgwVyseSZAQIz4e8yKuvI", "James · Father"],
  ["1JoTnogQz794ypkEI4ZX-pTomktnWoSjJ", "Lisa · Mother"],
  ["1PTqs3jr9RzqPIBNKXwY4mcXRJTqsGeCl", "Jason · Son (Kids)"],
  ["1vyoJKMMm9OZVgmub0rDqsuJgqqp4OGJD", "Jenny · Daughter (Kids)"],
  ["1rKmca_DjuJf4FGfUJOXoOqcqfM05gpQ2", "Jack · Brother (Teenager)"],
  ["1OfgN91qWc1H-EvWk9PTGedTZZbuxV-87", "George · Formal"],
  ["1_slVZJ1WW5NO9QrFt9F7PIClOHC30EXO", "Mike · Uncle"],
  ["1w3pglrMjnfx9arsxM2LGEgvp-VuUwsXv", "Olivia · Aunt"],
  ["1OmaEngW5lm3vkmRfaKBFRzxhk9gvwaWB", "Matthew · Grandfather"],
  ["10LbMwjIiGggrHjlPUzWRy8A40ZDhCUrO", "Mila · GrandMother"],
  ["17-TZD-qqf7Wt25I3KCh6FTfZ1suzILhc", "Charlie · Businessman"],
  ["1vIT19zde7_z_Fzp3zqsCd3fwLOXPY1xF", "Sophia · Bussinesswoman"],
  ["1YCyNiQ6jnGMueexzE_DhiceiR17jwEci", "Mateo · Accountant"],
  ["1qakALI7JdZKzOJ34xLyU7hf57KuZ6Ic5", "Arthur · Casual Man"],
  ["14i1jxzkJ29yiRRLrEslhixQzLziJ_iJT", "Jessica · Casual Woman"],
];

export const characterPackages: CatalogItem[] = characterRows.map(([id, name]) => ({
  id,
  name,
  sourceFolder: "3D BUILDER",
  category: "Modelado & 3D",
  resourceType: "Personaje 3D",
  tags: ["personajes", "3D", /business|accountant/.test(name.toLowerCase()) ? "profesional" : "familia"],
  purpose: "Aporta un personaje 3D con un rol definido para construir escenas, demostraciones y relatos animados más fáciles de contextualizar.",
  projects: ["Vídeos explicativos", "Formación", "Historias animadas"],
  color: "bird",
  size: "ZIP",
  modified: "20 oct 2024",
}));

export const fullCatalog: CatalogItem[] = [...catalog.map((item) => ({ ...item, sourceFolder: "Patrones Graficos" })), ...designCatalog, ...characterPackages, ...individualPackages, ...webCatalog, ...plantillasWebCatalog];

export const sourceFolders = ["Diseño Grafico", "Patrones Graficos", "3D BUILDER", "capcut pro", "iconos", "musicas", "photoshop", "Diseño Web"];
