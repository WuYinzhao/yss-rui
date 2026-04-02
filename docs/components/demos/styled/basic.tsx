import {
  CollapsePanel,
  ComplexTree,
  OperateBar,
  Styled,
  Table,
  TitleBar,
} from '@orinui/components';
import { Button, Card, DatePicker, Form } from 'antd';
import { useState } from 'react';

const {
  Page,
  Content,
  Header,
  FormContent,
  FormQuery,
  FormButton,
  TableContent,
} = Styled;

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
          <Header>
            <Form>
              <FormContent>
                <FormQuery>
                  <Form.Item name="endDate" label="截止日期">
                    <DatePicker />
                  </Form.Item>
                </FormQuery>
                <FormButton>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                </FormButton>
              </FormContent>
            </Form>
          </Header>
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
