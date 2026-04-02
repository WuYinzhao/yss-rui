import { SingleDateUtils } from '@orinui/components';
import { Card, Space, Typography } from 'antd';

export default () => {
  const initDate = SingleDateUtils.getInitValue();
  return (
    <Card title="SingleDate单日期选择Utils">
      <Space direction="vertical">
        <Typography.Text>
          getInitValue()获取默认日期：<br></br>
          {JSON.stringify(initDate)}
        </Typography.Text>
      </Space>
    </Card>
  );
};
