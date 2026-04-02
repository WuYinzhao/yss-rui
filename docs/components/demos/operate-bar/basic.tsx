import { OperateBar } from '@orinui/components';
import { Card } from 'antd';

export default () => {
  return (
    <Card title="OperateBar（单位 / 下载）">
      <OperateBar
        unitChar="万元"
        unit="wan"
        downloadFun={() => alert('下载')}
        unitOption={[
          { name: '万元', unit: 'wan' },
          { name: '亿元', unit: 'yi' },
        ]}
        unitFun={() => {}}
      />
    </Card>
  );
};
