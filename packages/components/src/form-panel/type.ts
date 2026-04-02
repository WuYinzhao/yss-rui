import type { FormProps } from 'antd';
import { ReactNode } from 'react';

export interface FormPanelProps extends FormProps {
  children?: ReactNode;
  onQuery?: (values: any) => void;
  useResetButton?: boolean;
  onReset?: () => void;
}
