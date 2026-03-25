import html2canvas from 'html2canvas';
import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';

type DataItem = {
  [params: string]: any;
};

const exportWrapDomId = 'yss-data-export-canvas-id';
const removeCssList = ['boxShadow'];

/** 单位选项 */
export const unitOption = [
  { name: '元', unit: '0' },
  { name: '万元', unit: '4' },
  { name: '亿元', unit: '1' },
];

/** 日期选项 */
export const DateOptions = [
  { label: '日', value: '1' },
  { label: '周', value: '2' },
  { label: '月', value: '3' },
  { label: '季', value: '4' },
  { label: '半年', value: '5' },
  { label: '年', value: '6' },
];

/** 金额列表 */
export const moneyList = [
  { label: '元', value: 0, unit: '0', round: 2 },
  { label: '万元', value: 4, unit: '4', round: 2 },
  { label: '亿元', value: 8, unit: '1', round: 2 },
  { label: '万亿', value: 12, unit: '6', round: 2 },
] as const;

/** 根据id查找树的某条数据 */
export const queryItem = (data: any, id: number | string, queryKey = 'id') => {
  if (!isEmpty(data)) {
    for (let index = 0; index < data.length; index++) {
      if (data[index][queryKey] === id) return data[index];
      if (!isEmpty(data[index].children)) {
        const result: any = queryItem(data[index].children, id, queryKey);
        return result;
      }
    }
  }
  return null;
};

/** 获取当前账户菜单id */
export const getMenuId = () => {
  const path = window.location.pathname;
  const authRoutes = localStorage.getItem('auth_routes');
  const route = !!authRoutes ? JSON.parse(authRoutes) : [];
  return getMenuByPath(route, path);
};

/** 获取当前账户userId */
export const getUserId = () => {
  let info = localStorage.getItem('user_info');
  return info ? JSON.parse(info).userId : '';
};

/** 获取菜单 */
export const getMenuByPath = (
  data: DataItem[],
  path: string,
): DataItem | undefined => {
  if (data && Array.isArray(data)) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const { value, children } = element;
      if (value === path) {
        return element;
      } else if (children && Array.isArray(children)) {
        const result: DataItem | undefined = getMenuByPath(children, path);
        if (result) {
          return result;
        }
      }
    }
  }
};

/** 获取当前路由名称 */
export const getRouterName = () => {
  const path = window.location.pathname;
  const authRoutes = localStorage.getItem('auth_routes');
  const route = !!authRoutes ? JSON.parse(authRoutes) : [];
  const routerName = getMenuName(route, path);
  let result = null;
  if (routerName) {
    result = routerName.join('-');
  }
  return result;
};

/** 获取当前菜单名称 */
export const getMenuName = (
  data: DataItem[],
  path: string,
): DataItem | undefined => {
  if (data && Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === path) {
        return [data[i].text];
      }
      if (data[i].children && data[i].children.length > 0) {
        const childPath: any = getMenuName(data[i].children, path);
        if (childPath) {
          return [data[i].text, ...childPath];
        }
      }
    }
    return;
  }
};

/** 递归循环菜单（后面迭代） */
export const cloneData: (data: any, addSome?: object) => any = (
  data: any,
  addSome?: object,
) => {
  const tree: any[] = [];
  data.forEach((item: any) => {
    let newData = {
      ...item,
    };
    newData.disabled = item.path === '' ? true : false;
    newData.treeId = item.path + item.id;
    newData.pfId = item.path + item.id;
    newData.key = item.path + item.id;
    newData.children = item.children ? cloneData(item.children, addSome) : '';
    Object.assign(newData, addSome);
    tree.push(newData);
  });
  return tree;
};

/** 递归循环菜单(前几个迭代) */
export const cloneList: (data: any, addSome?: object) => any = (
  data: any,
  addSome?: object,
) => {
  const tree: any[] = [];
  data.forEach((item: any) => {
    let newData = {
      ...item,
    };
    newData.disabled = item.path === '' ? true : false;
    newData.children = item.children ? cloneList(item.children, addSome) : '';
    Object.assign(newData, addSome);
    tree.push(newData);
  });
  return tree;
};

/** 获取开始年月日期 */
export const getStartYearDate = (num: number = 0, unit: any = 'year') => {
  return moment().subtract(num, unit).startOf(unit).format('YYYY-MM');
};

/** 获取结束年月日期 */
export const getEndYearDate = (num: number = 0, unit: any = 'year') => {
  return moment().subtract(num, unit).endOf(unit).format('YYYY-MM');
};

/**
 * 获取指定时间单位前的起始日期。
 */
export const getStartDate = (num: number = 0, unit: any = 'year') => {
  return moment().subtract(num, unit).startOf(unit).format('YYYY-MM-DD');
};

/**
 * 获取指定时间单位前的结束日期。
 */
export const getEndDate = (num: number = 0, unit: any = 'year') => {
  return moment().subtract(num, unit).endOf(unit).format('YYYY-MM-DD');
};

/**
 * 获取指定年份的结束日期。
 */
export const getYearEndDate = (num = 1) => {
  const yesteryear = moment().year() - 1;
  if (num === 1)
    return moment(moment().year(yesteryear).endOf('year').valueOf()).format(
      'YYYY-MM-DD',
    );
  return moment(
    moment()
      .year(yesteryear - num)
      .endOf('year')
      .valueOf(),
  ).format('YYYY-MM-DD');
};

/**
 * 获取指定年份的开始日期字符串
 */
export const getYearStartOfDate = (num = 1) => {
  const yesteryear = moment().year() - 1;
  if (num === 1)
    return moment(moment().year(yesteryear).startOf('year').valueOf()).format(
      'YYYY-MM-DD',
    );
  return moment(
    moment()
      .year(yesteryear - num)
      .startOf('year')
      .valueOf(),
  ).format('YYYY-MM-DD');
};

/** 获取上个月的最后一天的日期 */
export const getMonthEndDate = (num = 1) => {
  return moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
};

/** 根据key查找树的某条数据 */
export const findKeyById = (data: any, key: any, id: any) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    if (node.key === id) {
      return node;
    } else if (node.children && Array.isArray(node.children)) {
      const result: any = findKeyById(node.children, key, id);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
};

/** 处理table数据 */
export const processingTableData = (data: any, key = 'children') =>
  data.map((item: any) => {
    if (!item[key]) return item;
    const data: any = {};
    item[key].forEach((i: any) => {
      const { parentKey } = i;
      Object.keys(i).forEach((j: any) => {
        if (j !== 'parentKey') {
          data[`${parentKey}${j}`] = i[j];
        }
      });
    });
    delete item[key];
    return { ...data, ...item };
  });

/** 获取选中的key */
export const findKeys = (arr: any, level: any) => {
  let keys: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (obj.hircCode <= level) {
      keys.push(obj.key);
    }
    if (obj.children && Array.isArray(obj.children)) {
      const childKeys = findKeys(obj.children, level);
      keys = keys.concat(childKeys);
    }
  }
  return keys;
};

/** 拉平表头数组 */
export const DataProcess = (data: any, initAry: any = []) => {
  return data.reduce((prev: any, cur: any) => {
    if (cur.children && !isEmpty(cur.children)) {
      prev.concat(DataProcess(cur.children, prev));
    } else {
      prev.push(cur);
    }
    return prev;
  }, initAry);
};

/** 处理树形表格数据 */
export const getExpandedRowKeys = (
  data: any,
  initAry: any = [],
  name: string = 'children',
) => {
  return data.reduce((prev: any, cur: any) => {
    if (cur[name] && !isEmpty(cur[name])) {
      initAry.push(cur.id);
      prev.concat(getExpandedRowKeys(cur.children, prev));
    }
    return prev;
  }, initAry);
};

export const getExpandedRowKeysId = (
  data: any,
  id = 'id',
  initAry: any = [],
  name: string = 'children',
) => {
  return data.reduce((prev: any, cur: any) => {
    if (cur[name] && !isEmpty(cur[name])) {
      initAry.push(cur[id]);
      prev.concat(getExpandedRowKeysId(cur.children, prev));
    }
    return prev;
  }, initAry);
};

/** 获取扁平当前item */
export const getTreeItem = (list: any, val: any) => {
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (a.key === val) {
      return a;
    }
  }
};

/** 获取所有id+name的list */
export const useTreeItem = (data = [], keys = [], id = 'id', name = 'name') => {
  let useTreeItems = [] as any;
  keys.forEach((item: any, index: any) => {
    const list = getTreeItem(treeToArray(cloneDeep(data)), keys[index]);
    useTreeItems.push({
      id: list[id],
      name: list[name],
    });
  });
  return useTreeItems;
};

/**
 * 根据指定的键和映射字段，从数据数组中提取对应的值
 */
export const getValuesForFields = (
  data: { [key: string]: any }[] = [],
  keys: string[] = [],
  mappingFields: string[] = [],
): { [key: string]: any[] } => {
  if (keys.length === 0 || mappingFields.length === 0) {
    return {};
  }

  const result: { [key: string]: any[] } = {};

  mappingFields.forEach((field) => {
    result[field] = [];
  });

  keys.forEach((key) => {
    const item = getTreeItem(data, key);

    if (item) {
      mappingFields.forEach((field) => {
        result[field].push(item[field]);
      });
    }
  });

  return result;
};

/** 获取所有当前item的key */
export const useTreePath = (data: any, keys: any) => {
  let useTreePaths = [] as any;
  keys.forEach((item: any, index: any) => {
    const list = getTreeItem(treeToArray(cloneDeep(data)), keys[index]);
    useTreePaths.push(list.path);
  });
  return useTreePaths;
};

/** 获取所有当前行业下拉数据 */
export const useTreeKye = (data: any, keys: any) => {
  let useTreePfregionIdDs = [] as any;
  keys.forEach((item: any, index: any) => {
    const list = getTreeItem(treeToArray(cloneDeep(data)), keys[index]);
    if (list !== undefined) {
      useTreePfregionIdDs.push(list.key);
    }
  });
  return useTreePfregionIdDs;
};

/** 获取树上所有level层级的key */
export const useTreeLevelItem = (data: any, level: any) => {
  let useTreeLevelItems = [] as any;
  const list = treeToArray(cloneDeep(data));
  list.forEach((item: any, index: any) => {
    if (item.hircCode === level) {
      useTreeLevelItems.push(item.key);
    }
  });
  return useTreeLevelItems;
};

/** tree扁平化 */
export const treeToArray = (tree: any) => {
  let res = [] as any;
  for (const item of tree) {
    const { children, ...i } = item;
    if (children && children.length) {
      res = res.concat(treeToArray(children));
    }
    res.push(i);
  }
  return res;
};

/** 判断树形是否包含数据 */
export const allValuesInArrayExist = (
  valuesToCheck: any,
  referenceArray: any,
) => {
  for (const value of valuesToCheck) {
    if (!referenceArray.includes(value)) {
      return false;
    }
  }
  return true;
};

/** 判断树形是否包含数据 */
export const arrayCompare = (data: any, list: any) => {
  let array = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (data[i] === list[j].key) {
        array.push(list[j].pfregionIdD);
        break;
      }
    }
  }
  const result = Array.from(new Set(array));
  return result;
};

/** 数组对比取不同 */
export const compareArrays = (arr1: any, arr2: any) => {
  const diff = [];
  for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i];
    let found = false;
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j] === item) {
        found = true;
        break;
      }
    }
    if (!found) {
      diff.push(item);
    }
  }
  return diff;
};

/** 数组分割 */
export const splitArray = (arr: any) => {
  const item = arr.pop();
  const lastItem = item === undefined ? [] : item;
  return { otherItems: arr, lastItem };
};

export const diffOldValueInTree = (data: any, oldVal: any) => {
  return data.some((item: any) => {
    const { children = [], value } = item;
    if (children && children.length > 0) {
      return diffOldValueInTree(children, oldVal);
    }
    return value === oldVal;
  });
};

/** 获取treeName */
export const getTreeName = (list: any, val: any) => {
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (a.key === val) {
      return a;
    } else {
      if (a.children && a.children.length > 0) {
        const res: any = getTreeName(a.children, val);
        if (res) {
          return res;
        }
      }
    }
  }
};

/** 处理树形表格小数点与空children */
export const clearAllChildren = (items: any, childrenName = 'children') => {
  return items.map((i: any) => {
    if (i && i[childrenName] && i[childrenName].length === 0) {
      delete i[childrenName];
    } else {
      i[childrenName] = clearAllChildren(i[childrenName], childrenName);
    }
    return i;
  });
};

export const openObjectAry = (data = []): any => {
  const temp: any = {};
  data.forEach((element) => {
    for (const key in element) {
      if (Object.prototype.hasOwnProperty.call(element, key)) {
        !temp[key] && (temp[key] = []);
        temp[key].push(element[key]);
      }
    }
  });
  return temp;
};

export const getHeight = (height: number) => {
  return height * (window.screen.height / 1080);
};

function cloneCanvas(
  oldCanvas: HTMLCanvasElement,
  newCanvas: HTMLCanvasElement,
): HTMLCanvasElement {
  const context: CanvasRenderingContext2D | null = newCanvas.getContext('2d');

  if (context) {
    context.drawImage(oldCanvas, 0, 0);
  }

  return newCanvas;
}

function replaceCanvas(targetDom: HTMLElement, newNode: Element): Node {
  const validCanvasDomArr = targetDom.getElementsByTagName('canvas');
  const invalidCanvasDomArr = newNode.getElementsByTagName('canvas');
  if (validCanvasDomArr.length < 1) {
    return newNode;
  }
  for (let i = validCanvasDomArr.length - 1; i >= 0; i--) {
    const validCanvasDom = validCanvasDomArr[i];
    const invalidCanvasDom = invalidCanvasDomArr[i];
    cloneCanvas(validCanvasDom, invalidCanvasDom);
  }

  return newNode;
}

function cloneDom(domId: string): Node | null {
  const dom: HTMLElement | null = document.querySelector(`#${domId}`);
  if (dom) {
    const cloneNode: Element = document.importNode(dom, true);

    return replaceCanvas(dom, cloneNode);
  } else {
    return null;
  }
}

function removeCSS(node: HTMLElement, cssNames: string[] = []) {
  if (!node) {
    return;
  }

  const { style } = node;
  for (const cssName of cssNames) {
    // @ts-ignore
    style[cssName] = 'none';
  }

  const { children = [] } = node;
  // @ts-ignore
  for (const child of children) {
    removeCSS(child as HTMLElement, cssNames);
  }
}

/** 截图 */
export const screenShotImage = async (domId: string) => {
  const dom = cloneDom(domId);
  const targetElement: HTMLElement | null = document.querySelector(`#${domId}`);

  if (dom && targetElement) {
    const width = targetElement.offsetWidth;
    const height = targetElement.offsetHeight;
    const wrap = document.createElement('div');
    wrap.style.position = 'absolute';
    wrap.style.left = '-10000px';
    wrap.style.top = '-10000px';
    wrap.style.width = `${width}px`;
    wrap.style.height = `${height}px`;
    wrap.id = exportWrapDomId;
    wrap.appendChild(dom);
    document.body.appendChild(wrap);
    const targetDom = document.getElementById(exportWrapDomId);
    if (targetDom) {
      removeCSS(targetDom, removeCssList);
      return await new Promise((resolve: (imageSrc: string) => void) => {
        html2canvas(targetDom).then((canvas: HTMLCanvasElement) => {
          document.body.removeChild(wrap);
          return resolve(canvas.toDataURL('image/png'));
        });
      });
    }
  } else {
    return '';
  }
};

export const disabledSecurity = (current: any) => {
  return (
    current &&
    (current < moment('2009-01-01') || current > moment().subtract(2, 'days'))
  );
};

export const disabledProvide = (current: any) => {
  return (
    current &&
    (current < moment('2018-04-01') || current > moment().subtract(2, 'days'))
  );
};

export const disabledInitiate = (current: any) => {
  return (
    current &&
    (current < moment('2002-01-01') || current > moment().subtract(2, 'days'))
  );
};

export const disabledFinish = (current: any) => {
  return (
    current &&
    (current < moment('2016-12-26') || current > moment().subtract(2, 'days'))
  );
};

/** 禁止选择今天及今天之后日期 */
export const disabledDate = (current: any) => {
  return current && current > moment().subtract(1, 'days').endOf('day');
};

/** 禁止选择今天之后日期 */
export const disabledDateDay = (current: any) => {
  return current && current > moment().endOf('day');
};

/** 表头高亮 */
export const tableColumns = (data: any, val: any) => {
  const list = cloneDeep(data);
  list.map((item: any, key: any) => {
    item.className = val === item.key ? 'highlightColor' : '';
    return item;
  });
  return list;
};

/** 判断某行是否要合并 */
export const getRowSpan = (data = [], colNameList: string[]) => {
  colNameList.forEach((colName: string, index: number) => {
    const field = 'rowSpan' + colName;
    const leftField = index ? 'rowSpan' + colNameList[index - 1] : '';
    data.forEach((item: any, index: number) => {
      if (item[colName] === '-') {
        item[field] = 1;
      } else if (
        data[index - 1] &&
        item[colName] === data[index - 1][colName] &&
        (!leftField || item[leftField] === 0)
      ) {
        item[field] = 0;
      } else {
        let afterList = data.slice(index + 1);
        let num = 1;
        for (let i = 0; i < afterList.length; i++) {
          if (
            item[colName] === afterList[i][colName] &&
            (!leftField || afterList[i][leftField] === 0)
          ) {
            num++;
          } else {
            break;
          }
        }
        item[field] = num;
      }
    });
  });
  return data;
};

/** 递归给数据增加单位字段 */
export const deepAddField = (data: any, fieldObj: any, unitAttr: string) => {
  return data.map((item: any) => {
    return data.map((item: any) => {
      if (item.children?.length) {
        return {
          ...item,
          children: deepAddField(item.children, fieldObj, unitAttr),
        };
      }
      return item[unitAttr] ? { ...item, ...fieldObj } : item;
    });
  });
};

/** 处理双日期框日期为正常参数 */
export const formateDateRange = (dateRange: any) => {
  const {
    date: [beginDate, endDate],
  } = dateRange;
  return {
    beginDate: beginDate.replace(/-/g, ''),
    endDate: endDate.replace(/-/g, ''),
  };
};

export const openObjectArry = (data = []) => {
  const temp = {};
  data.forEach((element) => {
    for (const key in element) {
      if (Object.prototype.hasOwnProperty.call(element, key)) {
        // @ts-ignore
        !temp[key] && (temp[key] = []);
        // @ts-ignore
        temp[key].push(element[key]);
      }
    }
  });
  return temp;
};

/** percentage中的列乘100 并处理小数 */
export const percentageHandler = (
  data: any[],
  percentage: string[],
  smallNum?: number,
) => {
  data.forEach((item: any) => {
    for (const key in item) {
      if (percentage.includes(key)) {
        let val = Number(item[key]);
        item[key] = isNaN(val)
          ? item[key]
          : smallNum
          ? (val * 100).toFixed(smallNum)
          : val * 100;
      }
    }
  });
  return data;
};

/**
 * 合并对象中的指定字段值到一个新的字段
 */
export const mergeFieldsOnTree = (
  data: any[],
  options: { fields?: string[]; targetField?: string; Separator?: string } = {
    fields: [],
    targetField: '',
    Separator: '*',
  },
) => {
  const { fields = [], targetField = '', Separator = '*' } = options;

  data.forEach((element: any) => {
    if (targetField && fields.length > 0) {
      element[targetField] = fields.reduce((acc, cur) => {
        return acc + Separator + element[cur];
      }, '');
    }

    if (element.children && element.children.length > 0) {
      mergeFieldsOnTree(element.children, options);
    }
  });

  return data;
};

export const getFirstOrDefault = (
  data: Array<{ [key: string]: string }>,
  key: string = 'key',
) => {
  if (data && data.length > 0) {
    return data[0][key];
  }
  return '';
};

/**
 * 递归查找树形数组中的第一个叶子节点
 */
export const findFirstLeafNodeInArray: any = (
  treeArray: any[],
  childrenKey = 'children',
) => {
  if (!Array.isArray(treeArray) || treeArray.length === 0) {
    return null;
  }

  for (const node of treeArray) {
    if (typeof node !== 'object' || node === null) {
      continue;
    }

    const hasChildren =
      node[childrenKey] &&
      Array.isArray(node[childrenKey]) &&
      node[childrenKey].length > 0;

    if (!hasChildren) {
      return node;
    }

    const leafNode = findFirstLeafNodeInArray(node[childrenKey], childrenKey);
    if (leafNode) {
      return leafNode;
    }
  }
  return null;
};

/**
 * 递归遍历树形数组并根据条件函数设置disabled属性
 */
export const setDisabledByCondition = (
  treeArray: any[],
  conditionFn: (node: any) => boolean,
  childrenKey = 'children',
) => {
  if (!Array.isArray(treeArray)) {
    return [];
  }
  if (typeof conditionFn !== 'function') {
    return treeArray;
  }

  return treeArray.map((node) => {
    const newNode = { ...node };

    if (conditionFn(newNode)) {
      newNode.disabled = true;
    }

    if (newNode[childrenKey] && Array.isArray(newNode[childrenKey])) {
      newNode[childrenKey] = setDisabledByCondition(
        newNode[childrenKey],
        conditionFn,
        childrenKey,
      );
    }

    return newNode;
  });
};

// 兼容旧版本的默认导出
export default {
  unitOption,
  moneyList,
  DateOptions,
  getMenuId,
  getRouterName,
  getUserId,
  cloneList,
  getTreeName,
  getMenuByPath,
  cloneData,
  getExpandedRowKeysId,
  getYearEndDate,
  getYearStartOfDate,
  findKeyById,
  processingTableData,
  findKeys,
  DataProcess,
  getExpandedRowKeys,
  getStartDate,
  getEndDate,
  getStartYearDate,
  getEndYearDate,
  useTreeItem,
  getTreeItem,
  queryItem,
  useTreeKye,
  useTreePath,
  useTreeLevelItem,
  splitArray,
  compareArrays,
  treeToArray,
  arrayCompare,
  allValuesInArrayExist,
  diffOldValueInTree,
  clearAllChildren,
  getMonthEndDate,
  openObjectAry,
  getHeight,
  screenShotImage,
  disabledSecurity,
  disabledProvide,
  disabledFinish,
  disabledInitiate,
  disabledDate,
  disabledDateDay,
  tableColumns,
  getRowSpan,
  deepAddField,
  openObjectArry,
  formateDateRange,
  percentageHandler,
  mergeFieldsOnTree,
  getValuesForFields,
  getFirstOrDefault,
  findFirstLeafNodeInArray,
  setDisabledByCondition,
};
