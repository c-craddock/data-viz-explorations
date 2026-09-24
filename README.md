# Data viz explorations

Colour palette explorations for data viz using no red or green, built from the Flora design system ramps. Status: in progress.

- [`index.html`](index.html): data viz colour palettes with no red or green: palette options with swatches, sample charts, light/dark and color-blindness previews, and tokens.
- [`bi-palettes.html`](bi-palettes.html): default palettes from Tableau, Power BI, Grafana, Metabase, Superset, D3 and IBM Carbon, scored with the same checks, with a toggle to compare each of our palette options.
- [`first-response-bucket-chart.html`](first-response-bucket-chart.html): an earlier chart exploration.
- [`scripts/validate.mjs`](scripts/validate.mjs): re-checks every palette option and its scatter set. Run `node scripts/validate.mjs`.

## Categorical palette options

None of the options use red or green, so a series never reads as good/bad or looks like a status color. Once red and green are gone, Flora has three hues left (blue, yellow and purple), and its hues alone top out at six colors, so every option adds new ramps built on Flora's per-step lightness and chroma.

Assign colors in order and never cycle them. Series past the last color go into "Other" (grey/600, `#8b8e89`). The same hex values are used in light and dark.

**Flora + orange + magenta** is the palette chosen for Spectrum.

| # | Flora + orange + magenta | Flora + orange + teal + magenta | Flora + orange | Flora + magenta + orange |
|---|---|---|---|---|
| 1 | blue/700 `#406cc4` | blue/700 `#406cc4` | blue/700 `#406cc4` | blue/700 `#406cc4` |
| 2 | yellow/600 `#a08d0e` | teal/600 `#01a2a3` | yellow/600 `#a08d0e` | magenta/700 `#b1427e` |
| 3 | purple/600 `#a47ebf` | orange/700 `#b15204` | purple/700 `#8d59b1` | yellow/600 `#a08d0e` |
| 4 | orange/700 `#b15204` | purple/600 `#a47ebf` | orange/600 `#ca7541` | purple/600 `#a47ebf` |
| 5 | magenta/600 `#c66c99` | yellow/600 `#a08d0e` | blue/600 `#698cd3` | orange/600 `#ca7541` |
| 6 | yellow/700 `#7f7004` | blue/600 `#698cd3` | yellow/700 `#7f7004` | blue/600 `#698cd3` |
| 7 | blue/600 `#698cd3` | yellow/700 `#7f7004` | purple/600 `#a47ebf` | orange/700 `#b15204` |
| 8 | orange/600 `#ca7541` | magenta/600 `#c66c99` | orange/700 `#b15204` | purple/700 `#8d59b1` |

Orange, teal and magenta are new ramps. Everything else is an existing Flora token.

| Option | Color-blind separation (target ≥ 8) | Typical-vision separation (floor 15) | Lowest contrast (min 3:1) | Scatter plots and maps |
|---|---|---|---|---|
| Flora + orange + magenta | 15.6 | 16.7 | 3.13:1 | blue/700 · orange/700 · magenta/600 |
| Flora + orange + teal + magenta | 15.7 | 17.6 | 3.13:1 | first three colors |
| Flora + orange | 20.8 | 21.7 | 3.13:1 | blue/700 · orange/600 · purple/600 |
| Flora + magenta + orange | 11.7 | 17.6 | 3.04:1 | first three colors |

Separation is OKLab ΔE×100 between neighbouring colors, with protanopia and deuteranopia simulated using Machado et al. (2009). Scatter sets are checked across all pairs. Contrast is measured against white (light) and grey/1000 `#202121` (dark).

## Sequential, diverging and status

- **Sequential:** blue 100 → 1000, skipping 600 (too close to 500). Reversed in dark mode so low values fade into the background.
- **Diverging:** orange ↔ grey ↔ blue. Midpoint is grey/200 in light and grey/800 in dark.
- **Status (fixed):** good green/500 `#6dab2c`, warning yellow/400 `#ccb748`, serious orange/500 `#d68455`, critical red/700 `#c63f46`. Always shown with an icon and a label. Warning and serious share hue families with the palettes' yellow and orange, so color never carries status alone.

## New ramps

Full 100–1200 values for the new orange, teal and magenta ramps are in [`scripts/inspired-ramps.json`](scripts/inspired-ramps.json). The existing Flora ramps are in [`scripts/ramps.mjs`](scripts/ramps.mjs).

## Open questions

- Chart surfaces assume white (light) and grey/1000 (dark). Other surfaces need the contrast numbers re-checked.
- Token names (`--dataviz-cat-1` and so on) are proposals.
