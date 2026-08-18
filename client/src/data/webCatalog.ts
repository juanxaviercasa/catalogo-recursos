/**
 * Archivo editorial: colecciones verificadas dentro de Diseño Web.
 * Cada ficha apunta a la carpeta de Drive que reúne sus temas, plantillas o plugins.
 */
import type { CatalogItem } from "@/data/catalog";

type WebRow = [id: string, name: string, category: CatalogItem["category"], resourceType: string, tags: string[], purpose: string, projects: string[], color: string];

const webRows: WebRow[] = [
  ["1-5AIClbp53BqH0okEb9Zf6xtkWKvX594", "Digital Marketing Agency · WordPress", "Web & CMS", "Colección de temas WordPress", ["WordPress", "agencia", "landing page"], "Reúne 50 temas WordPress para agencias de marketing, portfolios, SaaS y sitios de servicios con estructura comercial.", ["Agencias digitales", "Portfolios", "Landing pages"], "geometry"],
  ["1-wxba62MvFg0Tteb5PAPzP1m7JEHC8Nu", "Drupal", "Web & CMS", "Colección de temas Drupal", ["Drupal", "CMS", "web"], "Centraliza recursos para construir y adaptar sitios gestionados con Drupal, especialmente proyectos estructurados y de contenido.", ["Portales de contenido", "Sitios institucionales", "Proyectos CMS"], "default"],
  ["1qyNLo2oxnDxm1_jYOHokEZYGhfwzoSzO", "Ghost", "Web & CMS", "Colección de temas Ghost", ["Ghost", "blog", "editorial"], "Organiza plantillas para publicaciones, newsletters y experiencias editoriales construidas sobre Ghost.", ["Blogs", "Newsletters", "Medios digitales"], "watercolor"],
  ["1hM_4PgjHFlncOh5w_xi7X5bsYmvPgEYv", "Joomla", "Web & CMS", "Colección de plantillas Joomla", ["Joomla", "CMS", "plantillas"], "Reúne temas y plantillas para sitios administrables en Joomla con una base adaptable a diferentes sectores.", ["Sitios corporativos", "Portales", "Comunidades"], "default"],
  ["1bGZuKA1h6LQzj0xiEAn4CSxuCkU6J5h2", "OpenCart", "Ecommerce & tiendas", "Colección de temas OpenCart", ["OpenCart", "e-commerce", "tienda"], "Agrupa recursos de tienda online para construir catálogos, páginas de producto y experiencias de compra sobre OpenCart.", ["Tiendas online", "Catálogos", "Ventas de producto"], "ember"],
  ["1P9QTrsE06bidkcEn5JlUXXvdv7y_Yz0V", "Plantillas Web 26–27", "Web & CMS", "Colección de plantillas web", ["plantillas", "web", "diseño"], "Ofrece un bloque de plantillas web reutilizables para iniciar proyectos y explorar direcciones de interfaz.", ["Sitios de marca", "Portfolios", "Prototipos"], "geometry"],
  ["1c1IIsF3EIHtByWHkYWkrn4_aETRYtmKN", "Plantillas Web 47–50", "Web & CMS", "Colección de plantillas web", ["plantillas", "web", "diseño"], "Ofrece un bloque de plantillas web reutilizables para iniciar proyectos y explorar direcciones de interfaz.", ["Sitios de marca", "Portfolios", "Prototipos"], "geometry"],
  ["1DY4JUv0AXLy23yn0tFJiNUGCoEvbuLRo", "Plantillas Web Variados", "Web & CMS", "Biblioteca de plantillas web", ["plantillas", "web", "variados"], "Reúne referencias de diseño web para elegir una base según la necesidad de un proyecto o cliente.", ["Sitios informativos", "Landing pages", "Portfolios"], "watercolor"],
  ["1RJbgAI6pU9OWxzAQQBFY4scRuEvTksWb", "Plantillas Word", "Mockups & Plantillas", "Colección de documentos", ["Word", "documentos", "plantillas"], "Aporta documentos editables para preparar propuestas, reportes y piezas de comunicación que acompañan proyectos digitales.", ["Propuestas", "Informes", "Material comercial"], "material"],
  ["12ISdhp3sl3fuVNoKQwRgSCND0ZoL6ekD", "Plugins · WordPress, WooCommerce y Elementor", "Web & CMS", "Colección de extensiones web", ["plugins", "WordPress", "WooCommerce"], "Agrupa 50 extensiones para añadir filtros, catálogos, formularios, feeds, automatización e integraciones de IA a sitios WordPress.", ["Tiendas WordPress", "Sitios con Elementor", "Automatización web"], "atmosphere"],
  ["1TGYj01CX6g6avXbdhSq_mJaRMBFZqJ8J", "Shopify 11–21", "Ecommerce & tiendas", "Colección de temas Shopify", ["Shopify", "e-commerce", "tienda"], "Reúne temas de Shopify para diseñar tiendas, catálogos y experiencias de compra enfocadas en conversión.", ["Tiendas online", "Lanzamientos de producto", "Retail"], "ember"],
  ["1ENnApGORxWVGLNRbmGEP-4KcBFjmjetR", "Shopify Premium", "Ecommerce & tiendas", "Colección premium de Shopify", ["Shopify", "premium", "e-commerce"], "Reúne 50 temas Shopify para sectores como moda, salud, hogar, cosmética y automoción, listos para personalizar.", ["Tiendas de nicho", "Catálogos extensos", "Marcas directas al consumidor"], "ember"],
  ["1Z8AfXsDsyhpBpGVFTlVlB-J_uAg9XesE", "Temas ecommerce WordPress 1–12", "Ecommerce & tiendas", "Colección de temas WordPress", ["WordPress", "WooCommerce", "e-commerce"], "Reúne temas WordPress orientados a tienda online para construir catálogos y recorridos de compra con WooCommerce.", ["Tiendas WooCommerce", "Catálogos de producto", "Negocios locales"], "geometry"],
  ["1IP0dnA_UcqZ5gBfw8MZCdnjq-TVMcdjP", "Tumblr", "Web & CMS", "Colección de temas Tumblr", ["Tumblr", "blog", "creativo"], "Ofrece temas para presencia editorial, portfolios visuales y publicaciones de ritmo corto sobre Tumblr.", ["Blogs creativos", "Portfolios visuales", "Publicaciones personales"], "retro"],
  ["1uI3Krk9wTWvDlBYFtbzs-H3oHE9IqvJL", "Unbounce", "Web & CMS", "Colección de landing pages", ["Unbounce", "landing page", "conversión"], "Reúne recursos para crear landing pages con foco en campañas, captación de leads y pruebas de mensajes.", ["Campañas", "Captación de leads", "Lanzamientos"], "flora"],
];

export const webCatalog: CatalogItem[] = webRows.map(([id, name, category, resourceType, tags, purpose, projects, color]) => ({
  id,
  name,
  category,
  resourceType,
  tags,
  purpose,
  projects,
  color,
  sourceFolder: "Diseño Web",
  isCollection: true,
  size: "Colección",
  modified: "2024",
}));
