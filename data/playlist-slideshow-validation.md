# Validación — playlists y presentación automática

| Prueba | Resultado |
|---|---|
| Orden manual | La acción «Bajar» intercambió correctamente las dos pistas seleccionadas dentro de la lista. |
| Repetir una | El control de repetición pasó al estado `1`. |
| Final de pista | Al emitir el final de la pista con el modo `1`, la lista mantuvo el mismo registro activo. |

La siguiente comprobación abrirá la presentación automática de siete imágenes JPG y validará sus controles de pausa y avance.

| Presentación automática | La secuencia se abrió con 7 imágenes JPG y avanzó por sí misma tras 3.6 segundos. |
| Pausa y avance manual | El control pasó a «Reanudar» al pausar y el botón Siguiente cambió correctamente de imagen. |
| Controles visibles | El diálogo mostró avance anterior, pausa/reanudar, siguiente y cierre de presentación. |

| Playlist persistente | La playlist `Prueba persistente` se guardó con dos pistas, se recargó correctamente y se eliminó del almacenamiento local. |
| Ritmo configurable | La presentación cambió a un intervalo de 2.2 segundos, lo comunicó en pantalla y avanzó dentro de ese intervalo. |
| Transición | Cada cambio de imagen usa una entrada corta de opacidad y escala, respetando la preferencia de movimiento reducido. |
| Vista móvil | Se capturó el catálogo a 375 × 812 px con las reglas responsive para playlists y controles de presentación activas. |
