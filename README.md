# HikeMan Pro

Catálogo web de equipo de senderismo: viboreras, bastones, lámparas, mochilas y guías.

## Stack

- [Astro 5](https://astro.build) — sitio estático, ruta dinámica por categoría
- [Vue 3](https://vuejs.org) — isla interactiva `ProductGrid` (ordenamiento por precio)
- [Tailwind CSS 4](https://tailwindcss.com) — tokens del sistema de diseño en `src/styles/global.css`
- [Vitest](https://vitest.dev) — tests de `src/lib` y de integridad del catálogo

## Comandos

| Comando         | Acción                                  |
| --------------- | --------------------------------------- |
| `npm install`   | Instala dependencias                    |
| `npm run dev`   | Servidor de desarrollo en `:4321`       |
| `npm test`      | Corre los tests con Vitest              |
| `npm run build` | Build de producción en `./dist/`        |

## Contenido

El catálogo vive en `src/data/products.ts`. Para agregar un producto, añade una
entrada a `PRODUCTS` con una categoría existente; los tests de
`tests/products.test.ts` validan la integridad (ids únicos, precios > 0,
unidad `C/U` o `PAR`).

Las imágenes de producto van en `public/products/` (fondo blanco, producto
aislado, formato cuadrado). Mientras no haya fotografía real se usa
`placeholder.svg`.
