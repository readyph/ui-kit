import { defineConfig } from 'tsup';

/**
 * Library build for @readyph/design-tokens.
 *
 * `prebuild` runs the generator first (emits css/theme.css), then this builds
 * the TS token source to dist (ESM + d.ts). The hand-authored Tailwind preset
 * (`preset.cjs`) and the generated `css/theme.css` ship as-is via their own
 * exports — they are not processed here.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2021',
});
