import { DateRangeUtils } from '@yss-rui/components';
import { Card, Space, Typography } from 'antd';
import dayjs from 'dayjs';
const {
  getInitValue,
  getMonthInitValue,
  getQuarterInitValue,
  assignDateValidate,
} = DateRangeUtils;

export default () => {
  const range = getInitValue(2, 'YYYY-MM-DD');
  const monthRange = getMonthInitValue(2, 'YYYY-MM-DD');
  const quarterRange = getQuarterInitValue('YYYY-MM-DD');
  const validate = assignDateValidate(
    [dayjs('2026-01-01'), dayjs('2026-02-01')],
    [2, 'month'],
    '开始日期不能大于结束日期！',
  );
  return (
    <Card title="DateRangeUtils 示例">
      <Space direction="vertical">
        <Typography.Text>
          getInitValue(2月，&apos;YYYY-MM-DD&apos;)
          获取上上月末的年初到上上月末的日期：
          <br />
          {JSON.stringify(range)}
        </Typography.Text>
        <Typography.Text>
          getMonthInitValue(2月，&apos;YYYY-MM-DD&apos;)
          获取上上月末的年初到上上月末的日期：
          <br />
          {JSON.stringify(monthRange)}
        </Typography.Text>
        <Typography.Text>
          getQuarterInitValue(&apos;YYYY-MM-DD&apos;)
          获取上季度初到上季度末的日期：
          <br />
          {JSON.stringify(quarterRange)}
        </Typography.Text>
        <Typography.Text>
          assignDateValidate([dayjs(&apos;2026-01-01&apos;),
          dayjs(&apos;2026-02-01&apos;)], [1, &apos;month&apos;],
          &apos;开始日期不能大于结束日期！&apos;) 验证日期是否合法：
          <br />
          {JSON.stringify(validate)}
        </Typography.Text>
      </Space>
    </Card>
  );
};
