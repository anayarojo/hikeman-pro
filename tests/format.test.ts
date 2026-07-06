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
