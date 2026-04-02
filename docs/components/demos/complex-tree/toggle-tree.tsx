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

const toggleData = [
  {
    value: 'one',
    label: '组合树一',
  },
  { value: 'two', label: '组合树二' },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['1-1']);
  const [toggleKey, setToggleKey] = useState<string>('one');

  return (
    <div style={{ height: 360, border: '1px solid #f0f0f0' }}>
      <ComplexTree
        treeData={treeData}
        checkedKeys={checkedKeys}
        onClickCheck={(keys: string[]) => setCheckedKeys(keys)}
        switcherIcon
        toggleData={toggleData}
        toggleKey={toggleKey}
        onClickToggle={(key: string) => setToggleKey(key)}
      />
    </div>
  );
};
