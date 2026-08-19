# Validación de herramientas de decisión

- **Filtro por objetivo — Vender online:** validado el 17 de agosto de 2026. La interfaz activó el estado de objetivo, mostró el control para quitarlo y redujo el catálogo a **4 registros** de comercio electrónico.
- **Favorito persistente:** se guardó la colección OpenCart; el contador de Guardados pasó a **1** y el control cambió a “Quitar de guardados”. La implementación conserva los identificadores en el almacenamiento local del navegador.
- **Persistencia tras recarga:** al volver a abrir el catálogo, el contador de Guardados mantuvo el valor **1**.
- **Comparador:** al seleccionar dos recursos, se activó el panel de decisión con el estado “2 de 3 recursos listos para comparar” y su acción principal quedó habilitada.
- **Vista comparativa:** se abrió desde la barra de comparación con dos registros. La vista expone título claro, nombre original, tipo, situación ideal, problema resuelto, tres casos de uso y etiquetas para contrastar las alternativas.
- **Filtros plegables:** la barra cambia entre “Ocultar filtros” y “Mostrar filtros”; al plegarse libera el espacio de lectura y conserva el control para reactivar los filtros.
- **Colecciones:** se creó una colección de prueba desde los favoritos, con el nombre “Selección para ecommerce”; quedó registrada en el panel de colecciones del navegador.
- **Exportación de comparativa:** se seleccionaron dos recursos, se abrió el panel comparativo y se activó la acción “Exportar CSV” para descargar sus títulos, usos, problemas, casos y etiquetas.
- **Menú bajo demanda:** en escritorio el catálogo inicia a ancho completo sin panel lateral. Al pulsar “Menú”, se abre una navegación superpuesta con cierre explícito y una capa de fondo para devolver el foco al catálogo.
- **Compatibilidad técnica:** el panel de filtros expone WordPress, WooCommerce, Drupal, Joomla, Ghost, Shopify, OpenCart, Final Cut Pro, CapCut, Photoshop, herramientas de diseño y editor de audio/vídeo con conteos basados en la compatibilidad declarada.
- **Filtro WordPress:** al activarlo, la barra de contexto indica “Compatible con WordPress”, muestra un filtro activo y reduce la lista a tres fichas que declaran WordPress como plataforma de uso.
- **Ficha técnica WordPress:** el panel de detalle muestra “Usar en: WordPress · WordPress Theme Editor” y los campos de entorno, código/edición y requisitos previos de instalación.
- **Cuadrícula de marketplace:** en escritorio amplio, el catálogo renderiza tres tarjetas compactas por fila de aproximadamente 364 px. La miniatura se integra como una franja de 92 px y el detalle extenso permanece en la ficha desplegable, evitando filas horizontales sobredimensionadas.
- **Acción de tarjeta:** al seleccionar el título de una ficha compacta, se abre correctamente el panel de detalle del recurso sin alterar la cuadrícula de fondo.
- **Puntos de corte:** la cuadrícula mantiene tres columnas en escritorio amplio, se adapta a dos columnas a 1024 px y pasa a una columna a 650 px; las tarjetas siguen usando el formato compacto y no generan desbordamiento horizontal.
- **Control de filtros:** la flecha de plegado vuelve a renderizarse con un tamaño fijo de 16 px, por lo que el panel mantiene su altura normal sin invadir la pantalla.
- **Descarga directa y metadatos:** las tarjetas de archivos individuales muestran “Descargar ZIP” con una ruta directa de Drive. Las colecciones muestran “Descargar colección” usando la misma ruta directa, y las fechas de modificación ya no aparecen en tarjetas ni fichas.
- **Corrección responsive:** el control de filtros mide 50 px de alto, su flecha permanece en 16 × 16 px y el documento no presenta desbordamiento horizontal en escritorio ni en una vista móvil de 650 px. En móvil, la acción de descarga ocupa el ancho disponible de la tarjeta.
- **Carrito de descargas:** al añadir una ficha, el contador superior, el resumen fijo y el almacenamiento local reflejan la selección. El carrito mantiene los recursos al aplicar filtros y permite quitarlos individualmente.
- **Filtro de tamaño:** “Hasta 50 MB” activa un criterio, reduce el catálogo a 24 recursos y conserva el contenido del carrito. También están disponibles los rangos de 50–250 MB, más de 250 MB y colecciones.
- **Lote y progreso:** una prueba sin transferencia real con dos recursos mostró el estado “Preparando descargas 1 de 2” y finalizó con el aviso “Se prepararon 2 descargas desde el carrito.”
- **Carrito en móvil:** en una vista de 375 px, el carrito conservó sus dos recursos, abrió un panel de 360 px de ancho y no produjo desplazamiento horizontal.
- **Jerarquía editorial:** tras reforzar los folios, la espina oliva y los registros planos, el catálogo conserva el contador del carrito, el filtro activo de tamaño y el panel de selección con sus controles de descarga.
- **Responsive final:** a 375 px, los registros miden 318 px, el panel de carrito 360 px y el documento no tiene desplazamiento horizontal; el carrito conserva sus dos recursos seleccionados.
- **Fichas recuperadas:** la primera ficha visible vuelve a contener título, descripción, nombre original, compatibilidad, caso ideal, etiquetas y acciones. Mide 596 px, de los que la muestra visual secundaria ocupa sólo 48 px y el contenido útil 505 px.
- **Lectura de cuadrícula:** la vista de escritorio confirma tarjetas separadas por borde, sombra corta y acento de categoría. Los títulos grandes, la compatibilidad y el caso ideal quedan visibles antes de la franja de muestra secundaria.
- **Fichas en móvil:** a 375 px, una ficha mide 672 px, su muestra secundaria sólo 42 px, conserva el bloque de compatibilidad y el título se lee a 28 px sin desbordamiento horizontal.
- **Diferenciación visual:** la cuadrícula mantiene 18 px entre tarjetas, los bordes cambian por categoría y los títulos visibles superan los 27 px en escritorio.
- **Fuente privada:** la interfaz muestra `cofredelemprendedor@gmail.com` como único origen, conserva el enlace directo a la carpeta fuente y no contiene referencias visibles a nombres ni jerarquías internas de carpetas.
- **Acceso de fuente:** los cuatro accesos de la interfaz apuntan a `1-Ji4Gevs5bv7CjkQ34uKm1pi6DYlf0KL`; la cuenta se muestra correctamente y no se detectaron nombres internos de carpetas en el contenido visible.
- **Fuente en móvil:** a 375 px, `cofredelemprendedor@gmail.com` se muestra completo, sin desplazamiento lateral; el enlace de la tarjeta de fuente conserva la URL de la carpeta exacta.
- **Plantillas Web 1–25:** se incorporó la colección de `materialesrecursos52@gmail.com` al catálogo común. La ficha muestra su origen correcto y el explorador carga los 46 archivos reales con descargas individuales y controles internos.
- **Nueva fuente responsive:** la tarjeta de Plantillas Web 1–25 se identificó correctamente por `materialesrecursos52@gmail.com` dentro del catálogo unificado. En escritorio, su explorador abrió 46 archivos reales; a 375 px la ficha de la nueva fuente no generó desplazamiento horizontal.

## Exportación de código

La versión con etiquetas manuales, ordenación y vista previa se exportó al repositorio `juanxaviercasa/catalogo-recursos` en la rama `main`, mediante el commit `f360ace` (`feat: enrich collection explorer controls`).
