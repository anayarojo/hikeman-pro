import { describe, expect, it } from "vitest";
import { CATEGORIES, PRODUCTS } from "../src/data/products";

describe("catálogo", () => {
  it("define las 4 categorías con slug y etiqueta", () => {
    expect(CATEGORIES.map((c) => c.slug)).toEqual([
      "bastones",
      "iluminacion",
      "mochilas",
      "viboreras",
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
