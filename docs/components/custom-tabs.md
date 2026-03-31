---
title: CustomTabs 页签
nav:
  title: 组件
  order: 15
group:
  title: 页签
  order: 2
toc: content
---

## 何时使用

- 需要带统一样式的 `antd` Tabs 容器，用于承载同一页面内的多视图/多状态切换。
- 需要把切换逻辑与具体内容解耦，便于维护和扩展。
- 需要在表格/数据区域上保持风格一致的标签交互。

## 代码演示

### 基础用法

<code src="./demos/custom-tabs/basic.tsx"></code>

## API

### CustomTabs

| 属性      | 说明              | 类型                    | 默认值 |
| --------- | ----------------- | ----------------------- | ------ |
| activeKey | 当前激活页签      | `string`                | -      |
| items     | 页签项（同 antd） | `TabsProps['items']`    | -      |
| onChange  | 切换页签          | `TabsProps['onChange']` | -      |
