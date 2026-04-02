import { CustomModal } from '@orinui/components';
import { Button, Card } from 'antd';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Card title="CustomModal">
      <Button type="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <CustomModal
        title="示例"
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>内容区域</p>
      </CustomModal>
    </Card>
  );
};
