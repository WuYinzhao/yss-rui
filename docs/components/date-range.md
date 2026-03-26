---
title: DateRangePicker 日期范围
nav:
  title: 组件
  order: 4
group:
  title: 表单
  order: 2
toc: content
---

## 何时使用

- 需要日期范围选择能力，并支持开始/结束日期联动。
- 需要快捷区间（如近一周/近一个月）快速选择日期范围。
- 需要配合 `DateRangeUtils` 进行快捷区间与日期计算的扩展。

## 代码演示

### 正常使用

<code src="./demos/date-range/basic.tsx"></code>

### 自定义左侧快捷选项

<code src="./demos/date-range/option-date.tsx"></code>

### 禁用左侧快捷选项

<code src="./demos/date-range/no-option-date.tsx"></code>

### 自定义最小日期

tips:默认最小日期为 2002 年 1 月 1 日，在选择成立以来选项时开始日期会设置为最小日期

<code src="./demos/date-range/custom-min-date.tsx"></code>

### 自定义日期禁用规则

tips:默认为明日不可选择

<code src="./demos/date-range/custom-min-date.tsx"></code>

### DateRangeUtils

<code src="./demos/date-range/utils.tsx"></code>

## API

详见源码 `packages/components/src/date-range/`。
