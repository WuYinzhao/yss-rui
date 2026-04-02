import { ListTree } from '@orinui/components';
import { Card } from 'antd';

const checkboxOption = [
  { id: 'a', name: '选项 A' },
  { id: 'b', name: '选项 B' },
  { id: 'c', name: '选项 C' },
];

export default () => {
  return (
    <Card title="ListTree（左侧勾选列表）">
      <div style={{ height: 200 }}>
        <ListTree
          checkboxOption={checkboxOption}
          defaultValue={['a']}
          isSingle
          leftCheckChange={() => {}}
        />
      </div>
    </Card>
  );
};
