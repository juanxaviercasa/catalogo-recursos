# Validación — búsqueda avanzada y ordenación

| Revisión | Resultado |
|---|---|
| Catálogo base | 264 recursos y 2 fuentes de Drive visibles. |
| Control de búsqueda avanzada | Visible junto al campo de consulta, con contador de criterios activos. |
| Control de ordenación | Visible en la cabecera del registro con opciones por orden original, título, tamaño y tipo. |
| Consulta avanzada comprobada | La búsqueda por título, con todas las palabras y fuente `materialesrecursos52`, devolvió únicamente la colección «Biblioteca web para lanzar productos, servicios y sitios con código». |
| Ordenación comprobada | Con «Tamaño: mayor primero», el primer registro mostró un ZIP de 1.39 GB. |
| Compilación de producción | `pnpm build` finalizó correctamente. |
| Vista móvil | Se capturó la página a 375 × 812 px con los controles responsive de búsqueda y ordenación. |

La implementación mantiene los filtros existentes y añade criterios de campo, modo de coincidencia y fuente de Drive para acotar las consultas. El estado de ordenación no altera los filtros ni las selecciones existentes, y los controles pasan a una sola columna en pantalla móvil.
