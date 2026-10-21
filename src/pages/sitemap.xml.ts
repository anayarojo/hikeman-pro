import type { APIRoute } from "astro";
import { CATEGORIES } from "../data/products";

export const GET: APIRoute = ({ site }) => {
  const paths = ["/", ...CATEGORIES.map((category) => `/${category.slug}`)];

  const urls = paths
    .map((path) => `  <url>\n    <loc>${new URL(path, site).href}</loc>\n  </url>`)
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
