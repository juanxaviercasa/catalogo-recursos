# Validación funcional — 26 de agosto de 2026

La interfaz carga **6 fuentes** y **1.124 registros**. El selector de paginación está presente con opciones de 12, 24, 48 y 96 registros; por defecto muestra 24 fichas y 47 páginas para el catálogo completo. Los filtros técnicos reflejan 68 recursos Magento y 5 recursos PrestaShop, incluyendo los recursos recién añadidos.

La densidad cambió correctamente a **12 registros por página**, reduciendo el total a 94 páginas. Se validó un salto directo a la página 5, navegación consecutiva con “Siguiente” y un salto visible a la **página 8**; el rango cambió a 85–96 de 1.124 y mantuvo 12 fichas.

Pendiente en esta validación: importación CSV, persistencia de estado probado/notas y desglose de las dos nuevas colecciones.

Se importó un CSV de prueba con **2 filas válidas y 1 rechazada**; el resumen y los dos estados se guardaron en el almacenamiento local. El estado **Probado** se activó en una ficha y quedó persistido. La prueba de escritura de nota se realizó visualmente, aunque la automatización de navegador no confirmó el cambio de almacenamiento local del textarea; requiere comprobación manual final.

El filtro Magento reúne 68 resultados. La segunda página muestra la portada Magento de `latamecommerce24@gmail.com` y seis de sus archivos. Su explorador remoto cargó **50 elementos reales**. La comparativa de Aero y Agood muestra entorno, requisito, `VERSIÓN / SDK` y la fuente `latamecommerce24@gmail.com`; Aero se expresa correctamente como Magento/Adobe Commerce por confirmar y Agood como Magento 2.x por confirmar.

El filtro PrestaShop reúne cinco resultados: una colección histórica, la colección de la sexta fuente y sus tres archivos. El explorador de `prestashop (3)` cargó los **3 ZIP reales** — Vasia, Wenro y Zonan — con sus tamaños verificados.
