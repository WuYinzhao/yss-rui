---
title: SingleTree 侧边树
nav:
  title: 组件
  order: 9
group:
  title: 数据展示
  order: 1
toc: content
---

## 何时使用

- 需要侧边单选树形结构，方便在页面中完成层级选择。
- 需要支持折叠/展开，以减少长列表造成的页面拥挤。
- 需要与业务表单/筛选逻辑联动，实现单一条件的过滤或定位。

## 代码演示

### 常规使用

<code src="./demos/single-tree/basic.tsx"></code>

### 禁用左侧收起按钮

<code src="./demos/single-tree/no-switch-icon.tsx"></code>

### 使用 size（small,nomal,large）

<code src="./demos/single-tree/size-tree.tsx"></code>

## API

树节点字段通过内部 `fieldNames` 固定为 `title: 'name'`、`key: 'id'`、`children: 'children'`，数据需使用 `id` / `name` / `children`。

### SingleTree

| 属性         | 说明                                                  | 类型                                   | 默认值    |
| ------------ | ----------------------------------------------------- | -------------------------------------- | --------- |
| treeData     | 树数据                                                | `DataNode[]`（使用 `id`、`name` 字段） | -         |
| selectedKeys | 当前选中节点 key（单选）                              | `Key`                                  | -         |
| onSelectKeys | 选中变化，`key` 为节点 id，`node` 为 antd 树节点      | `(key: Key, node: DataNode) => void`   | -         |
| size         | 尺寸样式类名：`sider-tree-small` / `sider-tree-large` | `'large' \| 'small'`                   | `'large'` |
| showSwitcher | 是否显示树展开/收起开关（默认隐藏）                   | `boolean`                              | `false`   |
