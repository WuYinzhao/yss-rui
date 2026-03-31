---
title: OperateBar 操作条
nav:
  title: 组件
  order: 12
group:
  title: 表格相关
  order: 2
toc: content
---

## 何时使用

- 需要在表格顶部提供通用能力（如下载、单位切换等）。
- 需要将顶部操作区域与表格内容解耦，便于复用到不同页面。
- 需要在页面中保持表格头部布局与交互风格一致。

## 代码演示

### 基础用法

<code src="./demos/operate-bar/basic.tsx"></code>

## API

### OperateBar

| 属性        | 说明                                             | 类型                     | 默认值 |
| ----------- | ------------------------------------------------ | ------------------------ | ------ |
| unitChar    | 单位展示文案（与 `unitOption` 二选一或组合使用） | `string`                 | -      |
| unit        | 当前选中的单位值，用于高亮 `unitOption` 中对应项 | `string`                 | -      |
| downloadFun | 点击「下载」时回调；不传则不显示下载入口         | `() => void`             | -      |
| unitOption  | 可选单位列表                                     | `OperateBarUnitOption[]` | -      |
| unitFun     | 切换单位时回调，参数为选中项的 `unit`            | `(unit: string) => void` | -      |

### OperateBarUnitOption

| 属性 | 说明     | 类型     | 默认值 |
| ---- | -------- | -------- | ------ |
| unit | 单位值   | `string` | -      |
| name | 展示名称 | `string` | -      |
