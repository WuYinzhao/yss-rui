import { screenShotImage } from '@orinui/utils';
import { Button, Card, Image, Space, Typography } from 'antd';
import { useState } from 'react';

const DOM_ID = 'utils-screenshot-demo';

export default () => {
  const [dataUrl, setDataUrl] = useState<string>('');

  const onShot = async () => {
    const url = await screenShotImage(DOM_ID);
    setDataUrl(url || '');
  };

  return (
    <Card title="screenShotImage">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          点击下方按钮对灰色区域截图（依赖 html2canvas，需在浏览器环境运行）。
        </Typography.Paragraph>
        <div
          id={DOM_ID}
          style={{
            padding: 16,
            background: '#f5f5f5',
            borderRadius: 8,
            maxWidth: 360,
          }}
        >
          截图目标区域：示例文案与样式
        </div>
        <Button type="primary" onClick={onShot}>
          生成截图
        </Button>
        {dataUrl ? (
          <div>
            <Typography.Text>预览（base64 PNG）：</Typography.Text>
            <div style={{ marginTop: 8 }}>
              <Image
                src={dataUrl}
                alt="screenshot"
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
        ) : null}
      </Space>
    </Card>
  );
};
