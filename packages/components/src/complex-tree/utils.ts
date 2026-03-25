/** 获取treeName
 *  list 为整个数组
 *  val为当前item得key
 */
export const getTreeName = (list: any, val: any) => {
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (a.key === val) {
      return a;
    } else {
      if (a.children && a.children?.length > 0) {
        const res: any = getTreeName(a.children, val);
        if (res) {
          return res;
        }
      }
    }
  }
};

// 过滤
export const getArrDifference = (arr1: any, arr2: any) => {
  return arr1.concat(arr2).filter(function (v: any, i: any, arr: any) {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
};

/** 过滤函数 */
export const filterFn = (data: any, filterText: any) => {
  if (!filterText) {
    return true;
  }
  return new RegExp(filterText, 'i').test(data.name); //我是一title过滤 ，你可以根据自己需求改动
};
/** 获取展开的key值 */
export const expandedKeyArr = (val: any, method: any, data: any) => {
  //  val 数据
  //  method 方法
  let originalArray = method !== '' ? method(val, data) : val;
  let uniqueArray = originalArray.filter(
    (item: any, index: any, array: any) => {
      return array.indexOf(item) === index;
    },
  );
  return uniqueArray;
};

/** 默认打开第一层key
 *  data 为全部数据
 *  dataExpan 接受得空数组
 */
export const getFirstLevelKeys = (data: any): string[] => {
  const keys = [];
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0];
    keys.push(first.key);
    if (
      first.children &&
      Array.isArray(first.children) &&
      first.children.length > 0
    ) {
      keys.push(...getFirstLevelKeys(first.children));
    }
  }
  return keys;
};
/** 根据树形结构获取全部key */
export const getAllKeysForTreeData = (
  data: any,
  disbaleFun?: (item: any) => boolean,
): string[] => {
  const keys: string[] = [];
  for (let i in data) {
    if (Object.prototype.hasOwnProperty.call(data, i)) {
      if (!disbaleFun || !disbaleFun(data[i].data)) {
        keys.push(data[i].key);
      }
      if (data[i].children) {
        //如果有children层，则继续遍历
        keys.push(...getAllKeysForTreeData(data[i].children, disbaleFun));
      }
    }
  }
  return keys;
};

/** 搜索处理方法 */
export const arrayTreeFilter = (data: any, predicate: any, filterText: any) => {
  const nodes = data;
  // 如果已经没有节点了，结束递归
  if (!(nodes && nodes.length)) {
    return;
  }
  const newChildren = [];
  for (const node of nodes) {
    if (predicate(node, filterText)) {
      // 如果自己（节点）符合条件，直接加入到新的节点集
      newChildren.push(node);
      // 并接着处理其 children,（因为父节点符合，子节点一定要在，所以这一步就不递归了）
      node.children = arrayTreeFilter(node.children, predicate, filterText);
    } else {
      // 如果自己不符合条件，需要根据子集来判断它是否将其加入新节点集
      // 根据递归调用 arrayTreeFilter() 的返回值来判断
      const subs = arrayTreeFilter(node.children, predicate, filterText);
      // 以下两个条件任何一个成立，当前节点都应该加入到新子节点集中
      // 1. 子孙节点中存在符合条件的，即 subs 数组中有值
      // 2. 自己本身符合条件
      if ((subs && subs.length) || predicate(node, filterText)) {
        node.children = subs;
        newChildren.push(node);
      }
    }
  }
  return newChildren;
};

/** 搜索展开 key函数 */
export const expandedKeysFun = (treeData: any) => {
  if (treeData && treeData.length === 0) {
    return [];
  }
  let arr: any[] = [];
  const expandedKeysFn = (treeData: any) => {
    treeData.forEach((item: any) => {
      arr.push(item.key);
      if (item.children && item.children?.length > 0) {
        expandedKeysFn(item.children);
      }
    });
  };
  expandedKeysFn(treeData);
  return arr;
};

export const macSystem = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

/**
 * 查找节点路径（递归DFS实现）
 * @param {Array} tree 树形数据
 * @param {string} targetKey 目标节点key
 * @returns {Array} 路径节点数组（从根到目标节点），未找到返回[]
 */
export const findParentKeys = (tree: any[], targetKey: string): string[] => {
  for (const node of tree) {
    if (node.key === targetKey) return [targetKey]; // 找到目标节点
    if (node.children) {
      const childPath = findParentKeys(node.children, targetKey);
      if (childPath.length > 0) return [node.key, ...childPath]; // 拼接路径
    }
  }
  return [];
};
