import type { Product } from "../data/products";

export type SortOrder = "featured" | "asc" | "desc";

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  const copy = [...products];
  if (order === "asc") return copy.sort((a, b) => a.price - b.price);
  if (order === "desc") return copy.sort((a, b) => b.price - a.price);
  return copy.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}
