export type CategorySlug =
  | "bastones"
  | "iluminacion"
  | "mochilas"
  | "viboreras";

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
  detail?: string;
  price: number;
  unit: "C/U" | "PAR";
  image: string;
  promo?: string;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    slug: "bastones",
    label: "Bastones",
    title: "Bastones",
    promo: "BASTONES QUE TE DAN ESTABILIDAD Y CONFIANZA",
  },
  {
    slug: "iluminacion",
    label: "Iluminación y Equipo",
    title: "Iluminación y Equipo",
    promo: "EQUIPO RESISTENTE | PARA AVENTURAS EXTREMAS",
  },
  {
    slug: "mochilas",
    label: "Mochilas",
    title: "Mochilas",
    promo: "EQUIPO RESISTENTE | PARA AVENTURAS EXTREMAS",
  },
  {
    slug: "viboreras",
    label: "Protección",
    title: "Protección (Polainas viboreras)",
    promo: "PROTECCIÓN EXTREMA | PARA CUALQUIER TERRENO",
  },
];

const PLACEHOLDER = "/products/placeholder.svg";

export const PRODUCTS: Product[] = [
  // Bastones
  { id: "bas-t-negro", category: "bastones", name: "Bastones Tipo T Negros", price: 300, unit: "PAR", image: "/products/bastones-tipo-t-negros.webp", featured: true },
  { id: "bas-t-rojo", category: "bastones", name: "Bastones Tipo T Rojos", price: 300, unit: "PAR", image: "/products/bastones-tipo-t-rojos.webp" },
  { id: "bas-t-azul", category: "bastones", name: "Bastones Tipo T Azules", price: 300, unit: "PAR", image: "/products/bastones-tipo-t-azules.webp" },
  { id: "bas-negro", category: "bastones", name: "Bastones Negros", price: 300, unit: "PAR", image: "/products/bastones-negros.webp", featured: true },
  { id: "bas-rojo", category: "bastones", name: "Bastones Rojos", price: 300, unit: "PAR", image: "/products/bastones-rojos.webp" },
  { id: "bas-azul", category: "bastones", name: "Bastones Azules", price: 300, unit: "PAR", image: "/products/bastones-azules.webp" },
  // Iluminación y Equipo
  { id: "lam-minera", category: "iluminacion", name: "Lámpara Minera 6000 mAh", price: 400, unit: "C/U", image: "/products/lampara-600-mah.webp", featured: true },
  { id: "lam-multicolor", category: "iluminacion", name: "Lámpara Multicolor 4800 mAh", price: 400, unit: "C/U", image: "/products/lampara-multi-color.webp", featured: true },
  { id: "lam-uv", category: "iluminacion", name: "Lámpara de Mano Ultravioleta", price: 150, unit: "C/U", image: "/products/lampara-ultravioleta.webp", promo: "2 X $200", featured: true },
  { id: "laser-verde", category: "iluminacion", name: "Láser Potente Recargable Verde", price: 150, unit: "C/U", image: "/products/laser-verde.webp" },
  // Mochilas
  { id: "moc-acampar-80l", category: "mochilas", name: "Mochila Para Acampar 80L Negra", price: 400, unit: "C/U", image: "/products/mochila-acampar-80l.webp", featured: true },
  { id: "moc-tactica-negra", category: "mochilas", name: "Mochila Táctica 40L Negra", price: 400, unit: "C/U", image: "/products/mochila-tactica-20l-negra.webp" },
  { id: "moc-tactica-cafe", category: "mochilas", name: "Mochila Táctica 40L Café", price: 400, unit: "C/U", image: "/products/mochila-tactica-20l-cafe.webp" },
  { id: "moc-tactica-verde", category: "mochilas", name: "Mochila Táctica 40L Verde", price: 400, unit: "C/U", image: "/products/mochila-tactica-20l-verde.webp" },
  { id: "moc-tactica-militar", category: "mochilas", name: "Mochila Táctica 40L Militar", price: 400, unit: "C/U", image: "/products/mochila-tactica-20l-militar-1.webp", featured: true },
  // Protección (Viboreras)
  { id: "vib-negras", category: "viboreras", name: "Polainas Viboreras Negras", price: 300, unit: "C/U", image: "/products/viboreras-negras.webp", featured: true },
  { id: "vib-verdes", category: "viboreras", name: "Polainas Viboreras Verdes", price: 300, unit: "C/U", image: "/products/viboreras-verdes.webp" },
  { id: "vib-militares", category: "viboreras", name: "Polainas Viboreras Patrones Militares", price: 300, unit: "C/U", image: "/products/viboreras-con-patrones.webp" },
  { id: "vib-camuflaje", category: "viboreras", name: "Polainas Viboreras Reforzadas Con Camuflaje", price: 350, unit: "C/U", image: "/products/viboreras-reforzadas-con-camuflaje.webp", featured: true },
];
