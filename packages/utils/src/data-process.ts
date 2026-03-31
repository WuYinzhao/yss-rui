/** 用于处理数据 的公共方法*/
import { isString } from 'lodash';

import { DataProcess } from './tree-table';

/** 格式化数据为千位分隔符 用于大数字运算后格式化数据 */
export const formatToThousandsRounded = (number: string, round: number = 0) => {
  if (!isString(number)) {
    return number;
  }
  let [intStr = '', floatStr = ''] = number.split('.');
  if (Number(intStr) === 0) {
    return number;
  }
  // intStr = numeral(intStr).format("0,0");
  intStr = intStr.replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
  return round > 0 ? `${intStr}.${floatStr}` : intStr;
};

/** 四舍五入保留小数位 用于大数字运算后格式化数据 */
export const roundToDecimalPlaces = (str: string, round: number = 0) => {
  if (!round) {
    return Number(str).toFixed(0);
  }

  let [intStr = '', floatStr = ''] = String(str).split('.');
  let mark = '';
  if (intStr.indexOf('-') > -1) {
    mark = '-';
    intStr = intStr.split('-')[1];
  }

  floatStr = floatStr.slice(0, 15);
  floatStr = Math.round(
    Number(floatStr) / Math.pow(10, floatStr.length - round),
  ).toString();
  const len = floatStr.length;
  if (len <= round) {
    floatStr = `${'0'.repeat(round - len)}${floatStr}`;
  } else {
    intStr = (Number(intStr) + 1).toString();
    floatStr = '0'.repeat(round);
  }

  return `${mark}${intStr || 0}.${floatStr}`;
};

/** 格式化数据 用于大数字运算后格式化数据 */
const formateData = (str: string) => {
  let out = str.match(/^0+/) ? str.replace(/^0+/, '') : str;
  out = out.replace(/^\./g, '0.');

  return out || '0';
};

/** 格式化表格数据 用于大数字运算后格式化数据 */
export const formatTableData = (data: any = [], uniColumns: any = []) => {
  const columnsData = DataProcess(uniColumns, []);

  return data.map((item: any) => {
    const tempDataList = JSON.parse(JSON.stringify(item));
    if (tempDataList && uniColumns.length > 0) {
      for (const key in columnsData) {
        if (Object.prototype.hasOwnProperty.call(columnsData, key)) {
          const element = tempDataList[key];
          const { unit, round = 0 } = columnsData[key];
          tempDataList[key] = handleData(element, unit, round);
        }
      }
    }
    return tempDataList;
  });
};

/** 处理数据 用于大数字运算后格式化数据 */
export function handleData(
  element: string | number,
  unit: string,
  round: number,
) {
  if (element === 0 || (element && !isNaN(Number(element)))) {
    let item = handleDataByUnit(element, unit, round);
    switch (unit) {
      case '0':
      case '1':
      case '2':
      case '4':
      case '5':
      case '6':
        item = formatToThousandsRounded(item, round);
        break;
      case '3':
        item = formatToThousandsRounded(item, 0);
        break;
    }
    return item;
  }
  return element;
}

/**
 * @param element 处理的目标数值
 * @param unit 处理数据类别 "0": 不处理单位，保留round位小数;  "1": 单位为亿，保留round位小数; "2": 单位为%，保留round位小数; "3": 取整; "4": 单位万，保留round位小数; "5": 单位百万，保留round位小数;"6"：单位万亿
 * @param round 保留小数位数
 * @returns
 */
const handleDataByUnit = (
  element: string | number,
  unit: string,
  round: number,
): string => {
  let item = String(element);
  switch (unit) {
    case '0':
      item = roundToDecimalPlaces(item, round);
      break;
    case '1':
      item = roundToDecimalPlaces(divide(item, 8), round);
      break;
    case '2':
      item = roundToDecimalPlaces(multiply(item, 2), round);
      break;
    case '3':
      item = roundToDecimalPlaces(item, 0);
      break;
    case '4':
      item = roundToDecimalPlaces(divide(item, 4), round);
      break;
    case '5':
      item = roundToDecimalPlaces(divide(item, 6), round);
      break;
    case '6':
      item = roundToDecimalPlaces(divide(item, 12), round);
      break;
    default:
      break;
  }
  return item;
};

/** 自定义除法 用于大数字除法运算 */
export const divide = (str: string, round: number = 0) => {
  let mark = '';
  let rest = str;
  if (rest.indexOf('-') > -1) {
    mark = '-';
    rest = rest.split('-')[1];
  }
  let [integer = '', decimal = ''] = rest.split('.');
  let result = '';
  if (integer.length <= round) {
    result = '0.' + '0'.repeat(round - integer.length) + integer + decimal;
  } else {
    result =
      integer.slice(0, integer.length - round) +
      '.' +
      integer.slice(integer.length - round) +
      decimal;
  }
  return mark + formateData(result);
};
/** 自定义乘法 用于大数字乘法运算 */
export const multiply = (str: string, round: number = 0) => {
  let mark = '';
  let rest = str;
  if (rest.indexOf('-') > -1) {
    mark = '-';
    rest = rest.split('-')[1];
  }
  let [integer = '', decimal = ''] = rest.split('.');
  let result = '';
  if (decimal.length <= round) {
    result = integer + decimal + '0'.repeat(round - decimal.length);
  } else {
    result = integer + decimal.slice(0, round) + '.' + decimal.slice(round);
  }
  return mark + formateData(result);
};
