# Hooks

这里是 Hooks 的总览页面。

## Hook 列表

### observerHeight

观察元素高度变化的 Hook，使用 ResizeObserver API 实现。

```tsx | pure
import { observerHeight } from '@orinui/hooks';
import { useRef } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const height = observerHeight(ref);

  return <div ref={ref}>当前高度: {height}px</div>;
}
```
