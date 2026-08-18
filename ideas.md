# Ideas de diseño — Drive Inventory Organizer

## Enfoques considerados

### Enfoque 1 — Archivo editorial
Una interfaz de inventario inspirada en catálogos impresos y bibliotecas modernas: marfil, tinta, verde oliva y una composición asimétrica con navegación lateral. Busca transmitir orden, calma y confianza documental.

**Probability:** 0.06

### Enfoque 2 — Consola de operaciones
Un panel de control oscuro y preciso, con densidad informativa, resaltados ámbar y métricas rápidas. Busca transmitir control técnico y velocidad de consulta.

**Probability:** 0.04

### Enfoque 3 — Estudio de papel
Una experiencia más táctil, con fondo cálido, tarjetas que recuerdan fichas de archivo y acentos terracota. Busca convertir la organización de documentos en una tarea amable y personal.

**Probability:** 0.08

## Dirección elegida: Archivo editorial

### Design Movement
Modernismo editorial suizo reinterpretado para una herramienta de archivo digital, con contraste entre serif humanista y sans funcional.

### Core Principles
1. La jerarquía debe sentirse impresa: títulos con carácter, metadatos discretos y ritmo vertical constante.
2. La navegación se organiza por capas: espacio de trabajo, carpetas, contenido y acciones.
3. El color se usa como señal documental, no como decoración: verde oliva para lo activo, arena para el contexto y rojo suave para alertas.
4. Cada interacción debe reducir la incertidumbre del usuario: filtros claros, estados visibles y rutas de carpeta siempre legibles.

### Color Philosophy
El fondo marfil reduce la fatiga visual de leer listados largos; la tinta azul-negra aporta contraste editorial; el verde oliva funciona como color propio del sistema y sugiere clasificación, permanencia y confianza. Los acentos arcilla introducen calidez sin competir con el contenido.

### Layout Paradigm
Una composición de dos columnas con sidebar persistente y una zona principal más abierta. El encabezado de la zona principal funciona como portada del inventario; debajo, la lista se presenta como un registro editorial con filas limpias, divisores sutiles y agrupación por carpeta.

### Signature Elements
- Monograma geométrico de tres hojas/pestañas para representar carpetas anidadas.
- Etiquetas de tipo de archivo en forma de pequeños sellos tipográficos.
- Línea vertical oliva que conecta la ruta de navegación con el contenido activo.

### Interaction Philosophy
Las interacciones deben ser discretas y útiles. El hover revela la acción sin desplazar el contenido; los filtros cambian de estado con transiciones breves; la expansión de carpetas conserva el contexto y nunca oculta la ruta actual.

### Animation
Usar entradas escalonadas de 40–60 ms en filas visibles, transiciones de 180 ms para hover y expansión, y una elevación mínima en tarjetas activas. Respetar `prefers-reduced-motion` y evitar animar layout; mover únicamente opacidad y transform.

### Typography System
- Display: `Fraunces`, serif variable, para el nombre del producto, cifras y títulos de sección.
- UI: `DM Sans`, sans humanista, para navegación, filtros, nombres de archivo y metadatos.
- Jerarquía: encabezado principal 48/52, títulos de grupo 22/28, filas 15/22, metadatos 11/16 con tracking amplio.

### Brand Essence
Un índice visual para encontrar tus documentos sin perder el contexto de dónde viven. **Ordenado, atento, editorial.**

### Brand Voice
Los titulares son directos y serenos; las CTAs describen exactamente lo que harán; el microcopy evita tecnicismos innecesarios.

Ejemplo 1: “Todo tu Drive, con una ruta clara.”

Ejemplo 2: “Explorar carpeta”

### Wordmark & Logo
Un símbolo sin texto compuesto por tres pestañas superpuestas, donde la pestaña central forma una “D” abstracta. El wordmark usa Fraunces semibold con una ligadura personalizada entre “r” y “i”.

### Signature Brand Color
**Oliva de archivo — `#61765B`**, un verde grisáceo que comunica clasificación, continuidad y calma.

## Style Decisions
- Mantener una interfaz clara con fondo marfil y contraste azul-negro.
- Evitar gradientes morados, esquinas excesivamente redondeadas y composición centrada genérica.
- Usar el símbolo de tres pestañas como icono de marca y favicon.
- La lista de archivos es el protagonista; la decoración nunca debe competir con ella.
- La página debe leerse primero como un índice de Drive con rutas, carpetas y metadatos; la curaduría visual queda en segundo plano.
- La voz nombra archivos, rutas, carpetas, recursos y acciones concretas; se evitan metáforas de inspiración sin contexto documental.
- La línea vertical oliva conecta la ruta activa, la carpeta seleccionada y el contenido visible como gesto de marca obligatorio.
- El primer viewport presenta el estado del inventario, la ruta y el mapa de carpetas antes de cualquier tratamiento decorativo o de galería.
- Cada tarjeta es un registro trazable: carpeta de origen, tipo, tamaño o estado de colección y etiquetas deben dominar sobre la miniatura abstracta.
- En las vistas de inventario, el nombre, la ruta, el sello de tipo y los metadatos preceden a cualquier muestra visual; las miniaturas son evidencia secundaria.
- La línea oliva actúa como espina de navegación persistente y conecta el contexto de ruta, las carpetas seleccionadas y el registro visible.
- Las vistas de inventario se organizan por carpetas como portadas de sección: cada grupo empieza con una ruta visible, una línea oliva y su total de registros antes de presentar las fichas.
- La portada se comporta como una hoja de control documental: mapa de carpetas, estado, ruta y conteos preceden a cualquier imagen o declaración aspiracional.
- El oliva `#61765B` conecta visualmente la portada, la navegación, las carpetas y cada registro; es el gesto estructural más reconocible del sistema.
- Las fichas se presentan como registros lineales trazables: título claro, nombre original, ruta, sello de tipo y metadatos preceden a toda muestra visual.
- La espina oliva se muestra de forma continua y visible: enlaza portada, ruta, total de carpeta y registro activo como la columna vertebral del índice.
- Los registros usan folios, sellos y divisores de imprenta antes que tratamiento de tarjeta; cada entrada debe leerse como una referencia de archivo.
- Las portadas de índice usan marcos, barras de estado y folios de alto contraste para diferenciar una hoja de control documental de una interfaz administrativa común.
- La jerarquía editorial aumenta en cada apertura de carpeta: Fraunces se reserva para portada, totales y título de grupo; DM Sans organiza rutas, sellos y metadatos trazables.
- La navegación principal se mantiene oculta hasta que la persona la invoca desde el botón Menú; el contenido gana un lienzo completo para exploración y decisión.
- El contraste cromático ahora combina verde bosque, coral de señalización y amarillo archivo; los pesos y tamaños aumentan para una lectura escénica, directa y memorable.
- Verde bosque es la estructura permanente: bordea portada, rutas, registros y espina de archivo. Coral se reserva para alertas o énfasis puntual; amarillo archivo sólo señala estado, folios y decisiones activas.
- Cada carpeta abre ahora como un capítulo de catálogo: folio, ruta y total preceden a registros planos, con una espina oliva continua que conserva la orientación al recorrer el archivo.
- Los registros son folios impresos, no mosaicos de productividad: título, nombre original, ruta, sello de tipo y metadatos se leen antes que cualquier muestra visual.
- La espina oliva `#61765B` une ruta activa, apertura de carpeta y grupo de registros; no se utiliza como un adorno genérico.
- Amarillo señala un folio, un estado activo o una decisión; coral se reserva para alertas y excepciones, mientras las acciones de uso normal mantienen la tinta o el oliva.
- Cada apertura de carpeta crea una pausa editorial visible: encabezado de capítulo, ruta, total y registros planos con divisores de imprenta.
