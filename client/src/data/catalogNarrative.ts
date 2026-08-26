/**
 * Archivo editorial: cada ficha traduce un recurso técnico a una decisión de proyecto, problema, resultado y situaciones de uso concretas.
 */
import type { CatalogItem, ResourceCategory } from "@/data/catalog";

type IdealScenario = { title: string; detail: string };

export type TechnicalCompatibility = {
  apps: string[];
  environment: string;
  code: string;
  requirement: string;
  caution?: string;
  filterKeys: string[];
};

export type ResourceNarrative = {
  clearTitle: string;
  value: string;
  when: string;
  problem: string;
  outcome: string;
  scenarios: IdealScenario[];
  technical: TechnicalCompatibility;
};

export type LicenseReviewKey = "archive" | "font-media" | "web-code";

export type LicenseReview = {
  key: LicenseReviewKey;
  label: string;
  shortLabel: string;
  note: string;
};

export type MinimumRequirement = {
  level: "direct" | "setup" | "development";
  label: string;
  shortLabel: string;
  note: string;
};

export type VersionCompatibility = {
  label: string;
  note: string;
};

type BaseNarrative = Omit<ResourceNarrative, "technical">;

const narratives: Record<ResourceCategory, BaseNarrative> = {
  "Naturaleza & flora": {
    clearTitle: "Fondos orgánicos para marcas cercanas",
    value: "Convierte una composición fría o genérica en una pieza con calidez, ritmo orgánico y una identidad más humana.",
    when: "Úsalo cuando una marca de bienestar, alimentación, infancia, belleza o temporada necesita un lenguaje visual cercano sin encargar ilustración desde cero.",
    problem: "Resuelve fondos repetitivos y piezas que se sienten planas, impersonales o desconectadas de una propuesta de marca sensible.",
    outcome: "Permite construir campañas, empaques, redes y presentaciones con una familia visual coherente, viva y fácil de extender.",
    scenarios: [
      { title: "Campaña de una marca de bienestar", detail: "Cuando una línea de té, cosmética natural o spa necesita verse amable y sensorial sin caer en fotos de stock genéricas." },
      { title: "Empaque de producto estacional", detail: "Cuando un empaque de primavera, verano o edición limitada requiere una superficie decorativa que pueda repetirse en etiquetas, cajas y bolsas." },
      { title: "Identidad para un proyecto infantil", detail: "Cuando una propuesta dirigida a familias necesita color, suavidad y ritmo visual sin volverse demasiado literal o caricaturesca." },
    ],
  },
  "Geometría & gráfico": {
    clearTitle: "Sistema visual para marcas modernas y ordenadas",
    value: "Da estructura a una identidad que necesita verse contemporánea, ordenada y consistente en muchos formatos.",
    when: "Es especialmente útil para tecnología, educación, eventos, startups y marcas que deben escalar un sistema visual entre redes, web y presentaciones.",
    problem: "Resuelve la falta de una retícula o lenguaje gráfico repetible cuando cada pieza parece diseñada de forma aislada.",
    outcome: "Permite crear fondos, banners, diapositivas y acentos de marca con continuidad visual y menos tiempo de producción.",
    scenarios: [
      { title: "Lanzamiento de una startup tecnológica", detail: "Cuando hay que producir landing page, pitch deck, anuncios y publicaciones con una estética consistente en pocos días." },
      { title: "Identidad para un congreso o evento", detail: "Cuando cada ponencia, señalización y pieza digital necesita pertenecer a un mismo sistema sin diseñarse desde cero." },
      { title: "Presentación para un servicio B2B", detail: "Cuando una oferta compleja debe verse clara, estructurada y profesional para generar confianza ante clientes corporativos." },
    ],
  },
  "Texturas & materiales": {
    clearTitle: "Acabados con textura para piezas premium",
    value: "Aporta materia, profundidad y una sensación táctil a piezas digitales que necesitan escapar del aspecto plano de pantalla.",
    when: "Conviene en branding premium, piezas editoriales, portadas, packaging, interiores, lujo o conceptos artesanales.",
    problem: "Resuelve composiciones que se ven demasiado limpias, frías o artificiales porque no tienen una superficie con personalidad.",
    outcome: "Permite elevar una pieza simple a una propuesta más rica y memorable sin recargarla con demasiados elementos.",
    scenarios: [
      { title: "Propuesta de branding para una marca premium", detail: "Cuando un logotipo y una paleta no bastan para transmitir calidad, oficio o sensación de producto bien terminado." },
      { title: "Portada editorial o de catálogo", detail: "Cuando una publicación necesita jerarquía y profundidad visual sin depender de una ilustración costosa." },
      { title: "Mockup de empaque artesanal", detail: "Cuando se quiere que una etiqueta, caja o tarjeta se sienta física antes de producir la primera muestra real." },
    ],
  },
  "Atmósferas & overlays": {
    clearTitle: "Efectos para dar impacto y emoción a una escena",
    value: "Añade foco, energía y clima visual cuando una imagen o secuencia todavía no transmite emoción ni jerarquía.",
    when: "Úsalo en teasers, lanzamientos, portadas, música, gaming, campañas nocturnas y vídeos que necesitan un punto de tensión o impacto.",
    problem: "Resuelve escenas estáticas o imágenes de stock que se perciben neutras y no guían la atención hacia el mensaje principal.",
    outcome: "Permite dirigir la mirada, reforzar el tono y crear una sensación de movimiento sin rehacer toda la composición.",
    scenarios: [
      { title: "Teaser de un lanzamiento nocturno", detail: "Cuando una publicación de estreno necesita verse más intensa, misteriosa o urgente sin organizar una producción audiovisual adicional." },
      { title: "Portada para un sencillo o playlist", detail: "Cuando la imagen base es correcta pero todavía no transmite energía, calor, profundidad o emoción musical." },
      { title: "Anuncio de gaming o entretenimiento", detail: "Cuando una escena necesita sensación de velocidad, ciencia ficción o tensión para detener el scroll en segundos." },
    ],
  },
  "Retro & decorativo": {
    clearTitle: "Detalles con carácter para una identidad inolvidable",
    value: "Introduce una firma estética reconocible cuando el proyecto necesita diferenciarse de soluciones visuales demasiado genéricas.",
    when: "Es útil para editoriales, hospitality, moda, eventos culturales, packaging y marcas que quieren memoria, carácter o sofisticación.",
    problem: "Resuelve identidades correctas pero olvidables, sin un detalle visual que las vuelva propias o coleccionables.",
    outcome: "Permite establecer un tono distintivo en piezas de campaña, invitaciones, fondos y sistemas de marca con poca intervención adicional.",
    scenarios: [
      { title: "Invitación para una inauguración cultural", detail: "Cuando una exposición, cena o evento de diseño necesita sentirse especial antes de que la persona lea todos los detalles." },
      { title: "Packaging de una edición limitada", detail: "Cuando una marca quiere que el producto se vea coleccionable y no como una variante más del catálogo habitual." },
      { title: "Identidad para un hotel o restaurante con historia", detail: "Cuando el espacio necesita transmitir memoria, sofisticación y un sentido de lugar desde su primer material visual." },
    ],
  },
  "Modelado & 3D": {
    clearTitle: "Escena 3D para explicar ideas y productos",
    value: "Hace visible una idea, producto o historia antes de invertir en modelado, rodaje o una producción compleja desde cero.",
    when: "Conviene para explicadores, demos de producto, formación, social media, lanzamientos y narrativas donde un objeto o personaje debe guiar la atención.",
    problem: "Resuelve la dificultad de explicar procesos abstractos o mostrar situaciones que no se pueden fotografiar ni filmar fácilmente.",
    outcome: "Permite crear escenas claras, demostraciones y contenidos animados con un lenguaje visual consistente y más rápido de producir.",
    scenarios: [
      { title: "Video explicativo de un servicio complejo", detail: "Cuando hay que hacer entendible un proceso, una plataforma o una idea que no se puede mostrar con una cámara convencional." },
      { title: "Demo de producto antes del prototipo físico", detail: "Cuando ventas, inversionistas o clientes necesitan imaginar cómo funciona una propuesta que todavía está en desarrollo." },
      { title: "Contenido social con un personaje guía", detail: "Cuando una serie de piezas necesita un protagonista reconocible para enseñar, anunciar o narrar sin depender de actores reales." },
    ],
  },
  "Video & Motion": {
    clearTitle: "Edición dinámica para vídeos que deben retener atención",
    value: "Ordena el ritmo de edición y convierte un vídeo básico en una pieza con jerarquía, transiciones y cierre profesional.",
    when: "Úsalo para Reels, YouTube, tutoriales, anuncios, webinars, presentaciones y vídeos corporativos que deben comunicar con rapidez.",
    problem: "Resuelve secuencias que parecen planas, confusas o demasiado lentas porque no tienen rótulos, transiciones o énfasis visual consistentes.",
    outcome: "Permite editar con mayor velocidad y mantener una narrativa visual clara sin diseñar cada efecto desde una línea de tiempo vacía.",
    scenarios: [
      { title: "Reel de producto con poco material grabado", detail: "Cuando solo hay unas cuantas tomas y se necesita convertirlas en una pieza con ritmo, mensaje y cierre de venta." },
      { title: "Tutorial de software o plataforma", detail: "Cuando el espectador debe entender pasos rápidos y el vídeo necesita rótulos, llamadas y transiciones que no lo hagan perderse." },
      { title: "Resumen de un evento corporativo", detail: "Cuando muchas tomas dispersas deben convertirse en una historia breve que comunique energía, asistencia y resultado." },
    ],
  },
  "Iconos & UI": {
    clearTitle: "Iconos claros para explicar y guiar al usuario",
    value: "Transforma conceptos complejos y acciones repetidas en señales rápidas de reconocer, útiles en cualquier interfaz o material explicativo.",
    when: "Conviene en apps, dashboards, infografías, tutoriales, onboarding, presentaciones y sistemas de navegación de marca.",
    problem: "Resuelve explicaciones demasiado largas y pantallas donde el usuario no identifica rápido qué puede hacer, comparar o seleccionar.",
    outcome: "Permite reducir fricción, reforzar la comprensión y mantener consistencia visual entre pantallas, documentos y contenidos sociales.",
    scenarios: [
      { title: "Panel de control con muchas funciones", detail: "Cuando una plataforma tiene demasiadas acciones y el usuario necesita reconocerlas antes de leer una explicación extensa." },
      { title: "Presentación que explica un proceso", detail: "Cuando una diapositiva está llena de texto y conviene convertir pasos, áreas o beneficios en un lenguaje visual rápido." },
      { title: "Onboarding de una aplicación nueva", detail: "Cuando se debe acompañar al usuario en sus primeras tareas sin saturarlo con instrucciones largas o técnicas." },
    ],
  },
  "Audio & Música": {
    clearTitle: "Música que marca el tono de tu vídeo",
    value: "Define el pulso emocional de una pieza audiovisual para que el mensaje se sienta intencional desde los primeros segundos.",
    when: "Úsalo para vídeos de marca, reels, presentaciones, resúmenes de eventos, trailers, fitness, turismo y secuencias de producto.",
    problem: "Resuelve vídeos correctos visualmente pero sin un ritmo, tono o energía que sostenga la atención del espectador.",
    outcome: "Permite alinear imagen, emoción y velocidad de montaje para que la pieza se recuerde y transmita el carácter adecuado.",
    scenarios: [
      { title: "Video de lanzamiento de una marca", detail: "Cuando las imágenes ya existen pero necesitan un pulso que haga que el estreno se sienta más seguro, moderno o aspiracional." },
      { title: "Rutina de fitness o bienestar", detail: "Cuando el montaje debe motivar y sostener un ritmo físico sin que las escenas pierdan energía entre cortes." },
      { title: "Resumen emocional de un viaje o evento", detail: "Cuando se busca que una secuencia de momentos se sienta como una experiencia completa y no como un listado de clips." },
    ],
  },
  "Mockups & Plantillas": {
    clearTitle: "Presentación lista para vender una idea",
    value: "Convierte una idea abstracta en una prueba visual creíble para presentar, aprobar o vender una propuesta antes de producirla.",
    when: "Es muy útil en branding, pitch decks, propuestas comerciales, portafolios, informes, publicaciones y entregables para clientes.",
    problem: "Resuelve la dificultad de explicar el valor de un diseño plano cuando el cliente no imagina cómo se verá aplicado en el mundo real.",
    outcome: "Permite tomar decisiones con más confianza y mostrar una propuesta terminada, coherente y lista para defender.",
    scenarios: [
      { title: "Propuesta de identidad para un cliente", detail: "Cuando un logo necesita verse aplicado en papelería, empaque o pantallas para que la persona entienda el valor de la propuesta." },
      { title: "Pitch deck para una idea de negocio", detail: "Cuando se necesita presentar una visión convincente aunque el producto, campaña o material final todavía no exista." },
      { title: "Portfolio para captar nuevos proyectos", detail: "Cuando el trabajo necesita mostrarse en contexto profesional para que un posible cliente imagine el resultado en su propia marca." },
    ],
  },
  "Web & CMS": {
    clearTitle: "Sitio web administrable listo para personalizar",
    value: "Acelera el lanzamiento de un sitio administrable al partir de una estructura visual y funcional pensada para un CMS concreto.",
    when: "Conviene para agencias, portales de contenido, blogs, newsletters, sitios institucionales, landing pages y proyectos que requieren publicar sin depender de desarrollo constante.",
    problem: "Resuelve el bloqueo de empezar un sitio desde cero o de elegir una base que después sea difícil de editar, escalar y mantener.",
    outcome: "Permite dedicar el esfuerzo a contenido, personalización y conversión en lugar de reconstruir estructuras web ya resueltas.",
    scenarios: [
      { title: "Web de una agencia que necesita salir rápido", detail: "Cuando la prioridad es publicar servicios, casos de estudio y formularios de contacto sin construir cada bloque desde cero." },
      { title: "Portal editorial con publicaciones frecuentes", detail: "Cuando un equipo necesita publicar artículos, autores y secciones sin pedir cambios técnicos por cada actualización." },
      { title: "Landing page para captar contactos", detail: "Cuando una campaña requiere una página clara para explicar una oferta, recoger datos y medir respuestas con rapidez." },
    ],
  },
  "Ecommerce & tiendas": {
    clearTitle: "Tienda online lista para vender y organizar catálogo",
    value: "Da una base de tienda lista para organizar catálogo, producto y compra sin diseñar cada pantalla comercial desde cero.",
    when: "Úsalo para marcas directas al consumidor, catálogos de nicho, tiendas locales, moda, salud, hogar, cosmética y lanzamientos de producto.",
    problem: "Resuelve recorridos de compra dispersos o páginas de producto poco claras que hacen difícil descubrir, comparar y decidir.",
    outcome: "Permite construir una experiencia de compra más ordenada, confiable y orientada a conversión, manteniendo margen para personalizar la marca.",
    scenarios: [
      { title: "Marca de cosmética que abre su primera tienda", detail: "Cuando los productos necesitan verse confiables, fáciles de comparar y acompañados de una experiencia de compra cuidada." },
      { title: "Catálogo de productos con muchas variantes", detail: "Cuando una tienda necesita filtros, categorías y páginas de producto claras para evitar que el comprador se pierda." },
      { title: "Lanzamiento de una colección limitada", detail: "Cuando hay que construir una página comercial atractiva, rápida de ajustar y preparada para concentrar tráfico de una campaña." },
    ],
  },
};

const titleOverrides: Record<string, string> = {
  "Digital Marketing Agency · WordPress": "Web de agencia diseñada para generar clientes",
  Drupal: "Portal institucional administrable y escalable",
  Ghost: "Publicación editorial lista para artículos y newsletters",
  Joomla: "Sitio corporativo administrable sin depender del equipo técnico",
  OpenCart: "Tienda online para vender un catálogo de productos",
  "Plantillas Word": "Documentos profesionales para presentar y vender ideas",
  "Plantillas Web 1–25 · Código y sitios comerciales": "Biblioteca web para lanzar productos, servicios y sitios con código",
  "Academia Online - WordPress": "Campus online listo para cursos, clases y comunidad",
  Behance: "Portfolio creativo para mostrar trabajo y captar proyectos",
  "Diapositivas de matematicas": "Presentaciones de matemáticas para enseñar con claridad",
  "google slides": "Biblioteca de Google Slides para clases, tesis y presentaciones",
  "logo y email": "Identidad y email listos para lanzar una marca",
  "Math Graphic Templates": "Recursos visuales de matemáticas para clases y campañas",
  musicas: "Música lista para vídeos, campañas y presentaciones",
  "Plantillas Web de Figma": "Interfaces web de Figma para diseñar antes de desarrollar",
  "temas prestashop": "Tienda PrestaShop lista para organizar catálogo y ventas",
  "Plugins · WordPress, WooCommerce y Elementor": "Funciones extra para convertir WordPress en una herramienta comercial",
  "Shopify 11–21": "Tienda Shopify de marca lista para lanzar productos",
  "Shopify Premium": "Tienda premium para una marca que quiere vender con confianza",
  "Temas ecommerce WordPress 1–12": "Tienda WooCommerce lista para organizar y cobrar pedidos",
  Tumblr: "Portfolio visual para publicar con personalidad",
  Unbounce: "Landing page enfocada en captar contactos y conversiones",
};

export const technicalFilters = [
  { id: "wordpress", label: "WordPress", note: "CMS WordPress" },
  { id: "elementor", label: "Elementor", note: "Constructor visual de WordPress" },
  { id: "woocommerce", label: "WooCommerce", note: "Tienda sobre WordPress" },
  { id: "drupal", label: "Drupal", note: "CMS Drupal" },
  { id: "joomla", label: "Joomla", note: "CMS Joomla" },
  { id: "ghost", label: "Ghost", note: "CMS Ghost" },
  { id: "shopify", label: "Shopify", note: "Tienda Shopify" },
  { id: "opencart", label: "OpenCart", note: "Tienda OpenCart" },
  { id: "prestashop", label: "PrestaShop", note: "Tienda PrestaShop" },
  { id: "magento", label: "Magento", note: "Magento y Adobe Commerce" },
  { id: "fcpx", label: "Final Cut Pro", note: "FCPX en macOS" },
  { id: "capcut", label: "CapCut", note: "Edición CapCut" },
  { id: "photoshop", label: "Photoshop", note: "Adobe Photoshop" },
  { id: "design-tools", label: "Figma / Illustrator / Canva", note: "Diseño gráfico" },
  { id: "react-native", label: "React Native", note: "Aplicaciones móviles nativas" },
  { id: "expo", label: "Expo", note: "Entorno de desarrollo para React Native" },
  { id: "html-bootstrap", label: "HTML / Bootstrap", note: "Plantillas web estáticas o Bootstrap" },
  { id: "fonts", label: "Tipografías", note: "Fuentes para instalar en Windows o macOS" },
  { id: "audio-editor", label: "Editor de audio o vídeo", note: "Audio reutilizable" },
] as const;

export const licenseReviewFilters: Array<{
  id: LicenseReviewKey;
  label: string;
  note: string;
}> = [
  { id: "archive", label: "Archivo y autoría", note: "Revisa el texto de licencia, atribución y alcance de uso dentro del archivo." },
  { id: "font-media", label: "Fuentes y medios", note: "Verifica los términos de uso comercial, sincronización, webfont o distribución del material." },
  { id: "web-code", label: "Código y distribución", note: "Confirma licencia de tema, plugins, dependencias y condiciones de redistribución antes de publicar." },
];

export function technicalFor(item: CatalogItem): TechnicalCompatibility {
  const name = item.name.toLowerCase();
  const source = (item.sourceFolder ?? "Patrones Graficos").toLowerCase();
  const signals = `${name} ${item.tags.join(" ").toLowerCase()}`;
  const web = (apps: string[], environment: string, code: string, requirement: string, filterKeys: string[], caution?: string): TechnicalCompatibility => ({ apps, environment, code, requirement, filterKeys, caution });

  if (source === "fuentes") return web(
    ["Windows", "macOS", "Adobe Creative Cloud", "Figma", "Canva"],
    "Windows o macOS; las fuentes pueden instalarse a nivel del sistema y aparecer en las aplicaciones compatibles.",
    "No requiere código para instalar y usar; CSS con @font-face es necesario si se incorpora una fuente a una web.",
    "Extraer el ZIP, revisar la licencia y formatos OTF/TTF/WOFF, instalar solo los estilos necesarios y reiniciar la aplicación de diseño.",
    ["fonts", "design-tools"],
    "La licencia del archivo determina si puedes usar la tipografía en proyectos comerciales, webfont o distribución a terceros."
  );

  if (source === "plantillas elementor ecommerce") return web(
    ["WordPress", "Elementor", "WooCommerce"],
    "Hosting WordPress con PHP y base de datos; navegador para la personalización visual.",
    "No requiere código para la edición inicial; CSS, PHP y JavaScript sirven para ajustes avanzados de tienda o rendimiento.",
    "Instalar WordPress, Elementor y los plugins exigidos por el kit; comprobar la versión de WooCommerce y cargar las plantillas según el README.",
    ["wordpress", "elementor", "woocommerce"],
    "Un kit Elementor no se instala como un tema HTML estático ni garantiza por sí solo pasarela de pago, hosting o licencias de imágenes."
  );

  if (source === "cursos") return web(
    ["WordPress", "LMS / cursos online"],
    "Hosting WordPress con PHP y base de datos; navegador para gestionar cursos, lecciones y contenido.",
    "La configuración inicial se hace desde WordPress; CSS, PHP y JavaScript sirven para personalizaciones de tema o LMS.",
    "Instala el tema en una copia de prueba y confirma el plugin LMS, constructor y versión de PHP requeridos dentro del ZIP antes de publicar.",
    ["wordpress"],
    "El nombre del tema describe su enfoque educativo, pero no confirma qué LMS, plugins premium o licencia contiene el paquete."
  );

  if (source === "inmobiliaria") return web(
    /elementor/.test(name) ? ["WordPress", "Elementor", "Portal inmobiliario"] : ["WordPress", "Portal inmobiliario"],
    "Hosting WordPress con PHP y base de datos; un portal de propiedades puede requerir plugins de listados, mapas o formularios.",
    "La gestión inicial se realiza desde WordPress; CSS, PHP y JavaScript se usan para adaptar fichas, filtros, integraciones y estilo.",
    "Instala el tema en un entorno de prueba y revisa el README para identificar plugins de propiedades, mapas, formularios y la versión de PHP requerida.",
    ["wordpress", ...(/elementor/.test(name) ? ["elementor"] : [])],
    "El paquete puede incluir maquetas o dependencias de directorio que no están verificadas únicamente por el nombre del archivo."
  );

  if (source === "magento ii" || source === "magento") return web(
    ["Magento 2", "Adobe Commerce", "PHP", "MySQL"],
    "Servidor compatible con Magento 2, PHP y base de datos; el peso de estos paquetes recomienda instalación local o staging.",
    "Requiere configuración de Magento, temas y dependencias; XML, PHP, PHTML, CSS, JavaScript y Composer pueden intervenir en la personalización.",
    "Comprueba en el README la versión exacta de Magento, PHP, Adobe Commerce y módulos requeridos antes de instalar el ZIP.",
    ["magento"],
    "Un nombre que indica Magento 2 no confirma la revisión menor ni la compatibilidad con extensiones ya instaladas."
  );

  if (source === "shopify 1 - 10") return web(
    ["Shopify", "Editor de temas Shopify", "Liquid"],
    "Cuenta Shopify y navegador; no requiere hosting PHP propio para operar la tienda.",
    "La edición cotidiana se realiza desde el editor de Shopify; Liquid, HTML, CSS y JavaScript sirven para personalizaciones avanzadas.",
    "Sube el tema como copia no publicada, revisa theme.liquid y confirma si indica Online Store 2.0, apps requeridas y secciones compatibles.",
    ["shopify"],
    "La mención a Shopify u OS 2.0 en el nombre requiere validación con los archivos internos antes de reemplazar un tema activo."
  );

  if (source === "podcast y radio") return web(
    ["WordPress", "Elementor", "WooCommerce"],
    "Hosting WordPress con PHP y base de datos; navegador para editar emisiones, episodios y secciones visuales.",
    "No requiere código para el uso inicial; CSS y JavaScript se aplican cuando se adapta el reproductor, analítica o comportamiento de la interfaz.",
    "Instalar WordPress y Elementor; confirmar en el ZIP los plugins de podcast, audio o ecommerce que cada plantilla requiera.",
    ["wordpress", "elementor"],
    "La plantilla organiza la web; la emisión en directo, alojamiento de audio y distribución de podcasts requieren servicios o plugins adicionales."
  );

  if (source === "react native") return web(
    ["React Native", "Expo", "Node.js", "Android Studio", "Xcode"],
    "Windows, macOS o Linux para desarrollo; macOS es necesario para compilar de forma local para iOS.",
    "Requiere JavaScript o TypeScript, Node.js y gestión de dependencias con npm o pnpm; algunos paquetes pueden incorporar backend propio.",
    "Abrir package.json y README, instalar dependencias, configurar variables de entorno y confirmar la versión de React Native, Expo y SDK antes de ejecutar.",
    ["react-native", "expo"],
    "No todos los paquetes incluyen backend, API, claves de pago ni publicación en tiendas. Confirma dependencias, licencia y alcance antes de iniciar un producto."
  );

  if (source === "temas clasificados" || source === "veterinary clinic website") return web(
    source === "temas clasificados" ? ["WordPress", "PHP", "MySQL"] : ["HTML", "Bootstrap", "React", "PHP"],
    "Windows, macOS o Linux con editor de código; hosting compatible con PHP/Node.js cuando corresponda.",
    "Las plantillas HTML/Bootstrap requieren edición de HTML, CSS y JavaScript; los temas WordPress requieren una instalación PHP y base de datos.",
    "Extraer el ZIP y confirmar si se trata de HTML estático, Bootstrap, React o tema WordPress; revisar README, package.json o instrucciones de instalación.",
    ["html-bootstrap", ...(source === "temas clasificados" ? ["wordpress"] : [])],
    "El nombre comercial del paquete no confirma el framework exacto: utiliza los archivos internos para validar instalación, dependencias y uso permitido."
  );

  if (source === "plantillas web") return web(
    ["HTML/CSS/JavaScript", "React", "Next.js", "Vue/Nuxt", "PHP/Laravel", "CodeIgniter", "Tailwind CSS", "Elementor"],
    "Windows, macOS o Linux con editor de código; hosting o entorno local según la plantilla elegida",
    "Requiere editar HTML, CSS y JavaScript para las plantillas estáticas; React, Next.js, Vue, Nuxt, PHP, Laravel o CodeIgniter cuando el ZIP lo indique.",
    "Abrir cada ZIP y revisar el README, package.json o archivos de instalación para confirmar framework, versión de Node.js/PHP y dependencias antes de iniciar el proyecto.",
    ["design-tools"],
    "La colección reúne tecnologías diferentes: no todas las plantillas sirven para el mismo framework, CMS o hosting. Revisa el nombre y los archivos internos de cada recurso antes de instalarlo."
  );

  if (source === "academia online - wordpress") return web(["WordPress", "Elementor", "LMS"], "Navegador + hosting WordPress con PHP y base de datos", "La personalización inicial se hace desde WordPress y Elementor; CSS, PHP y JavaScript se usan para ajustes avanzados.", "Revisar cada ZIP para confirmar versión de WordPress, constructor y plugin LMS requerido antes de instalarlo.", ["wordpress", "design-tools"], "No todos los temas incluyen el mismo LMS ni son compatibles con la misma versión de WordPress o Elementor.");
  if (source === "behance") return web(["Google Slides", "PowerPoint", "HTML", "WordPress"], "Windows, macOS o navegador según el recurso elegido", "Algunos recursos se editan sin código; los templates HTML y WordPress requieren conocimientos técnicos para personalizaciones profundas.", "Abrir el ZIP y comprobar si contiene una presentación, plantilla HTML o tema de WordPress antes de empezar.", ["design-tools", "wordpress"], "La colección mezcla formatos de portfolio, presentación y web; cada archivo puede requerir una aplicación diferente.");
  if (source === "diapositivas de matematicas" || source === "google slides") return web(["Google Slides", "Microsoft PowerPoint", "Apple Keynote", "Canva"], "Navegador, Windows o macOS", "No requiere código; edita textos, gráficas, colores e imágenes en el software de presentaciones compatible.", "Extraer el ZIP y verificar si incluye formato para Google Slides, PowerPoint o Keynote antes de editar.", ["design-tools"], "No todas las plantillas se abren de forma nativa en el mismo programa; confirma el formato de cada archivo.");
  if (source === "logo y email" || source === "math graphic templates") return web(["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva", "Editor de email"], "Navegador, Windows o macOS", "No requiere código para la edición visual; una plantilla de email puede requerir HTML para ajustes avanzados.", "Extraer el ZIP y revisar si contiene SVG, AI, PSD, PNG o HTML para elegir la aplicación adecuada.", ["design-tools"], "La colección combina recursos de branding, interfaces y comunicación; comprueba los archivos internos antes de editarlos.");
  if (source === "plantillas web de figma") return web(["Figma", "FigJam", "Editor de código"], "Navegador, Windows o macOS", "No requiere código para prototipar; HTML, CSS y JavaScript se utilizan si se implementa el diseño en producción.", "Abrir el recurso en Figma y revisar estilos, componentes y exportables antes de entregarlo a desarrollo.", ["design-tools"], "Estas son interfaces de diseño: no se convierten automáticamente en un sitio funcional sin implementación técnica.");
  if (source === "temas prestashop" || source === "prestashop (3)") return web(["PrestaShop", "Editor de temas PrestaShop"], "Navegador + hosting con PHP y base de datos compatible con PrestaShop", "La personalización básica se hace desde PrestaShop; Smarty, PHP, CSS y JavaScript se usan para ajustes avanzados.", "Revisar el ZIP para confirmar la versión de PrestaShop, módulos requeridos e instrucciones de instalación.", ["prestashop"], "No funciona como tema de Shopify, WordPress o WooCommerce sin una migración o desarrollo específico.");

  if (source === "diseño web") {
    if (/plugins/.test(name)) return web(["WordPress", "WooCommerce", "Elementor"], "Navegador + hosting WordPress compatible", "No requiere código para instalar y configurar lo básico; PHP, CSS y JavaScript solo para personalizaciones avanzadas.", "Necesitas un sitio WordPress activo; las extensiones de tienda requieren WooCommerce y las de diseño visual requieren Elementor cuando el plugin lo indique.", ["wordpress", "woocommerce"], "No todos los plugins sirven para cualquier versión de WordPress: revisa compatibilidad, licencia y requisitos de cada ZIP antes de instalarlos.");
    if (/wordpress|ecommerce wordpress/.test(name)) return web(["WordPress", "WordPress Theme Editor"], "Navegador + hosting con PHP y base de datos para WordPress", "No requiere código para la personalización inicial; HTML, CSS, PHP o constructor visual si se quiere modificar el tema a fondo.", "Instalarlo como tema de WordPress. Si el recurso menciona ecommerce, añade WooCommerce.", ["wordpress", ...( /ecommerce|woo/.test(name) ? ["woocommerce"] : [])]);
    if (/drupal/.test(name)) return web(["Drupal"], "Navegador + hosting con PHP, base de datos y entorno Drupal", "El uso básico es administrable desde Drupal; Twig, PHP, CSS y JavaScript se usan para personalizaciones profundas.", "Instalarlo como tema o recurso de Drupal; debe coincidir con la versión mayor de Drupal del proyecto.", ["drupal"], "No es un tema de WordPress ni Joomla: necesita una instalación Drupal compatible.");
    if (/ghost/.test(name)) return web(["Ghost CMS"], "Navegador + hosting compatible con Node.js para Ghost", "La edición diaria no requiere código; Handlebars, CSS y JavaScript se usan para modificar el tema.", "Instalarlo como tema de Ghost y revisar que la versión de Ghost sea compatible.", ["ghost"], "No se instala directamente en WordPress, Joomla o Drupal.");
    if (/joomla/.test(name)) return web(["Joomla"], "Navegador + hosting con PHP y base de datos para Joomla", "La gestión básica se hace desde Joomla; PHP, CSS y JavaScript solo son necesarios para adaptar plantillas.", "Instalarlo como plantilla o extensión de Joomla y comprobar la versión del CMS.", ["joomla"], "No es compatible de forma directa con WordPress o Drupal.");
    if (/opencart/.test(name)) return web(["OpenCart"], "Navegador + hosting con PHP y base de datos para OpenCart", "No requiere código para configurar catálogo y diseño básico; PHP, Twig, CSS y JavaScript se usan para adaptaciones avanzadas.", "Instalarlo como tema de OpenCart y verificar la versión de OpenCart requerida.", ["opencart"], "No se instala directamente en Shopify ni WooCommerce.");
    if (/shopify/.test(name)) return web(["Shopify", "Editor de temas Shopify"], "Navegador + cuenta Shopify", "No requiere código para personalizar secciones comunes; Liquid, HTML, CSS y JavaScript se usan para cambios avanzados.", "Subirlo como tema de Shopify y personalizarlo desde el editor visual.", ["shopify"], "No necesita hosting propio ni PHP; no funciona como tema de WordPress, OpenCart o Drupal.");
    if (/tumblr/.test(name)) return web(["Tumblr"], "Navegador + cuenta Tumblr", "No requiere código para activar un tema; HTML y CSS sirven para personalizaciones avanzadas del layout.", "Aplicarlo en el panel de temas de Tumblr y revisar sus instrucciones de importación.", ["design-tools"], "Es un tema para Tumblr, no un CMS autoalojado.");
    if (/unbounce/.test(name)) return web(["Unbounce"], "Navegador + cuenta Unbounce", "No requiere código para montar la landing; HTML, CSS y JavaScript son opcionales para personalizaciones concretas.", "Usarlo dentro del constructor Unbounce; conecta dominio y formularios desde la plataforma.", ["design-tools"], "No es una plantilla instalable de WordPress, Shopify o Drupal.");
    if (/plantillas word/.test(name)) return web(["Microsoft Word", "LibreOffice Writer"], "Windows, macOS o navegador con Microsoft 365", "No requiere código.", "Abrir y editar como documento; revisar fuentes, imágenes y estilos antes de compartir o imprimir.", ["design-tools"]);
    return web(["Código web o CMS por confirmar"], "Depende del formato incluido en el ZIP", "Puede requerir HTML, CSS y JavaScript si incluye una plantilla estática; también puede requerir el CMS indicado dentro del paquete.", "Abrir el ZIP y verificar si contiene archivos .html/.css/.js o una carpeta de tema para un CMS antes de comprar o instalar.", ["design-tools"], "El nombre de carpeta 'Plantillas Web' no confirma por sí solo un CMS específico.");
  }

  if (source === "capcut pro") {
    if (/fcpx|final-cut|apple-motion/.test(name)) return web([/apple-motion/.test(name) ? "Apple Motion" : "Final Cut Pro X", "Final Cut Pro X"], "macOS", "No requiere código; se importa como plantilla, título, efecto o generador en Final Cut Pro X y, cuando se indique, Apple Motion.", "Necesitas macOS y Final Cut Pro X; los recursos que mencionan Apple Motion requieren también Apple Motion para editarlos a fondo.", ["fcpx"], "Aunque la carpeta se llame capcut pro, los nombres con FCPX, Final Cut Pro X o Apple Motion no son paquetes para CapCut.");
    return web(["CapCut Desktop (formato por confirmar)"], "Windows o macOS", "No requiere código si el ZIP incluye una plantilla CapCut; confirmar el formato antes de importarlo.", "Abrir el ZIP y verificar que incluya un proyecto o plantilla compatible con CapCut Desktop.", ["capcut"], "El nombre de la carpeta sugiere CapCut, pero si el paquete no dice CapCut en su nombre, confirma su formato antes de comprarlo o instalarlo.");
  }

  if (source === "photoshop") return web(["Adobe Photoshop"], "Windows o macOS", "No requiere código; los cambios se realizan con capas, objetos inteligentes, estilos y texto de Photoshop.", "Necesitas Adobe Photoshop de escritorio y debes abrir el ZIP para comprobar si el recurso incluye PSD, fuentes o imágenes vinculadas.", ["photoshop"], "No asumir compatibilidad completa con Canva, Figma o editores móviles: depende de que el paquete incluya exportaciones planas.");
  if (source === "iconos") return web(["Figma", "Adobe Illustrator", "Canva", "Adobe Photoshop"], "Navegador, Windows o macOS", "No requiere código; si se usa en una web, puede requerir exportar SVG/PNG e integrarlo mediante HTML/CSS.", "Extraer el ZIP y comprobar si contiene SVG, PNG, AI o EPS para elegir la herramienta adecuada.", ["design-tools"], "El formato exacto cambia por paquete: verifica el contenido antes de usarlo en una app o página web.");
  if (source === "musicas") return web(["CapCut", "Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "Editor de audio"], "Windows, macOS, iOS o Android según el editor", "No requiere código; importa el archivo de audio en la línea de tiempo del editor elegido.", "Extraer el ZIP y revisar formato de audio y licencia antes de publicar contenido comercial.", ["audio-editor", "capcut"], "La compatibilidad depende de que el editor admita el formato de audio incluido; casi todos aceptan MP3 o WAV.");
  if (source === "3d builder") return web(["Software 3D según formato del ZIP"], "Windows o macOS según la aplicación 3D", "No requiere código; puede requerir importar modelos, escenas o vídeos al software que coincida con el formato incluido.", "Verificar dentro del ZIP si contiene .blend, .fbx, .obj, .c4d, archivos de After Effects o vídeo exportado antes de elegir herramienta.", ["design-tools"], "La carpeta 3D BUILDER describe el tipo de recurso, no confirma una única aplicación. No compres sin revisar el formato interno si necesitas editar el modelo.");
  return web(["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva"], "Navegador, Windows o macOS", "No requiere código; para web se exporta normalmente a SVG, PNG o JPG y se integra con HTML/CSS si corresponde.", "Extraer el ZIP y revisar formato, licencia y resolución antes de usarlo en una herramienta concreta.", ["design-tools"], "Los patrones y texturas son recursos visuales: el formato interno determina qué aplicación ofrece la mejor edición.");
}

export function matchesTechnicalFilter(item: CatalogItem, filterId: string) {
  return filterId === "Todo" || technicalFor(item).filterKeys.includes(filterId);
}

export function licenseReviewFor(item: CatalogItem): LicenseReview {
  const technical = technicalFor(item);
  const source = (item.sourceFolder ?? "").toLowerCase();
  const name = `${item.name} ${item.originalName ?? ""}`.toLowerCase();
  const isWebOrCode = technical.filterKeys.some((key) => ["wordpress", "elementor", "woocommerce", "drupal", "joomla", "ghost", "shopify", "opencart", "prestashop", "react-native", "expo", "html-bootstrap"].includes(key)) || /template|theme|plugin|bootstrap|react|wordpress|shopify|prestashop/.test(name);
  if (isWebOrCode) return {
    key: "web-code",
    label: "Licencia y distribución por confirmar",
    shortLabel: "Código y distribución",
    note: "El inventario no valida licencias. Revisa el README, la licencia del paquete y sus dependencias antes de publicar, revender o redistribuir.",
  };
  const isFontOrMedia = technical.filterKeys.some((key) => ["fonts", "audio-editor", "fcpx", "capcut"].includes(key)) || /font|audio|music|musica|video|motion|podcast/.test(`${source} ${name}`);
  if (isFontOrMedia) return {
    key: "font-media",
    label: "Uso comercial por confirmar",
    shortLabel: "Fuentes y medios",
    note: "Comprueba si el archivo permite uso comercial, sincronización audiovisual, webfont, edición o distribución según corresponda.",
  };
  return {
    key: "archive",
    label: "Licencia del archivo por confirmar",
    shortLabel: "Archivo y autoría",
    note: "Consulta la licencia, atribución y restricciones incluidas en el ZIP o en la fuente original antes de publicar el resultado.",
  };
}

export function matchesLicenseReview(item: CatalogItem, filterId: "Todo" | LicenseReviewKey) {
  return filterId === "Todo" || licenseReviewFor(item).key === filterId;
}

export function minimumRequirementFor(item: CatalogItem): MinimumRequirement {
  const technical = technicalFor(item);
  const keys = technical.filterKeys;
  if (keys.some((key) => ["react-native", "expo", "html-bootstrap"].includes(key))) return {
    level: "development",
    label: "Requiere desarrollo",
    shortLabel: "Node + proyecto",
    note: "Revisa README, dependencias y versión de Node.js o framework antes de ejecutar el paquete.",
  };
  if (keys.some((key) => ["wordpress", "elementor", "woocommerce", "drupal", "joomla", "ghost", "shopify", "opencart", "prestashop", "magento"].includes(key))) return {
    level: "setup",
    label: "Requiere configuración",
    shortLabel: "CMS o hosting",
    note: "Necesita una instalación compatible, plugins o credenciales de la plataforma indicados en la ficha.",
  };
  if (keys.includes("fonts")) return {
    level: "direct",
    label: "Instalación local",
    shortLabel: "Instalar OTF/TTF",
    note: "Extrae el ZIP, instala el formato compatible y reinicia la aplicación de diseño si fuera necesario.",
  };
  if (keys.some((key) => ["fcpx", "capcut", "photoshop", "audio-editor"].includes(key))) return {
    level: "setup",
    label: "Requiere aplicación",
    shortLabel: "Software compatible",
    note: "Abre el ZIP en la aplicación indicada y confirma el formato del archivo antes de editar.",
  };
  return {
    level: "direct",
    label: "Listo para revisar",
    shortLabel: "Extraer y abrir",
    note: "Extrae el ZIP y comprueba sus formatos internos antes de incorporarlo a un proyecto.",
  };
}

export function versionCompatibilityFor(item: CatalogItem): VersionCompatibility {
  const source = (item.sourceFolder ?? "").toLowerCase();
  const name = `${item.name} ${item.originalName ?? ""}`.toLowerCase();
  if (source === "shopify 1 - 10") {
    if (/shopify.*(?:os[- ]?2[.-]?0|2[- ]?0)|(?:os[- ]?2[.-]?0).*shopify/.test(name)) {
      return { label: "Shopify Online Store 2.0", note: "La referencia a OS 2.0 aparece en el nombre; confirma en el ZIP las secciones y apps necesarias antes de activar el tema." };
    }
    return { label: "Shopify · versión por confirmar", note: "Revisa config/settings_schema.json y la documentación del tema para validar su arquitectura antes de instalarlo." };
  }
  if (source === "magento ii") return { label: "Magento 2.x · por confirmar", note: "El nombre identifica Magento 2, pero el README debe confirmar la versión menor de Magento, PHP y Adobe Commerce." };
  if (source === "magento") return { label: /magento[- ]?2/.test(name) ? "Magento 2.x · por confirmar" : "Magento / Adobe Commerce · por confirmar", note: "El nombre del paquete orienta a Magento, pero el README debe confirmar la versión de Magento, PHP, Adobe Commerce y módulos requeridos." };
  if (source === "cursos" || source === "inmobiliaria") return { label: "WordPress · por confirmar", note: "El paquete indica un tema WordPress; revisa el README para confirmar versión de WordPress, PHP, constructor y plugins." };
  if (source === "react native") return { label: "React Native / Expo · por confirmar", note: "Abre package.json y app.json para comprobar las versiones de React Native, Expo SDK y Node.js antes de ejecutar." };
  if (source === "plantillas elementor ecommerce" || source === "podcast y radio") return { label: "WordPress + Elementor · por confirmar", note: "Revisa el kit y sus plugins para validar la versión de WordPress, Elementor y WooCommerce requerida." };
  if (source === "temas prestashop" || source === "prestashop (3)") return { label: "PrestaShop · por confirmar", note: "Consulta la documentación del tema para verificar la versión de PrestaShop, PHP y módulos necesarios." };
  return { label: "Versión por confirmar", note: "El nombre del archivo no acredita una versión de software; revisa README, package.json o la documentación interna antes de instalar." };
}

export function describeResource(item: CatalogItem): ResourceNarrative {
  const base = narratives[item.category];
  const originalName = item.name.replace(/\.[a-z0-9]+$/i, "");
  const override = titleOverrides[originalName];
  const title = override ?? (item.sourceFolder === "musicas" ? `Música para dar ${item.tags.slice(0, 2).join(" y ")} a un vídeo` : base.clearTitle);

  if (item.resourceType.toLowerCase().includes("personaje")) {
    return { ...base, clearTitle: "Personaje 3D para guiar una historia o explicación", when: "Úsalo cuando un vídeo necesita un protagonista reconocible para explicar un servicio, proceso o historia sin depender de actores reales.", technical: technicalFor(item) };
  }
  return { ...base, clearTitle: title, technical: technicalFor(item) };
}
