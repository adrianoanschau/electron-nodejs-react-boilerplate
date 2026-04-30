import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main/index.ts', 'src/preload/index.ts'],
  format: ['cjs'],
  clean: true,
  dts: false,
  minify: false,
  external: ['electron'],
  outDir: 'dist',
});
