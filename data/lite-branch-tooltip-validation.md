# Validación Lite de ramas y compatibilidad

- Build de producción: correcto con `pnpm build`.
- Control global: `tooltipsEnabled` inicia en `true`, el control muestra «Ayudas activas» y se persiste en `indice-drive:compatibility-tooltips`.
- Árbol editorial: se montaron 65 ramas y 65 controles `.editorial-branch-favorite`.
- Favoritos por rama: el estado parte de `indice-drive:favorite-branches` y cada rama tiene acción independiente.
- Las ayudas técnicas usan `title` sólo cuando el modo Lite está activado; al desactivar se elimina el atributo explicativo.

La interacción confirmó que la primera rama muestra «Quitar … de ramas favoritas» después de marcarla y que el control global cambia a «Modo Lite» con ayuda activable. El árbol conserva 65 ramas y cada una ofrece su acción de favorito independiente.
