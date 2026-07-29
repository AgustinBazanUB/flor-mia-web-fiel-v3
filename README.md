# Flor Mía — Ecommerce de productos regionales mendocinos

Sitio ecommerce editorial creado con React y Vite para Flor Mía. La experiencia presenta al aceite de oliva como producto estrella sin ocultar frutos secos, aceitunas, mermeladas, sales condimentadas y regalos.

Esta versión es una base funcional y honesta: no inventa precios, stock, sabores, reseñas, políticas, productores ni datos de contacto. Todo dato comercial faltante está marcado como pendiente.

## Producción

- Sitio: https://flor-mia-productos-mendocinos.netlify.app
- Repositorio: https://github.com/AgustinBazanUB/flor-mia-productos-mendocinos

## Qué incluye

- Home editorial completa y responsive.
- Navegación directa por seis categorías.
- Buscador global con tolerancia a errores, agrupación por categoría y navegación por teclado.
- Catálogo filtrable por categoría, ocasión y texto.
- Fichas de producto preparadas para atributos específicos.
- Sección y explorador de seis varietales de aceite.
- Comparador sensorial de hasta tres varietales, listo para datos validados.
- Descubrimiento por ocasión sin crear packs inexistentes.
- Carrito multcategoría persistente en `localStorage`.
- Líneas separadas por producto, presentación y variante.
- Cantidades, eliminación y recomendaciones cruzadas no invasivas.
- Checkout de cuatro pasos con borrador persistente, validación y resumen.
- Estados vacíos honestos para reseñas, contacto, políticas y pagos.
- SEO base, Open Graph, WebSite, Organization y FAQPage.
- Redirección SPA y caché de imágenes para Netlify.
- Placeholders WebP locales con la proporción y fotografía requerida.

## Ejecutar el proyecto

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

Pruebas de datos y búsqueda:

```bash
npm test
```

Vista previa del build:

```bash
npm run preview
```

## Estructura editable

- `src/data/brand.js`: marca, navegación, Instagram, contacto e información de compra.
- `src/data/categories.js`: categorías, jerarquía, textos, facetas e imágenes.
- `src/data/products.js`: productos, atributos, formatos, etiquetas, ocasiones y relaciones.
- `src/data/oliveProfiles.js`: varietales y futuros perfiles sensoriales.
- `src/data/content.js`: preguntas frecuentes, galería y contenido editorial.
- `src/context/CartContext.jsx`: persistencia y reglas del carrito.
- `src/pages/`: home, catálogo, producto, historia y checkout.
- `public/images/placeholders/`: imágenes temporales semánticas.
- `scripts/generate_placeholders.py`: regeneración reproducible de placeholders.

## Agregar una categoría

1. Crear una entrada en `src/data/categories.js` con un `id` estable y único.
2. Definir `slug`, nombre, estado comercial, facetas e imagen.
3. Agregar el acceso correspondiente en `src/data/brand.js` si debe aparecer en el header.
4. Asignar productos a ese `categoryId`.

Los grids, filtros y resultados de búsqueda consumen estos datos; no es necesario rediseñar la home.

## Agregar o actualizar un producto

Editar `src/data/products.js`. Cada producto debe incluir:

- `id` y `slug` únicos;
- `categoryId`;
- nombre, subcategoría y descripción;
- ruta local de imagen;
- `price`, `stock`, `active` y `dataStatus`;
- `formats`;
- `attributes` específicos de la categoría;
- `tags`, `uses` y `occasions`;
- `editorialFeatured` cuando corresponda.

Ejemplos de atributos:

- aceite: `variety`, `intensity`, y más adelante frutado, amargor y picor;
- aceituna: `variety`, `color`, `stone`;
- fruto seco: `type`, `preparation`, `salt`, `shell`;
- mermelada: `flavor`, `sweetness`;
- sal: `flavor`, `intensity`.

No agregues propiedades de aceite a categorías que no las necesitan.

## Precios, stock, tamaños y variantes

Actualmente todos los precios son `null`, el stock es `unknown` y las presentaciones están pendientes. Para habilitar una venta real:

1. reemplazar `price: null` por el precio real;
2. reemplazar `stock: "unknown"` por el estado conectado al inventario;
3. cargar los formatos reales en `formats`;
4. ampliar `attributes` con variantes verificadas;
5. conectar el proveedor de pago y el backend antes de habilitar confirmaciones.

El carrito genera una línea por combinación de producto, formato y variante.

## Mermeladas, sales y regalos

- Sabores reales de mermelada: agregar productos en `src/data/products.js` con `categoryId: "jams"` y `attributes.flavor`.
- Sales: hoy solo están identificadas Malbec y ajo. Agregar otras únicamente cuando estén confirmadas.
- Regalos: crear SKUs solo para packs realmente disponibles. Las selecciones por ocasión de la home no son bundles comerciales.

## Perfiles de aceite

Editar `src/data/oliveProfiles.js`. Los seis varietales ya están creados, pero figuran con `verified: false`.

Cuando Flor Mía valide frutado, amargor, picor, intensidad y uso:

1. agregar esos valores a cada perfil;
2. mostrarlos en `src/components/SensoryComparison.jsx`;
3. conservar valores textuales además de cualquier barra visual;
4. cambiar el estado a verificado.

## Reemplazar imágenes

Mantener el mismo nombre y proporción permite reemplazar una fotografía sin tocar componentes.

- Hero: 16:9.
- Categorías, productos, varietales, editoriales y local: 4:5.
- Destacado de aceites, mesa y pack: 16:10.
- CTA final: 21:9.
- Open Graph: 1200 × 630.

Prioridad recomendada:

1. local, frente y estanterías;
2. productos y packaging reales;
3. aceites y varietales;
4. composiciones con varias categorías;
5. usos gastronómicos;
6. clientes solo con autorización.

No usar hotlinking ni presentar imágenes de stock como si fueran de Flor Mía.

Los placeholders pueden regenerarse con:

```bash
python scripts/generate_placeholders.py
```

La tarjeta social conceptual está en `public/og.png` y `public/images/placeholders/og-flor-mia-productos-mendoza.webp`.

## Contacto y políticas

Editar `src/data/brand.js` para cargar:

- `whatsapp`;
- `whatsappUrl`;
- `email`;
- `address`;
- `openingHours`.

También deben reemplazarse los textos pendientes de envíos, retiro, pagos y cambios en `purchaseInformation`, y las respuestas en `src/data/content.js`.

Mientras esos datos sean `null`, el sitio evita enlaces falsos y muestra el estado pendiente.

## Carrito y versionado

La clave actual es `flor-mia-cart-v1`, declarada en `src/context/CartContext.jsx`.

Si cambia de forma incompatible la estructura de una línea:

1. incrementar `STORAGE_VERSION`;
2. cambiar la clave a `flor-mia-cart-v2`;
3. agregar una migración si se deben conservar carritos anteriores.

Para limpiar el carrito durante desarrollo:

```js
localStorage.removeItem("flor-mia-cart-v1");
```

## Checkout, pagos y backend

El checkout guarda un borrador local en `flor-mia-checkout-draft-v1`. No procesa pagos ni genera pedidos.

Para producción faltan:

- API o CMS del catálogo;
- inventario y precios;
- cálculo de envíos y opción de retiro;
- proveedor de pagos;
- creación del pedido;
- confirmación real;
- email o WhatsApp de recuperación con consentimiento;
- analítica real, reutilizando `src/utils/analytics.js`.

No guardar secretos ni credenciales en el frontend.

## Publicar en Netlify

`netlify.toml` ya define:

- build: `npm run build`;
- carpeta publicada: `dist`;
- fallback SPA para rutas como `/productos`, `/producto/:slug`, `/nosotros` y `/checkout`.

Desde Netlify se puede importar el repositorio de GitHub o desplegar el build con Netlify CLI.

## Datos que siguen pendientes

- catálogo completo;
- precios, stock, tamaños y formatos;
- fotografías del local y productos;
- logo gráfico;
- sabores reales de mermelada;
- otras sales y regalos reales;
- perfiles técnicos de aceites;
- reseñas reales;
- historia completa y productores;
- dirección, horarios, email y WhatsApp;
- envíos, retiro, pagos y cambios;
- integración de pagos, pedidos, inventario, newsletter y recuperación.
