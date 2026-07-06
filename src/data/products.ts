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
