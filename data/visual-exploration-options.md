# Análisis de exploración visual para Índice Drive

## Hallazgos aplicables

La navegación facetada ya presente es la capa principal para localizar recursos: permite combinar refinamientos pequeños e independientes, mostrar los resultados en vivo y exponer la estructura del contenido sin desplazar el catálogo [1]. Para una colección de 273 recursos, un mapa visual debe complementar esa tarea —orientar y sugerir— en vez de reemplazar la búsqueda, los filtros, las fichas o las descargas.

La arquitectura visual debe partir de la intención. En este catálogo, la consulta concreta exige eficiencia; la exploración inicial puede buscar inspiración. Por ello conviene que el mapa sea un panel bajo demanda, visible sólo cuando la persona desea descubrir rutas, y no una navegación persistente que compita con los controles existentes [2].

Un mapa mental libre basado únicamente en títulos sería poco estable: las relaciones necesitan apoyarse en taxonomías que ya estén normalizadas, como objetivo de proyecto, categoría, compatibilidad, formato y tamaño. Antes de modificar las categorías principales para otras personas, un card sort moderado u online ayudaría a contrastar los nombres y agrupaciones con sus modelos mentales [3].

## Opciones de implementación

| Opción | Trabajo que resuelve | Interacción | Ventaja | Riesgo y control |
|---|---|---|---|---|
| **1. Mapa de decisión guiado** | «No sé qué recurso necesito» | Tres preguntas: objetivo, entorno técnico y formato; devuelve 3–6 rutas filtradas | Es el mejor primer paso: usa la taxonomía existente, es legible en móvil y explica cada recomendación | No debe fingir inteligencia. Cada ruta debe mostrar las reglas que activó y permitir editar los filtros. |
| **2. Mapa de relaciones contextual** | «Ya encontré un recurso: ¿qué más combina?» | Nodo central de ficha + conexiones a objetivo, software, formato y recursos afines | Visualiza relaciones reales sin mostrar 273 nodos a la vez | Usarlo sólo en una ficha o con un máximo de 12 nodos; las conexiones se derivan de etiquetas y compatibilidad verificadas. |
| **3. Organigrama de colección** | «¿Qué contiene esta carpeta?» | Árbol de colección → formatos → archivos seleccionables | Resume jerarquías de Drive conservando la privacidad de la estructura completa | Debe representar categorías editoriales, no revelar rutas internas ni asumir carpetas inexistentes. |
| **4. Mapa panorámico global** | «Quiero inspirarme visualmente» | Agrupación por objetivo/compatibilidad con zoom y filtros | Puede ser una vista de descubrimiento atractiva | Debe ser fase posterior: necesita pruebas de uso y datos de relación más ricos; no es apropiado como navegación inicial en móvil. |

## Recomendación de secuencia

Se recomienda implantar primero la **Opción 1: Mapa de decisión guiado** como botón “Guíame a un recurso” dentro de la sección de filtros. Después, añadir la **Opción 2** en las fichas técnicas, con relaciones explicables. Finalmente, evaluar la **Opción 3** en colecciones grandes. La Opción 4 sólo debe considerarse tras observar que los usuarios exploran por inspiración y no encuentran suficiente orientación con las tres capas anteriores.

## Criterios de calidad

El mapa debe conservar el resultado en filtros normales, mostrar el porqué de cada sugerencia, ser usable con teclado, no depender del color para distinguir relaciones, y ofrecer siempre una salida clara al catálogo. Las recomendaciones deben formularse como adecuación por metadata, no como reseñas ni garantía de resultados.

## Referencias

[1]: https://alistapart.com/article/design-patterns-faceted-navigation/ "A List Apart — Design Patterns: Faceted Navigation"
[2]: https://abbycovert.com/writing/information-architecture-for-navigation/ "Abby Covert — Information Architecture for Navigation"
[3]: https://www.nngroup.com/articles/card-sorting-definition/ "Nielsen Norman Group — Card Sorting: Uncover Users' Mental Models for Better Information Architecture"
