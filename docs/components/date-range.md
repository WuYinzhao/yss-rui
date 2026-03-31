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

左侧快捷项内置「指定日 / 近 1 月 / … / 成立以来」等，可通过 `optionsValue` 筛选；`showQuickSelect` 为 `false` 时只保留两个 `DatePicker`。

### DateRangePicker

| 属性            | 说明                                   | 类型                                 | 默认值                                     |
| --------------- | -------------------------------------- | ------------------------------------ | ------------------------------------------ |
| id              | 根节点 `id`                            | `string`                             | -                                          |
| value           | 受控：区间与快捷项                     | `DateRangeValue`                     | 内置 `getInitValue(2, format)`             |
| format          | 日期格式                               | `string`                             | `'YYYY-MM-DD'`                             |
| disabledDate    | 不可选日期                             | 同 antd `DatePicker['disabledDate']` | 默认禁用「明日及之后」                     |
| onChange        | 值变化                                 | `(value: DateRangeValue) => void`    | -                                          |
| optionsValue    | 允许的快捷项（不含 `custom`）          | `string[]`                           | `['1','3','6','12','36','60','establish']` |
| minDate         | 「成立以来」等逻辑使用的最早日期字符串 | `string`                             | `'2002-01-01'`                             |
| showQuickSelect | 是否显示左侧快捷下拉                   | `boolean`                            | `true`                                     |

### DateRangeValue

| 属性      | 说明                  | 类型               | 默认值 |
| --------- | --------------------- | ------------------ | ------ |
| selectVal | 当前快捷项或 `custom` | `string`           | -      |
| date      | `[开始, 结束]`        | `[Dayjs, Dayjs]`   | -      |
| dateStr   | 格式化后的起止字符串  | `[string, string]` | -      |

### DateRangeUtils

| 方法 / 对象         | 说明                                     | 备注                                             |
| ------------------- | ---------------------------------------- | ------------------------------------------------ |
| getPastDayOfSomeDay | 从某日按单位前推                         | 参数含 `someDay`、`amount`、`dateUnit`、`format` |
| getBeginDate        | 结合结束日与快捷月数、最早日计算开始日   | `(endDate, amount, minDate)`                     |
| getOption           | 在 options 中按 `value` 查找项           | -                                                |
| assignDateValidate  | 校验区间及可选「最短时间差」             | 返回两个表单项的校验结果数组                     |
| getInitValue        | 默认区间：上上月末所在年年初 ～ 上上月末 | `(forward?, format?)`                            |
| getMonthInitValue   | 上上月整月区间                           | -                                                |
| getQuarterInitValue | 上一完整季度区间                         | -                                                |
