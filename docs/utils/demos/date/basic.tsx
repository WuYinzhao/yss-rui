import { getEndDate, getStartDate } from '@yss-rui/utils';
import { Card, Space, Typography } from 'antd';

export default () => {
  const startOfYear = getStartDate(0, 'year', 'YYYY-MM-DD');
  const endOfYear = getEndDate(0, 'year', 'YYYY-MM-DD');
  const startOfMonth = getStartDate(0, 'month', 'YYYY-MM-DD');
  const endOfMonth = getEndDate(0, 'month', 'YYYY-MM-DD');

  return (
    <Card title="getStartDate / getEndDate">
      <Space direction="vertical">
        <Typography.Text>
          本年起止（unit: year, num: 0）：
          <br />
          {startOfYear} ~ {endOfYear}
        </Typography.Text>
        <Typography.Text>
          本月起止（unit: month, num: 0）：
          <br />
          {startOfMonth} ~ {endOfMonth}
        </Typography.Text>
      </Space>
    </Card>
  );
};
