---
title: observerHeight - 高度观察
nav:
  title: Hooks
  order: 2
group:
  title: DOM
  order: 1
toc: content
---

# observerHeight

观察元素高度变化的 Hook，使用 ResizeObserver API 实现。

## 代码演示

<code src="./demos/basic.tsx"></code>

## API

```typescript
const height = observerHeight(ref: React.RefObject<HTMLElement>): number;
```

### 参数

| 参数 | 说明               | 类型                           | 默认值 |
| ---- | ------------------ | ------------------------------ | ------ |
| ref  | 要观察的元素的 ref | `React.RefObject<HTMLElement>` | -      |

### 返回值

| 参数   | 说明           | 类型     |
| ------ | -------------- | -------- |
| height | 元素的当前高度 | `number` |

## 备注

- 使用了 500ms 的防抖来优化性能
- 在组件卸载时会自动取消观察
