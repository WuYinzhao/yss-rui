import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useState } from 'react';

dayjs.extend(weekday);
dayjs.extend(localeData);

import { getBeginDate, getInitValue } from './utils';
const selectOptions = [
  { value: 'custom', label: '指定日' },
  { value: '1', label: '近1月' },
  { value: '3', label: '近3月' },
  { value: '6', label: '近半年' },
  { value: '12', label: '近1年' },
  { value: '36', label: '近3年' },
  { value: '60', label: '近5年' },
  { value: 'establish', label: '成立以来' },
];

export default (props: any) => {
  const {
    id,
    value,
    onChange,
    optionsValue = ['1', '3', '6', '12', '36', '60', 'establish'],
    minDate,
    showQuickSelect = true,
  } = props;

  let min_date = minDate || '2002-01-01';

  const { selectVal, date } = value || {
    selectVal: 'custom',
    date: getInitValue(),
  };
  const useSelectOptions = selectOptions.filter((i) =>
    ['custom', ...optionsValue].includes(i.value),
  );
  const [dateDisabled, setDateDisabled] = useState(false);
  useEffect(() => {
    setDateDisabled(selectVal !== 'custom');
  }, [selectVal]);
  useEffect(() => {
    if (min_date && selectVal === 'establish') {
      onSelectChange(selectVal);
    }
  }, [min_date]);
  const datePickerChange = (val: any, index: any) => {
    const [first, second] = date;
    if (index === 0) {
      onDateChange && onDateChange([val, second]);
    } else {
      onDateChange && onDateChange([first, val]);
    }
  };
  const disabledDate = (current: any) => {
    return current && current > dayjs().subtract(1, 'days').endOf('day');
  };
  const onDateChange = (val: any) => {
    let date = val;
    if (selectVal !== 'custom' && selectVal !== 'establish') {
      const beginDate = getBeginDate(val[1], selectVal, min_date);
      date = [beginDate, val[1]];
    }
    onChange({ selectVal, date });
  };
  const onSelectChange = (val: any) => {
    if (val === 'custom') {
      onChange({ selectVal: 'custom', date: date });
    } else {
      if (val === 'establish') {
        setBeginDate({ type: val, beginDate: min_date, minDate: min_date });
      } else {
        setBeginDate({ type: val, minDate: min_date });
      }
    }
  };
  const setBeginDate = (param: {
    type?: string;
    beginDate?: string;
    minDate: string;
  }) => {
    const endDate = date[1] as string;
    const { minDate, type = '', beginDate } = param;
    let newValue = [beginDate, endDate];
    const innerType = type || selectVal;
    if (innerType === 'custom') {
      return;
    }
    if (innerType !== 'establish') {
      const beginDate = getBeginDate(endDate, innerType, minDate);
      newValue = [beginDate, endDate];
    }
    onChange({ selectVal: innerType, date: newValue });
  };

  return (
    <div style={{ display: 'flex' }} id={id}>
      {showQuickSelect ? (
        <Select
          options={useSelectOptions}
          style={{ width: '100px' }}
          value={selectVal}
          onChange={onSelectChange}
        ></Select>
      ) : null}

      <div>
        <DatePicker
          style={{ width: '170px' }}
          disabledDate={disabledDate}
          showToday={false}
          disabled={dateDisabled}
          allowClear={false}
          value={dayjs(date[0], 'YYYY-MM-DD')}
          onChange={(val, str) => datePickerChange(str, 0)}
        />
      </div>
      <div style={{ lineHeight: '32px', margin: '0 8px' }}>至</div>
      <div>
        <DatePicker
          style={{ width: '170px' }}
          disabledDate={disabledDate}
          showToday={false}
          allowClear={false}
          value={dayjs(date[1], 'YYYY-MM-DD')}
          onChange={(val, str) => datePickerChange(str, 1)}
        />
      </div>
    </div>
  );
};
