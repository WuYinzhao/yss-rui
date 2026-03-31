---
title: TitleBar 表格说明栏
nav:
  title: 组件
  order: 14
group:
  title: 表格相关
  order: 2
toc: content
---

## 何时使用

- 需要二级标题与右侧操作区的组合，用于增强表格语义与操作入口。
- 需要将“二级标题/操作区”作为可复用布局能力，包裹表格或其它内容。
- 需要在保持视觉一致的同时，支持右侧区域的灵活渲染。

## 代码演示

### 基础用法

<code src="./demos/title-bar/basic.tsx"></code>

## API

### TitleBar

| 属性         | 说明                                                | 类型                  | 默认值      |
| ------------ | --------------------------------------------------- | --------------------- | ----------- |
| leftContent  | 左侧内容（通常为标题）                              | `ReactNode`           | -           |
| rightContent | 右侧内容（通常为操作）                              | `ReactNode`           | -           |
| leftStyle    | 左侧容器额外样式（会与内置 `text` 类型样式合并）    | `CSSProperties`       | -           |
| rightStyle   | 右侧容器额外样式                                    | `CSSProperties`       | -           |
| leftType     | 左侧预设：`text` 为标题色；`opreate` 为链接式操作色 | `'text' \| 'opreate'` | `'text'`    |
| rightType    | 右侧预设，同上                                      | `'text' \| 'opreate'` | `'opreate'` |
