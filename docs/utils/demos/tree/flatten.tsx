import { DataProcess, treeToArray } from '@orinui/utils';
import { Card, Space, Typography } from 'antd';

const headerTree = [
  {
    title: '分组',
    children: [
      { title: '列A', dataIndex: 'a' },
      { title: '列B', dataIndex: 'b' },
    ],
  },
];

const tree = [
  {
    id: '1',
    name: '根',
    children: [{ id: '1-1', name: '子' }],
  },
];

export default () => {
  const flatHeader = DataProcess(headerTree, []);
  const flatTree = treeToArray(tree);

  return (
    <Card title="DataProcess / treeToArray">
      <Space direction="vertical">
        <Typography.Text>
          DataProcess（表头树叶子）：
          <pre style={{ margin: 0, fontSize: 12 }}>
            {JSON.stringify(flatHeader, null, 2)}
          </pre>
        </Typography.Text>
        <Typography.Text>
          treeToArray：
          <pre style={{ margin: 0, fontSize: 12 }}>
            {JSON.stringify(flatTree, null, 2)}
          </pre>
        </Typography.Text>
      </Space>
    </Card>
  );
};
