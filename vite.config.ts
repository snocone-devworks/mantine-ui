import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    process.env.NODE !== 'production' ? react({ jsxRuntime: 'classic' }) : react(),
    dts({ include: 'lib/**', exclude: ['src/**', 'tests/**', 'node_modules/**'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.tsx'),
      name: '@snoconedev/mantine-ui',
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
        'uuid',
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