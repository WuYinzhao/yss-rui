---
title: CustomSelect 树形选择
nav:
  title: 组件
  order: 17
group:
  title: 表单
  order: 2
toc: content
---

## 何时使用

- 需要基于 `antd` `TreeSelect` 的树形下拉选择，并补充全选等扩展能力。
- 需要在表单中以层级结构选择一个或多个节点（更清晰的分类选择）。
- 需要在下拉内提供更完善的交互入口，提升选择效率。

## 代码演示

### 基础用法

<code src="./demos/custom-select/basic.tsx"></code>

## API

基于 antd `TreeSelect`，固定 `treeCheckable` 为 `true`；在 `treeData` / `value` / `onChange` / `fieldNames` 等与下表一致的用法上封装了全选区域（见 `popupRender`）。**其余属性**与 antd [TreeSelect](https://4x.ant.design/components/tree-select-cn/) 一致（类型上省略了 `treeData`、`value`、`onChange`、`open` 的默认定义，由本组件声明）。

### CustomSelect

| 属性         | 说明                         | 类型                            | 默认值                                                     |
| ------------ | ---------------------------- | ------------------------------- | ---------------------------------------------------------- |
| treeData     | 树形数据                     | `TreeSelectProps['treeData']`   | `[]`                                                       |
| value        | 已选值（多选为 key 数组）    | `string[]`                      | `[]`                                                       |
| onChange     | 选择变化                     | `(value: string[]) => void`     | -                                                          |
| fieldNames   | 字段映射                     | 同 antd TreeSelect `fieldNames` | `{ label: 'label', value: 'value', children: 'children' }` |
| queryloading | 下拉内全选区域是否处于加载态 | `boolean`                       | `false`                                                    |
