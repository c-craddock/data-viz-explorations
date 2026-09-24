# Data viz explorations

Chart color palettes derived from the design system ramps in the Data viz color guidelines Figma file.

- [`index.html`](index.html): the palette reference page, with swatches, sample charts, light/dark and color-blindness previews, and tokens.
- [`bi-palettes.html`](bi-palettes.html): default palettes from Tableau, Power BI, Grafana, Metabase, Superset, D3 and IBM Carbon, scored with the same checks.
- [`first-response-bucket-chart.html`](first-response-bucket-chart.html): an earlier chart exploration.
- [`scripts/validate.mjs`](scripts/validate.mjs): re-checks every categorical palette. Run `node scripts/validate.mjs`.

## Why the UI steps can't be used as-is

The ramps are luminance-matched: every hue at a given step has the same contrast (all 700s are about 5.0:1 on white). Same-step colors therefore differ only in hue, and red, yellow and green collapse for readers with red-green color blindness. Steps 800–1200 are too dark to use as series colors, so chart colors come from steps 500–700 and mix steps to vary lightness.

## Categorical palettes

Assign colors in order and never cycle them. Series past the last color go into "Other" (grey/600, `#8b8e89`). The same hex values are used in light and dark.

**Spectrum (recommended, 8 colors).** Adds three new ramps (orange, teal, magenta) built on the system's per-step lightness and chroma. The first three colors are safe for scatter plots and maps.

| # | Token | Hex |
|---|---|---|
| 1 | blue/700 | `#406cc4` |
| 2 | orange/700 (new) | `#b15204` |
| 3 | teal/600 (new) | `#01a2a3` |
| 4 | yellow/700 | `#7f7004` |
| 5 | magenta/600 (new) | `#c66c99` |
| 6 | green/700 | `#4b7d04` |
| 7 | purple/600 | `#a47ebf` |
| 8 | red/700 | `#c63f46` |

**Core (existing tokens only, 5 colors).** Blue/700 `#406cc4` · purple/600 `#a47ebf` · yellow/700 `#7f7004` · red/600 `#d46f74` · green/700 `#4b7d04`. For scatter plots and maps use blue/700 · purple/600 · yellow/600 `#a08d0e`.

| Palette | Worst color-blind separation (target ≥ 8) | Normal-vision separation (floor 15) | Lowest contrast (min 3:1) |
|---|---|---|---|
| Spectrum | 15.7 | 19.1 | 3.13:1 |
| Core | 9.0 | 15.3 | 3.20:1 |

Separation is OKLab ΔE×100 between neighbouring colors, with protanopia and deuteranopia simulated using Machado et al. (2009). Contrast is measured against white (light) and grey/1000 `#202121` (dark).

## Sequential, diverging and status

- **Sequential:** blue 100 → 1000, skipping 600 (too close to 500). Reversed in dark mode so low values fade into the background.
- **Diverging:** orange ↔ grey ↔ blue. Midpoint is grey/200 in light and grey/800 in dark.
- **Status (fixed):** good green/500 `#6dab2c`, warning yellow/400 `#ccb748`, serious orange/500 `#d68455`, critical red/700 `#c63f46`. Always shown with an icon and a label. Critical matches Spectrum color 8, so charts that show status use at most seven series.

## New ramps

Full 100–1200 values for orange, teal and magenta are in [`scripts/inspired-ramps.json`](scripts/inspired-ramps.json). The existing system ramps are in [`scripts/ramps.mjs`](scripts/ramps.mjs).

## Open questions

- Chart surfaces assume white (light) and grey/1000 (dark). Other surfaces need the contrast numbers re-checked.
- Token names (`--dataviz-cat-1` and so on) are proposals.
