/**
 * Archivo editorial: recursos visuales de una fuente privada de Drive; el origen queda identificado por cuenta, sin exponer la jerarquía interna de carpetas.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownUp,
  ArrowUpRight,
  AtSign,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
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
  Map as MapIcon,
  Network,
  TreePine,
  ListFilter,
  Menu,
  PanelTopClose,
  PanelTopOpen,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Sparkles,
  Share2,
  RotateCcw,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { CollectionExplorerPanel } from "@/components/CollectionExplorerPanel";
import { EditorialFormatTree } from "@/components/EditorialFormatTree";
import {
  catalogCategories,
  displayTitle,
  type CatalogItem,
  type ResourceCategory,
} from "@/data/catalog";
import { fullCatalog } from "@/data/designCatalog";
import {
  defaultDriveSource,
  driveSources,
  getDriveSource,
} from "@/data/driveSources";
import {
  describeResource,
  licenseReviewFilters,
  licenseReviewFor,
  matchesLicenseReview,
  matchesTechnicalFilter,
  minimumRequirementFor,
  technicalFilters,
  versionCompatibilityFor,
  type LicenseReviewKey,
} from "@/data/catalogNarrative";
import {
  goalsForResource,
  projectGoals,
  type ProjectGoalId,
} from "@/data/projectGoals";

type Filter = "Todo" | ResourceCategory;
type GoalFilter = "Todo" | ProjectGoalId;
type TechnicalFilter = "Todo" | (typeof technicalFilters)[number]["id"];
type LicenseFilter = "Todo" | LicenseReviewKey;
type SizeFilter = "Todo" | "small" | "medium" | "large" | "collection";
type SearchScope = "all" | "title" | "tags" | "technical" | "projects";
type SearchMatch = "contains" | "allWords" | "exact";
type SortBy =
  | "relevance"
  | "titleAsc"
  | "titleDesc"
  | "sizeAsc"
  | "sizeDesc"
  | "typeAsc";
type SavedCollection = {
  id: string;
  name: string;
  itemIds: string[];
  createdAt: string;
};
type SavedSearch = {
  id: string;
  name: string;
  query: string;
  searchScope: SearchScope;
  searchMatch: SearchMatch;
  sourceFilter: string;
  sizeFilter: SizeFilter;
  minSize: string;
  maxSize: string;
  sortBy: SortBy;
  filter: Filter;
  goalFilter: GoalFilter;
  technicalFilter: TechnicalFilter;
  licenseFilter: LicenseFilter;
  activeTag: string | null;
  createdAt: string;
};
type DownloadProgress = { current: number; total: number } | null;
type ManualLicenseStatus = "unreviewed" | "commercial-cleared" | "attribution" | "do-not-use";
type LicenseImportResult = { applied: number; rejected: number };

const manualLicenseOptions: Array<{ id: ManualLicenseStatus; label: string; note: string }> = [
  { id: "unreviewed", label: "Sin revisar", note: "No hay una decisión manual guardada." },
  { id: "commercial-cleared", label: "Uso comercial revisado", note: "Marcado manualmente tras revisar su licencia; conserva la evidencia fuera del catálogo." },
  { id: "attribution", label: "Atribución o uso limitado", note: "Marcado manualmente para recordar que se debe revisar atribución, alcance o restricciones." },
  { id: "do-not-use", label: "No usar hasta confirmar", note: "Marcado manualmente para bloquear su uso mientras se revisa la licencia." },
];

const manualLicenseOption = (status: ManualLicenseStatus) =>
  manualLicenseOptions.find(option => option.id === status) ?? manualLicenseOptions[0];

function parseDelimitedRow(line: string, delimiter: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === delimiter && !quoted) {
      values.push(value.trim());
      value = "";
    } else value += character;
  }
  values.push(value.trim());
  return values;
}

function manualLicenseStatusFrom(value: string): ManualLicenseStatus | null {
  const normalized = normalizeSearchText(value);
  if (["unreviewed", "sin revisar", "pendiente"].includes(normalized)) return "unreviewed";
  if (["commercial cleared", "commercial-cleared", "uso comercial revisado", "comercial revisado"].includes(normalized)) return "commercial-cleared";
  if (["attribution", "atribucion", "atribucion o uso limitado", "uso limitado"].includes(normalized)) return "attribution";
  if (["do not use", "do-not-use", "no usar hasta confirmar", "bloqueado"].includes(normalized)) return "do-not-use";
  return null;
}

const categoryVisual = {
  "Naturaleza & flora": {
    icon: Flower2,
    tone: "flora",
    intro: "Motivos orgánicos para dar vida a marcas, productos y superficies.",
  },
  "Geometría & gráfico": {
    icon: Grid3X3,
    tone: "geometry",
    intro: "Sistemas visuales de alto ritmo, fáciles de escalar y combinar.",
  },
  "Texturas & materiales": {
    icon: Layers3,
    tone: "material",
    intro: "Capas táctiles para fondos con profundidad y carácter físico.",
  },
  "Atmósferas & overlays": {
    icon: Sparkles,
    tone: "atmosphere",
    intro: "Luz, energía y entornos visuales para crear una escena.",
  },
  "Retro & decorativo": {
    icon: Tag,
    tone: "retro",
    intro: "Detalles con memoria gráfica para identidades más singulares.",
  },
  "Modelado & 3D": {
    icon: Layers3,
    tone: "geometry",
    intro: "Escenas, objetos y personajes tridimensionales para animar ideas.",
  },
  "Video & Motion": {
    icon: Sparkles,
    tone: "atmosphere",
    intro:
      "Plantillas y efectos para editar secuencias con ritmo y movimiento.",
  },
  "Iconos & UI": {
    icon: Grid3X3,
    tone: "geometry",
    intro: "Símbolos y sistemas de interfaz para comunicar con rapidez.",
  },
  "Audio & Música": {
    icon: Sparkles,
    tone: "retro",
    intro:
      "Colecciones musicales para definir el pulso de una pieza audiovisual.",
  },
  "Mockups & Plantillas": {
    icon: FolderOpen,
    tone: "material",
    intro: "Presentaciones, maquetas y documentos listos para personalizar.",
  },
  "Web & CMS": {
    icon: Grid3X3,
    tone: "geometry",
    intro: "Temas, CMS y plantillas para estructurar sitios administrables.",
  },
  "Ecommerce & tiendas": {
    icon: FileArchive,
    tone: "ember",
    intro: "Temas y recursos para catálogos, productos y recorridos de compra.",
  },
} as const;

const directDownloadUrl = (item: CatalogItem) =>
  `https://drive.usercontent.google.com/download?id=${item.id}&export=download&confirm=t`;
const sourceFor = (item: CatalogItem) => getDriveSource(item.sourceId);

const sizeFilters = [
  {
    id: "small",
    label: "Hasta 50 MB",
    note: "Archivos ligeros",
    predicate: "small",
  },
  {
    id: "medium",
    label: "50–250 MB",
    note: "Archivos medianos",
    predicate: "medium",
  },
  {
    id: "large",
    label: "Más de 250 MB",
    note: "Archivos pesados",
    predicate: "large",
  },
  {
    id: "collection",
    label: "Colecciones",
    note: "Carpetas preparadas por Drive",
    predicate: "collection",
  },
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
  if (totalMb >= 1024)
    return `${(totalMb / 1024).toFixed(totalMb >= 10240 ? 0 : 1)} GB`;
  return `${Math.round(totalMb)} MB`;
}

function paginationSteps(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const steps = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 4) [2, 3, 4, 5].forEach(step => steps.add(step));
  if (current >= total - 3)
    [total - 4, total - 3, total - 2, total - 1].forEach(step => steps.add(step));
  return Array.from(steps)
    .filter(step => step >= 1 && step <= total)
    .sort((left, right) => left - right);
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("Todo");
  const [goalFilter, setGoalFilter] = useState<GoalFilter>("Todo");
  const [technicalFilter, setTechnicalFilter] =
    useState<TechnicalFilter>("Todo");
  const [licenseFilter, setLicenseFilter] = useState<LicenseFilter>("Todo");
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("Todo");
  const [query, setQuery] = useState("");
  const [searchScope, setSearchScope] = useState<SearchScope>("all");
  const [searchMatch, setSearchMatch] = useState<SearchMatch>("contains");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("indice-drive:saved-searches") ?? "[]"
      ) as SavedSearch[];
    } catch {
      return [];
    }
  });
  const [savedSearchName, setSavedSearchName] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("indice-drive:favorites") ?? "[]"
      ) as string[];
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 768
  );
  const [collections, setCollections] = useState<SavedCollection[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("indice-drive:collections") ?? "[]"
      ) as SavedCollection[];
    } catch {
      return [];
    }
  });
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [notice, setNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartIds, setCartIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("indice-drive:download-cart") ?? "[]"
      ) as string[];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectionIds, setSelectionIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("indice-drive:selection") ?? "[]"
      ) as string[];
    } catch {
      return [];
    }
  });
  const [manualLicenses, setManualLicenses] = useState<Record<string, ManualLicenseStatus>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem("indice-drive:manual-licenses") ?? "{}") as Record<string, ManualLicenseStatus>;
    } catch {
      return {};
    }
  });
  const [testedResourceIds, setTestedResourceIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("indice-drive:tested-resources") ?? "[]") as string[];
    } catch {
      return [];
    }
  });
  const [personalNotes, setPersonalNotes] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem("indice-drive:personal-notes") ?? "{}") as Record<string, string>;
    } catch {
      return {};
    }
  });
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window === "undefined") return 24;
    const stored = Number(window.localStorage.getItem("indice-drive:items-per-page"));
    return [12, 24, 48, 96].includes(stored) ? stored : 24;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const licenseCsvInputRef = useRef<HTMLInputElement>(null);
  const [lastLicenseImport, setLastLicenseImport] = useState<LicenseImportResult | null>(null);
  const [downloadProgress, setDownloadProgress] =
    useState<DownloadProgress>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [decisionGoal, setDecisionGoal] = useState<GoalFilter>("Todo");
  const [decisionTechnical, setDecisionTechnical] =
    useState<TechnicalFilter>("Todo");
  const [decisionFormat, setDecisionFormat] = useState<
    "Todo" | "collection" | "file"
  >("Todo");
  const [editorialTreeOpen, setEditorialTreeOpen] = useState(false);
  const [favoriteBranches, setFavoriteBranches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(
        window.localStorage.getItem("indice-drive:favorite-branches") ?? "[]"
      ) as string[];
    } catch {
      return [];
    }
  });
  const [tooltipsEnabled, setTooltipsEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      window.localStorage.getItem("indice-drive:compatibility-tooltips") !==
      "off"
    );
  });

  const popularTags = useMemo<string[]>(() => {
    const counts = new Map<string, number>();
    fullCatalog
      .flatMap(item => item.tags)
      .forEach(tag => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    return (Array.from(counts.entries()) as Array<[string, number]>)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, []);

  const resources = useMemo(() => {
    const term = normalizeSearchText(query);
    const words = term.split(/\s+/).filter(Boolean);
    const minimumSize =
      minSize.trim() === "" ? null : Math.max(0, Number(minSize));
    const maximumSize =
      maxSize.trim() === "" ? null : Math.max(0, Number(maxSize));
    const filtered = fullCatalog.filter(item => {
      const categoryMatch = filter === "Todo" || item.category === filter;
      const goalMatch =
        goalFilter === "Todo" || goalsForResource(item).includes(goalFilter);
      const technicalMatch = matchesTechnicalFilter(item, technicalFilter);
      const licenseMatch = matchesLicenseReview(item, licenseFilter);
      const sizeMatch = matchesSizeFilter(item, sizeFilter);
      const tagMatch = !activeTag || item.tags.includes(activeTag);
      const favoriteMatch = !showFavorites || favorites.includes(item.id);
      const narrative = describeResource(item);
      const fields = {
        title: `${item.name} ${narrative.clearTitle} ${item.resourceType}`,
        tags: item.tags.join(" "),
        technical: `${narrative.technical.apps.join(" ")} ${narrative.technical.environment} ${narrative.technical.code} ${narrative.technical.requirement}`,
        projects: `${item.purpose} ${item.projects.join(" ")} ${narrative.scenarios.map(scenario => `${scenario.title} ${scenario.detail}`).join(" ")}`,
      };
      const text = normalizeSearchText(
        searchScope === "all"
          ? Object.values(fields).join(" ")
          : fields[searchScope]
      );
      const queryMatch =
        !term ||
        (searchMatch === "exact"
          ? text.includes(term)
          : searchMatch === "allWords"
            ? words.every(word => text.includes(word))
            : text.includes(term));
      const sourceMatch =
        sourceFilter === "all" || sourceFor(item).id === sourceFilter;
      const itemSize = sizeInMb(item);
      const exactSizeMatch =
        minimumSize === null && maximumSize === null
          ? true
          : itemSize !== null &&
            (minimumSize === null || itemSize >= minimumSize) &&
            (maximumSize === null || itemSize <= maximumSize);
      return (
        categoryMatch &&
        goalMatch &&
        technicalMatch &&
        licenseMatch &&
        sizeMatch &&
        tagMatch &&
        favoriteMatch &&
        sourceMatch &&
        queryMatch &&
        exactSizeMatch
      );
    });
    return filtered.sort((a, b) => {
      if (sortBy === "titleAsc")
        return describeResource(a).clearTitle.localeCompare(
          describeResource(b).clearTitle,
          "es"
        );
      if (sortBy === "titleDesc")
        return describeResource(b).clearTitle.localeCompare(
          describeResource(a).clearTitle,
          "es"
        );
      if (sortBy === "typeAsc")
        return a.resourceType.localeCompare(b.resourceType, "es");
      if (sortBy === "sizeAsc")
        return (
          (sizeInMb(a) ?? Number.POSITIVE_INFINITY) -
          (sizeInMb(b) ?? Number.POSITIVE_INFINITY)
        );
      if (sortBy === "sizeDesc")
        return (sizeInMb(b) ?? -1) - (sizeInMb(a) ?? -1);
      return 0;
    });
  }, [
    filter,
    goalFilter,
    technicalFilter,
    licenseFilter,
    sizeFilter,
    query,
    searchScope,
    searchMatch,
    sourceFilter,
    sortBy,
    minSize,
    maxSize,
    activeTag,
    showFavorites,
    favorites,
  ]);

  const totalPages = Math.max(1, Math.ceil(resources.length / itemsPerPage));
  const paginatedResources = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * itemsPerPage;
    return resources.slice(start, start + itemsPerPage);
  }, [resources, itemsPerPage, currentPage, totalPages]);

  const groupedResources = useMemo<[string, CatalogItem[]][]>(() => {
    return driveSources
      .map((source, index): [string, CatalogItem[]] => [
        `Fuente ${String(index + 1).padStart(2, "0")} · ${source.account}`,
        paginatedResources.filter(item => sourceFor(item).id === source.id),
      ])
      .filter(([, items]) => items.length > 0);
  }, [paginatedResources]);

  const categoryCount = (category: Filter) =>
    category === "Todo"
      ? fullCatalog.length
      : fullCatalog.filter(item => item.category === category).length;
  const toggleFavorite = (id: string) =>
    setFavorites(current =>
      current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : [...current, id]
    );
  const toggleCompare = (id: string) =>
    setCompareIds(current =>
      current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : current.length < 3
          ? [...current, id]
          : current
    );
  const toggleCart = (id: string) =>
    setCartIds(current =>
      current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : [...current, id]
    );
  const toggleSelection = (id: string) =>
    setSelectionIds(current =>
      current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : [...current, id]
    );
  const comparisonItems = useMemo(
    () =>
      compareIds
        .map(id => fullCatalog.find(item => item.id === id))
        .filter((item): item is CatalogItem => Boolean(item)),
    [compareIds]
  );
  const cartItems = useMemo(
    () =>
      cartIds
        .map(id => fullCatalog.find(item => item.id === id))
        .filter((item): item is CatalogItem => Boolean(item)),
    [cartIds]
  );
  const selectionItems = useMemo(
    () =>
      selectionIds
        .map(id => fullCatalog.find(item => item.id === id))
        .filter((item): item is CatalogItem => Boolean(item)),
    [selectionIds]
  );
  const cartWeight = useMemo(
    () => cartItems.reduce((sum, item) => sum + (sizeInMb(item) ?? 0), 0),
    [cartItems]
  );
  const cartCollections = useMemo(
    () => cartItems.filter(item => item.isCollection).length,
    [cartItems]
  );
  const activeGoal = projectGoals.find(goal => goal.id === goalFilter);
  const activeSize = sizeFilters.find(item => item.id === sizeFilter);
  const exactSizeActive = minSize.trim() !== "" || maxSize.trim() !== "";
  const quickTechnicalFilters = useMemo(
    () =>
      technicalFilters.filter(item =>
        [
          "wordpress",
          "elementor",
          "react-native",
          "expo",
          "html-bootstrap",
          "fonts",
        ].includes(item.id)
      ),
    []
  );
  const advancedSearchCount = [
    query.trim().length > 0,
    searchScope !== "all",
    searchMatch !== "contains",
    sourceFilter !== "all",
    exactSizeActive,
  ].filter(Boolean).length;
  const collectionSourceIds = selectionIds.length > 0 ? selectionIds : compareIds.length > 0 ? compareIds : favorites;
  const recommendationItems = useMemo(() => {
    const candidatePool = fullCatalog.filter(item => {
      if (goalFilter !== "Todo")
        return goalsForResource(item).includes(goalFilter);
      if (activeTag) return item.tags.includes(activeTag);
      if (filter !== "Todo") return item.category === filter;
      if (favorites.length)
        return favorites.some(
          favoriteId =>
            fullCatalog.find(resource => resource.id === favoriteId)
              ?.category === item.category
        );
      return (
        item.category === "Mockups & Plantillas" ||
        item.category === "Web & CMS" ||
        item.category === "Video & Motion"
      );
    });
    return candidatePool
      .filter(item => !compareIds.includes(item.id))
      .slice(0, 3);
  }, [goalFilter, activeTag, filter, favorites, compareIds]);
  const decisionItems = useMemo(
    () =>
      fullCatalog
        .filter(
          item =>
            (decisionGoal === "Todo" ||
              goalsForResource(item).includes(decisionGoal)) &&
            matchesTechnicalFilter(item, decisionTechnical) &&
            (decisionFormat === "Todo" ||
              (decisionFormat === "collection"
                ? Boolean(item.isCollection)
                : !item.isCollection))
        )
        .slice(0, 6),
    [decisionGoal, decisionTechnical, decisionFormat]
  );
  const editorialTreeGroups = useMemo(
    () =>
      Array.from(
        fullCatalog
          .reduce((groups, item) => {
            const key = `${item.category} · ${item.resourceType}`;
            const current = groups.get(key) ?? [];
            current.push(item);
            groups.set(key, current);
            return groups;
          }, new globalThis.Map<string, CatalogItem[]>())
          .entries()
      ).sort(([left], [right]) => left.localeCompare(right, "es")),
    []
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:favorites",
        JSON.stringify(favorites)
      );
    } catch {
      /* El catálogo sigue funcionando si el navegador bloquea el almacenamiento local. */
    }
  }, [favorites]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:collections",
        JSON.stringify(collections)
      );
    } catch {
      /* Las colecciones permanecen funcionales durante la sesión si el navegador bloquea el almacenamiento local. */
    }
  }, [collections]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:download-cart",
        JSON.stringify(cartIds)
      );
    } catch {
      /* El carrito permanece operativo durante la sesión si el navegador bloquea el almacenamiento local. */
    }
  }, [cartIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:selection",
        JSON.stringify(selectionIds)
      );
    } catch {
      /* La selección continúa activa durante la sesión si el navegador bloquea el almacenamiento local. */
    }
  }, [selectionIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:manual-licenses",
        JSON.stringify(manualLicenses)
      );
    } catch {
      /* El estado manual continúa vigente durante la sesión si el navegador bloquea almacenamiento. */
    }
  }, [manualLicenses]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:tested-resources",
        JSON.stringify(testedResourceIds)
      );
    } catch {
      /* El sello probado se conserva durante la sesión si el navegador bloquea almacenamiento. */
    }
  }, [testedResourceIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:personal-notes",
        JSON.stringify(personalNotes)
      );
    } catch {
      /* Las notas siguen visibles durante la sesión si el navegador bloquea almacenamiento. */
    }
  }, [personalNotes]);

  useEffect(() => {
    try {
      window.localStorage.setItem("indice-drive:items-per-page", String(itemsPerPage));
    } catch {
      /* La página actual conserva la cantidad elegida durante la sesión. */
    }
  }, [itemsPerPage]);

  useEffect(() => {
    setCurrentPage(page => Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filter,
    goalFilter,
    technicalFilter,
    licenseFilter,
    sizeFilter,
    query,
    searchScope,
    searchMatch,
    sourceFilter,
    sortBy,
    minSize,
    maxSize,
    activeTag,
    showFavorites,
    itemsPerPage,
  ]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:saved-searches",
        JSON.stringify(savedSearches)
      );
    } catch {
      /* Las consultas quedan disponibles durante la sesión si el navegador bloquea el almacenamiento local. */
    }
  }, [savedSearches]);
  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:favorite-branches",
        JSON.stringify(favoriteBranches)
      );
    } catch {
      /* Los favoritos de rama quedan disponibles durante la sesión si el navegador bloquea almacenamiento. */
    }
  }, [favoriteBranches]);
  useEffect(() => {
    try {
      window.localStorage.setItem(
        "indice-drive:compatibility-tooltips",
        tooltipsEnabled ? "on" : "off"
      );
    } catch {
      /* La preferencia sigue vigente durante la sesión. */
    }
  }, [tooltipsEnabled]);

  useEffect(() => {
    const encoded = new URLSearchParams(window.location.search).get(
      "coleccion"
    );
    if (!encoded) return;
    try {
      const ids = JSON.parse(window.atob(encoded)) as string[];
      const available = ids.filter(id =>
        fullCatalog.some(item => item.id === id)
      );
      if (available.length) {
        setCompareIds(available.slice(0, 3));
        setNotice("Colección compartida cargada en el comparador.");
      }
    } catch {
      /* Ignora enlaces de colección incompletos o no válidos. */
    }
  }, []);

  const createCollection = () => {
    if (!collectionSourceIds.length) {
      setNotice(
        "Guarda recursos o selecciónalos para comparar antes de crear una colección."
      );
      return;
    }
    const name = collectionName.trim() || `Colección ${collections.length + 1}`;
    const collection: SavedCollection = {
      id: `${Date.now()}`,
      name,
      itemIds: collectionSourceIds,
      createdAt: new Date().toLocaleDateString("es"),
    };
    setCollections(current => [collection, ...current]);
    setCollectionName("");
    setNotice(`“${name}” se guardó en este navegador.`);
  };

  const setManualLicense = (id: string, status: ManualLicenseStatus) => {
    setManualLicenses(current => {
      const next = { ...current };
      if (status === "unreviewed") delete next[id];
      else next[id] = status;
      return next;
    });
    setNotice(`Estado de licencia actualizado: ${manualLicenseOption(status).label}.`);
  };

  const toggleTested = (id: string) => {
    setTestedResourceIds(current =>
      current.includes(id)
        ? current.filter(resourceId => resourceId !== id)
        : [...current, id]
    );
  };

  const setPersonalNote = (id: string, note: string) => {
    setPersonalNotes(current => {
      const next = { ...current };
      if (note.trim()) next[id] = note.slice(0, 800);
      else delete next[id];
      return next;
    });
  };

  const importLicenseCsv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const lines = (await file.text())
        .replace(/^\uFEFF/, "")
        .split(/\r?\n/)
        .filter(line => line.trim());
      if (lines.length < 2) throw new Error("El CSV necesita una cabecera y al menos una fila.");
      const delimiter = lines[0].includes(";") ? ";" : ",";
      const headers = parseDelimitedRow(lines[0], delimiter).map(normalizeSearchText);
      const idIndex = headers.findIndex(header => ["id", "drive id", "id drive", "recurso id"].includes(header));
      const statusIndex = headers.findIndex(header => ["estado", "estado licencia", "licencia", "license status"].includes(header));
      if (idIndex < 0 || statusIndex < 0) {
        throw new Error("El CSV debe incluir las columnas ID y Estado.");
      }
      const updates: Record<string, ManualLicenseStatus> = {};
      let applied = 0;
      let rejected = 0;
      lines.slice(1).forEach(line => {
        const values = parseDelimitedRow(line, delimiter);
        const id = values[idIndex]?.trim();
        const status = manualLicenseStatusFrom(values[statusIndex] ?? "");
        if (!id || !status || !fullCatalog.some(item => item.id === id)) {
          rejected += 1;
          return;
        }
        if (status === "unreviewed") delete updates[id];
        else updates[id] = status;
        applied += 1;
      });
      setManualLicenses(current => ({ ...current, ...updates }));
      setLastLicenseImport({ applied, rejected });
      setNotice(`Licencias importadas: ${applied} aplicadas${rejected ? ` · ${rejected} sin coincidencia o con estado inválido` : ""}.`);
    } catch (error) {
      setLastLicenseImport(null);
      setNotice(error instanceof Error ? error.message : "No se pudo importar el archivo CSV.");
    } finally {
      event.target.value = "";
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.setTimeout(
      () => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0
    );
  };

  const shareCollection = async (collection: SavedCollection) => {
    const url = new URL(window.location.href);
    url.searchParams.set(
      "coleccion",
      window.btoa(JSON.stringify(collection.itemIds))
    );
    try {
      await navigator.clipboard.writeText(url.toString());
      setNotice(`Enlace de “${collection.name}” copiado.`);
    } catch {
      setNotice(`Comparte esta ruta: ${url.toString()}`);
    }
  };

  const resetSearchCriteria = () => {
    setQuery("");
    setSearchScope("all");
    setSearchMatch("contains");
    setSourceFilter("all");
    setMinSize("");
    setMaxSize("");
  };

  const saveSearch = () => {
    if (
      !advancedSearchCount &&
      filter === "Todo" &&
      goalFilter === "Todo" &&
      technicalFilter === "Todo" &&
      licenseFilter === "Todo" &&
      sizeFilter === "Todo" &&
      !activeTag
    ) {
      setNotice("Aplica al menos un criterio antes de guardar una consulta.");
      return;
    }
    const name =
      savedSearchName.trim() || `Consulta ${savedSearches.length + 1}`;
    const savedSearch: SavedSearch = {
      id: `${Date.now()}`,
      name,
      query,
      searchScope,
      searchMatch,
      sourceFilter,
      sizeFilter,
      minSize,
      maxSize,
      sortBy,
      filter,
      goalFilter,
      technicalFilter,
      licenseFilter,
      activeTag,
      createdAt: new Date().toLocaleDateString("es"),
    };
    setSavedSearches(current => [savedSearch, ...current]);
    setSavedSearchName("");
    setNotice(`La consulta “${name}” se guardó en este navegador.`);
  };

  const loadSavedSearch = (savedSearch: SavedSearch) => {
    setQuery(savedSearch.query);
    setSearchScope(savedSearch.searchScope);
    setSearchMatch(savedSearch.searchMatch);
    setSourceFilter(savedSearch.sourceFilter);
    setSizeFilter(savedSearch.sizeFilter);
    setMinSize(savedSearch.minSize);
    setMaxSize(savedSearch.maxSize);
    setSortBy(savedSearch.sortBy);
    setFilter(savedSearch.filter);
    setGoalFilter(savedSearch.goalFilter);
    setTechnicalFilter(savedSearch.technicalFilter);
    setLicenseFilter(savedSearch.licenseFilter ?? "Todo");
    setActiveTag(savedSearch.activeTag);
    setShowFavorites(false);
    setAdvancedSearchOpen(true);
    setNotice(`La consulta “${savedSearch.name}” está activa.`);
  };

  const downloadCart = () => {
    if (!cartItems.length || downloadProgress) return;
    let current = 0;
    const total = cartItems.length;
    const prepareNext = () => {
      const item = cartItems[current];
      if (!item) {
        setDownloadProgress(null);
        setNotice(`Se prepararon ${total} descargas desde tu lista.`);
        return;
      }
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

  const addSelectionToCart = () => {
    if (!selectionIds.length) return;
    setCartIds(current => Array.from(new Set([...current, ...selectionIds])));
    setNotice(
      `${selectionIds.length} recursos seleccionados se añadieron a la lista de descargas.`
    );
  };

  const applyDecisionRoute = () => {
    setGoalFilter(decisionGoal);
    setTechnicalFilter(decisionTechnical);
    setSizeFilter(decisionFormat === "collection" ? "collection" : "Todo");
    setShowFavorites(false);
    setDecisionOpen(false);
    setNotice(
      `Ruta aplicada: ${decisionItems.length} recursos compatibles con tus criterios.`
    );
    window.setTimeout(
      () =>
        document
          .getElementById("catalogo")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40
    );
  };

  return (
    <div className="app-shell marketplace-shell">
      <aside
        className={`sidebar marketplace-sidebar ${sidebarOpen ? "sidebar--open" : ""}`}
        aria-label="Navegación del catálogo"
      >
        <div className="sidebar-topline">
          <a className="brand" href="#inicio" aria-label="Índice Drive">
            <BrandMark />
            <span className="brand-wordmark">
              índice<span>Drive</span>
            </span>
          </a>
          <button
            className="icon-button sidebar-dismiss"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar navegación"
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace-label">Explorar recursos</div>
        <nav className="sidebar-nav">
          <a href="#catalogo" className="nav-item nav-item--active">
            <Grid3X3 size={17} />
            Catálogo<span>{fullCatalog.length}</span>
          </a>
          <button
            className={`nav-item nav-button ${showFavorites ? "nav-item--active" : ""}`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Heart size={17} />
            Guardados<span>{favorites.length}</span>
          </button>
          <button
            className="nav-item nav-button"
            onClick={() => setCollectionsOpen(true)}
          >
            <FolderPlus size={17} />
            Colecciones<span>{collections.length}</span>
          </button>
        </nav>

        <div className="tree-heading">Fuente de Drive</div>
        <div className="source-private-list">
          {driveSources.map((source, index) => (
            <a
              key={source.id}
              href={source.folderUrl}
              target="_blank"
              rel="noreferrer"
            >
              <AtSign size={16} />
              <span>
                <small>Fuente {String(index + 1).padStart(2, "0")}</small>
                <b>{source.account}</b>
              </span>
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
        <div className="tree-heading collection-heading">
          Clasificar por tipo
        </div>
        <nav className="market-nav" aria-label="Categorías de recurso">
          {catalogCategories.map(category => {
            const Icon = categoryVisual[category].icon;
            return (
              <button
                key={category}
                className={`market-nav-item ${filter === category ? "market-nav-item--active" : ""}`}
                onClick={() => {
                  setFilter(category);
                  setShowFavorites(false);
                }}
              >
                <Icon size={16} />
                <span>{category}</span>
                <b>{categoryCount(category)}</b>
              </button>
            );
          })}
        </nav>

        <div className="tree-heading collection-heading">
          Explorar por objetivo
        </div>
        <nav
          className="market-nav project-nav"
          aria-label="Objetivos de proyecto"
        >
          {projectGoals.map(goal => (
            <button
              key={goal.id}
              className={`market-nav-item ${goalFilter === goal.id ? "market-nav-item--active" : ""}`}
              onClick={() => {
                setGoalFilter(goalFilter === goal.id ? "Todo" : goal.id);
                setShowFavorites(false);
              }}
            >
              <SlidersHorizontal size={15} />
              <span>{goal.label}</span>
              <b>
                {
                  fullCatalog.filter(item =>
                    goalsForResource(item).includes(goal.id)
                  ).length
                }
              </b>
            </button>
          ))}
        </nav>

        <div className="sidebar-note market-note">
          <span className="note-eyebrow">Guía rápida</span>
          <strong>Empieza por el efecto que buscas.</strong>
          <p>
            Filtra por utilidad, explora etiquetas y abre una ficha para ver
            dónde aplicar cada recurso.
          </p>
        </div>
        <div className="sidebar-footer">
          <CircleHelp size={16} />
          Las fichas describen usos sugeridos para orientarte, no limitan su uso
          creativo.
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="page-scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar navegación"
        />
      )}

      <main id="inicio" className="market-main">
        <div className="route-thread" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <header className="topbar market-topbar">
          <button
            className="menu-trigger menu-trigger--archive"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir navegación"
          >
            <Menu size={20} />
            <span>Menú</span>
            <small>ARCHIVO</small>
          </button>
          <div className="breadcrumbs">
            <span>Catálogo unificado</span>
            <span className="crumb-divider">/</span>
            <strong>{driveSources.length} fuentes de Drive</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="cart-trigger"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir lista de descargas, ${cartIds.length} recursos`}
            >
              <ShoppingCart size={17} />
              <span>Descargas</span>
              <b>{cartIds.length}</b>
            </button>
            <a
              className="drive-link"
              href={defaultDriveSource.folderUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir fuente principal <ArrowUpRight size={15} />
            </a>
          </div>
        </header>

        <section
          className="market-hero inventory-cover"
          aria-labelledby="market-title"
        >
          <div className="cover-spine" aria-hidden="true">
            <i />
            <span />
            <i />
          </div>
          <div className="market-hero-copy">
            <div className="cover-brandline">
              <BrandMark />
              <span>ÍNDICE DRIVE</span>
              <b>ARCHIVO OPERATIVO · 01</b>
            </div>
            <span className="eyebrow">
              <span />
              FUENTES ACTIVAS · DRIVE
            </span>
            <h1 id="market-title">
              Mapa de
              <br />
              <em>recursos</em>
              <br />
              ubicables.
            </h1>
            <p>
              Explora recursos indexados desde tus fuentes privadas de Drive por
              tipo, utilidad y compatibilidad. Cada ficha conserva el nombre
              original y te permite volver a su origen sin mostrar jerarquías
              internas.
            </p>
            <div className="market-hero-stats">
              <div>
                <b>{fullCatalog.length}</b>
                <span>registros activos</span>
              </div>
              <div>
                <b>{driveSources.length}</b>
                <span>fuentes de Drive</span>
              </div>
              <div>
                <b>{catalogCategories.length}</b>
                <span>tipos de recurso</span>
              </div>
            </div>
            <div className="cover-actions">
              <a href="#catalogo">
                Explorar registros <ArrowUpRight size={15} />
              </a>
              <a
                href={defaultDriveSource.folderUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir fuente principal <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div
            className="market-hero-art cover-map cover-source"
            aria-label="Fuentes privadas de Drive"
          >
            <div className="cover-map-head">
              <span>FUENTES DE DRIVE</span>
              <b>ESTADO · INDEXADO</b>
            </div>
            <div className="cover-source-list">
              {driveSources.map(source => (
                <div className="cover-source-card" key={source.id}>
                  <span>
                    <AtSign size={17} /> CUENTA DE ORIGEN
                  </span>
                  <strong>{source.account}</strong>
                  <p>{source.indexedCount} recursos indexados.</p>
                  <a href={source.folderUrl} target="_blank" rel="noreferrer">
                    Abrir carpeta exacta <ArrowUpRight size={15} />
                  </a>
                </div>
              ))}
            </div>
            <p>
              Las carpetas internas se mantienen ocultas para simplificar tu
              índice.
            </p>
          </div>
        </section>

        <section
          id="catalogo"
          className="catalog-section"
          aria-labelledby="catalog-title"
        >
          <div className="catalog-heading">
            <div>
              <span className="section-kicker">
                ÍNDICE DE ARCHIVO · RUTA, SELLO Y USO
              </span>
              <h2 id="catalog-title">
                Recursos ubicables, decisiones más claras.
              </h2>
            </div>
            <span className="catalog-count">
              {resources.length.toString().padStart(2, "0")}{" "}
              <small>recursos</small>
            </span>
          </div>

          <div className="search-row">
            <label className="market-search">
              <Search size={19} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Busca por estilo, efecto o proyecto…"
                aria-label="Buscar por estilo, etiqueta o proyecto"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </label>
            <button
              className={
                advancedSearchOpen
                  ? "advanced-search-trigger advanced-search-trigger--active"
                  : "advanced-search-trigger"
              }
              onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
              aria-expanded={advancedSearchOpen}
              aria-controls="advanced-search"
            >
              <ListFilter size={16} />
              Búsqueda avanzada <b>{advancedSearchCount}</b>
              <ChevronDown
                size={15}
                className={
                  advancedSearchOpen
                    ? "advanced-search-chevron advanced-search-chevron--open"
                    : "advanced-search-chevron"
                }
              />
            </button>
            <button
              className={`saved-toggle ${showFavorites ? "saved-toggle--active" : ""}`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <Heart size={16} fill={showFavorites ? "currentColor" : "none"} />
              Guardados <span>{favorites.length}</span>
            </button>
          </div>
          <div className="exploration-map-toggle">
            <div>
              <span>ORIENTACIÓN VISUAL</span>
              <b>¿No sabes por dónde empezar?</b>
            </div>
            <div>
              <button
                onClick={() => setDecisionOpen(!decisionOpen)}
                aria-expanded={decisionOpen}
              >
                <MapIcon size={17} />
                {decisionOpen
                  ? "Cerrar mapa de decisión"
                  : "Guíame a un recurso"}
              </button>
              <button
                className="editorial-tree-trigger"
                onClick={() => setEditorialTreeOpen(!editorialTreeOpen)}
                aria-expanded={editorialTreeOpen}
              >
                <TreePine size={17} />
                {editorialTreeOpen
                  ? "Cerrar árbol editorial"
                  : "Explorar árbol editorial"}
              </button>
              <button
                className="tooltip-toggle"
                onClick={() => setTooltipsEnabled(enabled => !enabled)}
                aria-pressed={tooltipsEnabled}
                title={
                  tooltipsEnabled
                    ? "Desactivar explicaciones de compatibilidad"
                    : "Activar explicaciones de compatibilidad"
                }
              >
                <CircleHelp size={16} />
                {tooltipsEnabled ? "Ayudas activas" : "Modo Lite"}
              </button>
            </div>
          </div>
          {decisionOpen && (
            <DecisionGuide
              goal={decisionGoal}
              technical={decisionTechnical}
              format={decisionFormat}
              resultCount={decisionItems.length}
              onGoal={setDecisionGoal}
              onTechnical={setDecisionTechnical}
              onFormat={setDecisionFormat}
              onApply={applyDecisionRoute}
              onOpen={setSelected}
              items={decisionItems}
              tooltipsEnabled={tooltipsEnabled}
            />
          )}
          {editorialTreeOpen && (
            <EditorialFormatTree
              groups={editorialTreeGroups}
              onOpen={setSelected}
              favoriteBranches={favoriteBranches}
              onToggleBranchFavorite={label =>
                setFavoriteBranches(current =>
                  current.includes(label)
                    ? current.filter(branch => branch !== label)
                    : [...current, label]
                )
              }
              tooltipsEnabled={tooltipsEnabled}
            />
          )}
          {advancedSearchOpen && (
            <section
              id="advanced-search"
              className="advanced-search-panel"
              aria-label="Criterios de búsqueda avanzada"
            >
              <div className="advanced-search-heading">
                <div>
                  <span>CONSULTA DE ARCHIVO</span>
                  <b>Acota dónde y cómo buscar</b>
                  <p>
                    Combina un término con campos específicos, fuente de Drive y
                    rango de tamaño.
                  </p>
                </div>
                {advancedSearchCount > 0 && (
                  <button onClick={resetSearchCriteria}>
                    <RotateCcw size={14} />
                    Restablecer búsqueda
                  </button>
                )}
              </div>
              <div className="advanced-search-controls">
                <label>
                  <span>Buscar dentro de</span>
                  <select
                    value={searchScope}
                    onChange={event =>
                      setSearchScope(event.target.value as SearchScope)
                    }
                  >
                    <option value="all">Todo el registro</option>
                    <option value="title">Título y nombre original</option>
                    <option value="tags">Etiquetas</option>
                    <option value="technical">Compatibilidad técnica</option>
                    <option value="projects">Usos y proyectos</option>
                  </select>
                </label>
                <label>
                  <span>Coincidencia</span>
                  <select
                    value={searchMatch}
                    onChange={event =>
                      setSearchMatch(event.target.value as SearchMatch)
                    }
                  >
                    <option value="contains">Cualquier coincidencia</option>
                    <option value="allWords">Todas las palabras</option>
                    <option value="exact">Frase exacta</option>
                  </select>
                </label>
                <label>
                  <span>Fuente de Drive</span>
                  <select
                    value={sourceFilter}
                    onChange={event => setSourceFilter(event.target.value)}
                  >
                    <option value="all">Todas las fuentes</option>
                    {driveSources.map(source => (
                      <option key={source.id} value={source.id}>
                        {source.account}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="saved-search-create">
                <label>
                  <span>Guardar esta consulta como</span>
                  <input
                    value={savedSearchName}
                    onChange={event => setSavedSearchName(event.target.value)}
                    placeholder="Ej. Plantillas web ligeras"
                    aria-label="Nombre de la consulta guardada"
                  />
                </label>
                <button onClick={saveSearch}>
                  <FolderPlus size={15} />
                  Guardar consulta
                </button>
              </div>
              {savedSearches.length > 0 && (
                <div className="saved-search-list">
                  <span>CONSULTAS GUARDADAS · {savedSearches.length}</span>
                  <div>
                    {savedSearches.map(savedSearch => (
                      <article key={savedSearch.id}>
                        <button onClick={() => loadSavedSearch(savedSearch)}>
                          <b>{savedSearch.name}</b>
                          <small>{savedSearch.createdAt}</small>
                        </button>
                        <button
                          className="saved-search-delete"
                          onClick={() =>
                            setSavedSearches(current =>
                              current.filter(item => item.id !== savedSearch.id)
                            )
                          }
                          aria-label={`Eliminar consulta ${savedSearch.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <button
            className="filters-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="catalog-filters"
          >
            {filtersOpen ? (
              <PanelTopClose size={16} />
            ) : (
              <PanelTopOpen size={16} />
            )}
            <span>{filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}</span>
            <b>
              {
                [
                  filter !== "Todo",
                  goalFilter !== "Todo",
                  technicalFilter !== "Todo",
                  licenseFilter !== "Todo",
                  sizeFilter !== "Todo",
                  Boolean(activeTag),
                ].filter(Boolean).length
              }{" "}
              activos
            </b>
            <ChevronDown
              size={16}
              className={
                filtersOpen
                  ? "filters-toggle-chevron filters-toggle-chevron--open"
                  : "filters-toggle-chevron"
              }
            />
          </button>
          {filtersOpen && (
            <div id="catalog-filters" className="filters-panel">
              <div className="market-filters" aria-label="Filtros de categoría">
                <button
                  className={`category-card category-card--all ${filter === "Todo" && !showFavorites ? "category-card--active" : ""}`}
                  onClick={() => {
                    setFilter("Todo");
                    setShowFavorites(false);
                  }}
                >
                  <span className="category-symbol">✦</span>
                  <span>
                    <b>Todo el índice</b>
                    <small>{fullCatalog.length} recursos</small>
                  </span>
                  <ChevronRight size={17} />
                </button>
                {catalogCategories.map(category => {
                  const visual = categoryVisual[category];
                  const Icon = visual.icon;
                  return (
                    <button
                      key={category}
                      className={`category-card category-card--${visual.tone} ${filter === category && !showFavorites ? "category-card--active" : ""}`}
                      onClick={() => {
                        setFilter(category);
                        setShowFavorites(false);
                      }}
                    >
                      <Icon size={20} />
                      <span>
                        <b>{category}</b>
                        <small>{categoryCount(category)} recursos</small>
                      </span>
                      <ChevronRight size={17} />
                    </button>
                  );
                })}
              </div>
              <div className="project-goal-rail">
                <div>
                  <span>Empezar por un objetivo</span>
                  <p>¿Qué quieres resolver en este proyecto?</p>
                </div>
                <div>
                  {projectGoals.map(goal => (
                    <button
                      key={goal.id}
                      title={goal.description}
                      onClick={() =>
                        setGoalFilter(goalFilter === goal.id ? "Todo" : goal.id)
                      }
                      className={
                        goalFilter === goal.id
                          ? "goal-pill goal-pill--active"
                          : "goal-pill"
                      }
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
                {goalFilter !== "Todo" && (
                  <button
                    className="clear-goal"
                    onClick={() => setGoalFilter("Todo")}
                  >
                    Quitar objetivo
                  </button>
                )}
              </div>
              <div className="technical-rail technical-rail--quick">
                <div>
                  <span>Filtros técnicos rápidos</span>
                  <p>Accede a las plataformas más usadas en esta biblioteca.</p>
                </div>
                <div>
                  {quickTechnicalFilters.map(item => (
                    <button
                      key={item.id}
                      title={tooltipsEnabled ? item.note : undefined}
                      onClick={() =>
                        setTechnicalFilter(
                          technicalFilter === item.id ? "Todo" : item.id
                        )
                      }
                      className={
                        technicalFilter === item.id
                          ? "technical-pill technical-pill--active"
                          : "technical-pill"
                      }
                    >
                      {item.label}
                      <b>
                        {
                          fullCatalog.filter(resource =>
                            matchesTechnicalFilter(resource, item.id)
                          ).length
                        }
                      </b>
                    </button>
                  ))}
                </div>
                {technicalFilter !== "Todo" && (
                  <button
                    className="clear-tech"
                    onClick={() => setTechnicalFilter("Todo")}
                  >
                    Quitar compatibilidad
                  </button>
                )}
              </div>
              <div className="technical-rail">
                <div>
                  <span>Todas las compatibilidades</span>
                  <p>Filtra también por CMS, edición, diseño y audio.</p>
                </div>
                <div>
                  {technicalFilters.map(item => (
                    <button
                      key={item.id}
                      title={tooltipsEnabled ? item.note : undefined}
                      onClick={() =>
                        setTechnicalFilter(
                          technicalFilter === item.id ? "Todo" : item.id
                        )
                      }
                      className={
                        technicalFilter === item.id
                          ? "technical-pill technical-pill--active"
                          : "technical-pill"
                      }
                    >
                      {item.label}
                      <b>
                        {
                          fullCatalog.filter(resource =>
                            matchesTechnicalFilter(resource, item.id)
                          ).length
                        }
                      </b>
                    </button>
                  ))}
                </div>
                {technicalFilter !== "Todo" && (
                  <button
                    className="clear-tech"
                    onClick={() => setTechnicalFilter("Todo")}
                  >
                    Quitar compatibilidad
                  </button>
                )}
              </div>
              <div className="license-rail">
                <div>
                  <span>Licencia y uso</span>
                  <p>
                    El índice orienta qué revisar; no confirma permisos de
                    licencia ni uso comercial.
                  </p>
                </div>
                <div>
                  {licenseReviewFilters.map(item => (
                    <button
                      key={item.id}
                      title={tooltipsEnabled ? item.note : undefined}
                      onClick={() =>
                        setLicenseFilter(
                          licenseFilter === item.id ? "Todo" : item.id
                        )
                      }
                      className={
                        licenseFilter === item.id
                          ? "license-pill license-pill--active"
                          : "license-pill"
                      }
                    >
                      {item.label}
                      <b>
                        {
                          fullCatalog.filter(resource =>
                            matchesLicenseReview(resource, item.id)
                          ).length
                        }
                      </b>
                    </button>
                  ))}
                </div>
                {licenseFilter !== "Todo" && (
                  <button
                    className="clear-license"
                    onClick={() => setLicenseFilter("Todo")}
                  >
                    Quitar licencia
                  </button>
                )}
              </div>
              <div className="license-import" aria-label="Importar estados de licencia">
                <input
                  ref={licenseCsvInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={importLicenseCsv}
                  hidden
                />
                <div>
                  <span>LICENCIAS MASIVAS</span>
                  <b>Importa decisiones desde CSV</b>
                  <small>Columnas requeridas: <code>ID</code> y <code>Estado</code>.</small>
                </div>
                <button onClick={() => licenseCsvInputRef.current?.click()}>
                  <FileArchive size={15} /> Importar CSV
                </button>
                {lastLicenseImport && (
                  <em>{lastLicenseImport.applied} filas aplicadas · {lastLicenseImport.rejected} rechazadas</em>
                )}
              </div>
              <div className="size-rail">
                <div>
                  <span>Tamaño de archivo</span>
                  <p>Elige según tu conexión y espacio disponible.</p>
                </div>
                <div>
                  {sizeFilters.map(item => (
                    <button
                      key={item.id}
                      title={item.note}
                      onClick={() =>
                        setSizeFilter(sizeFilter === item.id ? "Todo" : item.id)
                      }
                      className={
                        sizeFilter === item.id
                          ? "size-pill size-pill--active"
                          : "size-pill"
                      }
                    >
                      {item.label}
                      <b>
                        {
                          fullCatalog.filter(resource =>
                            matchesSizeFilter(resource, item.id)
                          ).length
                        }
                      </b>
                    </button>
                  ))}
                </div>
                <div className="exact-size-range">
                  <span>Rango exacto · MB</span>
                  <label>
                    <span>Mínimo</span>
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={minSize}
                      onChange={event => setMinSize(event.target.value)}
                      placeholder="0"
                      aria-label="Tamaño mínimo en megabytes"
                    />
                  </label>
                  <label>
                    <span>Máximo</span>
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={maxSize}
                      onChange={event => setMaxSize(event.target.value)}
                      placeholder="Sin límite"
                      aria-label="Tamaño máximo en megabytes"
                    />
                  </label>
                  {exactSizeActive && (
                    <button
                      onClick={() => {
                        setMinSize("");
                        setMaxSize("");
                      }}
                      aria-label="Quitar rango exacto de tamaño"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                {sizeFilter !== "Todo" && (
                  <button
                    className="clear-size"
                    onClick={() => setSizeFilter("Todo")}
                  >
                    Quitar tamaño
                  </button>
                )}
              </div>
              <div className="tag-rail">
                <span>Etiquetas frecuentes</span>
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={
                      activeTag === tag
                        ? "tag-pill tag-pill--active"
                        : "tag-pill"
                    }
                  >
                    #{tag}
                  </button>
                ))}
                {activeTag && (
                  <button
                    className="clear-tag"
                    onClick={() => setActiveTag(null)}
                  >
                    Quitar etiqueta
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="resource-toolbar">
            <div className="resource-toolbar-copy">
              <span>
                {showFavorites
                  ? "Archivos guardados"
                  : activeGoal
                    ? activeGoal.label
                  : technicalFilter !== "Todo"
                    ? `Compatible con ${technicalFilters.find(item => item.id === technicalFilter)?.label}`
                    : licenseFilter !== "Todo"
                      ? licenseReviewFilters.find(item => item.id === licenseFilter)
                          ?.label
                    : exactSizeActive
                        ? `Tamaño exacto · ${minSize || "0"}–${maxSize || "∞"} MB`
                        : sizeFilter !== "Todo"
                          ? activeSize?.label
                          : filter === "Todo"
                            ? "Registro de recursos"
                            : filter}
              </span>
              <p>
                {activeTag
                  ? `Filtrando por #${activeTag}`
                  : activeGoal
                    ? activeGoal.description
                  : technicalFilter !== "Todo"
                    ? technicalFilters.find(
                        item => item.id === technicalFilter
                      )?.note
                    : licenseFilter !== "Todo"
                      ? licenseReviewFilters.find(
                          item => item.id === licenseFilter
                        )?.note
                    : exactSizeActive
                        ? "Rango exacto aplicado a archivos con peso conocido."
                        : sizeFilter !== "Todo"
                          ? activeSize?.note
                          : `${driveSources.length} fuentes privadas indexadas en el mismo catálogo.`}
              </p>
            </div>
            <div className="catalog-toolbar-actions">
              <label className="catalog-sort-control">
                <span>
                  <ArrowDownUp size={14} />
                  Ordenar registros
                </span>
                <select
                  value={sortBy}
                  onChange={event => setSortBy(event.target.value as SortBy)}
                >
                  <option value="relevance">Orden original</option>
                  <option value="titleAsc">Título: A–Z</option>
                  <option value="titleDesc">Título: Z–A</option>
                  <option value="sizeAsc">Tamaño: menor primero</option>
                  <option value="sizeDesc">Tamaño: mayor primero</option>
                  <option value="typeAsc">Tipo de recurso: A–Z</option>
                </select>
              </label>
              <div className="catalog-export">
                <button
                  className="catalog-export-trigger"
                  onClick={() => setExportOpen(open => !open)}
                  aria-expanded={exportOpen}
                >
                  <Download size={15} />
                  Exportar {resources.length}
                </button>
                {exportOpen && (
                  <div className="catalog-export-menu">
                    <button
                      onClick={() => {
                        exportCatalog(resources, "csv", setNotice);
                        setExportOpen(false);
                      }}
                    >
                      <Download size={14} />
                      CSV para Excel
                    </button>
                    <button
                      onClick={() => {
                        exportCatalog(resources, "markdown", setNotice);
                        setExportOpen(false);
                      }}
                    >
                      <Download size={14} />
                      Markdown
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {resources.length > 0 && (
            <nav className="catalog-pagination" aria-label="Paginación del catálogo">
              <div className="pagination-summary">
                <span>LECTURA POR PÁGINAS</span>
                <b>
                  Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, resources.length)}–{Math.min(currentPage * itemsPerPage, resources.length)} de {resources.length}
                </b>
              </div>
              <label className="pagination-size-control">
                <span>Por página</span>
                <select value={itemsPerPage} onChange={event => setItemsPerPage(Number(event.target.value))}>
                  <option value={12}>12 registros</option>
                  <option value={24}>24 registros</option>
                  <option value={48}>48 registros</option>
                  <option value={96}>96 registros</option>
                </select>
              </label>
              <div className="pagination-pages">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Página anterior">
                  <ChevronLeft size={16} /> Anterior
                </button>
                {paginationSteps(currentPage, totalPages).map((page, index, pages) => (
                  <span key={page} className="pagination-page-wrap">
                    {index > 0 && page - pages[index - 1] > 1 && <i aria-hidden="true">…</i>}
                    <button
                      className={page === currentPage ? "pagination-page pagination-page--active" : "pagination-page"}
                      onClick={() => goToPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  </span>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Página siguiente">
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
              <span className="pagination-folio">PÁGINA {currentPage} / {totalPages}</span>
            </nav>
          )}
          {notice && (
            <div className="catalog-notice" role="status">
              <span>{notice}</span>
              <button onClick={() => setNotice("")} aria-label="Cerrar aviso">
                <X size={14} />
              </button>
            </div>
          )}
          <AutomaticRecommendations
            items={recommendationItems}
            activeGoal={activeGoal?.label}
            onOpen={setSelected}
          />
          {compareIds.length > 0 && (
            <aside className="compare-dock">
              <div>
                <Columns3 size={17} />
                <span>
                  <b>{compareIds.length} de 3</b> recursos listos para comparar
                </span>
              </div>
              <button
                onClick={() => setComparisonOpen(true)}
                disabled={compareIds.length < 2}
              >
                Comparar recursos
              </button>
              <button
                className="compare-clear"
                onClick={() => setCompareIds([])}
              >
                Limpiar
              </button>
            </aside>
          )}
          {selectionIds.length > 0 && (
            <aside className="selection-dock" aria-label="Selección actual">
              <div>
                <Check size={18} />
                <span>
                  <b>{selectionIds.length} seleccionados</b>
                  <small>
                    Lista persistente para exportar o preparar descargas.
                  </small>
                </span>
              </div>
              <button
                onClick={() =>
                  exportCatalog(selectionItems, "markdown", setNotice)
                }
              >
                Exportar lista
              </button>
              <button className="selection-to-cart" onClick={addSelectionToCart}>
                Agregar a descargas
              </button>
              <button
                className="selection-save-collection"
                onClick={() => {
                  setCollectionName(`Selección ${collections.length + 1}`);
                  setCollectionsOpen(true);
                }}
              >
                <FolderPlus size={15} />
                Guardar colección
              </button>
              <button
                className="selection-clear"
                onClick={() => setSelectionIds([])}
              >
                Limpiar
              </button>
            </aside>
          )}
          {cartIds.length > 0 && (
            <aside className="cart-dock">
              <div>
                <ShoppingCart size={18} />
                <span>
                  <b>{cartIds.length} en tu lista</b>
                  <small>
                    {cartWeight
                      ? formatWeight(cartWeight)
                      : "Peso por confirmar"}
                    {cartCollections
                      ? ` · ${cartCollections} colección${cartCollections === 1 ? "" : "es"}`
                      : ""}
                  </small>
                </span>
              </div>
              {downloadProgress ? (
                <span className="cart-progress-text">
                  Preparando {downloadProgress.current} de{" "}
                  {downloadProgress.total}
                </span>
              ) : (
                <>
                  <button onClick={() => setCartOpen(true)}>Ver lista</button>
                  <button className="cart-download-all" onClick={downloadCart}>
                    Descargar lista <Download size={15} />
                  </button>
                </>
              )}
            </aside>
          )}
          <div className="records-by-folder">
            {groupedResources.map(([group, items], groupIndex) => (
              <section
                className="folder-register"
                key={group}
                aria-label={group}
              >
                <header className="folder-register-heading">
                  <span>
                    CAPÍTULO {String(groupIndex + 1).padStart(2, "0")}{" "}
                    <ChevronRight size={12} /> ORIGEN PRIVADO DE DRIVE
                  </span>
                  <h3>{group}</h3>
                  <b>
                    {items.length.toString().padStart(2, "0")}{" "}
                    <small>registros</small>
                  </b>
                </header>
                <div className="resource-grid">
                  {items.map((item, index) => (
                    <ResourceCard
                      key={item.id}
                      item={item}
                      index={index}
                      favorite={favorites.includes(item.id)}
                      comparisonSelected={compareIds.includes(item.id)}
                      cartSelected={cartIds.includes(item.id)}
                      selected={selectionIds.includes(item.id)}
                      tested={testedResourceIds.includes(item.id)}
                      onFavorite={() => toggleFavorite(item.id)}
                      onCompare={() => toggleCompare(item.id)}
                      onCart={() => toggleCart(item.id)}
                      onSelect={() => toggleSelection(item.id)}
                      onToggleTested={() => toggleTested(item.id)}
                      onOpen={() => setSelected(item)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          {resources.length === 0 && (
            <div className="market-empty">
              <Search size={25} />
              <h3>No encontramos ese recurso</h3>
              <p>
                Prueba con otra compatibilidad, tamaño, etiqueta o proyecto, o
                restablece los filtros.
              </p>
              <button
                onClick={() => {
                  resetSearchCriteria();
                  setActiveTag(null);
                  setFilter("Todo");
                  setGoalFilter("Todo");
                  setTechnicalFilter("Todo");
                  setSizeFilter("Todo");
                  setShowFavorites(false);
                }}
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </section>

        <footer className="page-footer">
          <span>Índice Drive · recursos clasificados por utilidad visual.</span>
          <span>{driveSources.length} fuentes privadas integradas</span>
        </footer>
      </main>

      {selected &&
        (selected.isCollection ? (
          <CollectionExplorerPanel
            item={selected}
            onClose={() => setSelected(null)}
          />
        ) : (
          <ResourceDrawer
            item={selected}
            favorite={favorites.includes(selected.id)}
            cartSelected={cartIds.includes(selected.id)}
            selected={selectionIds.includes(selected.id)}
            onClose={() => setSelected(null)}
            onFavorite={() => toggleFavorite(selected.id)}
            onCart={() => toggleCart(selected.id)}
            onSelect={() => toggleSelection(selected.id)}
            manualLicense={manualLicenses[selected.id] ?? "unreviewed"}
            onManualLicense={(status) => setManualLicense(selected.id, status)}
            tested={testedResourceIds.includes(selected.id)}
            personalNote={personalNotes[selected.id] ?? ""}
            onToggleTested={() => toggleTested(selected.id)}
            onPersonalNoteChange={note => setPersonalNote(selected.id, note)}
            onOpen={setSelected}
          />
        ))}
      {comparisonOpen && (
        <ComparisonPanel
          items={comparisonItems}
          onClose={() => setComparisonOpen(false)}
          onRemove={toggleCompare}
          onExport={() => exportComparison(comparisonItems, setNotice)}
        />
      )}
      {collectionsOpen && (
        <CollectionsPanel
          collections={collections}
          sourceIds={collectionSourceIds}
          collectionName={collectionName}
          onNameChange={setCollectionName}
          onCreate={createCollection}
          onClose={() => setCollectionsOpen(false)}
          onShare={shareCollection}
          onLoad={collection => {
            setCompareIds(collection.itemIds.slice(0, 3));
            setCollectionsOpen(false);
            setNotice(`“${collection.name}” está lista para comparar.`);
          }}
          onDelete={id =>
            setCollections(current =>
              current.filter(collection => collection.id !== id)
            )
          }
        />
      )}
      {cartOpen && (
        <DownloadCartPanel
          items={cartItems}
          totalWeight={cartWeight}
          collectionCount={cartCollections}
          progress={downloadProgress}
          onClose={() => setCartOpen(false)}
          onRemove={toggleCart}
          onClear={() => setCartIds([])}
          onDownload={downloadCart}
        />
      )}
    </div>
  );
}

function ResourceCard({
  item,
  index,
  favorite,
  comparisonSelected,
  cartSelected,
  selected,
  tested,
  onFavorite,
  onCompare,
  onCart,
  onSelect,
  onToggleTested,
  onOpen,
}: {
  item: CatalogItem;
  index: number;
  favorite: boolean;
  comparisonSelected: boolean;
  cartSelected: boolean;
  selected: boolean;
  tested: boolean;
  onFavorite: () => void;
  onCompare: () => void;
  onCart: () => void;
  onSelect: () => void;
  onToggleTested: () => void;
  onOpen: () => void;
}) {
  const narrative = describeResource(item);
  const downloadUrl = directDownloadUrl(item);
  const source = sourceFor(item);
  const requirement = minimumRequirementFor(item);
  const license = licenseReviewFor(item);
  return (
    <article
      className={`resource-card resource-card--${item.color}`}
      style={{ animationDelay: `${Math.min(index, 12) * 38}ms` }}
    >
      <div className="record-strip">
        <BrandMark className="card-mark" />
        <span>FUENTE DRIVE · {source.account}</span>
          <b>
            {item.isCollection ? "COLECCIÓN" : "ZIP"} · {item.size}
          </b>
          {tested && <i className="tested-stamp"><Check size={11} /> PROBADO</i>}
      </div>
      <div className="resource-content">
        <div className="resource-line">
          <span className="resource-type">
            <FileArchive size={13} /> {item.resourceType}
          </span>
          <span className="record-actions">
            <button
              className={`compare-button ${comparisonSelected ? "compare-button--active" : ""}`}
              onClick={onCompare}
              aria-label={
                comparisonSelected
                  ? "Quitar de comparación"
                  : "Añadir a comparación"
              }
            >
              <Columns3 size={15} />
              {comparisonSelected ? "En comparación" : "Comparar"}
            </button>
            <button
              className={`cart-button ${cartSelected ? "cart-button--active" : ""}`}
              onClick={onCart}
              aria-label={
                cartSelected
                  ? "Quitar de la lista de descargas"
                  : "Agregar a descargas"
              }
            >
              <ShoppingCart size={15} />
              {cartSelected ? "En descargas" : "Agregar"}
            </button>
            <button
              className={`heart-button ${favorite ? "heart-button--active" : ""}`}
              onClick={onFavorite}
              aria-label={favorite ? "Quitar de guardados" : "Guardar recurso"}
            >
              <Heart size={16} fill={favorite ? "currentColor" : "none"} />
            </button>
          </span>
        </div>
        <button className="resource-title" onClick={onOpen}>
          {narrative.clearTitle}
        </button>
        <p className="resource-original">
          <span>Nombre original</span>
          {displayTitle(item.originalName ?? item.name)}
        </p>
        <div className="resource-file-meta">
          <span>
            {item.isCollection
              ? "Colección lista para preparar como ZIP"
              : "Archivo ZIP listo para descargar"}
          </span>
        </div>
        <div className="technical-teaser">
          <span>USAR EN</span>
          <b>{narrative.technical.apps.slice(0, 2).join(" · ")}</b>
          <small>{narrative.technical.environment}</small>
        </div>
        <div
          className={`requirement-teaser requirement-teaser--${requirement.level}`}
          title={requirement.note}
        >
          <span>REQUISITO MÍNIMO</span>
          <b>{requirement.shortLabel}</b>
          <small>{requirement.label}</small>
        </div>
        <div className="license-teaser" title={license.note}>
          <span>LICENCIA</span>
          <b>{license.shortLabel}</b>
        </div>
        <p>{narrative.value}</p>
        <div className="scenario-teaser">
          <span>3 casos ideales</span>
          <b>{narrative.scenarios[0].title}</b>
        </div>
        <div className="resource-tags">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="resource-card-actions">
          <button className="resource-more" onClick={onOpen}>
            Abrir ficha detallada <ArrowUpRight size={15} />
          </button>
          <button
            className={`resource-select ${selected ? "resource-select--active" : ""}`}
            onClick={onSelect}
            aria-pressed={selected}
          >
            <Check size={15} />
            {selected ? "Seleccionado" : "Seleccionar"}
          </button>
          <button
            className={tested ? "resource-tested resource-tested--active" : "resource-tested"}
            onClick={onToggleTested}
          >
            <Check size={15} /> {tested ? "Probado" : "Marcar probado"}
          </button>
          <a className="resource-download" href={downloadUrl}>
            <Download size={15} />
            {item.isCollection ? "Descargar colección" : "Descargar ZIP"}
          </a>
        </div>
      </div>
      <button
        className="resource-preview"
        onClick={onOpen}
        aria-label={`Ver ficha de ${displayTitle(item.name)}`}
      >
        <span className="preview-code">MUESTRA VISUAL SECUNDARIA</span>
        <span className="preview-shape preview-shape--a" />
        <span className="preview-shape preview-shape--b" />
        <span className="preview-label">{item.category}</span>
      </button>
    </article>
  );
}

function ResourceDrawer({
  item,
  favorite,
  cartSelected,
  selected,
  onClose,
  onFavorite,
  onCart,
  onSelect,
  manualLicense,
  onManualLicense,
  tested,
  personalNote,
  onToggleTested,
  onPersonalNoteChange,
  onOpen,
}: {
  item: CatalogItem;
  favorite: boolean;
  cartSelected: boolean;
  selected: boolean;
  onClose: () => void;
  onFavorite: () => void;
  onCart: () => void;
  onSelect: () => void;
  manualLicense: ManualLicenseStatus;
  onManualLicense: (status: ManualLicenseStatus) => void;
  tested: boolean;
  personalNote: string;
  onToggleTested: () => void;
  onPersonalNoteChange: (note: string) => void;
  onOpen: (item: CatalogItem) => void;
}) {
  const driveUrl = item.isCollection
    ? `https://drive.google.com/drive/folders/${item.id}`
    : `https://drive.google.com/file/d/${item.id}/view`;
  const downloadUrl = directDownloadUrl(item);
  const narrative = describeResource(item);
  const source = sourceFor(item);
  const requirement = minimumRequirementFor(item);
  const license = licenseReviewFor(item);
  const version = versionCompatibilityFor(item);
  const manualLicenseDetail = manualLicenseOption(manualLicense);
  const related = fullCatalog
    .filter(candidate => candidate.id !== item.id)
    .map(candidate => ({
      candidate,
      score:
        (candidate.category === item.category ? 5 : 0) +
        candidate.tags.filter(tag => item.tags.includes(tag)).length * 2 +
        candidate.projects.filter(project => item.projects.includes(project))
          .length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ candidate }) => candidate);
  return (
    <div
      className="drawer-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-drawer-title"
    >
      <button
        className="drawer-scrim"
        onClick={onClose}
        aria-label="Cerrar ficha"
      />
      <aside className="resource-drawer">
        <button
          className="drawer-close"
          onClick={onClose}
          aria-label="Cerrar ficha"
        >
          <X size={20} />
        </button>
        <div className={`drawer-art resource-card--${item.color}`}>
          <span className="preview-code">{item.resourceType}</span>
          <span className="preview-shape preview-shape--a" />
          <span className="preview-shape preview-shape--b" />
          <span className="drawer-index">
            {source.account} / {item.isCollection ? "COLECCIÓN" : "ZIP"}
          </span>
        </div>
        <div className="drawer-body">
          <span className="drawer-category">{item.category}</span>
          <h2 id="resource-drawer-title">{narrative.clearTitle}</h2>
          <p className="drawer-original">
            <span>Nombre original</span>
            {displayTitle(item.originalName ?? item.name)}
          </p>
          <div className="drawer-meta">
            <span>
              <FileArchive size={15} />{" "}
              {item.isCollection ? "Colección" : "Archivo ZIP"}
            </span>
            <span>{item.size}</span>
          </div>
          <section className="drawer-detail-ledger" aria-label="Resumen técnico del recurso">
            <div>
              <span>FORMATO</span>
              <b>{item.isCollection ? "Carpeta de Drive" : "Archivo ZIP"}</b>
            </div>
            <div>
              <span>COLECCIÓN</span>
              <b>{item.sourceFolder ?? "Archivo general"}</b>
            </div>
            <div>
              <span>COMPATIBLE</span>
              <b>{narrative.technical.apps.slice(0, 3).join(" · ")}</b>
            </div>
            <div>
              <span>ENTORNO</span>
              <b>{narrative.technical.environment}</b>
            </div>
            <div>
              <span>REQUISITO MÍNIMO</span>
              <b>{requirement.shortLabel}</b>
            </div>
            <div>
              <span>LICENCIA</span>
              <b>{license.shortLabel}</b>
            </div>
            <div>
              <span>VERSIÓN</span>
              <b>{version.label}</b>
            </div>
          </section>
          <section className="drawer-license-note">
            <h3>Revisión antes de usar</h3>
            <p>{license.note}</p>
            <small>{requirement.note}</small>
          </section>
          <section className="drawer-manual-license">
            <h3>Estado manual de licencia</h3>
            <p>{manualLicenseDetail.note}</p>
            <label>
              Decisión guardada en este navegador
              <select
                value={manualLicense}
                onChange={event => onManualLicense(event.target.value as ManualLicenseStatus)}
              >
                {manualLicenseOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
          </section>
          <section className="drawer-personal-log">
            <h3>Prueba y notas personales</h3>
            <p>Registra una validación propia o el detalle que necesitas recordar al volver a este recurso.</p>
            <button
              className={tested ? "personal-tested personal-tested--active" : "personal-tested"}
              onClick={onToggleTested}
            >
              <Check size={16} /> {tested ? "Probado en tu flujo" : "Marcar como probado"}
            </button>
            <label>
              Nota privada en este navegador
              <textarea
                value={personalNote}
                onChange={event => onPersonalNoteChange(event.target.value)}
                placeholder="Ej. Revisado con Shopify 2.0; falta confirmar la licencia del plugin incluido."
                maxLength={800}
              />
            </label>
          </section>
          <section>
            <h3>Fuente de Drive</h3>
            <p className="drawer-route">
              <AtSign size={14} /> {source.account}
            </p>
            <a
              className="drawer-source-link"
              href={source.folderUrl}
              target="_blank"
              rel="noreferrer"
            >
              Abrir carpeta exacta <ArrowUpRight size={15} />
            </a>
          </section>
          <section className="drawer-technical">
            <h3>Compatibilidad técnica</h3>
            <div>
              <span>USAR EN</span>
              <b>{narrative.technical.apps.join(" · ")}</b>
            </div>
            <div>
              <span>ENTORNO</span>
              <b>{narrative.technical.environment}</b>
            </div>
            <div>
              <span>CÓDIGO / EDICIÓN</span>
              <p>{narrative.technical.code}</p>
            </div>
            <div>
              <span>ANTES DE USAR</span>
              <p>{narrative.technical.requirement}</p>
            </div>
            <div>
              <span>VERSIÓN / SDK</span>
              <p>{version.label}</p>
              <small>{version.note}</small>
            </div>
            {narrative.technical.caution && (
              <p className="technical-caution">
                <CircleHelp size={15} />
                {narrative.technical.caution}
              </p>
            )}
          </section>
          <section className="drawer-value">
            <h3>Cuándo te será útil</h3>
            <p>{narrative.when}</p>
          </section>
          <section className="drawer-scenarios">
            <h3>3 casos donde encaja perfecto</h3>
            <div>
              {narrative.scenarios.map((scenario, index) => (
                <article key={scenario.title}>
                  <span>0{index + 1}</span>
                  <h4>{scenario.title}</h4>
                  <p>{scenario.detail}</p>
                </article>
              ))}
            </div>
          </section>
          <ContextualMap item={item} related={related} onOpen={onOpen} />
          <section className="drawer-problem">
            <h3>Qué problema resuelve</h3>
            <p>{narrative.problem}</p>
          </section>
          <section className="drawer-outcome">
            <h3>Qué puedes conseguir</h3>
            <p>{narrative.outcome}</p>
          </section>
          <section>
            <h3>Proyectos donde tiene más impacto</h3>
            <div className="project-list">
              {item.projects.map(project => (
                <span key={project}>
                  <Check size={14} />
                  {project}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h3>Etiquetas de búsqueda</h3>
            <div className="resource-tags drawer-tags">
              {item.tags.map(tag => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </section>
          {related.length > 0 && (
            <section className="drawer-related">
              <h3>También te puede servir</h3>
              <p>
                Recomendado por coincidencias de tipo, etiquetas y proyectos.
              </p>
              <div>
                {related.map(resource => (
                  <button key={resource.id} onClick={() => onOpen(resource)}>
                    <span>{resource.category}</span>
                    <b>{describeResource(resource).clearTitle}</b>
                    <ChevronRight size={15} />
                  </button>
                ))}
              </div>
            </section>
          )}
          <div className="drawer-actions drawer-actions--download">
            <button
              className={`drawer-save ${favorite ? "drawer-save--active" : ""}`}
              onClick={onFavorite}
            >
              <Heart size={17} fill={favorite ? "currentColor" : "none"} />
              {favorite ? "Guardado" : "Guardar ficha"}
            </button>
            <button
              className={`drawer-cart ${cartSelected ? "drawer-cart--active" : ""}`}
              onClick={onCart}
            >
              <ShoppingCart size={16} />
              {cartSelected ? "En descargas" : "Agregar a descargas"}
            </button>
            <button
              className={`drawer-select ${selected ? "drawer-select--active" : ""}`}
              onClick={onSelect}
              aria-pressed={selected}
            >
              <Check size={16} />
              {selected ? "Seleccionado" : "Seleccionar"}
            </button>
            <a className="drawer-download" href={downloadUrl}>
              <Download size={16} />
              {item.isCollection ? "Descargar colección" : "Descargar ZIP"}
            </a>
            <a
              className="drawer-open-drive"
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver en Drive <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ComparisonPanel({
  items,
  onClose,
  onRemove,
  onExport,
}: {
  items: CatalogItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onExport: () => void;
}) {
  return (
    <div
      className="drawer-layer comparison-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <button
        className="drawer-scrim"
        onClick={onClose}
        aria-label="Cerrar comparación"
      />
      <aside className="comparison-panel">
        <header>
          <div>
            <span>COMPARADOR DE RECURSOS</span>
            <h2 id="comparison-title">Elige con contexto, no por intuición.</h2>
            <p>
              Compara el enfoque, los casos ideales, la compatibilidad y los
              resultados que puede aportar cada alternativa.
            </p>
          </div>
          <div className="comparison-header-actions">
            <button className="comparison-export" onClick={onExport}>
              <Download size={15} />
              Exportar CSV
            </button>
            <button
              className="drawer-close"
              onClick={onClose}
              aria-label="Cerrar comparación"
            >
              <X size={20} />
            </button>
          </div>
        </header>
        <div className={`comparison-grid comparison-grid--${items.length}`}>
          {items.map(item => {
            const narrative = describeResource(item);
            return (
              <article key={item.id}>
                <button
                  className="comparison-remove"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Quitar ${narrative.clearTitle} de la comparación`}
                >
                  <X size={15} />
                </button>
                <span className="drawer-category">{item.category}</span>
                <h3>{narrative.clearTitle}</h3>
                <p className="drawer-original">
                  <span>Nombre original</span>
                  {displayTitle(item.name)}
                </p>
                <dl>
                  <div>
                    <dt>Tipo</dt>
                    <dd>{item.resourceType}</dd>
                  </div>
                  <div>
                    <dt>Usar en</dt>
                    <dd>{narrative.technical.apps.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt>Entorno</dt>
                    <dd>{narrative.technical.environment}</dd>
                  </div>
                  <div>
                    <dt>Requiere</dt>
                    <dd>{narrative.technical.requirement}</dd>
                  </div>
                  <div>
                    <dt>Versión / SDK</dt>
                    <dd>{versionCompatibilityFor(item).label}</dd>
                  </div>
                  <div>
                    <dt>Fuente</dt>
                    <dd>{sourceFor(item).account}</dd>
                  </div>
                  <div>
                    <dt>Ideal cuando</dt>
                    <dd>{narrative.when}</dd>
                  </div>
                  <div>
                    <dt>Resuelve</dt>
                    <dd>{narrative.problem}</dd>
                  </div>
                  <div>
                    <dt>3 casos perfectos</dt>
                    <dd>
                      <ul>
                        {narrative.scenarios.map(scenario => (
                          <li key={scenario.title}>{scenario.title}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>Etiquetas</dt>
                    <dd className="comparison-tags">
                      {item.tags.map(tag => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function AutomaticRecommendations({
  items,
  activeGoal,
  onOpen,
}: {
  items: CatalogItem[];
  activeGoal?: string;
  onOpen: (item: CatalogItem) => void;
}) {
  if (!items.length) return null;
  return (
    <section
      className="automatic-recommendations"
      aria-label="Recomendaciones automáticas"
    >
      <header>
        <div>
          <span>SELECCIÓN AUTOMÁTICA</span>
          <h3>
            {activeGoal
              ? `Recursos para ${activeGoal}`
              : "Tres recursos para seguir explorando"}
          </h3>
        </div>
        <p>
          {activeGoal
            ? "Sugeridos por el objetivo activo de tu proyecto."
            : "Sugeridos por compatibilidad con los usos más frecuentes del índice."}
        </p>
      </header>
      <div>
        {items.map(item => (
          <button key={item.id} onClick={() => onOpen(item)}>
            <span>{item.category}</span>
            <b>{describeResource(item).clearTitle}</b>
            <small>
              {item.resourceType} · {defaultDriveSource.account}
            </small>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}

function DecisionGuide({
  goal,
  technical,
  format,
  resultCount,
  onGoal,
  onTechnical,
  onFormat,
  onApply,
  onOpen,
  items,
  tooltipsEnabled,
}: {
  goal: GoalFilter;
  technical: TechnicalFilter;
  format: "Todo" | "collection" | "file";
  resultCount: number;
  onGoal: (value: GoalFilter) => void;
  onTechnical: (value: TechnicalFilter) => void;
  onFormat: (value: "Todo" | "collection" | "file") => void;
  onApply: () => void;
  onOpen: (item: CatalogItem) => void;
  items: CatalogItem[];
  tooltipsEnabled: boolean;
}) {
  return (
    <section className="decision-guide" aria-label="Mapa de decisión guiado">
      <header>
        <div>
          <span>
            <MapIcon size={15} />
            MAPA DE DECISIÓN
          </span>
          <h3>Elige una ruta, no una carpeta.</h3>
          <p>
            Esta guía combina objetivo, entorno técnico y formato para
            proponerte una selección explicable.
          </p>
        </div>
        <b>{resultCount} coincidencias</b>
      </header>
      <div className="decision-flow">
        <article>
          <span>01 · OBJETIVO</span>
          <div>
            {projectGoals.map(projectGoal => (
              <button
                key={projectGoal.id}
                className={
                  goal === projectGoal.id
                    ? "decision-chip decision-chip--active"
                    : "decision-chip"
                }
                onClick={() =>
                  onGoal(goal === projectGoal.id ? "Todo" : projectGoal.id)
                }
              >
                {projectGoal.label}
              </button>
            ))}
          </div>
        </article>
        <i aria-hidden="true" />
        <article>
          <span>02 · ENTORNO</span>
          <div>
            {technicalFilters.slice(0, 8).map(technicalItem => (
              <button
                key={technicalItem.id}
                className={
                  technical === technicalItem.id
                    ? "decision-chip decision-chip--active"
                    : "decision-chip"
                }
                onClick={() =>
                  onTechnical(
                    technical === technicalItem.id ? "Todo" : technicalItem.id
                  )
                }
                title={tooltipsEnabled ? technicalItem.note : undefined}
              >
                {technicalItem.label}
              </button>
            ))}
          </div>
        </article>
        <i aria-hidden="true" />
        <article>
          <span>03 · FORMATO</span>
          <div>
            {(["Todo", "collection", "file"] as const).map(formatItem => (
              <button
                key={formatItem}
                className={
                  format === formatItem
                    ? "decision-chip decision-chip--active"
                    : "decision-chip"
                }
                onClick={() => onFormat(formatItem)}
              >
                {formatItem === "Todo"
                  ? "Cualquier formato"
                  : formatItem === "collection"
                    ? "Colección desplegable"
                    : "Archivo directo"}
              </button>
            ))}
          </div>
        </article>
      </div>
      <footer>
        <div>
          <b>Por qué aparece esta ruta</b>
          <p>
            Coincide con los criterios visibles que elegiste; puedes ajustar
            cada nodo o aplicar los filtros al catálogo.
          </p>
        </div>
        <button onClick={onApply}>
          Ver {resultCount} recursos <ArrowUpRight size={15} />
        </button>
      </footer>
      {items.length > 0 && (
        <div className="decision-results">
          {items.slice(0, 3).map(item => (
            <button key={item.id} onClick={() => onOpen(item)}>
              <span>{item.category}</span>
              <b>{describeResource(item).clearTitle}</b>
              <ChevronRight size={15} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function ContextualMap({
  item,
  related,
  onOpen,
}: {
  item: CatalogItem;
  related: CatalogItem[];
  onOpen: (item: CatalogItem) => void;
}) {
  const narrative = describeResource(item);
  return (
    <section className="contextual-map">
      <header>
        <span>
          <Network size={15} />
          MAPA CONTEXTUAL
        </span>
        <h3>Cómo se conecta este recurso</h3>
        <p>
          Relaciones derivadas de usos, compatibilidad y etiquetas documentadas.
        </p>
      </header>
      <div className="contextual-map-grid">
        <article className="contextual-root">
          <small>RECURSO ACTUAL</small>
          <b>{narrative.clearTitle}</b>
        </article>
        <div className="contextual-branch">
          <span>USOS</span>
          {item.projects.slice(0, 3).map(project => (
            <b key={project}>{project}</b>
          ))}
        </div>
        <div className="contextual-branch">
          <span>USAR EN</span>
          {narrative.technical.apps.slice(0, 3).map(app => (
            <b key={app}>{app}</b>
          ))}
        </div>
        <div className="contextual-branch contextual-branch--related">
          <span>AFINES</span>
          {related.slice(0, 2).map(resource => (
            <button key={resource.id} onClick={() => onOpen(resource)}>
              {describeResource(resource).clearTitle}
              <ChevronRight size={13} />
            </button>
          ))}
          {related.length === 0 && <b>Explora etiquetas similares</b>}
        </div>
      </div>
    </section>
  );
}

function DownloadCartPanel({
  items,
  totalWeight,
  collectionCount,
  progress,
  onClose,
  onRemove,
  onClear,
  onDownload,
}: {
  items: CatalogItem[];
  totalWeight: number;
  collectionCount: number;
  progress: DownloadProgress;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onDownload: () => void;
}) {
  const progressPercent = progress
    ? Math.round((progress.current / progress.total) * 100)
    : 0;
  return (
    <div
      className="drawer-layer cart-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <button
        className="drawer-scrim"
        onClick={onClose}
        aria-label="Cerrar lista de descargas"
      />
      <aside className="cart-panel">
        <header>
          <div>
            <span>LISTA DE DESCARGAS</span>
            <h2 id="cart-title">Tu lista está lista para preparar.</h2>
            <p>
              Revisa los recursos antes de iniciar las descargas directas desde
              Drive.
            </p>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Cerrar lista de descargas"
          >
            <X size={20} />
          </button>
        </header>
        <section className="cart-summary">
          <div>
            <span>SELECCIÓN</span>
            <b>
              {items.length} recurso{items.length === 1 ? "" : "s"}
            </b>
          </div>
          <div>
            <span>PESO CONOCIDO</span>
            <b>{totalWeight ? formatWeight(totalWeight) : "Por confirmar"}</b>
          </div>
          <div>
            <span>COLECCIONES</span>
            <b>{collectionCount}</b>
          </div>
        </section>
        {progress && (
          <section className="cart-preparing" aria-live="polite">
            <div>
              <span>PREPARANDO DESCARGAS</span>
              <b>
                {progress.current} de {progress.total}
              </b>
            </div>
            <i>
              <i style={{ width: `${progressPercent}%` }} />
            </i>
            <p>
              Tu navegador puede pedir confirmación cuando haya varios archivos
              o archivos grandes.
            </p>
          </section>
        )}
        <section className="cart-items">
          <h3>Recursos en tu lista</h3>
          {items.length ? (
            items.map((item, index) => (
              <article key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <b>{describeResource(item).clearTitle}</b>
                  <small>
                    {item.isCollection ? "Colección de Drive" : item.size} ·{" "}
                    {sourceFor(item).account}
                  </small>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  disabled={Boolean(progress)}
                  aria-label={`Quitar ${describeResource(item).clearTitle} de la lista`}
                >
                  <Trash2 size={15} />
                </button>
              </article>
            ))
          ) : (
            <p className="cart-empty">
              La lista está vacía. Agrega recursos desde cada tarjeta.
            </p>
          )}
        </section>
        <footer>
          <button
            className="cart-clear"
            onClick={onClear}
            disabled={!items.length || Boolean(progress)}
          >
            Vaciar lista
          </button>
          <button
            className="cart-download-primary"
            onClick={onDownload}
            disabled={!items.length || Boolean(progress)}
          >
            <Download size={16} />
            {progress
              ? `Preparando ${progress.current}/${progress.total}`
              : "Descargar lista"}
          </button>
        </footer>
      </aside>
    </div>
  );
}

function CollectionsPanel({
  collections,
  sourceIds,
  collectionName,
  onNameChange,
  onCreate,
  onClose,
  onShare,
  onLoad,
  onDelete,
}: {
  collections: SavedCollection[];
  sourceIds: string[];
  collectionName: string;
  onNameChange: (value: string) => void;
  onCreate: () => void;
  onClose: () => void;
  onShare: (collection: SavedCollection) => void;
  onLoad: (collection: SavedCollection) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="drawer-layer collections-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collections-title"
    >
      <button
        className="drawer-scrim"
        onClick={onClose}
        aria-label="Cerrar colecciones"
      />
      <aside className="collections-panel">
        <header>
          <div>
            <span>COLECCIONES DEL NAVEGADOR</span>
            <h2 id="collections-title">Agrupa recursos y comparte una ruta.</h2>
            <p>
              Las colecciones se guardan en este navegador. Un enlace
              compartible carga sus recursos en el comparador de la otra
              persona.
            </p>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Cerrar colecciones"
          >
            <X size={20} />
          </button>
        </header>
        <section className="collection-create">
          <span>Selección actual</span>
          <b>
            {sourceIds.length} recurso{sourceIds.length === 1 ? "" : "s"}{" "}
            {sourceIds.length ? "desde favoritos o comparación" : "disponibles"}
          </b>
          <div>
            <input
              value={collectionName}
              onChange={event => onNameChange(event.target.value)}
              placeholder="Ej. Opciones para tienda de cosmética"
            />
            <button onClick={onCreate}>
              <FolderPlus size={15} />
              Crear colección
            </button>
          </div>
        </section>
        <section className="collection-list">
          <h3>Colecciones guardadas</h3>
          {collections.length ? (
            collections.map(collection => (
              <article key={collection.id}>
                <div>
                  <span>
                    {collection.itemIds.length} recursos ·{" "}
                    {collection.createdAt}
                  </span>
                  <b>{collection.name}</b>
                </div>
                <div>
                  <button onClick={() => onLoad(collection)}>Comparar</button>
                  <button onClick={() => onShare(collection)}>
                    <Share2 size={14} />
                    Compartir
                  </button>
                  <button
                    className="collection-delete"
                    onClick={() => onDelete(collection.id)}
                    aria-label={`Eliminar ${collection.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="collections-empty">
              Aún no hay colecciones. Guarda recursos o selecciónalos para
              comparar y crea la primera.
            </p>
          )}
        </section>
      </aside>
    </div>
  );
}

function exportComparison(
  items: CatalogItem[],
  setNotice: (message: string) => void
) {
  if (!items.length) return;
  const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const rows = items.map(item => {
    const narrative = describeResource(item);
    return [
      narrative.clearTitle,
      displayTitle(item.name),
      item.category,
      item.resourceType,
      defaultDriveSource.account,
      narrative.technical.apps.join(" | "),
      narrative.technical.environment,
      narrative.technical.code,
      narrative.technical.requirement,
      narrative.when,
      narrative.problem,
      narrative.scenarios.map(scenario => scenario.title).join(" | "),
      item.tags.join(" | "),
    ]
      .map(quote)
      .join(",");
  });
  const csv = [
    "Título claro,Nombre original,Categoría,Tipo,Carpeta,Usar en,Entorno,Código o edición,Requisitos técnicos,Ideal cuando,Problema que resuelve,Casos perfectos,Etiquetas",
    ...rows,
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "comparativa-indice-drive.csv";
  link.click();
  URL.revokeObjectURL(url);
  setNotice("La comparativa se exportó como CSV.");
}

function exportCatalog(
  items: CatalogItem[],
  format: "csv" | "markdown",
  setNotice: (message: string) => void
) {
  if (!items.length) {
    setNotice("No hay recursos visibles para exportar.");
    return;
  }
  const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const records = items.map(item => {
    const narrative = describeResource(item);
    return {
      titulo: narrative.clearTitle,
      original: displayTitle(item.originalName ?? item.name),
      categoria: item.category,
      tipo: item.resourceType,
      fuente: sourceFor(item).account,
      coleccion: item.sourceFolder ?? "Archivo general",
      tamano: item.size,
      compatible: narrative.technical.apps.join(" · "),
      entorno: narrative.technical.environment,
      requisitos: narrative.technical.requirement,
      casos: narrative.scenarios.map(scenario => scenario.title).join(" · "),
      etiquetas: item.tags.join(" · "),
      drive: item.isCollection
        ? `https://drive.google.com/drive/folders/${item.id}`
        : `https://drive.google.com/file/d/${item.id}/view`,
    };
  });
  const content =
    format === "csv"
      ? [
          "Título claro,Nombre original,Categoría,Tipo,Fuente de Drive,Colección,Tamaño,Compatible con,Entorno,Requisitos,3 casos ideales,Etiquetas,Enlace Drive",
          ...records.map(record =>
            [
              record.titulo,
              record.original,
              record.categoria,
              record.tipo,
              record.fuente,
              record.coleccion,
              record.tamano,
              record.compatible,
              record.entorno,
              record.requisitos,
              record.casos,
              record.etiquetas,
              record.drive,
            ]
              .map(quote)
              .join(",")
          ),
        ].join("\n")
      : [
          `# Índice Drive · exportación filtrada`,
          ``,
          `**Recursos exportados:** ${records.length}`,
          ``,
          ...records.flatMap((record, index) => [
            `## ${String(index + 1).padStart(3, "0")} · ${record.titulo}`,
            ``,
            `| Campo | Detalle |`,
            `|---|---|`,
            `| Nombre original | ${record.original} |`,
            `| Categoría | ${record.categoria} |`,
            `| Tipo | ${record.tipo} |`,
            `| Fuente | ${record.fuente} |`,
            `| Colección | ${record.coleccion} |`,
            `| Tamaño | ${record.tamano} |`,
            `| Compatible con | ${record.compatible} |`,
            `| Entorno | ${record.entorno} |`,
            `| Requisitos | ${record.requisitos} |`,
            `| Casos ideales | ${record.casos} |`,
            `| Etiquetas | ${record.etiquetas} |`,
            ``,
            `[Abrir en Drive](${record.drive})`,
            ``,
          ]),
        ].join("\n");
  const extension = format === "csv" ? "csv" : "md";
  const mime =
    format === "csv" ? "text/csv;charset=utf-8" : "text/markdown;charset=utf-8";
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `indice-drive-${records.length}-recursos.${extension}`;
  link.click();
  URL.revokeObjectURL(url);
  setNotice(
    `Se exportaron ${records.length} recursos como ${format === "csv" ? "CSV" : "Markdown"}.`
  );
}
