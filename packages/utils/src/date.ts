/** 用于处理日期 的公共方法*/
import dayjs, { ManipulateType } from 'dayjs';

/**
 * 获取指定时间单位前的起始日期。
 */
export const getStartDate = (
  num: number = 0,
  unit: ManipulateType = 'year',
  format: string = 'YYYY-MM-DD',
) => {
  return dayjs().subtract(num, unit).startOf(unit).format(format);
};

/**
 * 获取指定时间单位前的结束日期。
 */
export const getEndDate = (
  num: number = 0,
  unit: ManipulateType = 'year',
  format: string = 'YYYY-MM-DD',
) => {
  return dayjs().subtract(num, unit).endOf(unit).format(format);
};

/** 处理双日期框日期为正常参数 */
export const formateDateRange = (dateRange: any) => {
  const {
    dateStr: [beginDate, endDate],
  } = dateRange;
  return {
    beginDate: beginDate.replace(/-/g, ''),
    endDate: endDate.replace(/-/g, ''),
  };
};
