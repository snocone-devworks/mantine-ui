import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
const path = require('path');

export default defineConfig({
  plugins: [
    process.env.NODE !== 'production' ? react({ jsxRuntime: 'classic' }) : react(),
    dts({ include: 'lib/**', exclude: ['src/**', 'tests/**', 'node_modules/**'] }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      name: '@snoconedev/mantine-ui',
      formats: ['es', 'umd'],
      fileName: 'mantine-ui',
    },
    outDir: './dist',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-router',
        '@mantine/core',
        '@mantine/dates',
        '@mantine/hooks',
        '@mantine/notifications',
        'dayjs',
        'react-icons',
        'framer-motion',
        'zustand'
      ],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  }
});