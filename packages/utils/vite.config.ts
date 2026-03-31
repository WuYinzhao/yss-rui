import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.json',
      outDir: './dist/es',
      entryRoot: './src',
      exclude: ['node_modules'],
    }),
    dts({
      tsconfigPath: 'tsconfig.json',
      outDir: './dist/lib',
      entryRoot: './src',
      exclude: ['node_modules'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  json: {
    namedExports: true,
    stringify: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: resolve('src/index.ts'),
      name: 'yssSsfUtils',
      fileName: (format) => `[name].js`,
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: ['lodash', 'dayjs', 'html2canvas'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/es',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/lib',
        },
      ],
    },
  },
});
