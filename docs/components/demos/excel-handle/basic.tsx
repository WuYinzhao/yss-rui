import { ExcelHandle } from '@orinui/components';
import { Button, Card, Typography } from 'antd';
import { useState } from 'react';

const { Excel, uploadClick } = ExcelHandle;

export default () => {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);

  return (
    <Card title="Excel 解析（选择 xlsx/csv）">
      <Excel exportData={setRows} />
      <Button type="primary" onClick={uploadClick} style={{ marginBottom: 16 }}>
        选择文件
      </Button>
      <Typography.Paragraph>
        解析行数：{rows.length}（首行会作为字段名）
      </Typography.Paragraph>
    </Card>
  );
};
