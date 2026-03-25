---
title: EndDate 结束日期
nav:
  title: 组件
  order: 5
group:
  title: 表单
  order: 2
toc: content
---

## 何时使用

- 需要在日期选择中单独控制“结束日”行为。
- 需要配合 `EndDateUtils` 获取/计算结束日逻辑，减少重复代码。
- 需要与起始日期联动，提升表单交互的一致性。

## 代码演示

### 组件

<code src="./demos/end-date/basic.tsx"></code>

### EndDateUtils

<code src="./demos/end-date/utils.tsx"></code>

## API

详见源码 `packages/components/src/end-date/`。
