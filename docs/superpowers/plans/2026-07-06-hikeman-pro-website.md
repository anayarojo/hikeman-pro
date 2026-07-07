# HikeMan Pro — Catálogo Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sitio catálogo estático de equipo de senderismo (viboreras, bastones, lámparas, mochilas, guías) con estética retail premium: logo centrado, franja promocional negra, cuadrícula 3x3 con divisores grises, precios en cajas amarillas y footer de beneficios + CTA telefónico.

**Architecture:** Astro 5 genera páginas estáticas (home + 5 páginas de categoría vía ruta dinámica). Los datos de producto viven en un módulo TypeScript tipado. La cuadrícula de productos es una isla Vue 3 con ordenamiento por precio; la lógica de orden y formato de precio se extrae a `src/lib/` para testearla con Vitest sin montar componentes. Tailwind CSS v4 define el sistema de diseño como tokens en `@theme`.

**Tech Stack:** Astro 5, Vue 3 (`@astrojs/vue`), Tailwind CSS 4 (`@tailwindcss/vite`), Vitest, @fontsource (Anton + Montserrat), Node 24.

**Convenciones del sistema de diseño (aplican a TODOS los tasks):**
- Colores solo vía tokens: `brand` #F4B400, `gold` #FFC107, `ink` #000000, `carbon` #111111, `steel` #2B2B2B, `line` #D9D9D9, blanco.
- Títulos: clase `font-display` (Anton), MAYÚSCULAS (`uppercase`).
- Subtítulos: Montserrat bold, `uppercase tracking-wide`.
- Precios: caja amarilla sólida rectangular, sin degradados ni bordes redondeados (`rounded-none` implícito: nunca usar `rounded-*` en precios/franjas).
- Divisores: `bg-line` de 1px (técnica `gap-px` sobre fondo gris).
- Fondo general blanco; franjas negras de ancho completo; iconos lineales blancos sobre negro.

**Nota de alcance:** El requerimiento dice "Basones"; se interpreta como **Bastones** (bastones de trekking). "Guías" se trata como categoría de producto (guías impresas/mapas de rutas). Sin carrito ni backend: catálogo con teléfono como canal de venta (según el diseño: "Llamado a la acción + teléfono").

---

## File Structure

```
hikeman-pro/
├── astro.config.mjs              # Astro + Vue + Tailwind vite plugin
├── package.json
├── tsconfig.json
├── vitest.config.ts              # Vitest apuntando a src/lib y src/data
├── public/
│   └── products/placeholder.svg  # Imagen placeholder de producto
├── src/
│   ├── styles/global.css         # @theme tokens + fuentes + base
│   ├── lib/
│   │   ├── format.ts             # formatPrice
│   │   └── sortProducts.ts       # lógica de ordenamiento (usada por la isla Vue)
│   ├── data/
│   │   └── products.ts           # tipos + catálogo de las 5 categorías
│   ├── components/
│   │   ├── Icon.astro            # SVGs lineales: shield, mountain, compass, backpack, phone
│   │   ├── SiteHeader.astro      # logo centrado + nav de categorías
│   │   ├── PromoBanner.astro     # franja negra de alto impacto
│   │   ├── ProductGrid.vue       # isla Vue: 3x3, divisores, PriceTag inline, sort
│   │   ├── SiteFooter.astro      # beneficios (iconos) + CTA/teléfono
│   ├── layouts/
│   │   └── BaseLayout.astro      # html shell, fuentes, header/footer
│   └── pages/
│       ├── index.astro           # home: promo + destacados 3x3
│       └── [categoria].astro     # página por categoría (5 rutas estáticas)
└── tests/
    ├── format.test.ts
    ├── sortProducts.test.ts
    └── products.test.ts          # integridad del catálogo
```

---

### Task 1: Scaffold del proyecto

**Files:**
- Create: proyecto Astro en la raíz, `astro.config.mjs`, `vitest.config.ts`, `.gitignore`

- [ ] **Step 1: Inicializar git y crear proyecto Astro minimal**

```powershell
git init
npm create astro@latest . -- --template minimal --install --no-git --yes
```

Si el directorio no está vacío (`.claude/`, `docs/`), el instalador pregunta; aceptar "continue in current directory". Verificar que existen `package.json` y `src/pages/index.astro`.

- [ ] **Step 2: Agregar integraciones y dependencias**

```powershell
npx astro add vue --yes
npm install tailwindcss @tailwindcss/vite @fontsource/anton @fontsource/montserrat
npm install -D vitest
```

- [ ] **Step 3: Configurar Astro con el plugin de Tailwind v4**

Reemplazar `astro.config.mjs` con:

```js
// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Crear `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
```

Agregar script en `package.json` dentro de `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: `Complete!` sin errores (la página minimal por defecto compila).

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "chore: scaffold Astro + Vue + Tailwind v4 + Vitest"
```

---

### Task 2: Tokens de diseño y layout base

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `public/products/placeholder.svg`
- Modify: `src/pages/index.astro` (temporal, se reescribe en Task 8)

- [ ] **Step 1: Crear `src/styles/global.css` con los tokens del sistema de diseño**

```css
@import "tailwindcss";
@import "@fontsource/anton";
@import "@fontsource/montserrat/500.css";
@import "@fontsource/montserrat/700.css";
@import "@fontsource/montserrat/800.css";

@theme {
  --color-brand: #f4b400;
  --color-gold: #ffc107;
  --color-ink: #000000;
  --color-carbon: #111111;
  --color-steel: #2b2b2b;
  --color-line: #d9d9d9;

  --font-display: "Anton", sans-serif;
  --font-sans: "Montserrat", sans-serif;
}

body {
  @apply bg-white font-sans font-medium text-ink antialiased;
}
```

- [ ] **Step 2: Crear `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Equipo de senderismo y aventura." } =
  Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | HikeMan Pro</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

(Header y footer se insertan aquí en Task 5, cuando existan.)

- [ ] **Step 3: Crear `public/products/placeholder.svg`** (imagen e-commerce: producto centrado, fondo blanco, sombra suave)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#ffffff"/>
  <ellipse cx="200" cy="330" rx="110" ry="14" fill="#000000" opacity="0.08"/>
  <g fill="none" stroke="#2b2b2b" stroke-width="6" stroke-linejoin="round">
    <path d="M120 320 L200 120 L280 320 Z"/>
    <path d="M170 250 L200 190 L230 250"/>
  </g>
</svg>
```

- [ ] **Step 4: Reescribir `src/pages/index.astro` temporalmente para usar el layout**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Inicio">
  <h1 class="font-display text-5xl uppercase">HikeMan Pro</h1>
</BaseLayout>
```

- [ ] **Step 5: Verificar build y estilos**

Run: `npm run build`
Expected: sin errores. Opcional: `npm run dev` y confirmar que el h1 renderiza con Anton en mayúsculas.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: design tokens, fonts, base layout y placeholder de producto"
```

---

### Task 3: Utilidad `formatPrice` (TDD)

**Files:**
- Create: `src/lib/format.ts`
- Test: `tests/format.test.ts`

- [ ] **Step 1: Escribir el test que falla**

```ts
import { describe, expect, it } from "vitest";
import { formatPrice } from "../src/lib/format";

describe("formatPrice", () => {
  it("formatea enteros sin decimales con signo de pesos", () => {
    expect(formatPrice(400)).toBe("$400");
  });

  it("agrega separador de miles", () => {
    expect(formatPrice(1250)).toBe("$1,250");
  });

  it("redondea a entero (precios retail sin centavos)", () => {
    expect(formatPrice(399.9)).toBe("$400");
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm test`
Expected: FAIL — `Cannot find module '../src/lib/format'`

- [ ] **Step 3: Implementación mínima en `src/lib/format.ts`**

```ts
export function formatPrice(price: number): string {
  return `$${Math.round(price).toLocaleString("en-US")}`;
}
```

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```powershell
git add src/lib/format.ts tests/format.test.ts
git commit -m "feat: formatPrice para etiquetas de precio retail"
```

---

### Task 4: Modelo y catálogo de productos (TDD sobre integridad)

**Files:**
- Create: `src/data/products.ts`
- Test: `tests/products.test.ts`

- [ ] **Step 1: Escribir el test de integridad que falla**

```ts
import { describe, expect, it } from "vitest";
import { CATEGORIES, PRODUCTS } from "../src/data/products";

describe("catálogo", () => {
  it("define las 5 categorías con slug y etiqueta", () => {
    expect(CATEGORIES.map((c) => c.slug)).toEqual([
      "viboreras",
      "bastones",
      "lamparas",
      "mochilas",
      "guias",
    ]);
    for (const c of CATEGORIES) {
      expect(c.label.length).toBeGreaterThan(0);
      expect(c.title.length).toBeGreaterThan(0);
    }
  });

  it("cada categoría tiene al menos 3 productos válidos", () => {
    for (const c of CATEGORIES) {
      const items = PRODUCTS.filter((p) => p.category === c.slug);
      expect(items.length).toBeGreaterThanOrEqual(3);
      for (const p of items) {
        expect(p.price).toBeGreaterThan(0);
        expect(["C/U", "PAR"]).toContain(p.unit);
        expect(p.name.length).toBeGreaterThan(0);
        expect(p.image.startsWith("/products/")).toBe(true);
      }
    }
  });

  it("los ids son únicos", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm test`
Expected: FAIL — `Cannot find module '../src/data/products'`

- [ ] **Step 3: Crear `src/data/products.ts`**

```ts
export type CategorySlug =
  | "viboreras"
  | "bastones"
  | "lamparas"
  | "mochilas"
  | "guias";

export interface Category {
  slug: CategorySlug;
  label: string; // nav
  title: string; // encabezado de página
  promo: string; // texto de la franja negra
}

export interface Product {
  id: string;
  category: CategorySlug;
  name: string;
  detail: string;
  price: number;
  unit: "C/U" | "PAR";
  image: string;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    slug: "viboreras",
    label: "Viboreras",
    title: "Viboreras de protección",
    promo: "PROTECCIÓN TOTAL EN TERRENO AGRESTE — VIBORERAS REFORZADAS",
  },
  {
    slug: "bastones",
    label: "Bastones",
    title: "Bastones de trekking",
    promo: "AVANZA MÁS LEJOS — BASTONES DE ALUMINIO Y CARBONO",
  },
  {
    slug: "lamparas",
    label: "Lámparas",
    title: "Lámparas y linternas",
    promo: "ILUMINA LA RUTA — LÁMPARAS RECARGABLES DE ALTO ALCANCE",
  },
  {
    slug: "mochilas",
    label: "Mochilas",
    title: "Mochilas de senderismo",
    promo: "CARGA CÓMODA Y RESISTENTE — MOCHILAS PARA CADA AVENTURA",
  },
  {
    slug: "guias",
    label: "Guías",
    title: "Guías y mapas de ruta",
    promo: "CONOCE TU RUTA — GUÍAS Y MAPAS DE SENDERISMO",
  },
];

const PLACEHOLDER = "/products/placeholder.svg";

export const PRODUCTS: Product[] = [
  // Viboreras
  { id: "vib-lona", category: "viboreras", name: "Viborera de lona reforzada", detail: "Lona de alta densidad, ajuste con hebillas", price: 400, unit: "PAR", image: PLACEHOLDER, featured: true },
  { id: "vib-piel", category: "viboreras", name: "Viborera de piel", detail: "Piel curtida, protección de tobillo a rodilla", price: 650, unit: "PAR", image: PLACEHOLDER },
  { id: "vib-tactica", category: "viboreras", name: "Viborera táctica", detail: "Nylon balístico con placa interna", price: 780, unit: "PAR", image: PLACEHOLDER },
  // Bastones
  { id: "bas-aluminio", category: "bastones", name: "Bastón de aluminio 7075", detail: "3 secciones, punta de tungsteno", price: 350, unit: "C/U", image: PLACEHOLDER, featured: true },
  { id: "bas-carbono", category: "bastones", name: "Bastón de fibra de carbono", detail: "Ultraligero 210 g, mango de corcho", price: 720, unit: "C/U", image: PLACEHOLDER },
  { id: "bas-par", category: "bastones", name: "Par de bastones plegables", detail: "Sistema de pliegue rápido, funda incluida", price: 980, unit: "PAR", image: PLACEHOLDER, featured: true },
  // Lámparas
  { id: "lam-frontal", category: "lamparas", name: "Lámpara frontal 800 lm", detail: "Recargable USB-C, 5 modos", price: 450, unit: "C/U", image: PLACEHOLDER, featured: true },
  { id: "lam-camping", category: "lamparas", name: "Lámpara de campamento", detail: "360°, gancho colgante, 72 h de batería", price: 380, unit: "C/U", image: PLACEHOLDER },
  { id: "lam-tactica", category: "lamparas", name: "Linterna táctica 1200 lm", detail: "Cuerpo de aluminio, zoom ajustable", price: 560, unit: "C/U", image: PLACEHOLDER },
  // Mochilas
  { id: "moc-25l", category: "mochilas", name: "Mochila de ataque 25 L", detail: "Hidratación compatible, cubre-lluvia", price: 690, unit: "C/U", image: PLACEHOLDER, featured: true },
  { id: "moc-45l", category: "mochilas", name: "Mochila de travesía 45 L", detail: "Estructura interna, ajuste lumbar", price: 1250, unit: "C/U", image: PLACEHOLDER, featured: true },
  { id: "moc-65l", category: "mochilas", name: "Mochila de expedición 65 L", detail: "Correas de compresión, acceso frontal", price: 1690, unit: "C/U", image: PLACEHOLDER },
  // Guías
  { id: "gui-nacional", category: "guias", name: "Guía de senderos nacionales", detail: "120 rutas con mapas topográficos", price: 280, unit: "C/U", image: PLACEHOLDER, featured: true },
  { id: "gui-supervivencia", category: "guias", name: "Manual de supervivencia", detail: "Técnicas de orientación y refugio", price: 320, unit: "C/U", image: PLACEHOLDER },
  { id: "gui-mapas", category: "guias", name: "Set de mapas regionales", detail: "5 mapas impermeables escala 1:50,000", price: 240, unit: "C/U", image: PLACEHOLDER },
];
```

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test`
Expected: PASS (tests de format + products)

- [ ] **Step 5: Commit**

```powershell
git add src/data/products.ts tests/products.test.ts
git commit -m "feat: modelo tipado y catálogo inicial de las 5 categorías"
```

---

### Task 5: Header, franja promocional, iconos y footer

**Files:**
- Create: `src/components/Icon.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/PromoBanner.astro`
- Create: `src/components/SiteFooter.astro`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Crear `src/components/Icon.astro`** (iconografía lineal monocromática)

```astro
---
interface Props {
  name: "shield" | "mountain" | "compass" | "backpack" | "phone";
  class?: string;
}

const { name, class: className = "h-8 w-8" } = Astro.props;

const paths: Record<Props["name"], string> = {
  shield:
    "M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6l7-3z M9.5 12l2 2 3.5-4",
  mountain:
    "M3 19h18 M5 19l5-9 3 5 2-3 4 7 M10 10l1.5 2.5L13 10",
  compass:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15 9l-2 5-4 1 2-5 4-1z",
  backpack:
    "M8 7V5a4 4 0 0 1 8 0v2 M6 7h12a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1z M8 13h8 M8 13v4",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
};
---

<svg
  class={className}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d={paths[name]}></path>
</svg>
```

- [ ] **Step 2: Crear `src/components/SiteHeader.astro`** (logo centrado, nav, divisor gris)

```astro
---
import { CATEGORIES } from "../data/products";
import Icon from "./Icon.astro";

const current = Astro.url.pathname.replace(/\/$/, "");
---

<header class="border-b border-line bg-white">
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6">
    <a href="/" class="flex items-center gap-3">
      <span class="bg-ink p-2 text-white">
        <Icon name="mountain" class="h-7 w-7" />
      </span>
      <span class="font-display text-4xl uppercase tracking-wide">
        HikeMan <span class="text-brand">Pro</span>
      </span>
    </a>
    <nav aria-label="Categorías">
      <ul class="flex flex-wrap justify-center gap-x-8 gap-y-2">
        {
          CATEGORIES.map((c) => (
            <li>
              <a
                href={`/${c.slug}`}
                class:list={[
                  "font-sans text-sm font-bold uppercase tracking-widest hover:text-brand",
                  current === `/${c.slug}` && "text-brand",
                ]}
              >
                {c.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
</header>
```

- [ ] **Step 3: Crear `src/components/PromoBanner.astro`** (franja negra de alto impacto)

```astro
---
interface Props {
  message: string;
}

const { message } = Astro.props;
---

<section class="w-full bg-ink">
  <p
    class="mx-auto max-w-6xl px-4 py-5 text-center font-display text-2xl uppercase tracking-wide text-white md:text-3xl"
  >
    {message.split("—")[0]}
    {
      message.includes("—") && (
        <span class="text-brand">— {message.split("—")[1]}</span>
      )
    }
  </p>
</section>
```

- [ ] **Step 4: Crear `src/components/SiteFooter.astro`** (dos secciones: beneficios y CTA + teléfono)

```astro
---
import Icon from "./Icon.astro";

const benefits = [
  { icon: "shield", label: "Garantía de por vida" },
  { icon: "mountain", label: "Probado en montaña" },
  { icon: "compass", label: "Asesoría experta" },
  { icon: "backpack", label: "Envío a todo el país" },
] as const;
---

<footer>
  <section class="w-full bg-carbon text-white">
    <ul
      class="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4"
    >
      {
        benefits.map((b) => (
          <li class="flex flex-col items-center gap-3 text-center">
            <Icon name={b.icon} class="h-10 w-10" />
            <span class="text-xs font-bold uppercase tracking-widest">
              {b.label}
            </span>
          </li>
        ))
      }
    </ul>
  </section>
  <section class="w-full bg-ink text-white">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center"
    >
      <p class="font-display text-3xl uppercase md:text-4xl">
        Equípate hoy y <span class="text-brand">conquista la montaña</span>
      </p>
      <a
        href="tel:+525512345678"
        class="flex items-center gap-3 bg-brand px-8 py-4 font-display text-2xl uppercase text-ink hover:bg-gold"
      >
        <Icon name="phone" class="h-6 w-6" />
        55 1234 5678
      </a>
      <p class="text-xs text-line">
        © 2026 HikeMan Pro. Equipamiento outdoor profesional.
      </p>
    </div>
  </section>
</footer>
```

- [ ] **Step 5: Integrar header y footer en `src/layouts/BaseLayout.astro`**

Reemplazar el `<body>` por:

```astro
<body>
  <SiteHeader />
  <main><slot /></main>
  <SiteFooter />
</body>
```

y agregar los imports en el frontmatter:

```astro
import SiteHeader from "../components/SiteHeader.astro";
import SiteFooter from "../components/SiteFooter.astro";
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: sin errores; `npm run dev` muestra header con logo centrado y footer negro con iconos blancos.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: header con logo centrado, franja promo, iconos y footer de dos secciones"
```

---

### Task 6: Lógica de ordenamiento (TDD) + isla Vue `ProductGrid`

**Files:**
- Create: `src/lib/sortProducts.ts`
- Create: `src/components/ProductGrid.vue`
- Test: `tests/sortProducts.test.ts`

- [ ] **Step 1: Escribir el test que falla**

```ts
import { describe, expect, it } from "vitest";
import { sortProducts, type SortOrder } from "../src/lib/sortProducts";
import type { Product } from "../src/data/products";

const make = (id: string, price: number, featured = false): Product => ({
  id,
  category: "mochilas",
  name: id,
  detail: "",
  price,
  unit: "C/U",
  image: "/products/placeholder.svg",
  featured,
});

const items = [make("caro", 900), make("barato", 100), make("top", 500, true)];

describe("sortProducts", () => {
  it("'featured' pone destacados primero y conserva el resto en orden original", () => {
    expect(sortProducts(items, "featured").map((p) => p.id)).toEqual([
      "top",
      "caro",
      "barato",
    ]);
  });

  it("'asc' ordena por precio ascendente", () => {
    expect(sortProducts(items, "asc").map((p) => p.id)).toEqual([
      "barato",
      "top",
      "caro",
    ]);
  });

  it("'desc' ordena por precio descendente", () => {
    expect(sortProducts(items, "desc").map((p) => p.id)).toEqual([
      "caro",
      "top",
      "barato",
    ]);
  });

  it("no muta el arreglo original", () => {
    const before = items.map((p) => p.id);
    sortProducts(items, "asc");
    expect(items.map((p) => p.id)).toEqual(before);
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm test`
Expected: FAIL — `Cannot find module '../src/lib/sortProducts'`

- [ ] **Step 3: Implementar `src/lib/sortProducts.ts`**

```ts
import type { Product } from "../data/products";

export type SortOrder = "featured" | "asc" | "desc";

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  const copy = [...products];
  if (order === "asc") return copy.sort((a, b) => a.price - b.price);
  if (order === "desc") return copy.sort((a, b) => b.price - a.price);
  return copy.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}
```

Nota: `Array.prototype.sort` es estable, por lo que "featured" conserva el orden original dentro de cada grupo.

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test`
Expected: PASS (todos los archivos de test)

- [ ] **Step 5: Crear `src/components/ProductGrid.vue`** (cuadrícula 3x3 con divisores `gap-px`, precio en caja amarilla)

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import type { Product } from "../data/products";
import { formatPrice } from "../lib/format";
import { sortProducts, type SortOrder } from "../lib/sortProducts";

const props = defineProps<{ products: Product[] }>();

const order = ref<SortOrder>("featured");
const sorted = computed(() => sortProducts(props.products, order.value));
</script>

<template>
  <div>
    <div class="flex items-center justify-end border-b border-line px-4 py-3">
      <label
        for="orden"
        class="mr-3 text-xs font-bold uppercase tracking-widest"
      >
        Ordenar
      </label>
      <select
        id="orden"
        v-model="order"
        class="border border-line bg-white px-3 py-1 text-sm font-bold uppercase"
      >
        <option value="featured">Destacados</option>
        <option value="asc">Precio: menor a mayor</option>
        <option value="desc">Precio: mayor a menor</option>
      </select>
    </div>

    <ul class="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="product in sorted"
        :key="product.id"
        class="flex flex-col items-center bg-white p-8 text-center"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="h-44 w-44 object-contain"
          loading="lazy"
          width="176"
          height="176"
        />
        <h3
          class="mt-6 font-sans text-sm font-extrabold uppercase tracking-wide"
        >
          {{ product.name }}
        </h3>
        <p class="mt-1 text-xs text-steel">{{ product.detail }}</p>
        <p class="mt-4 inline-flex items-end gap-1.5 bg-brand px-5 py-2">
          <span class="font-display text-3xl leading-none">
            {{ formatPrice(product.price) }}
          </span>
          <span class="text-[10px] font-extrabold leading-none pb-0.5">
            {{ product.unit }}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>
```

- [ ] **Step 6: Verificar build**

Run: `npm run build`
Expected: sin errores (el componente aún no se usa en páginas; Astro solo compila).

- [ ] **Step 7: Commit**

```powershell
git add src/lib/sortProducts.ts src/components/ProductGrid.vue tests/sortProducts.test.ts
git commit -m "feat: isla Vue ProductGrid con ordenamiento y etiquetas de precio amarillas"
```

---

### Task 7: Páginas de categoría (ruta dinámica)

**Files:**
- Create: `src/pages/[categoria].astro`

- [ ] **Step 1: Crear `src/pages/[categoria].astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PromoBanner from "../components/PromoBanner.astro";
import ProductGrid from "../components/ProductGrid.vue";
import { CATEGORIES, PRODUCTS } from "../data/products";

export function getStaticPaths() {
  return CATEGORIES.map((category) => ({
    params: { categoria: category.slug },
    props: { category },
  }));
}

const { category } = Astro.props;
const products = PRODUCTS.filter((p) => p.category === category.slug);
---

<BaseLayout title={category.title}>
  <PromoBanner message={category.promo} />
  <section class="mx-auto max-w-6xl px-4 py-10">
    <h1 class="mb-6 text-center font-display text-4xl uppercase">
      {category.title}
    </h1>
    <div class="border border-line">
      <ProductGrid client:load products={products} />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: sin errores; el log muestra las 5 rutas generadas (`/viboreras`, `/bastones`, `/lamparas`, `/mochilas`, `/guias`).

- [ ] **Step 3: Verificación visual**

Run: `npm run dev` y abrir `http://localhost:4321/mochilas`.
Expected: franja negra con promo, cuadrícula con divisores grises de 1px, precios en cajas amarillas con unidad pequeña, y el selector "Ordenar" reordena los productos (confirma que la isla Vue hidrata).

- [ ] **Step 4: Commit**

```powershell
git add src/pages/[categoria].astro
git commit -m "feat: paginas estaticas por categoria con grid de productos"
```

---

### Task 8: Homepage con destacados

**Files:**
- Modify: `src/pages/index.astro` (reescritura completa)

- [ ] **Step 1: Reescribir `src/pages/index.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PromoBanner from "../components/PromoBanner.astro";
import ProductGrid from "../components/ProductGrid.vue";
import { CATEGORIES, PRODUCTS } from "../data/products";

const featured = PRODUCTS.filter((p) => p.featured);
const fillers = PRODUCTS.filter((p) => !p.featured);
const showcase = [...featured, ...fillers].slice(0, 9);
---

<BaseLayout title="Equipo de senderismo y aventura">
  <PromoBanner
    message="TEMPORADA DE MONTAÑA — HASTA 9 PRODUCTOS ESENCIALES PARA TU PRÓXIMA RUTA"
  />
  <section class="mx-auto max-w-6xl px-4 py-10">
    <h1 class="mb-2 text-center font-display text-4xl uppercase md:text-5xl">
      Equipo <span class="text-brand">esencial</span> de aventura
    </h1>
    <p
      class="mb-8 text-center text-sm font-bold uppercase tracking-widest text-steel"
    >
      Selección destacada de nuestras {CATEGORIES.length} categorías
    </p>
    <div class="border border-line">
      <ProductGrid client:load products={showcase} />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build completo y tests**

Run: `npm test; if ($?) { npm run build }`
Expected: todos los tests PASS y build sin errores con 6 páginas.

- [ ] **Step 3: Verificación visual final**

Run: `npm run dev` y revisar `http://localhost:4321/`:
- Logo centrado sobre nav de 5 categorías.
- Franja promocional negra con palabras clave en amarillo.
- Cuadrícula 3x3 en desktop con divisores grises finos.
- Footer: beneficios con iconos blancos sobre negro carbón + CTA con botón telefónico amarillo.
- Sin bordes redondeados ni degradados en precios/franjas.

- [ ] **Step 4: Commit**

```powershell
git add src/pages/index.astro
git commit -m "feat: homepage con franja promocional y cuadricula 3x3 de destacados"
```

---

### Task 9: README y cierre

**Files:**
- Create: `README.md`

- [ ] **Step 1: Crear `README.md`**

```markdown
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
```

- [ ] **Step 2: Verificación final completa**

```powershell
npm test; if ($?) { npm run build }
```

Expected: PASS + build exitoso.

- [ ] **Step 3: Commit**

```powershell
git add README.md
git commit -m "docs: README con stack, comandos y guia de contenido"
```

---

## Fuera de alcance (YAGNI)

- Carrito de compras / pasarela de pago (el canal de venta es telefónico según el diseño).
- CMS o backend: el catálogo es un módulo TS versionado en git.
- Fotografía real de producto: se usa placeholder SVG hasta tener assets.
- Página de detalle por producto: la retícula 3x3 con precio es la unidad de venta del diseño.
