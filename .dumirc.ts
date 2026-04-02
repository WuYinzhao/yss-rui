import { defineConfig } from 'dumi';
import * as path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    '@OrinUI/components': path.resolve(__dirname, 'packages/components/src'),
    '@OrinUI/hooks': path.resolve(__dirname, 'packages/hooks/src'),
    '@OrinUI/utils': path.resolve(__dirname, 'packages/utils/src'),
    '@OrinUI/ai-skills': path.resolve(__dirname, 'packages/ai-skills/src'),
  },
  themeConfig: {
    name: 'OrinUI',
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components' },
      { title: 'Hooks', link: '/hooks' },
      { title: '工具', link: '/utils' },
      { title: 'AI Skills', link: '/ai-skills' },
      { title: '更新日志', link: '/changelog' },
    ],
    sidebar: {
      '/components/': [
        {
          title: '组件',
          children: [
            { title: '介绍', link: '/components' },
            { title: 'Chart 图表', link: '/components/chart' },
            { title: 'ComplexTree 复杂树', link: '/components/complex-tree' },
            { title: 'ListTree 左侧列表', link: '/components/list-tree' },
            { title: 'SingleTree 侧边树', link: '/components/single-tree' },
            { title: 'Table 表格', link: '/components/table' },
            { title: 'DatePicker 日期选择', link: '/components/date-picker' },
            {
              title: 'DateRangePicker 日期范围',
              link: '/components/date-range',
            },
            { title: 'SingleDate 结束日期', link: '/components/single-date' },
            {
              title: 'ExcelHandle Excel 解析',
              link: '/components/excel-handle',
            },
            {
              title: 'CustomSelect 带全选的选择器',
              link: '/components/custom-select',
            },
            { title: 'CustomModal 弹窗', link: '/components/modal' },
            { title: 'OperateBar 操作条', link: '/components/operate-bar' },
            {
              title: 'TitleBar 表格标题',
              link: '/components/title-bar',
            },
            { title: 'CustomTabs 表格页签', link: '/components/custom-tabs' },
            { title: 'Styled 布局样式', link: '/components/styled' },
            { title: 'FormPanel 表单布局', link: '/components/form-panel' },
            {
              title: 'CollapsePanel 左侧布局',
              link: '/components/collapse-panel',
            },
          ],
        },
      ],
      '/hooks/': [
        {
          title: 'Hooks',
          children: [
            { title: '介绍', link: '/hooks' },
            {
              title: 'observerHeight 高度观察',
              link: '/hooks/observer-height',
            },
          ],
        },
      ],
      '/utils/': [
        {
          title: '工具函数',
          children: [
            { title: '介绍', link: '/utils' },
            { title: '日期工具', link: '/utils/date' },
            { title: '树形工具', link: '/utils/tree' },
            { title: '表格工具', link: '/utils/table' },
            { title: '截图工具', link: '/utils/screenshot' },
            { title: '对象与常量', link: '/utils/object' },
          ],
        },
      ],
      '/ai-skills/': [
        {
          title: 'AI Skills',
          children: [{ title: '介绍', link: '/ai-skills' }],
        },
      ],
    },
  },
});
