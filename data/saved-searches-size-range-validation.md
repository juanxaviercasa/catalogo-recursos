# Validación — consultas guardadas y rango de tamaño

| Prueba | Resultado |
|---|---|
| Consulta guardada | Se creó una consulta temporal por título, todas las palabras y fuente `materialesrecursos52`. |
| Recuperación | Al cargarla, restauró el término «Biblioteca web», devolvió 1 tarjeta y conservó la fuente correcta. |
| Rango exacto | El intervalo de 40 a 80 MB devolvió 9 registros; cada peso resultante quedó dentro del intervalo. |
| Eliminación persistente | La consulta temporal ya no figuró en el almacenamiento local tras eliminarla. |
| Compilación de producción | `pnpm build` finalizó correctamente después de integrar ambas funciones. |
| Interfaz actualizada | La página muestra el rango exacto de tamaño junto a los filtros existentes y conserva el acceso a la búsqueda avanzada. |
| Vista móvil | Se capturó el catálogo a 375 × 812 px con las reglas responsivas de una columna para los nuevos controles. |

Las consultas se conservan únicamente en el navegador de la persona usuaria mediante almacenamiento local. Al cargar una consulta, se recuperan sus criterios de búsqueda, filtros, rango de tamaño y ordenación.
