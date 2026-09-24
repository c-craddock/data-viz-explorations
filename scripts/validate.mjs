// Re-checks the chart palettes in index.html.
// Usage: node scripts/validate.mjs
//
// Checks, per mode (light surface #ffffff, dark surface #202121 = grey/1000):
//   - Lightness band: OKLCH L within 0.43–0.77 (light) / 0.48–0.67 (dark)
//   - Chroma floor: OKLCH C >= 0.10 so a hue doesn't read as grey
//   - CVD separation: worst neighbouring pair under simulated protanopia and
//     deuteranopia (Machado et al. 2009, severity 1.0), OKLab ΔE×100, target >= 8
//   - Normal-vision separation: worst neighbouring pair, OKLab ΔE×100, floor 15
//   - Contrast: WCAG ratio against the chart surface, >= 3:1
// Scatter/map subsets are checked over all pairs instead of neighbours.

const PALETTES = {
  "Spectrum (8)": ["#406cc4", "#b15204", "#01a2a3", "#7f7004", "#c66c99", "#4b7d04", "#a47ebf", "#c63f46"],
  "Core (5)": ["#406cc4", "#a47ebf", "#7f7004", "#d46f74", "#4b7d04"],
  "Spectrum scatter trio": { all: true, colors: ["#406cc4", "#b15204", "#01a2a3"] },
  "Core scatter trio": { all: true, colors: ["#406cc4", "#a47ebf", "#a08d0e"] },
};
const MODES = { light: { surface: "#ffffff", band: [0.43, 0.77] }, dark: { surface: "#202121", band: [0.48, 0.67] } };

const MACHADO = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
};

const toLinear = (hex) => [1, 3, 5].map((i) => {
  const c = parseInt(hex.slice(i, i + 2), 16) / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
});
const luminance = (hex) => { const [r, g, b] = toLinear(hex); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

function oklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
const simulate = (rgb, M) => M.map((row) => Math.min(1, Math.max(0, row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])));
function deltaE(a, b, kind) {
  let x = toLinear(a), y = toLinear(b);
  if (kind) { x = simulate(x, MACHADO[kind]); y = simulate(y, MACHADO[kind]); }
  const [p, q] = [oklab(x), oklab(y)];
  return 100 * Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

let failed = false;
for (const [name, def] of Object.entries(PALETTES)) {
  const colors = Array.isArray(def) ? def : def.colors;
  const pairs = def.all
    ? colors.flatMap((_, i) => colors.slice(i + 1).map((_, k) => [i, i + 1 + k]))
    : colors.slice(1).map((_, i) => [i, i + 1]);
  console.log(`\n${name} — ${def.all ? "all pairs" : "neighbouring pairs"}`);
  for (const [mode, { surface, band }] of Object.entries(MODES)) {
    const lab = colors.map((c) => oklab(toLinear(c)));
    const offBand = colors.filter((_, i) => lab[i][0] < band[0] || lab[i][0] > band[1]);
    const lowChroma = colors.filter((_, i) => Math.hypot(lab[i][1], lab[i][2]) < 0.1);
    const cvd = Math.min(...pairs.flatMap(([i, j]) => ["protan", "deutan"].map((k) => deltaE(colors[i], colors[j], k))));
    const normal = Math.min(...pairs.map(([i, j]) => deltaE(colors[i], colors[j])));
    const minContrast = Math.min(...colors.map((c) => contrast(c, surface)));
    const ok = !offBand.length && !lowChroma.length && cvd >= 8 && normal >= 15 && minContrast >= 3;
    failed ||= !ok;
    console.log(`  ${mode.padEnd(5)} ${ok ? "PASS" : "FAIL"}  CVD ΔE ${cvd.toFixed(1)}  normal ΔE ${normal.toFixed(1)}  min contrast ${minContrast.toFixed(2)}:1`
      + (offBand.length ? `  off-band ${offBand}` : "") + (lowChroma.length ? `  low chroma ${lowChroma}` : ""));
  }
}
process.exit(failed ? 1 : 0);
