/**
 * Archivo editorial: panel de colección que expone inventarios reales de Drive.
 * Conserva identificadores, miniaturas disponibles y decisiones locales de organización del usuario.
 */
import { useEffect, useMemo, useState } from "react";
import { BookmarkPlus, CheckSquare, Download, FileArchive, FolderOpen, ImageOff, ListChecks, Loader2, Search, Square, Tag, Trash2, X } from "lucide-react";
import type { CatalogItem } from "@/data/catalog";
import { describeResource } from "@/data/catalogNarrative";

type InventoryEntry = { id: string; kind: "file" | "folder"; name: string; size: string };
type InventoryCollection = { id: string; name: string; entries: InventoryEntry[] };
type ItemSizeFilter = "Todo" | "light" | "medium" | "heavy" | "unknown";
type SortOption = "default" | "name-asc" | "name-desc" | "size-asc" | "size-desc" | "format";
type SavedPartialSelection = { id: string; name: string; collectionId: string; itemIds: string[]; createdAt: string };

const inventoryUrls = [
  "/manus-storage/indice-drive-collections-inventory_b44bfba5.json",
  "/manus-storage/indice-drive-design-collection-items_b829eb3f.json",
];
const directDownloadUrl = (id: string) => `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;
const collectionUrl = (id: string) => `https://drive.google.com/drive/folders/${id}`;
const driveThumbnailUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w240`;

function normalizeSize(value: string) {
  const matches = Array.from(value.matchAll(/(\d+(?:[.,]\d+)?)\s*(MB|GB|KB|ميغابايت|كيلوبايت|غيغابايت)/gi));
  const match = matches.at(-1);
  if (!match) return "Tamaño por confirmar";
  const unit = /كيلو|KB/i.test(match[2]) ? "KB" : /غيغا|GB/i.test(match[2]) ? "GB" : "MB";
  return `${match[1].replace(",", ".")} ${unit}`;
}

function sizeToMb(value: string) {
  const normalized = normalizeSize(value);
  const match = normalized.match(/([\d.]+)\s*(KB|MB|GB)/i);
  if (!match) return 0;
  const amount = Number(match[1]);
  return match[2].toUpperCase() === "GB" ? amount * 1024 : match[2].toUpperCase() === "KB" ? amount / 1024 : amount;
}

function formatTotal(total: number) { return total >= 1024 ? `${(total / 1024).toFixed(1)} GB` : `${Math.round(total)} MB`; }
function entryFormat(entry: InventoryEntry) { if (entry.kind === "folder") return "Carpeta"; const extension = entry.name.split(".").pop()?.toUpperCase(); return extension && extension.length <= 8 ? extension : "Archivo"; }
function itemSizeBucket(entry: InventoryEntry): Exclude<ItemSizeFilter, "Todo"> { const size = sizeToMb(entry.size); if (!size) return "unknown"; if (size <= 50) return "light"; if (size <= 250) return "medium"; return "heavy"; }

function DriveThumbnail({ entry }: { entry: InventoryEntry }) {
  const [available, setAvailable] = useState(entry.kind !== "folder");
  const format = entryFormat(entry);
  const details = <><b>{entry.name}</b><small>{entry.kind === "folder" ? "Subcarpeta de Drive" : `${format} · ${normalizeSize(entry.size)}`}</small></>;
  if (entry.kind === "folder") return <span className="entry-thumbnail entry-thumbnail--folder"><FolderOpen size={20} /><span className="entry-hover-preview entry-hover-preview--fallback"><FolderOpen size={26} />{details}</span></span>;
  if (!available) return <span className="entry-thumbnail entry-thumbnail--fallback"><ImageOff size={17} /><b>{format}</b><span className="entry-hover-preview entry-hover-preview--fallback"><FileArchive size={26} />{details}<em>Drive no expone una vista previa visual para este archivo.</em></span></span>;
  return <span className="entry-thumbnail"><img src={driveThumbnailUrl(entry.id)} alt={`Miniatura de Drive: ${entry.name}`} onError={() => setAvailable(false)} /><i>{format}</i><span className="entry-hover-preview"><img src={driveThumbnailUrl(entry.id)} alt="" onError={() => setAvailable(false)} />{details}</span></span>;
}

export function CollectionExplorerPanel({ item, onClose }: { item: CatalogItem; onClose: () => void }) {
  const [allCollections, setAllCollections] = useState<InventoryCollection[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState("Todo");
  const [itemSizeFilter, setItemSizeFilter] = useState<ItemSizeFilter>("Todo");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectionName, setSelectionName] = useState("");
  const [manualTagInput, setManualTagInput] = useState("");
  const [manualTags, setManualTags] = useState<Record<string, string[]>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(window.localStorage.getItem("indice-drive:manual-tags") ?? "{}") as Record<string, string[]>; } catch { return {}; }
  });
  const [savedSelections, setSavedSelections] = useState<SavedPartialSelection[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("indice-drive:partial-selections") ?? "[]") as SavedPartialSelection[]; } catch { return []; }
  });
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number } | null>(null);
  const narrative = describeResource(item);

  useEffect(() => {
    let active = true;
    Promise.all(inventoryUrls.map((url) => fetch(url).then((response) => {
      if (!response.ok) throw new Error("No se pudo cargar el inventario de la colección.");
      return response.json() as Promise<InventoryCollection[]>;
    }))).then((sources) => { if (active) setAllCollections(sources.flat()); }).catch(() => { if (active) setLoadError("El inventario no está disponible ahora. Aun así puedes descargar la colección completa desde Drive."); });
    return () => { active = false; };
  }, []);
  useEffect(() => { try { window.localStorage.setItem("indice-drive:partial-selections", JSON.stringify(savedSelections)); } catch { /* Conserva la lista durante la sesión si el navegador bloquea almacenamiento. */ } }, [savedSelections]);
  useEffect(() => { try { window.localStorage.setItem("indice-drive:manual-tags", JSON.stringify(manualTags)); } catch { /* Conserva etiquetas durante la sesión si el navegador bloquea almacenamiento. */ } }, [manualTags]);

  const collection = allCollections?.find((candidate) => candidate.id === item.id);
  const entries = collection?.entries ?? [];
  const formats = useMemo(() => Array.from(new Set(entries.map(entryFormat))).sort(), [entries]);
  const visibleEntries = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = entries.filter((entry) => (!term || entry.name.toLowerCase().includes(term)) && (formatFilter === "Todo" || entryFormat(entry) === formatFilter) && (itemSizeFilter === "Todo" || itemSizeBucket(entry) === itemSizeFilter));
    const compareText = (left: string, right: string) => left.localeCompare(right, "es", { numeric: true, sensitivity: "base" });
    return filtered.slice().sort((left, right) => {
      if (sortBy === "name-asc") return compareText(left.name, right.name);
      if (sortBy === "name-desc") return compareText(right.name, left.name);
      if (sortBy === "size-asc") return sizeToMb(left.size) - sizeToMb(right.size);
      if (sortBy === "size-desc") return sizeToMb(right.size) - sizeToMb(left.size);
      if (sortBy === "format") return compareText(entryFormat(left), entryFormat(right)) || compareText(left.name, right.name);
      return entries.indexOf(left) - entries.indexOf(right);
    });
  }, [entries, formatFilter, itemSizeFilter, query, sortBy]);
  const selectedEntries = entries.filter((entry) => selectedIds.includes(entry.id));
  const selectedWeight = selectedEntries.reduce((sum, entry) => sum + sizeToMb(entry.size), 0);
  const allVisibleSelected = visibleEntries.length > 0 && visibleEntries.every((entry) => selectedIds.includes(entry.id));
  const collectionSavedSelections = savedSelections.filter((selection) => selection.collectionId === item.id);

  const toggleEntry = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((entryId) => entryId !== id) : current.concat(id));
  const toggleVisible = () => setSelectedIds((current) => { const ids = visibleEntries.map((entry) => entry.id); return allVisibleSelected ? current.filter((id) => !ids.includes(id)) : Array.from(new Set(current.concat(ids))); });
  const saveSelection = () => { if (!selectedIds.length) return; const name = selectionName.trim() || `Selección ${collectionSavedSelections.length + 1}`; setSavedSelections((current) => [{ id: `${item.id}:${Date.now()}`, name, collectionId: item.id, itemIds: selectedIds, createdAt: new Date().toLocaleDateString("es") }, ...current]); setSelectionName(""); };
  const loadSelection = (selection: SavedPartialSelection) => setSelectedIds(selection.itemIds.filter((id) => entries.some((entry) => entry.id === id)));
  const applyManualTag = () => { const tag = manualTagInput.trim().replace(/^#/, "").slice(0, 28); if (!tag || !selectedIds.length) return; setManualTags((current) => { const next = { ...current }; selectedIds.forEach((id) => { next[id] = Array.from(new Set((next[id] ?? []).concat(tag))); }); return next; }); setManualTagInput(""); };
  const removeManualTag = (entryId: string, tag: string) => setManualTags((current) => { const remaining = (current[entryId] ?? []).filter((candidate) => candidate !== tag); const next = { ...current }; if (remaining.length) next[entryId] = remaining; else delete next[entryId]; return next; });
  const downloadSelected = () => {
    if (!selectedEntries.length || downloadProgress) return;
    let current = 0; const total = selectedEntries.length;
    const next = () => { const entry = selectedEntries[current]; if (!entry) { setDownloadProgress(null); return; } const link = document.createElement("a"); link.href = directDownloadUrl(entry.id); link.rel = "noreferrer"; document.body.appendChild(link); link.click(); link.remove(); current += 1; setDownloadProgress({ current, total }); window.setTimeout(next, 750); };
    setDownloadProgress({ current: 0, total }); next();
  };

  return <div className="drawer-layer collection-explorer-layer" role="dialog" aria-modal="true" aria-labelledby="collection-explorer-title"><button className="drawer-scrim" onClick={onClose} aria-label="Cerrar colección" /><aside className="collection-explorer-panel"><header className="collection-explorer-header"><div><span>COLECCIÓN DESGLOSADA · DRIVE</span><h2 id="collection-explorer-title">{narrative.clearTitle}</h2><p>{narrative.value}</p></div><button className="drawer-close" onClick={onClose} aria-label="Cerrar colección"><X size={20} /></button></header><div className="collection-explorer-meta"><span><FolderOpen size={16} />{entries.length || "…"} elementos reales</span><span>{item.resourceType}</span><a href={directDownloadUrl(item.id)}><Download size={15} />Descargar colección completa</a><a href={collectionUrl(item.id)} target="_blank" rel="noreferrer">Abrir en Drive</a></div><section className="collection-explorer-controls collection-explorer-controls--advanced"><label><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar dentro de esta colección…" /></label><select aria-label="Filtrar elementos por formato" value={formatFilter} onChange={(event) => setFormatFilter(event.target.value)}><option value="Todo">Formato: todos</option>{formats.map((format) => <option key={format} value={format}>{format}</option>)}</select><select aria-label="Filtrar elementos por tamaño" value={itemSizeFilter} onChange={(event) => setItemSizeFilter(event.target.value as ItemSizeFilter)}><option value="Todo">Peso: todos</option><option value="light">Hasta 50 MB</option><option value="medium">50–250 MB</option><option value="heavy">Más de 250 MB</option><option value="unknown">Peso por confirmar</option></select><select aria-label="Ordenar elementos" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}><option value="default">Orden: original</option><option value="name-asc">Nombre: A–Z</option><option value="name-desc">Nombre: Z–A</option><option value="size-asc">Peso: menor a mayor</option><option value="size-desc">Peso: mayor a menor</option><option value="format">Formato: A–Z</option></select><button onClick={toggleVisible} disabled={!visibleEntries.length || Boolean(downloadProgress)}>{allVisibleSelected ? <CheckSquare size={16} /> : <Square size={16} />}{allVisibleSelected ? "Quitar visibles" : "Seleccionar visibles"}</button></section>{allCollections === null && !loadError && <div className="collection-loading"><Loader2 size={22} />Preparando el inventario verificado de Drive…</div>}{loadError && <p className="collection-load-error">{loadError}</p>}{allCollections !== null && <section className="collection-entry-list" aria-label="Elementos de la colección"><div className="collection-list-head"><span>{visibleEntries.length} de {entries.length} elementos</span><span>{selectedEntries.length ? `${selectedEntries.length} seleccionados · ${formatTotal(selectedWeight)}` : "Elige archivos individuales"}</span></div>{visibleEntries.map((entry, index) => <article key={entry.id} className={selectedIds.includes(entry.id) ? "collection-entry collection-entry--selected" : "collection-entry"}><button className="entry-select" onClick={() => toggleEntry(entry.id)} disabled={Boolean(downloadProgress)} aria-label={selectedIds.includes(entry.id) ? `Quitar ${entry.name} de la selección` : `Seleccionar ${entry.name}`}>{selectedIds.includes(entry.id) ? <CheckSquare size={18} /> : <Square size={18} />}</button><span className="entry-index">{String(index + 1).padStart(2, "0")}</span><DriveThumbnail entry={entry} /><div><b>{entry.name}</b><small>{entry.kind === "folder" ? "Subcarpeta de Drive" : `${entryFormat(entry)} · ${normalizeSize(entry.size)}`}</small>{manualTags[entry.id]?.length ? <span className="entry-manual-tags">{manualTags[entry.id].map((tag) => <button key={tag} onClick={() => removeManualTag(entry.id, tag)} title={`Quitar etiqueta ${tag}`} aria-label={`Quitar etiqueta ${tag}`}>#{tag}<X size={10} /></button>)}</span> : null}</div><a className="entry-download" href={entry.kind === "folder" ? collectionUrl(entry.id) : directDownloadUrl(entry.id)} target={entry.kind === "folder" ? "_blank" : undefined} rel="noreferrer" aria-label={entry.kind === "folder" ? `Abrir subcarpeta ${entry.name}` : `Descargar ${entry.name}`}><Download size={16} /></a></article>)}{!visibleEntries.length && <p className="collection-empty">No hay elementos que coincidan con los filtros seleccionados.</p>}</section>}<section className="partial-selection-panel"><div className="partial-selection-heading"><span><ListChecks size={16} />SELECCIONES PARCIALES</span><small>{collectionSavedSelections.length} guardada{collectionSavedSelections.length === 1 ? "" : "s"} en este navegador</small></div><div className="manual-tag-create"><span><Tag size={15} />ETIQUETAS PARA LA SELECCIÓN</span><div><input value={manualTagInput} onChange={(event) => setManualTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") applyManualTag(); }} placeholder="Ej. revisar para ecommerce" /><button onClick={applyManualTag} disabled={!selectedIds.length || !manualTagInput.trim()}><Tag size={15} />Aplicar etiqueta</button></div></div><div className="partial-selection-create"><input value={selectionName} onChange={(event) => setSelectionName(event.target.value)} placeholder="Ej. opciones para tienda deportiva" /><button onClick={saveSelection} disabled={!selectedIds.length || Boolean(downloadProgress)}><BookmarkPlus size={16} />Guardar selección</button></div>{collectionSavedSelections.length > 0 && <div className="partial-selection-list">{collectionSavedSelections.map((selection) => <article key={selection.id}><div><b>{selection.name}</b><small>{selection.itemIds.length} elementos · {selection.createdAt}</small></div><button onClick={() => loadSelection(selection)}>Cargar</button><button className="partial-selection-delete" onClick={() => setSavedSelections((current) => current.filter((candidate) => candidate.id !== selection.id))} aria-label={`Eliminar ${selection.name}`}><Trash2 size={15} /></button></article>)}</div>}</section><footer className="collection-explorer-footer"><div>{downloadProgress ? <span>Preparando {downloadProgress.current} de {downloadProgress.total} descargas…</span> : <span>{selectedEntries.length ? `${selectedEntries.length} elementos listos para descargar` : "Selecciona archivos para crear tu lote"}</span>}<small>El navegador puede pedir confirmación al descargar varios archivos.</small></div><button onClick={downloadSelected} disabled={!selectedEntries.length || Boolean(downloadProgress)}><Download size={16} />{downloadProgress ? "Preparando…" : "Descargar selección"}</button></footer></aside></div>;
}
