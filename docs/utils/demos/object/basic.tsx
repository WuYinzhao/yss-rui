import { getFirstOrDefault, openObjectArry, unitOption } from '@orinui/utils';
import { Card, Space, Typography } from 'antd';

export default () => {
  const list = [
    { name: 'a', v: 1 },
    { name: 'b', v: 2 },
  ];
  const opened = openObjectArry(list);
  const first = getFirstOrDefault(
    [
      { key: 'k1', label: '第一项' },
      { key: 'k2', label: '第二项' },
    ],
    'label',
  );

  return (
    <Card title="unitOption / openObjectArry / getFirstOrDefault">
      <Space direction="vertical">
        <Typography.Text>
          unitOption：
          <pre style={{ margin: 0, fontSize: 12 }}>
            {JSON.stringify(unitOption, null, 2)}
          </pre>
        </Typography.Text>
        <Typography.Text>
          openObjectArry（按 key 聚合为数组）：
          <pre style={{ margin: 0, fontSize: 12 }}>
            {JSON.stringify(opened, null, 2)}
          </pre>
        </Typography.Text>
        <Typography.Text>
          getFirstOrDefault(..., &apos;label&apos;)：<code>{first}</code>
        </Typography.Text>
      </Space>
    </Card>
  );
};
