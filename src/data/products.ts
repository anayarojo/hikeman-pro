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
  { id: "bas-t-negro", category: "bastones", name: "Bastones Tipo T Negros", price: 300, unit: "PAR", image: PLACEHOLDER, featured: true },
  { id: "bas-t-rojo", category: "bastones", name: "Bastones Tipo T Rojos", price: 300, unit: "PAR", image: PLACEHOLDER },
  { id: "bas-t-azul", category: "bastones", name: "Bastones Tipo T Azules", price: 300, unit: "PAR", image: PLACEHOLDER },
  { id: "bas-negro", category: "bastones", name: "Bastones Negros", price: 300, unit: "PAR", image: PLACEHOLDER, featured: true },
  { id: "bas-rojo", category: "bastones", name: "Bastones Rojos", price: 300, unit: "PAR", image: PLACEHOLDER },
  { id: "bas-azul", category: "bastones", name: "Bastones Azules", price: 300, unit: "PAR", image: PLACEHOLDER },
  // Iluminación y Equipo
  { id: "lam-minera", category: "iluminacion", name: "Lámpara Minera 6000 mAh", price: 400, unit: "C/U", image: "/products/lampara-600-mah.png", featured: true },
  { id: "lam-multicolor", category: "iluminacion", name: "Lámpara Multicolor 4800 mAh", price: 400, unit: "C/U", image: "/products/lampara-multi-color.png", featured: true },
  { id: "lam-uv", category: "iluminacion", name: "Lámpara de Mano Ultravioleta", price: 150, unit: "C/U", image: "/products/lampara-ultravioleta.png", promo: "2 X $200", featured: true },
  { id: "laser-verde", category: "iluminacion", name: "Láser Potente Recargable Verde", price: 150, unit: "C/U", image: "/products/laser-verde.png" },
  // Mochilas
  { id: "moc-acampar-80l", category: "mochilas", name: "Mochila Para Acampar 80L Negra", price: 400, unit: "C/U", image: "/products/mochila-acampar-80l.png", featured: true },
  { id: "moc-tactica-negra", category: "mochilas", name: "Mochila Táctica 40L Negra", price: 400, unit: "C/U", image: PLACEHOLDER },
  { id: "moc-tactica-cafe", category: "mochilas", name: "Mochila Táctica 40L Café", price: 400, unit: "C/U", image: "/products/mochila-tactica-20l-cafe.png" },
  { id: "moc-tactica-verde", category: "mochilas", name: "Mochila Táctica 40L Verde", price: 400, unit: "C/U", image: "/products/mochila-tactica-20l-verde.png" },
  { id: "moc-tactica-militar", category: "mochilas", name: "Mochila Táctica 40L Militar", price: 400, unit: "C/U", image: PLACEHOLDER, featured: true },
  // Protección (Viboreras)
  { id: "vib-negras", category: "viboreras", name: "Polainas Viboreras Negras", price: 300, unit: "C/U", image: PLACEHOLDER, featured: true },
  { id: "vib-verdes", category: "viboreras", name: "Polainas Viboreras Verdes", price: 300, unit: "C/U", image: PLACEHOLDER },
  { id: "vib-militares", category: "viboreras", name: "Polainas Viboreras Patrones Militares", price: 300, unit: "C/U", image: PLACEHOLDER },
  { id: "vib-camuflaje", category: "viboreras", name: "Polainas Viboreras Reforzadas Con Camuflaje", price: 350, unit: "C/U", image: PLACEHOLDER, featured: true },
];
