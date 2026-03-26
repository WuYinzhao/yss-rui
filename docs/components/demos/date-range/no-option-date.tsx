import { DateRangePicker, DateRangeUtils } from '@yss-rui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom',
    ...DateRangeUtils.getInitValue(),
  });

  return (
    <Card>
      <DateRangePicker
        value={value}
        onChange={setValue}
        showQuickSelect={false}
      />
    </Card>
  );
};
