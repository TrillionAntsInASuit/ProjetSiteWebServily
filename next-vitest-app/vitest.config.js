import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      include: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // correspond à ton tsconfig.json
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/*.{test,spec}.{js,jsx,ts,tsx}',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/*.d.ts',
        'node_modules/**',
        'dist/**',
        '.next/**',
        'coverage/**',
      ],
      thresholds: {
        lines: 75,
        branches: 75,
        functions: 75,
        statements: 75,
      },
    },
  },
})