import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
plugins: [
react({
include: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
}),
],
test: {
environment: 'jsdom',
setupFiles: './vitest.setup.ts',
globals: true,
css: true,
// --- Couverture : n'instrumente QUE components/** et lib/** ---
coverage: {
provider: 'v8',
reporter: ['text', 'html', 'lcov'],
reportsDirectory: './coverage',
all: true, // inclure aussi les fichiers non touchés par les tests
include: [
'components/**/*.{js,jsx,ts,tsx}',
'lib/**/*.{js,jsx,ts,tsx}'
],
// Exclure tests, mocks, types, etc.
exclude: [
'**/*.{test,spec}.{js,jsx,ts,tsx}',
'**/__tests__/**',
'**/__mocks__/**',
'**/*.d.ts',
'node_modules/**',
'dist/**',
'.next/**',
'coverage/**'
],
},
},
})
