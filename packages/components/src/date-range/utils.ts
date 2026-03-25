import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
export type DateUnitTYpe = 'days' | 'months' | 'years';
export const getPastDayOfSomeDay = (param: {
  someDay: string; //开始日期
  amount: number; //前推时间段
  dateUnit?: DateUnitTYpe; //前退单位，月，日，年
  format?: string; // 格式化
}): string => {
  const { someDay, amount, dateUnit = 'months', format = 'yyyy-MM-DD' } = param;
  const endDay = dayjs(someDay, format).endOf(dateUnit).format(format);

  let newMoment = dayjs(someDay, format).subtract(amount, dateUnit);
  if (someDay === endDay) {
    newMoment = newMoment.endOf('months');
  }
  return newMoment.add(1, 'days').format(format);
};
export const getBeginDate = (
  endDate: string,
  amount: number,
  minDate: string,
) => {
  const beginDate = getPastDayOfSomeDay({
    someDay: endDate,
    amount: amount,
  });
  return beginDate < minDate ? minDate : beginDate;
};

export const getOption = (options = [], key: string) => {
  return options.find((item: any) => item.value === key);
};
export const assignDateValidate = (
  date: [string, string],
  timeDifference?: any,
  timeDifferenceError?: string,
) => {
  const [beginDate, endDate] = date;
  if (beginDate && endDate) {
    const state =
      dayjs(beginDate).isBefore(endDate) || dayjs(beginDate).isSame(endDate);
    if (!isEmpty(timeDifference)) {
      const [num, type] = timeDifference;
      const timeDifferenceState =
        dayjs(endDate).diff(dayjs(beginDate), type) < num;
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
export const getInitValue = (forward: number = 2) => {
  const endDateInit = dayjs(dayjs().subtract(forward, 'M'))
    .endOf('M')
    .format('YYYY-MM-DD');
  const startDateInit = dayjs(endDateInit).startOf('year').format('YYYY-MM-DD');
  return [startDateInit, endDateInit];
};

//上上月初---------上上月末
export const getMonthInitValue = (forward: number = 2) => {
  const endDateInit = dayjs(dayjs().subtract(forward, 'M'))
    .endOf('M')
    .format('YYYY-MM-DD');
  const startDateInit = dayjs(dayjs().subtract(forward, 'M'))
    .startOf('M')
    .format('YYYY-MM-DD');
  return [startDateInit, endDateInit];
};

export const getQuarterInitValue = () => {
  const currentQuarterStart = dayjs().startOf('quarter'); // 当前季度的开始
  const endDateInit = currentQuarterStart
    .subtract(1, 'quarter')
    .endOf('quarter')
    .format('YYYY-MM-DD'); // 上一季度的末日
  const startDateInit = currentQuarterStart
    .subtract(1, 'quarter')
    .startOf('quarter')
    .format('YYYY-MM-DD'); // 上一季度的开始日期
  return [startDateInit, endDateInit];
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
