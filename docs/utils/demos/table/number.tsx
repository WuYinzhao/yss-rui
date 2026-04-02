import {
  divide,
  formatToThousandsRounded,
  handleData,
  multiply,
  roundToDecimalPlaces,
} from '@orinui/utils';
import { Card, Space, Typography } from 'antd';

export default () => {
  const d = divide('12345678', 4);
  const m = multiply('12.3456', 2);
  const f = roundToDecimalPlaces('3.1415926', 4);
  const thousands = formatToThousandsRounded('1234567.89', 2);
  const handled = handleData('123456789', '4', 2);

  return (
    <Card title="divide / multiply / roundToDecimalPlaces / formatToThousandsRounded / handleData">
      <Space direction="vertical">
        <Typography.Text>
          divide(&apos;12345678&apos;, 4) → <code>{d}</code>（万级位移）
        </Typography.Text>
        <Typography.Text>
          multiply(&apos;12.3456&apos;, 2) → <code>{m}</code>
        </Typography.Text>
        <Typography.Text>
          roundToDecimalPlaces(&apos;3.1415926&apos;, 4) → <code>{f}</code>
        </Typography.Text>
        <Typography.Text>
          formatToThousandsRounded(&apos;1234567.89&apos;, 2) →{' '}
          <code>{thousands}</code>
        </Typography.Text>
        <Typography.Text>
          handleData(&apos;123456789&apos;, &apos;4&apos;, 2)（万 + 千分位）→{' '}
          <code>{String(handled)}</code>
        </Typography.Text>
      </Space>
    </Card>
  );
};
