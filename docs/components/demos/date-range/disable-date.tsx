import { DateRangePicker, DateRangeUtils } from '@yss-rui/components';
import { Card } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom',
    ...DateRangeUtils.getInitValue(),
  });

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().subtract(2, 'days').endOf('day');
  };

  return (
    <Card>
      <DateRangePicker
        value={value}
        onChange={setValue}
        minDate="2012-01-01"
        disabledDate={disabledDate}
      />
    </Card>
  );
};
