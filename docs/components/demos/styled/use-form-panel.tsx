import {
  CollapsePanel,
  ComplexTree,
  FormPanel,
  OperateBar,
  Styled,
  Table,
  TitleBar,
} from '@OrinUI/components';
import { Card, DatePicker, Form, Input } from 'antd';
import { useState } from 'react';

const { Page, Content, TableContent } = Styled;

const treeData = [
  {
    key: '1',
    name: '父节点一',
    children: [
      { key: '1-1', name: '子节点 1-1' },
      { key: '1-2', name: '子节点 1-2' },
    ],
  },
  { key: '2', name: '父节点二' },
];

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['1-1']);

  const [form] = Form.useForm();

  return (
    <Card title="Styled 布局片段">
      <Page style={{ height: 560, border: '1px solid #eee' }}>
        <CollapsePanel>
          <ComplexTree
            treeData={treeData}
            checkedKeys={checkedKeys}
            onClickCheck={(keys: string[]) => setCheckedKeys(keys)}
            switcherIcon
          />
        </CollapsePanel>

        <Content>
          <FormPanel
            useResetButton={false}
            form={form}
            onQuery={(values) => {
              console.log(values);
            }}
            onReset={() => {}}
          >
            <Form.Item name="endDate" label="截止日期">
              <DatePicker />
            </Form.Item>
            <Form.Item name="Input1" label="输入框1">
              <Input style={{ width: 160 }} />
            </Form.Item>
            <Form.Item
              name="Input2"
              label="输入框2"
              rules={[{ required: true, message: '${label} is required' }]}
            >
              <Input style={{ width: 160 }} />
            </Form.Item>
          </FormPanel>
          <OperateBar
            unitChar="元"
            downloadFun={() => {
              alert('下载');
            }}
          ></OperateBar>
          <TableContent>
            <TitleBar leftContent="表格标题" leftType="text"></TitleBar>
            <Table
              columns={columns}
              dataSource={dataSource}
              height={300}
            ></Table>
          </TableContent>
        </Content>
      </Page>
    </Card>
  );
};
