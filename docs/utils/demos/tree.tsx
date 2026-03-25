import {
  findFirstLeafNodeInArray,
  setDisabledByCondition,
  treeToArray,
} from '@yss-rui/utils';
import { Card, Divider, Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

const treeData = [
  {
    key: '1',
    title: '节点1',
    children: [
      {
        key: '1-1',
        title: '节点1-1',
        children: [
          { key: '1-1-1', title: '节点1-1-1' },
          { key: '1-1-2', title: '节点1-1-2' },
        ],
      },
      { key: '1-2', title: '节点1-2' },
    ],
  },
  {
    key: '2',
    title: '节点2',
    children: [{ key: '2-1', title: '节点2-1' }],
  },
];

export default () => {
  const flatList = treeToArray(JSON.parse(JSON.stringify(treeData)));
  const firstLeaf = findFirstLeafNodeInArray(treeData);
  const disabledTree = setDisabledByCondition(
    JSON.parse(JSON.stringify(treeData)),
    (node) => node.key === '1-1',
  );

  return (
    <Card title="树形工具示例">
      <Typography.Paragraph>
        <strong>第一个叶子节点：</strong>
        {firstLeaf?.title}
      </Typography.Paragraph>

      <Divider>扁平化后的数据</Divider>
      <pre style={{ background: '#f5f5f5', padding: 16 }}>
        {JSON.stringify(
          flatList.map((i) => i.title),
          null,
          2,
        )}
      </pre>

      <Divider>禁用 key=1-1的节点</Divider>
      <Tree treeData={disabledTree as DataNode[]} defaultExpandAll checkable />
    </Card>
  );
};
