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
