import { SingleDate, SingleDateUtils } from '@orinui/components';
import { Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState({
    selectVal: 'custom',
    ...SingleDateUtils.getInitValue(),
  });

  return (
    <Card title="SingleDate单日期选择">
      <SingleDate value={value} onChange={(value) => setValue(value)} />
    </Card>
  );
};
