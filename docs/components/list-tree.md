---
title: ListTree 左侧列表
nav:
  title: 组件
  order: 7
group:
  title: 数据展示
  order: 1
toc: content
---

## 何时使用

- 需要左侧可折叠的复选框列表，用于分组/筛选。
- 需要将树形数据以“多选”形式呈现，并支持联动选择。
- 需要在页面中用统一的组件处理节点展开与选择状态。

## 代码演示

### 基础用法

<code src="./demos/list-tree/basic.tsx"></code>

## API

基于 antd `Checkbox.Group`；`fieldNames` 用于指定选项中的 id / 文案字段名。

### ListTree

| 属性            | 说明                                                                    | 类型                                      | 默认值                       |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------- | ---------------------------- |
| checkboxOption  | 可选项列表，项内需包含 `fieldNames` 所指 id、name 字段；可选 `disabled` | `ListTreeCheckboxOption[]`                | -                            |
| defaultValue    | 初始选中值（id 列表）                                                   | `(string \| number)[]`                    | -                            |
| fieldNames      | 字段映射                                                                | `{ id: string; name: string }`            | `{ id: 'id', name: 'name' }` |
| leftCheckChange | 选中变化时回调当前选中项对应的对象列表                                  | `(res: ListTreeCheckboxOption[]) => void` | -                            |
| isSingle        | 为 `true` 时表现为单选（只保留最后一次勾选）                            | `boolean`                                 | `true`                       |
