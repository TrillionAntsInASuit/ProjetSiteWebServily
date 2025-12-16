import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../frontend/src/components'),
      '@context': path.resolve(__dirname, '../frontend/src/context'),
      '@hooks': path.resolve(__dirname, '../frontend/src/hooks'),
      '@util': path.resolve(__dirname, '../frontend/util'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 75,
        branches: 75,
        functions: 75,
        statements: 75,
      },
    },
  },
});