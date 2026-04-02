import { Button, Form } from 'antd';
import { ButtonGroup, ButtonPlaceholder, FormContent } from './styled';
import type { FormPanelProps } from './type';

export default (props: FormPanelProps) => {
  const {
    form,
    children,
    onQuery,
    onReset,
    useResetButton = true,
    ...otherProps
  } = props;
  return (
    <FormContent>
      <Form layout="inline" form={form} {...otherProps}>
        {children}
        <ButtonPlaceholder
          style={{ width: useResetButton ? '160px' : '80px' }}
        ></ButtonPlaceholder>
      </Form>
      <ButtonGroup>
        <Button
          type="primary"
          onClick={() => {
            form?.validateFields().then((values) => {
              onQuery?.(values);
            });
          }}
        >
          查询
        </Button>
        {useResetButton && (
          <Button
            onClick={() => {
              onReset?.();
            }}
          >
            重置
          </Button>
        )}
      </ButtonGroup>
    </FormContent>
  );
};
