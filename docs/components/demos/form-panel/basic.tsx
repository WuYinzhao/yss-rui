import { FormPanel, Styled } from '@orinui/components';
import { Card, DatePicker, Form } from 'antd';

const { Page, Content } = Styled;

export default () => {
  const [form] = Form.useForm();
  return (
    <Card title="Styled 布局片段">
      <Page style={{ height: 560, border: '1px solid #eee' }}>
        <Content>
          <FormPanel
            form={form}
            onQuery={() => {
              alert('查询');
            }}
            onReset={() => {
              alert('重置');
            }}
          >
            <Form.Item name="endDate" label="截止日期">
              <DatePicker />
            </Form.Item>
          </FormPanel>
        </Content>
      </Page>
    </Card>
  );
};
