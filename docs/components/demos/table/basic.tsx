import { Table } from '@orinui/components';
import { Card } from 'antd';

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '数值', dataIndex: 'value', key: 'value' },
];

const dataSource = [
  { id: '1', name: '行 1', value: 11 },
  { id: '2', name: '行 2', value: 22 },
];

export default () => {
  return (
    <Card title="Table（虚拟列表可选）">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        height={280}
        pagination={false}
        isVirtualTable={false}
      />
    </Card>
  );
};
