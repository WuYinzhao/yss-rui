import { CustomSelect } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

const treeData = [
  {
    label: '节点1',
    value: 'p1',
  },
  {
    label: '节点2',
    value: 'p2',
  },
  {
    label: '节点3',
    value: 'p3',
  },
];

export default () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Card title="CustomSelect（树形多选）">
      <CustomSelect
        style={{ width: 320 }}
        treeData={treeData}
        value={value}
        onChange={setValue}
        placeholder="请选择"
      />
    </Card>
  );
};
