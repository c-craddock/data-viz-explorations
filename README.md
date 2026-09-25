# Data viz explorations

Colour palette explorations for data viz built from Flora's secondary colors. Status: in progress.

- [`index.html`](index.html): data viz color palettes: Palettes A to K with swatches, sample charts (line, stacked area, stacked and grouped bar, scatter), light/dark and color-blindness previews, sequential and diverging palettes, and tokens.
- [`bi-palettes.html`](bi-palettes.html): BI tool palette comparisons: default palettes from Tableau, Power BI, Grafana, Metabase, Superset, D3 and IBM Carbon, scored with the same checks, with a toggle to compare each of Palettes A to K.
- [`first-response-bucket-chart.html`](first-response-bucket-chart.html): an earlier chart exploration.
- [`scripts/validate.mjs`](scripts/validate.mjs): re-checks every palette and scatter set. Run `node scripts/validate.mjs`.

## Categorical palettes

Every palette uses the same eight Flora secondary colors, all existing tokens, in a different order, and starts with azure/600. Teal and kale aren't used: every step from 500 to 700 is too greyish to work as a chart color. Royal never sits next to azure, because the two look almost the same to color-blind readers.

Assign colors in order and never cycle them. Series past the last color go into "Other" (grey/600, `#8b8e89`). The same hex values are used in light and dark.

| Palette | Order (600 unless noted) | Color-blind separation (target ≥ 8) | Typical-vision separation (floor 15) | Scatter plots and maps |
|---|---|---|---|---|
| A | azure · crimson · fuchsia/700 · lime · royal · mint · lemon/700 · pink | 10.3 | 16.3 | first three |
| B | azure · lime · pink · lemon/700 · fuchsia/700 · crimson · royal · mint | 12.3 | 16.3 | first three |
| C | azure · fuchsia/700 · crimson · royal · lime · pink · lemon/700 · mint | 9.6 | 16.3 | first three |
| D | azure · pink · lime · fuchsia/700 · crimson · royal · mint · lemon/700 | 9 | 16.3 | first three |
| E | azure · mint · royal · crimson · fuchsia/700 · lime · pink · lemon/700 | 12.3 | 15.6 | azure · mint · lemon/700 |
| F | azure · crimson · royal · mint · lemon/700 · fuchsia/700 · lime · pink | 10.3 | 16.3 | azure · mint · lemon/700 |
| G | azure · lime · fuchsia/700 · crimson · royal · mint · lemon/700 · pink | 10.3 | 16.3 | first three |
| H | azure · lime · royal · crimson · fuchsia/700 · mint · lemon/700 · pink | 10.2 | 16.3 | azure · mint · lemon/700 |
| I | azure · fuchsia/700 · lime · pink · lemon/700 · mint · royal · crimson | 9.6 | 16.3 | first three |
| J | azure · fuchsia/700 · mint · lemon/700 · pink · lime · royal · crimson | 9.6 | 16.3 | first three |
| K | azure · pink · lemon/700 · mint · fuchsia/700 · crimson · royal · lime | 9 | 16.3 | first three |

All palettes keep every color at 3:1 or more on white and on grey/1000 `#202121`. Separation is OKLab ΔE×100 between neighbouring colors, with protanopia and deuteranopia simulated using Machado et al. (2009). Scatter sets are checked across all pairs.

## Sequential, diverging and status

- **Sequential:** Flora secondary azure, 100 → 1000, skipping 600 (too close to 500). Reversed in dark mode so low values fade into the background.
- **Diverging:** crimson ↔ grey ↔ azure. Midpoint is grey/200 in light and grey/800 in dark.
- **Status (fixed):** good green/500 `#6dab2c`, warning yellow/400 `#ccb748`, serious orange/500 `#d68455`, critical red/700 `#c63f46`. Always shown with an icon and a label. Crimson reads as a soft red and lime and mint as greens, so color never carries status alone.

## Open questions

- Chart surfaces assume white (light) and grey/1000 (dark). Other surfaces need the contrast numbers re-checked.
- Token names (`--dataviz-cat-1` and so on) are proposals.
