import { unitOption } from './constants';
import {
  divide,
  formatTableData,
  formatToThousandsRounded,
  handleData,
  multiply,
  roundToDecimalPlaces,
} from './data-process';
import { formateDateRange, getEndDate, getStartDate } from './date';
import { getFirstOrDefault, openObjectArry } from './object-array';
import { screenShotImage } from './screenshot';
import {
  DataProcess,
  deepAddField,
  getRowSpan,
  mergeFieldsOnTree,
  setDisabledByCondition,
  treeToArray,
} from './tree-table';

export {
  DataProcess,
  deepAddField,
  divide,
  formateDateRange,
  formatTableData,
  formatToThousandsRounded,
  getEndDate,
  getFirstOrDefault,
  getRowSpan,
  getStartDate,
  handleData,
  mergeFieldsOnTree,
  multiply,
  openObjectArry,
  roundToDecimalPlaces,
  screenShotImage,
  setDisabledByCondition,
  treeToArray,
  unitOption,
};

// 兼容旧版本的默认导出
export default {
  unitOption,
  DataProcess,
  getStartDate,
  getEndDate,
  treeToArray,
  screenShotImage,
  getRowSpan,
  deepAddField,
  openObjectArry,
  formateDateRange,
  mergeFieldsOnTree,
  getFirstOrDefault,
  setDisabledByCondition,
  formatTableData,
  handleData,
  roundToDecimalPlaces,
  divide,
  multiply,
  formatToThousandsRounded,
};
