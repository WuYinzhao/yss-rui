import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useState } from 'react';
import type { DateRangeProps, DateRangeType, Dayjs } from './type';
import { getBeginDate, getInitValue } from './utils';

dayjs.extend(weekday);
dayjs.extend(localeData);

const selectOptions: { value: string; label: string }[] = [
  { value: 'custom', label: '指定日' },
  { value: '1', label: '近1月' },
  { value: '3', label: '近3月' },
  { value: '6', label: '近半年' },
  { value: '12', label: '近1年' },
  { value: '36', label: '近3年' },
  { value: '60', label: '近5年' },
  { value: 'establish', label: '成立以来' },
];

function DateRangePicker(props: DateRangeProps) {
  const {
    id,
    value,
    format = 'YYYY-MM-DD',
    disabledDate = (current) => {
      return !!current && current > dayjs().subtract(1, 'days').endOf('day');
    }, // 禁用日期
    onChange, // 日期变化时触发
    optionsValue = ['1', '3', '6', '12', '36', '60', 'establish'], // 快速选择下拉框属性
    minDate, //成立以来的日期
    showQuickSelect = true, //是否显示快速选择
  } = props;

  const min_date = minDate || '2002-01-01';

  const initVal = getInitValue(2, format);
  const raw = value || { selectVal: 'custom', ...initVal };
  const { selectVal, date } = raw;

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
  const datePickerChange = (dateOnDayjs: Dayjs, index: 0 | 1) => {
    const [first, second] = date;
    if (index === 0) {
      onDateChange && onDateChange([dateOnDayjs, second]);
    } else {
      onDateChange && onDateChange([first, dateOnDayjs]);
    }
  };
  const onDateChange = (val: DateRangeType) => {
    let nextDate: DateRangeType = val;
    if (selectVal !== 'custom' && selectVal !== 'establish') {
      const beginDate = getBeginDate(val[1], Number(selectVal), min_date);
      nextDate = [beginDate, val[1]];
    }
    onChange?.({
      selectVal: selectVal ?? 'custom',
      date: nextDate,
      dateStr: [nextDate[0].format(format), nextDate[1].format(format)],
    });
  };
  const onSelectChange = (val: string) => {
    if (val === 'custom') {
      onChange?.({
        selectVal: 'custom',
        date,
        dateStr: [date[0].format(format), date[1].format(format)],
      });
    } else {
      if (val === 'establish') {
        setBeginDate({
          type: val,
          beginDate: dayjs(min_date),
          minDate: min_date,
        });
      } else {
        setBeginDate({ type: val, minDate: min_date });
      }
    }
  };
  const setBeginDate = (param: {
    type?: string;
    beginDate?: Dayjs;
    minDate: string;
  }) => {
    const endDate = date[1];
    const { minDate: minDateParam, type = '', beginDate } = param;
    let newValue: DateRangeType = [beginDate || dayjs(), endDate];
    const innerType = type || selectVal;
    if (innerType === 'custom') {
      return;
    }
    if (innerType !== 'establish') {
      const beginD = getBeginDate(
        dayjs(endDate),
        Number(innerType),
        minDateParam,
      );
      newValue = [beginD, endDate];
    }
    onChange?.({
      selectVal: (innerType ?? 'custom') as string,
      date: newValue,
      dateStr: [newValue[0].format(format), newValue[1].format(format)],
    });
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
          value={date[0]}
          onChange={(_val) => datePickerChange(_val, 0)}
        />
      </div>
      <div style={{ lineHeight: '32px', margin: '0 8px' }}>至</div>
      <div>
        <DatePicker
          style={{ width: '170px' }}
          disabledDate={disabledDate}
          showToday={false}
          allowClear={false}
          value={date[1]}
          onChange={(_val) => datePickerChange(_val, 1)}
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
