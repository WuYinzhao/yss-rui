---
title: Chart 图表
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 1
toc: content
---

## 何时使用

- 需要基于 `echarts-for-react` 封装图表，实现组件化的 ECharts 渲染。
- 需要对图表交互内容（如 Tooltip）进行格式化与自定义展示。
- 需要在项目中统一图表容器/样式，提升可维护性。

## 代码演示

### 基础柱状图

<code src="./demos/chart/basic.tsx"></code>

### ChartTooltip 格式化

<code src="./demos/chart/tooltip.tsx"></code>

## API

### Chart

| 属性           | 说明                                          | 类型                                   | 默认值                              |
| -------------- | --------------------------------------------- | -------------------------------------- | ----------------------------------- |
| optionDefault  | 初始 ECharts option，传给 `echarts-for-react` | `EChartsOption`                        | -                                   |
| optionChange   | 增量更新：有键时通过实例 `setOption` 合并更新 | `EChartsOption`                        | -                                   |
| style          | 容器样式                                      | `CSSProperties`                        | `{ width: '100%', height: '100%' }` |
| onEvents       | 图表事件，同 echarts-for-react                | `Record<string, (e: unknown) => void>` | `{}`                                |
| registerEvents | 注册在 zrender 上的事件（`getZr().on`）       | `Record<string, (e: unknown) => void>` | `{}`                                |
| notMerge       | 传给 `ReactEcharts`                           | `boolean`                              | `false`                             |
| lazyUpdate     | 传给 `ReactEcharts`                           | `boolean`                              | `false`                             |
| renderWithSVG  | 为 `true` 时使用 SVG 渲染器                   | `boolean`                              | `false`                             |

### ChartTooltip（工具方法）

包内导出为 `ChartTooltip` 默认对象，主要成员：

| 成员           | 说明                                                                                        | 类型                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| tooltipFormate | 将 echarts tooltip 的 `params` 格式化为 HTML 字符串（数组走 `createArrayTooltipFormatter`） | `(params: EChartsTooltipRow \| EChartsTooltipRow[], options?: CreateTooltipOptions) => string` |

`CreateTooltipOptions` 含 `unit`、`precision`；`EChartsTooltipRow` 与 echarts tooltip 参数字段对齐（如 `marker`、`seriesName`、`axisValue` 等）。同一模块另有 `createArrayTooltipFormatter`、`createToolTipInner`、`createTooltipValueTmpl` 等命名导出，可按需从包内路径引用。
