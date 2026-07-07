// Genera favicon, apple-touch-icon, iconos PWA y og-image a partir de public/logo.svg
// Uso: node scripts/generate-logos.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PUB = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const fullSvg = readFileSync(join(PUB, "logo.svg"), "utf8");

// Isotipo (montaña + corredor) sin el texto: se extraen las rutas por su
// color de relleno, que es único para cada elemento del icono
const ICON_FILLS = [
  "rgb(14,16,15)", // montaña
  "rgb(251,195,5)", // torso y brazos
  "rgb(251,194,5)", // pierna
  "rgb(251,196,4)", // cabeza
];
const iconPaths = ICON_FILLS.map((fill) => {
  const m = fullSvg.match(
    new RegExp(`<path d="[^"]+" style="fill:${fill.replaceAll("(", "\\(").replaceAll(")", "\\)")};"/>`)
  );
  if (!m) throw new Error(`No se encontró la ruta con fill ${fill}`);
  return m[0];
});
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="150 -80.5 703 703">
  <g transform="matrix(0.884546,0,0,0.884546,0,13.092066)">
    <g transform="matrix(0.031264,0,0,0.031205,0,0)">
      ${iconPaths.join("\n      ")}
    </g>
  </g>
</svg>`;
writeFileSync(join(PUB, "favicon.svg"), iconSvg);

// Variante para fondos oscuros: montaña en blanco
writeFileSync(
  join(PUB, "logo-icon-white.svg"),
  iconSvg.replace("fill:rgb(14,16,15)", "fill:rgb(255,255,255)")
);

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

function renderPng(svg, width, height, background) {
  return sharp(Buffer.from(svg), { density: 300 })
    .resize(width, height, { fit: "contain", background })
    .png()
    .toBuffer();
}

// Empaqueta varios PNG en un archivo .ico
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // tipo icono
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const outputs = [
  // [archivo, svg, ancho, alto, fondo]
  ["logo.png", fullSvg, 512, 512, TRANSPARENT],
  ["icon-192.png", iconSvg, 192, 192, TRANSPARENT],
  ["icon-512.png", iconSvg, 512, 512, TRANSPARENT],
  ["apple-touch-icon.png", iconSvg, 180, 180, WHITE],
  ["og-image.png", fullSvg, 1200, 630, WHITE],
];

for (const [name, svg, w, h, bg] of outputs) {
  const buf = await renderPng(svg, w, h, bg);
  writeFileSync(join(PUB, name), buf);
  console.log("OK", name, `${w}x${h}`);
}

const icoSizes = [16, 32, 48];
const icoPngs = [];
for (const size of icoSizes) {
  icoPngs.push({ size, data: await renderPng(iconSvg, size, size, TRANSPARENT) });
}
writeFileSync(join(PUB, "favicon.ico"), buildIco(icoPngs));
console.log("OK favicon.ico", icoSizes.join("/"));
