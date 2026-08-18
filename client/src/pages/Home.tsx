/**
 * Archivo editorial: recursos visuales de una fuente privada de Drive; el origen queda identificado por cuenta, sin exponer la jerarquía interna de carpetas.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  AtSign,
  Check,
  ChevronRight,
  ChevronDown,
  CircleHelp,
  Columns3,
  Download,
  FileArchive,
  Flower2,
  FolderOpen,
  FolderPlus,
  Grid3X3,
  Heart,
  Layers3,
  Menu,
  PanelTopClose,
  PanelTopOpen,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Sparkles,
  Share2,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { CollectionExplorerPanel } from "@/components/CollectionExplorerPanel";
import { catalogCategories, displayTitle, type CatalogItem, type ResourceCategory } from "@/data/catalog";
import { fullCatalog } from "@/data/designCatalog";
import { defaultDriveSource, driveSources } from "@/data/driveSources";
import { describeResource, matchesTechnicalFilter, technicalFilters } from "@/data/catalogNarrative";
import { goalsForResource, projectGoals, type ProjectGoalId } from "@/data/projectGoals";

type Filter = "Todo" | ResourceCategory;
type GoalFilter = "Todo" | ProjectGoalId;
type TechnicalFilter = "Todo" | (typeof technicalFilters)[number]["id"];
type SizeFilter = "Todo" | "small" | "medium" | "large" | "collection";
type SavedCollection = { id: string; name: string; itemIds: string[]; createdAt: string };
type DownloadProgress = { current: number; total: number } | null;

const categoryVisual = {
  "Naturaleza & flora": { icon: Flower2, tone: "flora", intro: "Motivos orgánicos para dar vida a marcas, productos y superficies." },
  "Geometría & gráfico": { icon: Grid3X3, tone: "geometry", intro: "Sistemas visuales de alto ritmo, fáciles de escalar y combinar." },
  "Texturas & materiales": { icon: Layers3, tone: "material", intro: "Capas táctiles para fondos con profundidad y carácter físico." },
  "Atmósferas & overlays": { icon: Sparkles, tone: "atmosphere", intro: "Luz, energía y entornos visuales para crear una escena." },
  "Retro & decorativo": { icon: Tag, tone: "retro", intro: "Detalles con memoria gráfica para identidades más singulares." },
  "Modelado & 3D": { icon: Layers3, tone: "geometry", intro: "Escenas, objetos y personajes tridimensionales para animar ideas." },
  "Video & Motion": { icon: Sparkles, tone: "atmosphere", intro: "Plantillas y efectos para editar secuencias con ritmo y movimiento." },
  "Iconos & UI": { icon: Grid3X3, tone: "geometry", intro: "Símbolos y sistemas de interfaz para comunicar con rapidez." },
  "Audio & Música": { icon: Sparkles, tone: "retro", intro: "Colecciones musicales para definir el pulso de una pieza audiovisual." },
  "Mockups & Plantillas": { icon: FolderOpen, tone: "material", intro: "Presentaciones, maquetas y documentos listos para personalizar." },
  "Web & CMS": { icon: Grid3X3, tone: "geometry", intro: "Temas, CMS y plantillas para estructurar sitios administrables." },
  "Ecommerce & tiendas": { icon: FileArchive, tone: "ember", intro: "Temas y recursos para catálogos, productos y recorridos de compra." },
} as const;

const directDownloadUrl = (item: CatalogItem) => `https://drive.usercontent.google.com/download?id=${item.id}&export=download&confirm=t`;

const sizeFilters = [
  { id: "small", label: "Hasta 50 MB", note: "Archivos ligeros", predicate: "small" },
  { id: "medium", label: "50–250 MB", note: "Archivos medianos", predicate: "medium" },
  { id: "large", label: "Más de 250 MB", note: "Archivos pesados", predicate: "large" },
  { id: "collection", label: "Colecciones", note: "Carpetas preparadas por Drive", predicate: "collection" },
] as const;

function sizeInMb(item: CatalogItem) {
  if (item.isCollection) return null;
  const match = item.size.match(/([\d.]+)\s*(KB|MB|GB)/i);
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = match[2].toUpperCase();
  return unit === "GB" ? amount * 1024 : unit === "KB" ? amount / 1024 : amount;
}

function matchesSizeFilter(item: CatalogItem, filter: SizeFilter) {
  if (filter === "Todo") return true;
  if (filter === "collection") return Boolean(item.isCollection);
  const size = sizeInMb(item);
  if (size === null) return false;
  if (filter === "small") return size <= 50;
  if (filter === "medium") return size > 50 && size <= 250;
  return size > 250;
}

function formatWeight(totalMb: number) {
  if (totalMb >= 1024) return `${(totalMb / 1024).toFixed(totalMb >= 10240 ? 0 : 1)} GB`;
  return `${Math.round(totalMb)} MB`;
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("Todo");
  const [goalFilter, setGoalFilter] = useState<GoalFilter>("Todo");
  const [technicalFilter, setTechnicalFilter] = useState<TechnicalFilter>("Todo");
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("Todo");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("indice-drive:favorites") ?? "[]") as string[]; } catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(() => typeof window === "undefined" || window.innerWidth >= 768);
  const [collections, setCollections] = useState<SavedCollection[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("indice-drive:collections") ?? "[]") as SavedCollection[]; } catch { return []; }
  });
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [notice, setNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartIds, setCartIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("indice-drive:download-cart") ?? "[]") as string[]; } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>(null);

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    fullCatalog.flatMap((item) => item.tags).forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([tag]) => tag);
  }, []);

  const resources = useMemo(() => {
    const term = query.trim().toLowerCase();
    return fullCatalog.filter((item) => {
      const categoryMatch = filter === "Todo" || item.category === filter;
      const goalMatch = goalFilter === "Todo" || goalsForResource(item).includes(goalFilter);
      const technicalMatch = matchesTechnicalFilter(item, technicalFilter);
      const sizeMatch = matchesSizeFilter(item, sizeFilter);
      const tagMatch = !activeTag || item.tags.includes(activeTag);
      const favoriteMatch = !showFavorites || favorites.includes(item.id);
      const narrative = describeResource(item);
      const text = `${item.name} ${narrative.clearTitle} ${item.resourceType} ${item.tags.join(" ")} ${item.purpose} ${item.projects.join(" ")} ${narrative.scenarios.map((scenario) => `${scenario.title} ${scenario.detail}`).join(" ")} ${narrative.technical.apps.join(" ")} ${narrative.technical.environment} ${narrative.technical.code} ${narrative.technical.requirement}`.toLowerCase();
      return categoryMatch && goalMatch && technicalMatch && sizeMatch && tagMatch && favoriteMatch && (!term || text.includes(term));
    });
  }, [filter, goalFilter, technicalFilter, sizeFilter, query, activeTag, showFavorites, favorites]);

  const groupedResources = useMemo(() => [["Recursos indexados", resources] as [string, CatalogItem[]]], [resources]);

  const categoryCount = (category: Filter) => category === "Todo" ? fullCatalog.length : fullCatalog.filter((item) => item.category === category).length;
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  const toggleCompare = (id: string) => setCompareIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : current.length < 3 ? [...current, id] : current);
  const toggleCart = (id: string) => setCartIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  const comparisonItems = useMemo(() => compareIds.map((id) => fullCatalog.find((item) => item.id === id)).filter((item): item is CatalogItem => Boolean(item)), [compareIds]);
  const cartItems = useMemo(() => cartIds.map((id) => fullCatalog.find((item) => item.id === id)).filter((item): item is CatalogItem => Boolean(item)), [cartIds]);
  const cartWeight = useMemo(() => cartItems.reduce((sum, item) => sum + (sizeInMb(item) ?? 0), 0), [cartItems]);
  const cartCollections = useMemo(() => cartItems.filter((item) => item.isCollection).length, [cartItems]);
  const activeGoal = projectGoals.find((goal) => goal.id === goalFilter);
  const activeSize = sizeFilters.find((item) => item.id === sizeFilter);
  const collectionSourceIds = compareIds.length > 0 ? compareIds : favorites;
  const recommendationItems = useMemo(() => {
    const candidatePool = fullCatalog.filter((item) => {
      if (goalFilter !== "Todo") return goalsForResource(item).includes(goalFilter);
      if (activeTag) return item.tags.includes(activeTag);
      if (filter !== "Todo") return item.category === filter;
      if (favorites.length) return favorites.some((favoriteId) => fullCatalog.find((resource) => resource.id === favoriteId)?.category === item.category);
      return item.category === "Mockups & Plantillas" || item.category === "Web & CMS" || item.category === "Video & Motion";
    });
    return candidatePool.filter((item) => !compareIds.includes(item.id)).slice(0, 3);
  }, [goalFilter, activeTag, filter, favorites, compareIds]);

  useEffect(() => {
    try { window.localStorage.setItem("indice-drive:favorites", JSON.stringify(favorites)); } catch { /* El catálogo sigue funcionando si el navegador bloquea el almacenamiento local. */ }
  }, [favorites]);

  useEffect(() => {
    try { window.localStorage.setItem("indice-drive:collections", JSON.stringify(collections)); } catch { /* Las colecciones permanecen funcionales durante la sesión si el navegador bloquea el almacenamiento local. */ }
  }, [collections]);

  useEffect(() => {
    try { window.localStorage.setItem("indice-drive:download-cart", JSON.stringify(cartIds)); } catch { /* El carrito permanece operativo durante la sesión si el navegador bloquea el almacenamiento local. */ }
  }, [cartIds]);

  useEffect(() => {
    const encoded = new URLSearchParams(window.location.search).get("coleccion");
    if (!encoded) return;
    try {
      const ids = JSON.parse(window.atob(encoded)) as string[];
      const available = ids.filter((id) => fullCatalog.some((item) => item.id === id));
      if (available.length) { setCompareIds(available.slice(0, 3)); setNotice("Colección compartida cargada en el comparador."); }
    } catch { /* Ignora enlaces de colección incompletos o no válidos. */ }
  }, []);

  const createCollection = () => {
    if (!collectionSourceIds.length) { setNotice("Guarda recursos o selecciónalos para comparar antes de crear una colección."); return; }
    const name = collectionName.trim() || `Colección ${collections.length + 1}`;
    const collection: SavedCollection = { id: `${Date.now()}`, name, itemIds: collectionSourceIds, createdAt: new Date().toLocaleDateString("es") };
    setCollections((current) => [collection, ...current]);
    setCollectionName("");
    setNotice(`“${name}” se guardó en este navegador.`);
  };

  const shareCollection = async (collection: SavedCollection) => {
    const url = new URL(window.location.href);
    url.searchParams.set("coleccion", window.btoa(JSON.stringify(collection.itemIds)));
    try { await navigator.clipboard.writeText(url.toString()); setNotice(`Enlace de “${collection.name}” copiado.`); } catch { setNotice(`Comparte esta ruta: ${url.toString()}`); }
  };

  const downloadCart = () => {
    if (!cartItems.length || downloadProgress) return;
    let current = 0;
    const total = cartItems.length;
    const prepareNext = () => {
      const item = cartItems[current];
      if (!item) { setDownloadProgress(null); setNotice(`Se prepararon ${total} descargas desde el carrito.`); return; }
      const link = document.createElement("a");
      link.href = directDownloadUrl(item);
      link.rel = "noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
      current += 1;
      setDownloadProgress({ current, total });
      window.setTimeout(prepareNext, 750);
    };
    setDownloadProgress({ current: 0, total });
    prepareNext();
  };

  return (
    <div className="app-shell marketplace-shell">
      <aside className={`sidebar marketplace-sidebar ${sidebarOpen ? "sidebar--open" : ""}`} aria-label="Navegación del catálogo">
        <div className="sidebar-topline">
          <a className="brand" href="#inicio" aria-label="Índice Drive">
            <BrandMark />
            <span className="brand-wordmark">índice<span>Drive</span></span>
          </a>
          <button className="icon-button sidebar-dismiss" onClick={() => setSidebarOpen(false)} aria-label="Cerrar navegación"><X size={19} /></button>
        </div>

        <div className="workspace-label">Explorar recursos</div>
        <nav className="sidebar-nav">
          <a href="#catalogo" className="nav-item nav-item--active"><Grid3X3 size={17} />Catálogo<span>{fullCatalog.length}</span></a>
          <button className={`nav-item nav-button ${showFavorites ? "nav-item--active" : ""}`} onClick={() => setShowFavorites(!showFavorites)}><Heart size={17} />Guardados<span>{favorites.length}</span></button>
          <button className="nav-item nav-button" onClick={() => setCollectionsOpen(true)}><FolderPlus size={17} />Colecciones<span>{collections.length}</span></button>
        </nav>

        <div className="tree-heading">Fuente de Drive</div>
        <div className="source-private-list">{driveSources.map((source, index) => <a key={source.id} href={source.folderUrl} target="_blank" rel="noreferrer"><AtSign size={16} /><span><small>Fuente {String(index + 1).padStart(2, "0")}</small><b>{source.account}</b></span><ArrowUpRight size={15} /></a>)}</div>
        <div className="tree-heading collection-heading">Clasificar por tipo</div>
        <nav className="market-nav" aria-label="Categorías de recurso">
          {catalogCategories.map((category) => {
            const Icon = categoryVisual[category].icon;
            return <button key={category} className={`market-nav-item ${filter === category ? "market-nav-item--active" : ""}`} onClick={() => { setFilter(category); setShowFavorites(false); }}><Icon size={16} /><span>{category}</span><b>{categoryCount(category)}</b></button>;
          })}
        </nav>

        <div className="tree-heading collection-heading">Explorar por objetivo</div>
        <nav className="market-nav project-nav" aria-label="Objetivos de proyecto">{projectGoals.map((goal) => <button key={goal.id} className={`market-nav-item ${goalFilter === goal.id ? "market-nav-item--active" : ""}`} onClick={() => { setGoalFilter(goalFilter === goal.id ? "Todo" : goal.id); setShowFavorites(false); }}><SlidersHorizontal size={15} /><span>{goal.label}</span><b>{fullCatalog.filter((item) => goalsForResource(item).includes(goal.id)).length}</b></button>)}</nav>

        <div className="sidebar-note market-note">
          <span className="note-eyebrow">Guía rápida</span>
          <strong>Empieza por el efecto que buscas.</strong>
          <p>Filtra por utilidad, explora etiquetas y abre una ficha para ver dónde aplicar cada recurso.</p>
        </div>
        <div className="sidebar-footer"><CircleHelp size={16} />Las fichas describen usos sugeridos para orientarte, no limitan su uso creativo.</div>
      </aside>

      {sidebarOpen && <button className="page-scrim" onClick={() => setSidebarOpen(false)} aria-label="Cerrar navegación" />}

      <main id="inicio" className="market-main">
        <div className="route-thread" aria-hidden="true"><span /><i /><span /></div>
        <header className="topbar market-topbar">
          <button className="menu-trigger menu-trigger--archive" onClick={() => setSidebarOpen(true)} aria-label="Abrir navegación"><Menu size={20} /><span>Menú</span><small>ARCHIVO</small></button>
          <div className="breadcrumbs"><span>Catálogo de recursos</span><span className="crumb-divider">/</span><strong>{defaultDriveSource.account}</strong></div>
          <div className="topbar-actions"><button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${cartIds.length} recursos`}><ShoppingCart size={17} /><span>Carrito</span><b>{cartIds.length}</b></button><a className="drive-link" href={defaultDriveSource.folderUrl} target="_blank" rel="noreferrer">Abrir origen <ArrowUpRight size={15} /></a></div>
        </header>

        <section className="market-hero inventory-cover" aria-labelledby="market-title">
          <div className="cover-spine" aria-hidden="true"><i /><span /><i /></div>
          <div className="market-hero-copy">
            <div className="cover-brandline"><BrandMark /><span>ÍNDICE DRIVE</span><b>ARCHIVO OPERATIVO · 01</b></div>
            <span className="eyebrow"><span />FUENTE ACTIVA · DRIVE PERSONAL</span>
            <h1 id="market-title">Mapa de<br /><em>recursos</em><br />ubicables.</h1>
            <p>Explora recursos indexados desde tu fuente personal de Drive por tipo, utilidad y compatibilidad. Cada ficha conserva el nombre original y te permite volver al origen sin mostrar jerarquías internas.</p>
            <div className="market-hero-stats"><div><b>{fullCatalog.length}</b><span>registros activos</span></div><div><b>{driveSources.length}</b><span>fuente de Drive</span></div><div><b>{catalogCategories.length}</b><span>tipos de recurso</span></div></div>
            <div className="cover-actions"><a href="#catalogo">Explorar registros <ArrowUpRight size={15} /></a><a href={defaultDriveSource.folderUrl} target="_blank" rel="noreferrer">Abrir carpeta fuente <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="market-hero-art cover-map cover-source" aria-label="Fuente privada de Drive"><div className="cover-map-head"><span>FUENTE DE DRIVE</span><b>ESTADO · INDEXADO</b></div><div className="cover-source-card"><span><AtSign size={17} /> CUENTA DE ORIGEN</span><strong>{defaultDriveSource.account}</strong><p>{fullCatalog.length} recursos disponibles desde esta fuente privada.</p><a href={defaultDriveSource.folderUrl} target="_blank" rel="noreferrer">Abrir carpeta exacta <ArrowUpRight size={15} /></a></div><p>Las carpetas internas se mantienen ocultas para simplificar tu índice.</p></div>
        </section>

        <section id="catalogo" className="catalog-section" aria-labelledby="catalog-title">
          <div className="catalog-heading"><div><span className="section-kicker">ÍNDICE DE ARCHIVO · RUTA, SELLO Y USO</span><h2 id="catalog-title">Recursos ubicables, decisiones más claras.</h2></div><span className="catalog-count">{resources.length.toString().padStart(2, "0")} <small>recursos</small></span></div>

          <div className="search-row">
            <label className="market-search"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca por estilo, efecto o proyecto…" aria-label="Buscar por estilo, etiqueta o proyecto" />{query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda"><X size={16} /></button>}</label>
            <button className={`saved-toggle ${showFavorites ? "saved-toggle--active" : ""}`} onClick={() => setShowFavorites(!showFavorites)}><Heart size={16} fill={showFavorites ? "currentColor" : "none"} />Guardados <span>{favorites.length}</span></button>
          </div>

          <button className="filters-toggle" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} aria-controls="catalog-filters">{filtersOpen ? <PanelTopClose size={16} /> : <PanelTopOpen size={16} />}<span>{filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}</span><b>{[filter !== "Todo", goalFilter !== "Todo", technicalFilter !== "Todo", sizeFilter !== "Todo", Boolean(activeTag)].filter(Boolean).length} activos</b><ChevronDown size={16} className={filtersOpen ? "filters-toggle-chevron filters-toggle-chevron--open" : "filters-toggle-chevron"} /></button>
          {filtersOpen && <div id="catalog-filters" className="filters-panel"><div className="market-filters" aria-label="Filtros de categoría">
            <button className={`category-card category-card--all ${filter === "Todo" && !showFavorites ? "category-card--active" : ""}`} onClick={() => { setFilter("Todo"); setShowFavorites(false); }}><span className="category-symbol">✦</span><span><b>Todo el índice</b><small>{fullCatalog.length} recursos</small></span><ChevronRight size={17} /></button>
            {catalogCategories.map((category) => { const visual = categoryVisual[category]; const Icon = visual.icon; return <button key={category} className={`category-card category-card--${visual.tone} ${filter === category && !showFavorites ? "category-card--active" : ""}`} onClick={() => { setFilter(category); setShowFavorites(false); }}><Icon size={20} /><span><b>{category}</b><small>{categoryCount(category)} recursos</small></span><ChevronRight size={17} /></button>; })}
          </div>
          <div className="project-goal-rail"><div><span>Empezar por un objetivo</span><p>¿Qué quieres resolver en este proyecto?</p></div><div>{projectGoals.map((goal) => <button key={goal.id} title={goal.description} onClick={() => setGoalFilter(goalFilter === goal.id ? "Todo" : goal.id)} className={goalFilter === goal.id ? "goal-pill goal-pill--active" : "goal-pill"}>{goal.label}</button>)}</div>{goalFilter !== "Todo" && <button className="clear-goal" onClick={() => setGoalFilter("Todo")}>Quitar objetivo</button>}</div>
          <div className="technical-rail"><div><span>Compatibilidad técnica</span><p>¿Con qué plataforma, software o sistema vas a trabajar?</p></div><div>{technicalFilters.map((item) => <button key={item.id} title={item.note} onClick={() => setTechnicalFilter(technicalFilter === item.id ? "Todo" : item.id)} className={technicalFilter === item.id ? "technical-pill technical-pill--active" : "technical-pill"}>{item.label}<b>{fullCatalog.filter((resource) => matchesTechnicalFilter(resource, item.id)).length}</b></button>)}</div>{technicalFilter !== "Todo" && <button className="clear-tech" onClick={() => setTechnicalFilter("Todo")}>Quitar compatibilidad</button>}</div>
          <div className="size-rail"><div><span>Tamaño de archivo</span><p>Elige según tu conexión y espacio disponible.</p></div><div>{sizeFilters.map((item) => <button key={item.id} title={item.note} onClick={() => setSizeFilter(sizeFilter === item.id ? "Todo" : item.id)} className={sizeFilter === item.id ? "size-pill size-pill--active" : "size-pill"}>{item.label}<b>{fullCatalog.filter((resource) => matchesSizeFilter(resource, item.id)).length}</b></button>)}</div>{sizeFilter !== "Todo" && <button className="clear-size" onClick={() => setSizeFilter("Todo")}>Quitar tamaño</button>}</div>
          <div className="tag-rail"><span>Etiquetas frecuentes</span>{popularTags.map((tag) => <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={activeTag === tag ? "tag-pill tag-pill--active" : "tag-pill"}>#{tag}</button>)}{activeTag && <button className="clear-tag" onClick={() => setActiveTag(null)}>Quitar etiqueta</button>}</div></div>}

          <div className="resource-toolbar"><span>{showFavorites ? "Archivos guardados" : activeGoal ? activeGoal.label : technicalFilter !== "Todo" ? `Compatible con ${technicalFilters.find((item) => item.id === technicalFilter)?.label}` : sizeFilter !== "Todo" ? activeSize?.label : filter === "Todo" ? "Registro de recursos" : filter}</span><p>{activeTag ? `Filtrando por #${activeTag}` : activeGoal ? activeGoal.description : technicalFilter !== "Todo" ? technicalFilters.find((item) => item.id === technicalFilter)?.note : sizeFilter !== "Todo" ? activeSize?.note : `Fuente privada: ${defaultDriveSource.account}.`}</p></div>
          {notice && <div className="catalog-notice" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Cerrar aviso"><X size={14} /></button></div>}
          <AutomaticRecommendations items={recommendationItems} activeGoal={activeGoal?.label} onOpen={setSelected} />
          {compareIds.length > 0 && <aside className="compare-dock"><div><Columns3 size={17} /><span><b>{compareIds.length} de 3</b> recursos listos para comparar</span></div><button onClick={() => setComparisonOpen(true)} disabled={compareIds.length < 2}>Comparar recursos</button><button className="compare-clear" onClick={() => setCompareIds([])}>Limpiar</button></aside>}
          {cartIds.length > 0 && <aside className="cart-dock"><div><ShoppingCart size={18} /><span><b>{cartIds.length} en el carrito</b><small>{cartWeight ? formatWeight(cartWeight) : "Peso por confirmar"}{cartCollections ? ` · ${cartCollections} colección${cartCollections === 1 ? "" : "es"}` : ""}</small></span></div>{downloadProgress ? <span className="cart-progress-text">Preparando {downloadProgress.current} de {downloadProgress.total}</span> : <><button onClick={() => setCartOpen(true)}>Ver carrito</button><button className="cart-download-all" onClick={downloadCart}>Descargar todo <Download size={15} /></button></>}</aside>}
          <div className="records-by-folder">
            {groupedResources.map(([group, items]) => <section className="folder-register" key={group} aria-label={group}><header className="folder-register-heading"><span>FUENTE PRIVADA <ChevronRight size={12} /> {defaultDriveSource.account}</span><h3>{group}</h3><b>{items.length.toString().padStart(2, "0")} <small>registros</small></b></header><div className="resource-grid">{items.map((item, index) => <ResourceCard key={item.id} item={item} index={index} favorite={favorites.includes(item.id)} comparisonSelected={compareIds.includes(item.id)} cartSelected={cartIds.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onCompare={() => toggleCompare(item.id)} onCart={() => toggleCart(item.id)} onOpen={() => setSelected(item)} />)}</div></section>)}
          </div>
          {resources.length === 0 && <div className="market-empty"><Search size={25} /><h3>No encontramos ese recurso</h3><p>Prueba con otra compatibilidad, tamaño, etiqueta o proyecto, o restablece los filtros.</p><button onClick={() => { setQuery(""); setActiveTag(null); setFilter("Todo"); setGoalFilter("Todo"); setTechnicalFilter("Todo"); setSizeFilter("Todo"); setShowFavorites(false); }}>Ver todo el catálogo</button></div>}
        </section>

        <footer className="page-footer"><span>Índice Drive · recursos clasificados por utilidad visual.</span><span>Fuente privada · {defaultDriveSource.account}</span></footer>
      </main>

      {selected && (selected.isCollection ? <CollectionExplorerPanel item={selected} onClose={() => setSelected(null)} /> : <ResourceDrawer item={selected} favorite={favorites.includes(selected.id)} cartSelected={cartIds.includes(selected.id)} onClose={() => setSelected(null)} onFavorite={() => toggleFavorite(selected.id)} onCart={() => toggleCart(selected.id)} onOpen={setSelected} />)}
      {comparisonOpen && <ComparisonPanel items={comparisonItems} onClose={() => setComparisonOpen(false)} onRemove={toggleCompare} onExport={() => exportComparison(comparisonItems, setNotice)} />}
      {collectionsOpen && <CollectionsPanel collections={collections} sourceIds={collectionSourceIds} collectionName={collectionName} onNameChange={setCollectionName} onCreate={createCollection} onClose={() => setCollectionsOpen(false)} onShare={shareCollection} onLoad={(collection) => { setCompareIds(collection.itemIds.slice(0, 3)); setCollectionsOpen(false); setNotice(`“${collection.name}” está lista para comparar.`); }} onDelete={(id) => setCollections((current) => current.filter((collection) => collection.id !== id))} />}
      {cartOpen && <DownloadCartPanel items={cartItems} totalWeight={cartWeight} collectionCount={cartCollections} progress={downloadProgress} onClose={() => setCartOpen(false)} onRemove={toggleCart} onClear={() => setCartIds([])} onDownload={downloadCart} />}
    </div>
  );
}

function ResourceCard({ item, index, favorite, comparisonSelected, cartSelected, onFavorite, onCompare, onCart, onOpen }: { item: CatalogItem; index: number; favorite: boolean; comparisonSelected: boolean; cartSelected: boolean; onFavorite: () => void; onCompare: () => void; onCart: () => void; onOpen: () => void }) {
  const narrative = describeResource(item);
  const downloadUrl = directDownloadUrl(item);
  return <article className={`resource-card resource-card--${item.color}`} style={{ animationDelay: `${Math.min(index, 12) * 38}ms` }}>
    <div className="record-strip"><BrandMark className="card-mark" /><span>FUENTE DRIVE · {defaultDriveSource.account}</span><b>{item.isCollection ? "COLECCIÓN" : "ZIP"} · {item.size}</b></div>
    <div className="resource-content"><div className="resource-line"><span className="resource-type"><FileArchive size={13} /> {item.resourceType}</span><span className="record-actions"><button className={`compare-button ${comparisonSelected ? "compare-button--active" : ""}`} onClick={onCompare} aria-label={comparisonSelected ? "Quitar de comparación" : "Añadir a comparación"}><Columns3 size={15} />{comparisonSelected ? "En comparación" : "Comparar"}</button><button className={`cart-button ${cartSelected ? "cart-button--active" : ""}`} onClick={onCart} aria-label={cartSelected ? "Quitar del carrito" : "Añadir al carrito"}><ShoppingCart size={15} />{cartSelected ? "En carrito" : "Carrito"}</button><button className={`heart-button ${favorite ? "heart-button--active" : ""}`} onClick={onFavorite} aria-label={favorite ? "Quitar de guardados" : "Guardar recurso"}><Heart size={16} fill={favorite ? "currentColor" : "none"} /></button></span></div><button className="resource-title" onClick={onOpen}>{narrative.clearTitle}</button><p className="resource-original"><span>Nombre original</span>{displayTitle(item.name)}</p><div className="resource-file-meta"><span>{item.isCollection ? "Colección lista para preparar como ZIP" : "Archivo ZIP listo para descargar"}</span></div><div className="technical-teaser"><span>USAR EN</span><b>{narrative.technical.apps.slice(0, 2).join(" · ")}</b><small>{narrative.technical.environment}</small></div><p>{narrative.value}</p><div className="scenario-teaser"><span>3 casos ideales</span><b>{narrative.scenarios[0].title}</b></div><div className="resource-tags">{item.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="resource-card-actions"><button className="resource-more" onClick={onOpen}>Ver ficha técnica <ArrowUpRight size={15} /></button><a className="resource-download" href={downloadUrl}><Download size={15} />{item.isCollection ? "Descargar colección" : "Descargar ZIP"}</a></div></div>
    <button className="resource-preview" onClick={onOpen} aria-label={`Ver ficha de ${displayTitle(item.name)}`}><span className="preview-code">MUESTRA VISUAL SECUNDARIA</span><span className="preview-shape preview-shape--a" /><span className="preview-shape preview-shape--b" /><span className="preview-label">{item.category}</span></button>
  </article>;
}

function ResourceDrawer({ item, favorite, cartSelected, onClose, onFavorite, onCart, onOpen }: { item: CatalogItem; favorite: boolean; cartSelected: boolean; onClose: () => void; onFavorite: () => void; onCart: () => void; onOpen: (item: CatalogItem) => void }) {
  const driveUrl = item.isCollection ? `https://drive.google.com/drive/folders/${item.id}` : `https://drive.google.com/file/d/${item.id}/view`;
  const downloadUrl = directDownloadUrl(item);
  const narrative = describeResource(item);
  const related = fullCatalog.filter((candidate) => candidate.id !== item.id).map((candidate) => ({ candidate, score: (candidate.category === item.category ? 5 : 0) + candidate.tags.filter((tag) => item.tags.includes(tag)).length * 2 + candidate.projects.filter((project) => item.projects.includes(project)).length })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(({ candidate }) => candidate);
  return <div className="drawer-layer" role="dialog" aria-modal="true" aria-labelledby="resource-drawer-title"><button className="drawer-scrim" onClick={onClose} aria-label="Cerrar ficha" /><aside className="resource-drawer"><button className="drawer-close" onClick={onClose} aria-label="Cerrar ficha"><X size={20} /></button><div className={`drawer-art resource-card--${item.color}`}><span className="preview-code">{item.resourceType}</span><span className="preview-shape preview-shape--a" /><span className="preview-shape preview-shape--b" /><span className="drawer-index">{defaultDriveSource.account} / {item.isCollection ? "COLECCIÓN" : "ZIP"}</span></div><div className="drawer-body"><span className="drawer-category">{item.category}</span><h2 id="resource-drawer-title">{narrative.clearTitle}</h2><p className="drawer-original"><span>Nombre original</span>{displayTitle(item.name)}</p><div className="drawer-meta"><span><FileArchive size={15} /> {item.isCollection ? "Colección" : "Archivo ZIP"}</span><span>{item.size}</span></div><section><h3>Fuente de Drive</h3><p className="drawer-route"><AtSign size={14} /> {defaultDriveSource.account}</p><a className="drawer-source-link" href={defaultDriveSource.folderUrl} target="_blank" rel="noreferrer">Abrir carpeta exacta <ArrowUpRight size={15} /></a></section><section className="drawer-technical"><h3>Compatibilidad técnica</h3><div><span>USAR EN</span><b>{narrative.technical.apps.join(" · ")}</b></div><div><span>ENTORNO</span><b>{narrative.technical.environment}</b></div><div><span>CÓDIGO / EDICIÓN</span><p>{narrative.technical.code}</p></div><div><span>ANTES DE USAR</span><p>{narrative.technical.requirement}</p></div>{narrative.technical.caution && <p className="technical-caution"><CircleHelp size={15} />{narrative.technical.caution}</p>}</section><section className="drawer-value"><h3>Cuándo te será útil</h3><p>{narrative.when}</p></section><section className="drawer-scenarios"><h3>3 casos donde encaja perfecto</h3><div>{narrative.scenarios.map((scenario, index) => <article key={scenario.title}><span>0{index + 1}</span><h4>{scenario.title}</h4><p>{scenario.detail}</p></article>)}</div></section><section className="drawer-problem"><h3>Qué problema resuelve</h3><p>{narrative.problem}</p></section><section className="drawer-outcome"><h3>Qué puedes conseguir</h3><p>{narrative.outcome}</p></section><section><h3>Proyectos donde tiene más impacto</h3><div className="project-list">{item.projects.map((project) => <span key={project}><Check size={14} />{project}</span>)}</div></section><section><h3>Etiquetas de búsqueda</h3><div className="resource-tags drawer-tags">{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></section>{related.length > 0 && <section className="drawer-related"><h3>También te puede servir</h3><p>Recomendado por coincidencias de tipo, etiquetas y proyectos.</p><div>{related.map((resource) => <button key={resource.id} onClick={() => onOpen(resource)}><span>{resource.category}</span><b>{describeResource(resource).clearTitle}</b><ChevronRight size={15} /></button>)}</div></section>}<div className="drawer-actions drawer-actions--download"><button className={`drawer-save ${favorite ? "drawer-save--active" : ""}`} onClick={onFavorite}><Heart size={17} fill={favorite ? "currentColor" : "none"} />{favorite ? "Guardado" : "Guardar ficha"}</button><button className={`drawer-cart ${cartSelected ? "drawer-cart--active" : ""}`} onClick={onCart}><ShoppingCart size={16} />{cartSelected ? "En carrito" : "Añadir al carrito"}</button><a className="drawer-download" href={downloadUrl}><Download size={16} />{item.isCollection ? "Descargar colección" : "Descargar ZIP"}</a><a className="drawer-open-drive" href={driveUrl} target="_blank" rel="noreferrer">Ver en Drive <ArrowUpRight size={16} /></a></div></div></aside></div>;
}

function ComparisonPanel({ items, onClose, onRemove, onExport }: { items: CatalogItem[]; onClose: () => void; onRemove: (id: string) => void; onExport: () => void }) {
  return <div className="drawer-layer comparison-layer" role="dialog" aria-modal="true" aria-labelledby="comparison-title"><button className="drawer-scrim" onClick={onClose} aria-label="Cerrar comparación" /><aside className="comparison-panel"><header><div><span>COMPARADOR DE RECURSOS</span><h2 id="comparison-title">Elige con contexto, no por intuición.</h2><p>Compara el enfoque, los casos ideales, la compatibilidad y los resultados que puede aportar cada alternativa.</p></div><div className="comparison-header-actions"><button className="comparison-export" onClick={onExport}><Download size={15} />Exportar CSV</button><button className="drawer-close" onClick={onClose} aria-label="Cerrar comparación"><X size={20} /></button></div></header><div className={`comparison-grid comparison-grid--${items.length}`}>{items.map((item) => { const narrative = describeResource(item); return <article key={item.id}><button className="comparison-remove" onClick={() => onRemove(item.id)} aria-label={`Quitar ${narrative.clearTitle} de la comparación`}><X size={15} /></button><span className="drawer-category">{item.category}</span><h3>{narrative.clearTitle}</h3><p className="drawer-original"><span>Nombre original</span>{displayTitle(item.name)}</p><dl><div><dt>Tipo</dt><dd>{item.resourceType}</dd></div><div><dt>Usar en</dt><dd>{narrative.technical.apps.join(" · ")}</dd></div><div><dt>Entorno</dt><dd>{narrative.technical.environment}</dd></div><div><dt>Requiere</dt><dd>{narrative.technical.requirement}</dd></div><div><dt>Ideal cuando</dt><dd>{narrative.when}</dd></div><div><dt>Resuelve</dt><dd>{narrative.problem}</dd></div><div><dt>3 casos perfectos</dt><dd><ul>{narrative.scenarios.map((scenario) => <li key={scenario.title}>{scenario.title}</li>)}</ul></dd></div><div><dt>Etiquetas</dt><dd className="comparison-tags">{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</dd></div></dl></article>; })}</div></aside></div>;
}

function AutomaticRecommendations({ items, activeGoal, onOpen }: { items: CatalogItem[]; activeGoal?: string; onOpen: (item: CatalogItem) => void }) {
  if (!items.length) return null;
  return <section className="automatic-recommendations" aria-label="Recomendaciones automáticas"><header><div><span>SELECCIÓN AUTOMÁTICA</span><h3>{activeGoal ? `Recursos para ${activeGoal}` : "Tres recursos para seguir explorando"}</h3></div><p>{activeGoal ? "Sugeridos por el objetivo activo de tu proyecto." : "Sugeridos por compatibilidad con los usos más frecuentes del índice."}</p></header><div>{items.map((item) => <button key={item.id} onClick={() => onOpen(item)}><span>{item.category}</span><b>{describeResource(item).clearTitle}</b><small>{item.resourceType} · {defaultDriveSource.account}</small><ChevronRight size={16} /></button>)}</div></section>;
}

function DownloadCartPanel({ items, totalWeight, collectionCount, progress, onClose, onRemove, onClear, onDownload }: { items: CatalogItem[]; totalWeight: number; collectionCount: number; progress: DownloadProgress; onClose: () => void; onRemove: (id: string) => void; onClear: () => void; onDownload: () => void }) {
  const progressPercent = progress ? Math.round((progress.current / progress.total) * 100) : 0;
  return <div className="drawer-layer cart-layer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><button className="drawer-scrim" onClick={onClose} aria-label="Cerrar carrito" /><aside className="cart-panel"><header><div><span>CARRITO DE DESCARGAS</span><h2 id="cart-title">Tu lote está listo para preparar.</h2><p>Revisa la selección antes de iniciar las descargas directas desde Drive.</p></div><button className="drawer-close" onClick={onClose} aria-label="Cerrar carrito"><X size={20} /></button></header><section className="cart-summary"><div><span>SELECCIÓN</span><b>{items.length} recurso{items.length === 1 ? "" : "s"}</b></div><div><span>PESO CONOCIDO</span><b>{totalWeight ? formatWeight(totalWeight) : "Por confirmar"}</b></div><div><span>COLECCIONES</span><b>{collectionCount}</b></div></section>{progress && <section className="cart-preparing" aria-live="polite"><div><span>PREPARANDO DESCARGAS</span><b>{progress.current} de {progress.total}</b></div><i><i style={{ width: `${progressPercent}%` }} /></i><p>Tu navegador puede pedir confirmación cuando haya varios archivos o archivos grandes.</p></section>}<section className="cart-items"><h3>Recursos en el carrito</h3>{items.length ? items.map((item, index) => <article key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{describeResource(item).clearTitle}</b><small>{item.isCollection ? "Colección de Drive" : item.size} · {defaultDriveSource.account}</small></div><button onClick={() => onRemove(item.id)} disabled={Boolean(progress)} aria-label={`Quitar ${describeResource(item).clearTitle} del carrito`}><Trash2 size={15} /></button></article>) : <p className="cart-empty">El carrito está vacío. Añade recursos desde cada tarjeta.</p>}</section><footer><button className="cart-clear" onClick={onClear} disabled={!items.length || Boolean(progress)}>Vaciar carrito</button><button className="cart-download-primary" onClick={onDownload} disabled={!items.length || Boolean(progress)}><Download size={16} />{progress ? `Preparando ${progress.current}/${progress.total}` : "Descargar todo"}</button></footer></aside></div>;
}

function CollectionsPanel({ collections, sourceIds, collectionName, onNameChange, onCreate, onClose, onShare, onLoad, onDelete }: { collections: SavedCollection[]; sourceIds: string[]; collectionName: string; onNameChange: (value: string) => void; onCreate: () => void; onClose: () => void; onShare: (collection: SavedCollection) => void; onLoad: (collection: SavedCollection) => void; onDelete: (id: string) => void }) {
  return <div className="drawer-layer collections-layer" role="dialog" aria-modal="true" aria-labelledby="collections-title"><button className="drawer-scrim" onClick={onClose} aria-label="Cerrar colecciones" /><aside className="collections-panel"><header><div><span>COLECCIONES DEL NAVEGADOR</span><h2 id="collections-title">Agrupa recursos y comparte una ruta.</h2><p>Las colecciones se guardan en este navegador. Un enlace compartible carga sus recursos en el comparador de la otra persona.</p></div><button className="drawer-close" onClick={onClose} aria-label="Cerrar colecciones"><X size={20} /></button></header><section className="collection-create"><span>Selección actual</span><b>{sourceIds.length} recurso{sourceIds.length === 1 ? "" : "s"} {sourceIds.length ? "desde favoritos o comparación" : "disponibles"}</b><div><input value={collectionName} onChange={(event) => onNameChange(event.target.value)} placeholder="Ej. Opciones para tienda de cosmética" /><button onClick={onCreate}><FolderPlus size={15} />Crear colección</button></div></section><section className="collection-list"><h3>Colecciones guardadas</h3>{collections.length ? collections.map((collection) => <article key={collection.id}><div><span>{collection.itemIds.length} recursos · {collection.createdAt}</span><b>{collection.name}</b></div><div><button onClick={() => onLoad(collection)}>Comparar</button><button onClick={() => onShare(collection)}><Share2 size={14} />Compartir</button><button className="collection-delete" onClick={() => onDelete(collection.id)} aria-label={`Eliminar ${collection.name}`}><X size={14} /></button></div></article>) : <p className="collections-empty">Aún no hay colecciones. Guarda recursos o selecciónalos para comparar y crea la primera.</p>}</section></aside></div>;
}

function exportComparison(items: CatalogItem[], setNotice: (message: string) => void) {
  if (!items.length) return;
  const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const rows = items.map((item) => { const narrative = describeResource(item); return [narrative.clearTitle, displayTitle(item.name), item.category, item.resourceType, defaultDriveSource.account, narrative.technical.apps.join(" | "), narrative.technical.environment, narrative.technical.code, narrative.technical.requirement, narrative.when, narrative.problem, narrative.scenarios.map((scenario) => scenario.title).join(" | "), item.tags.join(" | ")].map(quote).join(","); });
  const csv = ["Título claro,Nombre original,Categoría,Tipo,Carpeta,Usar en,Entorno,Código o edición,Requisitos técnicos,Ideal cuando,Problema que resuelve,Casos perfectos,Etiquetas", ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "comparativa-indice-drive.csv";
  link.click();
  URL.revokeObjectURL(url);
  setNotice("La comparativa se exportó como CSV.");
}
