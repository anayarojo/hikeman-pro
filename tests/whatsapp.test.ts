import { describe, expect, it, vi } from "vitest";

vi.stubEnv("PUBLIC_WHATSAPP_NUMBER", "526622782474");

const { buildWhatsAppUrl } = await import("../src/lib/whatsapp");

describe("buildWhatsAppUrl", () => {
  it("construye la URL de wa.me con el número configurado", () => {
    expect(buildWhatsAppUrl("Hola")).toBe(
      "https://wa.me/526622782474?text=Hola",
    );
  });

  it("codifica el mensaje para usarlo en una URL", () => {
    expect(buildWhatsAppUrl("Hola, me interesa: Mochila 80L")).toBe(
      "https://wa.me/526622782474?text=Hola%2C%20me%20interesa%3A%20Mochila%2080L",
    );
  });
});
