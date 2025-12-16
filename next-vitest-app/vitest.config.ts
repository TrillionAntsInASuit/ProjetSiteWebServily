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
    '@': path.resolve(__dirname, '../frontend/src'),
    '@components': path.resolve(__dirname, '../frontend/src/components'),
    '@containers': path.resolve(__dirname, '../frontend/src/containers'),
    '@hooks': path.resolve(__dirname, '../frontend/src/hooks'),
    '@context': path.resolve(__dirname, '../frontend/src/context'),
    '@util': path.resolve(__dirname, '../frontend/src/util'),
    '@backendUtil': path.resolve(__dirname, '../backend/util'),
  },
},
  test: {
    environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
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