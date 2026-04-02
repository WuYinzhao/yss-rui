import { SingleTree } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

const treeData = [
  {
    id: '1',
    name: '分组一',
    children: [{ id: '1-1', name: '节点 1-1' }],
  },
  { id: '2', name: '分组二' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState('1-1');

  return (
    <Card>
      <div style={{ height: 280 }}>
        <SingleTree
          treeData={treeData}
          selectedKeys={selectedKeys}
          onSelectKeys={(key) => setSelectedKeys(key)}
          showSwitcher
        />
      </div>
    </Card>
  );
};
