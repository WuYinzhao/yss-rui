import dayjs, { Dayjs } from 'dayjs';
import { isEmpty } from 'lodash';
import { DateRangeType } from './type';
export type DateUnitTYpe = 'days' | 'months' | 'years';
export const getPastDayOfSomeDay = (param: {
  someDay: Dayjs; //开始日期
  amount: number; //前推时间段
  dateUnit?: DateUnitTYpe; //前退单位，月，日，年
  format?: string; // 格式化
}): Dayjs => {
  const { someDay, amount, dateUnit = 'months', format = 'yyyy-MM-DD' } = param;
  const endDay = dayjs(someDay, format).endOf(dateUnit);

  let newMoment = dayjs(someDay, format).subtract(amount, dateUnit);
  if (someDay.isSame(endDay)) {
    newMoment = newMoment.endOf('months');
  }
  return newMoment.add(1, 'days');
};
export const getBeginDate = (
  endDate: Dayjs,
  amount: number,
  minDate: string,
) => {
  const beginDate = getPastDayOfSomeDay({
    someDay: endDate,
    amount: amount,
  });

  const minDateDayjs = dayjs(minDate);
  return beginDate.isBefore(minDateDayjs) ? minDateDayjs : beginDate;
};

export const getOption = (options = [], key: string) => {
  return options.find((item: any) => item.value === key);
};
export const assignDateValidate = (
  date: [Dayjs, Dayjs],
  timeDifference?: any,
  timeDifferenceError?: string,
) => {
  const [beginDate, endDate] = date;
  if (beginDate && endDate) {
    const state = beginDate.isBefore(endDate) || beginDate.isSame(endDate);
    if (!isEmpty(timeDifference)) {
      const [num, type] = timeDifference;
      const timeDifferenceState = endDate.diff(beginDate, type) < num;
      if (!timeDifferenceState) {
        return [
          {
            state: 'error',
            message: timeDifferenceError,
          },
          {
            state: 'error',
            message: timeDifferenceError,
          },
        ];
      }
    }

    if (!state) {
      return [
        {
          state: 'error',
          message: '开始日期不能大于结束日期！',
        },
        {
          state: 'error',
          message: '结束日期不能小于开始日期！',
        },
      ];
    }
  } else {
    return [
      {
        state: beginDate ? '' : 'error',
        message: beginDate ? '' : '请选择开始日期！',
      },
      {
        state: endDate ? '' : 'error',
        message: endDate ? '' : '请选择结束日期！',
      },
    ];
  }
  return [
    {
      state: '',
      message: '',
    },
    {
      state: '',
      message: '',
    },
  ];
};
//上上月末的年初---------上上月末
export const getInitValue = (
  forward: number = 2,
  format: string = 'YYYY-MM-DD',
): { date: DateRangeType; dateStr: [string, string] } => {
  const endDateInit = dayjs(dayjs().subtract(forward, 'M')).endOf('M');
  const startDateInit = dayjs(endDateInit).startOf('year');
  return {
    date: [startDateInit, endDateInit],
    dateStr: [startDateInit.format(format), endDateInit.format(format)],
  };
};

//上上月初---------上上月末
export const getMonthInitValue = (
  forward: number = 2,
  format: string = 'YYYY-MM-DD',
) => {
  const endDateInit = dayjs(dayjs().subtract(forward, 'M')).endOf('M');
  const startDateInit = dayjs(dayjs().subtract(forward, 'M')).startOf('M');
  return {
    data: [startDateInit, endDateInit],
    dateStr: [startDateInit.format(format), endDateInit.format(format)],
  };
};
//获取上季度初到上季度末
export const getQuarterInitValue = (
  format: string = 'YYYY-MM-DD',
): { date: DateRangeType; dateStr: [string, string] } => {
  const currentQuarterStart = dayjs().startOf('quarter'); // 当前季度的开始
  const endDateInit = currentQuarterStart
    .subtract(1, 'quarter')
    .endOf('quarter'); // 上一季度的末日
  const startDateInit = currentQuarterStart
    .subtract(1, 'quarter')
    .startOf('quarter'); // 上一季度的开始日期
  return {
    date: [startDateInit, endDateInit],
    dateStr: [startDateInit.format(format), endDateInit.format(format)],
  };
};

export default {
  getPastDayOfSomeDay,
  getBeginDate,
  getOption,
  assignDateValidate,
  getInitValue,
  getMonthInitValue,
  getQuarterInitValue,
};
