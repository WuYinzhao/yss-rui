import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as any,
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
    visualizer({
      open: false,
      filename: 'visualizer.html',
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
  server: {
    port: 8000,
  },
  build: {
    outDir: 'dist',
    // 生成sourcemap便于调试
    sourcemap: true,
    lib: {
      entry: resolve('src/index.ts'),
      name: 'componentLibrary',
      fileName: () => `[name].js`,
      formats: ['es', 'cjs', 'umd'],
    },
    cssCodeSplit: false,
    // 禁用文件压缩，让用户自行决定压缩策略
    minify: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'antd',
        'rc-picker/es/generate/dayjs',
        'antd/es/date-picker/generatePicker',
        'lodash',
        'echarts',
        '@ant-design/icons',
        'dayjs',
        /dayjs/,
        'moment',
        'xlsx',
        'echarts',
        'echarts-for-react',
        'echarts-liquidfill',
        'html2canvas',
        'styled-components',
        'virtuallist-antd',
      ],
      output: [
        {
          // es 产物配置
          format: 'es',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/es',
          assetFileNames: (assetInfo) => {
            if (
              assetInfo.names &&
              assetInfo.names.some((name) => name.endsWith('.css'))
            ) {
              return path.join(path.dirname(assetInfo.names[0]), 'index.css');
            }
            return '[name].[ext]';
          },
        },
        {
          // cjs 产物配置
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/lib',
          assetFileNames: (assetInfo) => {
            if (
              assetInfo.names &&
              assetInfo.names.some((name) => name.endsWith('.css'))
            ) {
              return path.join(path.dirname(assetInfo.names[0]), 'index.css');
            }
            return '[name].[ext]';
          },
        },
      ],
    },
  },
});
