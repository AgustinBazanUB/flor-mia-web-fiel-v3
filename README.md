# Flor Mía — Ecommerce de productos regionales mendocinos

Nueva versión de la web de Flor Mía, reconstruida con React y Vite a partir del diseño aprobado v3. La home conserva el orden, la composición editorial, la paleta oscura/marfil/dorada y el comportamiento responsive de la referencia.

- Sitio nuevo: https://flor-mia-web-fiel-v3.netlify.app
- Repositorio: https://github.com/AgustinBazanUB/flor-mia-web-fiel-v3
- Rama de trabajo: `codex/flor-mia-fiel-v3`

El sitio anterior no forma parte de este despliegue y no debe usarse como destino de `git push` ni de `netlify deploy`.

## Tecnologías y arquitectura

- React 18 y Vite 6.
- Router liviano existente en `src/router.jsx`.
- Datos comerciales centralizados en `src/data/`.
- Carrito persistente mediante `localStorage`.
- Checkout preparado para una integración futura, sin simular pagos.
- Lucide React como único sistema de iconos.
- Cormorant Garamond para títulos y Manrope para interfaz.
- CSS base en `src/styles.css` y reconstrucción visual v3 en `src/styles-v3.css`.
- Configuración SPA para Netlify en `netlify.toml`.

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

Pruebas de datos, assets y búsqueda:

```bash
npm test
```

Vista previa del build:

```bash
npm run preview
```

## Imágenes reales y manifiesto

Los recursos optimizados están en `public/images/flor-mia/`. Todos derivan de la carpeta `Productos` entregada para este proyecto; no se utilizan fotografías externas, stock ni imágenes generadas por IA.

El mapeo semántico está en `src/data/assetsManifest.js`. Cada entrada conserva:

- ruta pública;
- ancho y alto reales;
- texto alternativo;
- ruta relativa del archivo original;
- variantes responsive cuando corresponde.

Uso actual:

- Hero e Historia: foto real del frente del local.
- Categorías: aceites, almendras, aceitunas, mermelada y sal reales.
- Regalos: collage CSS de productos reales; no representa un pack comercial.
- Destacados: aceite 5 L, aceite 2 L, almendras, pistachos, aceitunas griegas y mermelada de pera.
- Guía de aceites: Arbequina, Blend y Coratina verificadas por su fotografía; Arbosana, Picual y Arauco quedan señaladas como imágenes específicas pendientes.
- Armá tu mesa: composición CSS con aceite, aceitunas, almendras, vino, mermelada y sal reales.
- Open Graph: recorte real del frente del local en `public/images/flor-mia/og-flor-mia.webp`.

### Regenerar imágenes optimizadas

El script no modifica los originales:

```bash
py -3 scripts/optimize_flor_mia_assets.py --source "C:\ruta\a\Productos"
```

### Reemplazar una fotografía

1. Guardar el nuevo original dentro de la carpeta fuente de Productos.
2. Actualizar su ruta en `scripts/optimize_flor_mia_assets.py`.
3. Regenerar los WebP.
4. Corregir ruta, dimensiones, `alt` y `source` en `src/data/assetsManifest.js`.
5. Ejecutar `npm test` y revisar la home en 1440, 1024, 768 y 390 px.

El caché de imágenes de Netlify dura una semana y permite reemplazos con nombres semánticos sin dejar archivos obsoletos durante un año.

## Contenido y catálogo

- `src/data/brand.js`: marca, navegación, contacto y ayudas.
- `src/data/categories.js`: seis categorías y composición de Regalos.
- `src/data/products.js`: catálogo real visible y atributos por categoría.
- `src/data/oliveProfiles.js`: seis perfiles editables de aceite.
- `src/data/promotions.js`: las dos promociones aprobadas.
- `src/data/assetsManifest.js`: relación entre originales y archivos públicos.
- `src/data/content.js`: contenido editorial legado y placeholders no visibles en la home v3.

### Agregar una categoría

1. Crear una entrada con `id` y `slug` únicos en `src/data/categories.js`.
2. Definir nombre, descripción, facetas e imagen local.
3. Agregarla a la navegación en `src/data/brand.js` si corresponde.
4. Asignar productos mediante `categoryId`.

### Agregar un producto

Crear una entrada en `src/data/products.js` con:

- `id` y `slug` únicos;
- `categoryId` existente;
- nombre, descripción y subcategoría;
- imagen local mapeada en el manifiesto;
- `formats` y atributos realmente verificados;
- `tags`, usos y ocasiones;
- `editorialFeatured` si debe aparecer entre los seis destacados.

No se deben agregar campos de aceite a productos de otras categorías.

### Precios y stock

Los valores desconocidos permanecen como:

```js
price: null
stock: "unknown"
dataStatus: "pending"
```

Para habilitar una venta real deben cargarse precio, stock, formatos y variantes confirmados, y conectar un backend de catálogo e inventario.

### Perfiles de aceite

Editar `src/data/oliveProfiles.js`. No publicar frutado, amargor, picor, intensidad o usos hasta que Flor Mía los valide. Al recibir una foto específica, agregarla al optimizador y actualizar `imageStatus` y `productId`.

### Promociones

Editar únicamente `src/data/promotions.js`. La home actual muestra las dos promociones autorizadas:

- ¡Promociones! — Envío sin cargo AMBA.
- 3 cuotas sin interés — Miércoles y sábados.

No agregar descuentos, packs ni beneficios sin confirmación comercial.

## Contacto, horarios y redes

Editar `brand.contact` en `src/data/brand.js` para cargar dirección, teléfono, email, mapa y horarios. Instagram ya utiliza el enlace recibido en el proyecto.

Mientras falten datos, el footer muestra un mensaje pendiente y evita enlaces falsos.

## Buscador

Busca por producto, categoría, subcategoría, variedad, sabor, intensidad, uso, ocasión y tamaño. Normaliza acentos, tolera errores leves y traduce las ocasiones internas al español (`desayuno`, `diario`, `picada`, `regalo`).

Incluye estado sin resultados, navegación por teclado, foco contenido y cierre con Escape.

## Carrito y checkout

El carrito utiliza la clave `flor-mia-cart-v1`, persiste cantidades y separa líneas por producto, formato y variante. El drawer contiene el foco, restaura el disparador, admite cambios de cantidad y eliminación, y comunica altas mediante `aria-live`.

El checkout guarda un borrador en `flor-mia-checkout-draft-v1` y maneja fallos de almacenamiento. Sus cuatro pasos son una interfaz preparada: no procesa tarjetas, no cobra y no genera pedidos.

Para producción todavía hacen falta:

- backend o CMS del catálogo;
- inventario y precios;
- cálculo de envío y retiro;
- proveedor de pagos;
- creación y confirmación de pedidos;
- notificaciones reales;
- políticas comerciales verificadas.

## SEO

La web incluye title, description, canonical, Open Graph, favicon, `robots.txt`, `sitemap.xml` y datos estructurados `Organization`, `WebSite`, `SearchAction`, `CollectionPage`, `Product` y `BreadcrumbList`.

No se publican `LocalBusiness`, reseñas ni ofertas mientras falten datos reales.

## Publicar en Netlify

El proyecto nuevo ya está asociado al sitio `flor-mia-web-fiel-v3`.

```bash
npm run build
netlify deploy --prod --dir dist
```

Antes de desplegar, verificar:

```bash
netlify status
```

El ID correcto comienza con `bfa1b3fc`; si aparece otro proyecto, detener el despliegue y volver a vincular el sitio nuevo.

## Datos pendientes

- precios y stock;
- dirección, teléfono, email y horarios;
- condiciones completas de envío, retiro y cambios;
- perfiles sensoriales validados;
- fotografías específicas de Arbosana, Picual y Arauco;
- productores, historia ampliada, certificaciones y reseñas reales;
- integración de pagos, pedidos e inventario.

El detalle de implementación y validación está en `docs/IMPLEMENTACION-FLOR-MIA-V3.md`.
