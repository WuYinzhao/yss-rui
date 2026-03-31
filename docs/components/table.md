---
title: Table 表格
nav:
  title: 组件
  order: 11
group:
  title: 数据展示
  order: 1
toc: content
---

## 何时使用

- 需要基于 `antd` 的表格能力，并保持统一的行/列渲染与交互体验。
- 当数据量较大需要性能优化时，可选启用 `virtuallist-antd` 虚拟滚动。
- 需要以组件化方式组织表格区域及通用能力（如列配置、表头渲染等）。

## 代码演示

### 基础表格

<code src="./demos/table/basic.tsx"></code>

### TableUtils

<code src="./demos/table/utils.tsx"></code>

## API

在 antd `Table` 基础上根据 `height` 计算 `scroll.y`，并可选用 `virtuallist-antd` 做虚拟滚动。**其余列、数据源等**与 antd [Table](https://4x.ant.design/components/table-cn/) 一致。

### Table（VirtualTableProps）

| 属性           | 说明                                                             | 类型      | 默认值             |
| -------------- | ---------------------------------------------------------------- | --------- | ------------------ |
| id             | 表格根元素 `id`                                                  | `string`  | `'independent'`    |
| height         | 表格区域总高度，用于计算纵向滚动高度（必填）                     | `number`  | -                  |
| isScroll       | 是否启用纵向 `scroll`（传入 `scroll` 时仍会合并）                | `boolean` | `true`             |
| isVirtualTable | 为 `true` 时使用 `virtuallist-antd` 的 `VList` 作为 `components` | `boolean` | -                  |
| virtualId      | 虚拟列表实例 id，需全局唯一                                      | `string`  | `'virtualTableid'` |
| lineHeight     | 用于估算表头占用高度（多级表头）                                 | `number`  | `40`               |
| paddingNum     | 从 `height` 中扣除的上下边距总和                                 | `number`  | `48`               |

组件内默认：`size='middle'`、`bordered`、`pagination={false}`、`rowKey='id'`，均可被传入 props 覆盖。

### TableUtils

| 方法         | 说明                                               |
| ------------ | -------------------------------------------------- |
| getCellColor | 按 `level` 返回单元格背景色样式（如 `'1'`、`'2'`） |
| getCellText  | 按 `level` 返回加粗等格式化单元格内容或纯文本      |
