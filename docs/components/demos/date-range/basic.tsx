import { DateRangePicker, DateRangeUtils } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom',
    ...DateRangeUtils.getInitValue(),
  });

  return (
    <Card>
      <DateRangePicker value={value} onChange={setValue} />
    </Card>
  );
};
