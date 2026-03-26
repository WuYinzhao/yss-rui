import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
export type { Dayjs } from 'dayjs';

export type DateRangeType = [Dayjs, Dayjs];
export interface DateRangeValue {
  selectVal: string;
  date: DateRangeType;
  dateStr: [string, string];
}

/** 与 antd `DatePicker` 的 `disabledDate` 对齐 */
export type DateRangeDisabledDate = NonNullable<
  DatePickerProps['disabledDate']
>;

export interface DateRangeProps {
  id?: string;
  /** 与缺省展开 `getInitValue()` 时的宽松运行时行为一致，字段均可选 */
  value?: DateRangeValue;
  format?: string;
  disabledDate?: DateRangeDisabledDate;
  onChange?: (value: DateRangeValue) => void;
  optionsValue?: string[];
  minDate?: string;
  showQuickSelect?: boolean;
}
