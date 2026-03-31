---
title: SingleDate 结束日期
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
- 需要配合 `SingleDateUtils` 获取/计算结束日逻辑，减少重复代码。
- 需要与起始日期联动，提升表单交互的一致性。

## 代码演示

### 简单使用

<code src="./demos/single-date/basic.tsx"></code>

### SingleDateUtils

<code src="./demos/single-date/utils.tsx"></code>

## API

下拉项内置「指定日 / 上季末 / 上半年末 / 上年末」，可通过 `optionsValue` 控制展示哪些快捷项（始终包含 `custom`）。

### SingleDate

源码中值类型为 `DateRangeValue`、Props 类型名为 `DateRangeProps`，与 **DateRangePicker** 的命名相近，使用时以包导出名 **SingleDate** 为准。

| 属性         | 说明                                                                     | 类型                                       | 默认值                                      |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------- |
| id           | 根节点 `id`                                                              | `string`                                   | -                                           |
| value        | 受控值：`selectVal` 为快捷项或 `custom`；`date` / `dateStr` 为当前结束日 | `DateRangeValue`                           | 与 `getInitValue()` 合并后的初始值          |
| format       | 日期格式化                                                               | `string`                                   | `'YYYY-MM-DD'`                              |
| disabledDate | 不可选日期，同 antd `DatePicker`                                         | 同 antd `DatePicker` 的 `disabledDate`     | 默认禁用「明日及之后」                      |
| onChange     | 值变化                                                                   | `(value: DateRangeValue) => void`          | -                                           |
| optionsValue | 允许的快捷项 value（不含 `custom`）                                      | `string[]`                                 | `['1','3','6']`（上季末、上半年末、上年末） |
| picker       | 日期粒度                                                                 | `'date' \| 'quarter' \| 'month' \| 'year'` | `'date'`                                    |

### DateRangeValue（SingleDate）

| 属性      | 说明                  | 类型     | 默认值 |
| --------- | --------------------- | -------- | ------ |
| selectVal | 当前快捷项或 `custom` | `string` | -      |
| date      | 当前结束日            | `Dayjs`  | -      |
| dateStr   | 结束日字符串          | `string` | -      |

### SingleDateUtils

包导出为 `SingleDateUtils` 默认对象，包含：

| 成员               | 说明                                        | 签名                                                                         |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------- |
| assignDateValidate | 校验是否已选日期，用于表单                  | `(date: string) => { state, message }`                                       |
| getInitValue       | 默认结束日：当前月往前 `forward` 个月的月末 | `(forward?: number, format?: string) => { date, dateStr }`，默认 `forward=2` |
| getQuarterDay      | 上季末                                      | `(format: string) => { date, dateStr }`                                      |

组件内部还会用到 `getHalfYearDay`、`getLastYearDay`，未挂到该默认导出对象上。
