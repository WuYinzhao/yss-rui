import {
  deepAddField,
  mergeFieldsOnTree,
  setDisabledByCondition,
} from '@orinui/utils';
import { Card, Space, Tree, Typography } from 'antd';
import { useMemo } from 'react';

const tree = [
  {
    title: '父节点',
    key: 'p',
    needUnit: true,
    children: [{ title: '子节点', key: 'c', needUnit: false }],
  },
];

export default () => {
  const withFields = useMemo(
    () =>
      deepAddField(JSON.parse(JSON.stringify(tree)), { tag: 1 }, 'needUnit'),
    [],
  );

  const merged = useMemo(() => {
    const copy = [
      {
        title: 'A',
        key: 'a',
        part1: '1',
        part2: '2',
        children: [],
      },
    ];
    mergeFieldsOnTree(copy, {
      fields: ['part1', 'part2'],
      targetField: 'merged',
      Separator: '-',
    });
    return copy;
  }, []);

  const disabledTree = useMemo(
    () =>
      setDisabledByCondition(JSON.parse(JSON.stringify(tree)), (node) =>
        Boolean(node.needUnit),
      ),
    [],
  );

  return (
    <Card title="deepAddField / mergeFieldsOnTree / setDisabledByCondition">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text strong>
          deepAddField（needUnit 为 true 时附加字段）
        </Typography.Text>
        <pre style={{ margin: 0, fontSize: 12 }}>
          {JSON.stringify(withFields, null, 2)}
        </pre>
        <Typography.Text strong>
          mergeFieldsOnTree（合并为 merged）
        </Typography.Text>
        <pre style={{ margin: 0, fontSize: 12 }}>
          {JSON.stringify(merged, null, 2)}
        </pre>
        <Typography.Text strong>
          setDisabledByCondition（needUnit 则 disabled）
        </Typography.Text>
        <Tree treeData={disabledTree} defaultExpandAll selectable={false} />
      </Space>
    </Card>
  );
};
