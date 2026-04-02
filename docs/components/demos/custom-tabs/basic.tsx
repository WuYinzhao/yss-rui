import { CustomTabs } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [activeKey, setActiveKey] = useState('1');
  const items = [
    {
      key: '1',
      label: '页签一',
      children: <div style={{ padding: 16 }}>内容一</div>,
    },
    {
      key: '2',
      label: '页签二',
      children: <div style={{ padding: 16 }}>内容二</div>,
    },
  ];

  return (
    <Card title="CustomTabs">
      <CustomTabs items={items} activeKey={activeKey} onChange={setActiveKey} />
    </Card>
  );
};
