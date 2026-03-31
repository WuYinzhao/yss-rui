import { formateDateRange } from '@yss-rui/utils';
import { Card, Typography } from 'antd';

export default () => {
  const dateRange = {
    dateStr: ['2026-01-15', '2026-03-31'],
  };
  const params = formateDateRange(dateRange);

  return (
    <Card title="formateDateRange">
      <Typography.Text>
        输入{' '}
        <code>dateStr: [&apos;2026-01-15&apos;, &apos;2026-03-31&apos;]</code>
        <br />
        输出：<code>{JSON.stringify(params)}</code>
      </Typography.Text>
    </Card>
  );
};
