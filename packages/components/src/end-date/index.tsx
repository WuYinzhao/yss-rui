import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useState } from 'react';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);

import {
  assignDateValidate,
  getHalfYearDay,
  getInitValue,
  getLastYearDay,
  getQuarterDay,
} from './utils';
const selectOptions = [
  { value: 'custom', label: '指定日' },
  { value: '1', label: '上季末' },
  { value: '3', label: '上半年末' },
  { value: '6', label: '上年末' },
];
const endDateInit = getInitValue();

export default (props: any) => {
  const {
    id,
    onChange,
    optionsValue = ['1', '3', '6'],
    value = { endDate: endDateInit, selectVal: 'custom' },
    format = 'YYYY-MM-DD',
    picker = 'date',
  } = props;
  const { endDate, selectVal } = value;
  const useSelectOptions = selectOptions.filter((i) =>
    ['custom', ...optionsValue].includes(i.value),
  );
  const [customDate, setCustomDate] = useState();
  const [dateDisabled, setDateDisabled] = useState(false);
  const [dateState, setDateState] = useState<{
    state: '' | 'error' | 'warning' | undefined;
    message: string;
  }>({ state: '', message: '' });
  useEffect(() => {
    setDateDisabled(selectVal !== 'custom');
  }, [selectVal]);
  const onDateChange = (val: any) => {
    let endDate = val.endOf(picker).format(format);
    if (selectVal === 'custom') setCustomDate(endDate);
    const validate = assignDateValidate(endDate);
    setDateState(validate);
    onChange?.({ endDate, selectVal });
  };
  const disabledDate = (current: any) => {
    return current && current >= dayjs().startOf(picker);
  };
  const onSelectChange = (val: any) => {
    let newValue = '';
    if (val === 'custom') {
      newValue = customDate || endDateInit;
    } else {
      if (val === '1') {
        // 获取上季末
        newValue = getQuarterDay('YYYY-MM-DD');
      } else if (val === '3') {
        // 获取上半年末
        newValue = getHalfYearDay('YYYY-MM-DD');
      } else if (val === '6') {
        // 获取上年末
        newValue = getLastYearDay('YYYY-MM-DD');
      }
      const validate = assignDateValidate(newValue);
      setDateState(validate);
    }
    onChange?.({ selectVal: val, endDate: newValue });
  };
  return (
    <div style={{ display: 'flex' }} id={id}>
      <Select
        options={useSelectOptions}
        style={{ width: '100px' }}
        value={selectVal}
        onChange={onSelectChange}
      ></Select>
      <div>
        <DatePicker
          disabled={dateDisabled}
          picker={picker}
          style={{ width: '170px' }}
          disabledDate={disabledDate}
          showToday={false}
          status={dateState.state}
          allowClear={false}
          value={dayjs(endDate, picker === 'quarter' ? 'YYYY-Q' : format)}
          onChange={onDateChange}
        />
      </div>
    </div>
  );
};
