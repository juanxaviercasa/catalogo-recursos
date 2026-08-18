# Validación de carrito y descarga

- El 17 de agosto de 2026, la selección de una ficha añadió su identificador al almacenamiento local bajo `indice-drive:download-cart`, actualizó el contador a “Carrito 1” y mostró el resumen del carrito.
- El filtro “Hasta 50 MB” redujo el catálogo a 24 fichas y mantuvo el elemento añadido al carrito.
- Los enlaces de descarga usan la ruta directa `https://drive.usercontent.google.com/download?id={fileId}&export=download&confirm=t`. La guía oficial de Google para descargas con Drive API describe la descarga de archivos por identificador: [Google Drive: Download and export files](https://developers.google.com/workspace/drive/api/guides/manage-downloads).
