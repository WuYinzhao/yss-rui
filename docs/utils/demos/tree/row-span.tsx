import { getRowSpan } from '@yss-rui/utils';
import { Card, Table, Typography } from 'antd';

const raw = [
  { key: '1', city: '上海', amount: 100 },
  { key: '2', city: '上海', amount: 200 },
  { key: '3', city: '北京', amount: 300 },
];

export default () => {
  const data = JSON.parse(JSON.stringify(raw));
  getRowSpan(data, ['city']);

  const columns = [
    {
      title: '城市',
      dataIndex: 'city',
      render: (text: string, record: Record<string, unknown>) => {
        const rowSpan = record.rowSpancity as number;
        return {
          children: text,
          props: { rowSpan },
        };
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
    },
  ];

  return (
    <Card title="getRowSpan">
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
        对 city 列计算合并行后，首行带 rowSpan，后续行为 0（由 antd Table
        消费）。
      </Typography.Paragraph>
      <Table
        size="small"
        pagination={false}
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};
