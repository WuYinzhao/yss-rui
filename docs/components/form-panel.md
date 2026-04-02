---
title: form布局组件
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 4
description: 布局组件
toc: content
---

## 何时使用

- form 按照表单内容和按钮进行自适应。

## 代码演示

### 基础用法

<code src="./demos/form-panel/basic.tsx"></code>

## API

### FormPanel

| 属性     | 说明                                   | 类型        | 默认值 |
| -------- | -------------------------------------- | ----------- | ------ |
| width    | 左侧区域宽度（px），影响 flex 固定列宽 | `number`    | `280`  |
| children | form 表单的 item                       | `ReactNode` | -      |
