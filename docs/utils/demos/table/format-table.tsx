import { formatTableData } from '@orinui/utils';
import { Card, Space, Typography } from 'antd';

/**
 * formatTableData 内部按 DataProcess 结果的数组下标访问行字段，
 * 即第 i 列对应行上的键 "0" | "1" | …（字符串下标）。
 */
const uniColumns = [
  {
    title: '金额',
    dataIndex: 'amount',
    unit: '4',
    round: 2,
  },
];

const rows = [{ key: '1', '0': '123456789' }];

export default () => {
  const formatted = formatTableData(
    JSON.parse(JSON.stringify(rows)),
    uniColumns,
  );

  return (
    <Card title="formatTableData">
      <Space direction="vertical">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          行字段与列顺序对齐：单列时取键 <code>&apos;0&apos;</code>。
        </Typography.Paragraph>
        <Typography.Text>
          格式化前：<code>{JSON.stringify(rows[0])}</code>
        </Typography.Text>
        <Typography.Text>
          格式化后：<code>{JSON.stringify(formatted[0])}</code>
        </Typography.Text>
      </Space>
    </Card>
  );
};
