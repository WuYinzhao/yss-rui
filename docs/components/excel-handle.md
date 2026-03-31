---
title: ExcelHandle Excel 解析
nav:
  title: 组件
  order: 6
group:
  title: 表单
  order: 2
toc: content
---

## 何时使用

- 需要在前端读取 Excel 文件并完成解析/数据映射。
- 需要对上传入口（如点击触发）进行封装复用。
- 需要在业务中复用统一的 `xlsx` 读取流程，减少重复实现。

## 代码演示

### 基础用法

<code src="./demos/excel-handle/basic.tsx"></code>

## API

`ExcelHandle` 为默认导出对象，解构使用：`const { Excel, uploadClick } = ExcelHandle`。

### Excel

| 属性       | 说明                                                             | 类型                              | 默认值 |
| ---------- | ---------------------------------------------------------------- | --------------------------------- | ------ |
| exportData | 读取首个工作表并通过 `XLSX.utils.sheet_to_json` 得到行数组后回调 | `(data: ExcelSheetRow[]) => void` | -      |

`ExcelSheetRow` 为 `Record<string, unknown>`，首行作为字段名。

### uploadClick

触发组件内隐藏的 `input[type=file]`（会先清空 `value` 以便重复选同一文件），用于外部按钮绑定。

| 类型         | 说明         |
| ------------ | ------------ |
| `() => void` | 打开文件选择 |
