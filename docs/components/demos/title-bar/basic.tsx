import { DownloadOutlined } from '@ant-design/icons';
import { TitleBar } from '@orinui/components';
import { Card } from 'antd';

export default () => {
  const downloadFun = () => {
    alert('下载');
  };
  return (
    <Card title="表格标题">
      <TitleBar
        leftContent="表格标题"
        leftType="text"
        rightType="opreate"
        rightContent={
          <span onClick={downloadFun}>
            <DownloadOutlined />
            下载
          </span>
        }
      />
    </Card>
  );
};
