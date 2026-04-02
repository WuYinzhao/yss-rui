import { useObserverHeight } from '@orinui/hooks';
import { Card } from 'antd';
import { useRef } from 'react';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const height = useObserverHeight(ref);

  return (
    <Card title="高度观察示例">
      <div
        ref={ref}
        style={{
          minHeight: 100,
          background: '#f5f5f5',
          padding: 20,
          resize: 'vertical',
          overflow: 'auto',
        }}
      >
        <p>拖动边框调整高度</p>
        <p>当前高度: {height}px</p>
      </div>
    </Card>
  );
};
