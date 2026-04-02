import { ComplexTree } from '@orinui/components';
import { useState } from 'react';

const treeData = [
  {
    key: '1',
    name: '父节点一',
    children: [
      { key: '1-1', name: '子节点 1-1' },
      { key: '1-2', name: '子节点 1-2' },
    ],
  },
  { key: '2', name: '父节点二' },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['1-1']);

  return (
    <div style={{ height: 360, border: '1px solid #f0f0f0' }}>
      <ComplexTree
        treeData={treeData}
        checkedKeys={checkedKeys}
        onClickCheck={(keys: string[]) => setCheckedKeys(keys)}
        switcherIcon
        isCtrl={true}
      />
    </div>
  );
};
