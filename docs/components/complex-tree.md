---
title: ComplexTree 复杂树
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 1
description: 基于 Ant Design Tree 封装的企业级复杂树组件
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

### 父节点选中后自动禁用子节点

<code src="./demos/complex-tree/disable-children-tree.tsx"></code>

### 通过方法自定义禁用节点

<code src="./demos/complex-tree/disable-fun-tree.tsx"></code>

### 通过属性控制树单选

<code src="./demos/complex-tree/multiple-tree.tsx"></code>

## API

### ComplexTree

| 属性             | 说明                                                                                                                             | 类型                                 | 默认值                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------- |
| treeData         | 树数据，节点需包含 `key`、`name`，子节点放在 `children`                                                                          | `ComplexTreeNode[]`                  | -                             |
| checkedKeys      | 受控：当前勾选的节点 key 列表                                                                                                    | `string[]`                           | -                             |
| describeTips     | 启用 Ctrl 多选时在树上方展示的提示文案                                                                                           | `string`                             | `'Ctrl+选中：全选所有子节点'` |
| toggleData       | 顶部切换条选项（多棵树切换时使用）                                                                                               | `ComplexTreeToggleItem[]`            | `[]`                          |
| toggleKey        | 当前选中的切换项，对应 `toggleData[].value`                                                                                      | `string`                             | `''`                          |
| disabledItemFunc | 自定义节点是否禁用，返回 `true` 表示禁用                                                                                         | `(item: ComplexTreeNode) => boolean` | -                             |
| showLine         | 是否显示连接线                                                                                                                   | `boolean`                            | `true`                        |
| switcherIcon     | 为 `true` 时展示顶部「快速检索」与「展开全部/收起全部」；为 `false` 时隐藏该区域；同时传入内部树用于控制展开图标样式（CSS 变量） | `boolean`                            | `true`                        |
| onClickToggle    | 点击切换条某项时回调，参数为该项的 `value`                                                                                       | `(val: string) => void`              | -                             |
| onClickCheck     | 勾选变化时回调；`keys` 为当前应同步的勾选 key；`e` 与 antd `Tree` 的 `onCheck` 回调第二个参数（info）一致                        | `(keys: string[], e) => void`        | -                             |
| isCtrl           | 是否启用按住 Ctrl（Mac 为 Meta）时按子树批量勾选                                                                                 | `boolean`                            | `false`                       |
| multiple_check   | 是否多选；为 `false` 时表现为单选                                                                                                | `boolean`                            | `true`                        |
| checkStrictly    | 是否父子独立勾选（`true` 父子不关联）；为 `false` 时走父子联动                                                                   | `boolean`                            | `true`                        |
| disableChildren  | 父节点选中后是否禁用其下子节点                                                                                                   | `boolean`                            | `false`                       |

### ComplexTreeNode

| 属性     | 说明                               | 类型                | 默认值 |
| -------- | ---------------------------------- | ------------------- | ------ |
| key      | 节点唯一标识                       | `string`            | -      |
| name     | 节点展示名称（检索按 `name` 匹配） | `string`            | -      |
| children | 子节点                             | `ComplexTreeNode[]` | -      |
| disabled | 是否禁用该节点                     | `boolean`           | -      |

### ComplexTreeToggleItem

| 属性  | 说明                                               | 类型     | 默认值 |
| ----- | -------------------------------------------------- | -------- | ------ |
| value | 切换项值，用于 `toggleKey` 与 `onClickToggle` 入参 | `string` | -      |
| label | 展示文案                                           | `string` | -      |
