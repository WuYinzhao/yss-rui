import { DateRangePicker, DateRangeUtils } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom',
    ...DateRangeUtils.getInitValue(),
  });

  const optionsValue = ['1', '3', '6', '12', '36'];

  return (
    <Card>
      <DateRangePicker
        optionsValue={optionsValue}
        value={value}
        onChange={setValue}
      />
    </Card>
  );
};
