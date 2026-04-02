import { TableUtils } from '@orinui/components';
import { Card, Space, Typography } from 'antd';

export default () => {
  const c1 = TableUtils.getCellColor('1');
  const c2 = TableUtils.getCellText('加粗文本', '1');

  return (
    <Card title="TableUtils">
      <Space direction="vertical">
        <Typography.Text>
          getCellColor(&apos;1&apos;): {JSON.stringify(c1)}
        </Typography.Text>
        <div>getCellText: {c2}</div>
      </Space>
    </Card>
  );
};
