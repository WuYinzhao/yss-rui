---
title: ComplexTree 复杂树
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 1
description: 基于 Ant Design Tree 封装的企业级按钮组件
toc: content
---

## 何时使用

- 需要树结构并需要全选功能。
- 需要带树节点筛选。
- 需要复杂节点之间联动。

## 代码演示

### 基础用法

<code src="./demos/complex-tree/basic.tsx"></code>

### 按住 Ctrl 键可进行子节点勾选

<code src="./demos/complex-tree/ctrl.tsx"></code>

### 多棵树之间切换

<code src="./demos/complex-tree/toggle-tree.tsx"></code>

### 不需要按住 ctrl 的父子联动

tips:父节点也为真实节点所以子节点全部选中时父节点不会自动勾选
<code src="./demos/complex-tree/check-strictly-tree.tsx"></code>

## API

详见源码 `packages/components/src/complex-tree/`。
