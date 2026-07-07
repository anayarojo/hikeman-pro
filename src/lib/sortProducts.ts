import type { Product } from "../data/products";

export type SortOrder = "featured" | "asc" | "desc";

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  const copy = [...products];
  const effectivePrice = (p: Product) => p.promoPrice ?? p.price;
  if (order === "asc") return copy.sort((a, b) => effectivePrice(a) - effectivePrice(b));
  if (order === "desc") return copy.sort((a, b) => effectivePrice(b) - effectivePrice(a));
  return copy.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}
