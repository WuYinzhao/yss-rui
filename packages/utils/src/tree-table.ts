/** 用于处理树形数据 的公共方法*/
import { isEmpty } from 'lodash';

/** 拉平表头数组, 将树形数据拉平为平铺数据 */
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

/** tree扁平化, 将树形数据扁平化为平铺数据 */
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
  return data.map((_item: any) => {
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
