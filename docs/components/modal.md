---
title: CustomModal 弹窗
nav:
  title: 组件
  order: 8
group:
  title: 反馈
  order: 3
toc: content
---

## 何时使用

- 需要对 `antd` 的 `Modal` 进行封装，并统一 `wrapClassName`。
- 需要在弹窗中承载自定义内容（如表单/信息展示），同时保持样式一致性。
- 需要集中管理弹窗容器层的 className，便于全局风格调整。

## 代码演示

### 基础用法

<code src="./demos/modal/basic.tsx"></code>

## API

与 `antd` Modal 一致，额外样式见 `packages/components/src/modal/`。
