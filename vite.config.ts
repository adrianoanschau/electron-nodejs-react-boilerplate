import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src/renderer',
  build: {
    outDir: '../../dist/renderer',
  },
  plugins: [react({})],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
