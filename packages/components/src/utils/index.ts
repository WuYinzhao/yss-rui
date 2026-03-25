import html2canvas from 'html2canvas';
import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';

export default () => {
  type DataItem = {
    [params: string]: any;
  };
  const exportWrapDomId = 'yss-data-export-canvas-id';
  const removeCssList = ['boxShadow'];
  const unitOption = [
    { name: '元', unit: '0' },
    { name: '万元', unit: '4' },
    { name: '亿元', unit: '1' },
  ];
  const DateOptions = [
    { label: '日', value: '1' },
    { label: '周', value: '2' },
    { label: '月', value: '3' },
    { label: '季', value: '4' },
    { label: '半年', value: '5' },
    { label: '年', value: '6' },
  ];
  const moneyList = [
    { label: '元', value: 0, unit: '0', round: 2 },
    { label: '万元', value: 4, unit: '4', round: 2 },
    { label: '亿元', value: 8, unit: '1', round: 2 },
    { label: '万亿', value: 12, unit: '6', round: 2 },
  ] as any;
  // 根据id查找树的某条数据
  const queryItem = (data: any, id: number | string, queryKey = 'id') => {
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
  // 获取当前账户菜单id
  const getMenuId = () => {
    const path = window.location.pathname;
    const authRoutes = localStorage.getItem('auth_routes');
    const route = !!authRoutes ? JSON.parse(authRoutes) : [];
    return getMenuByPath(route, path);
  };
  // 获取当前账户userId
  const getUserId = () => {
    let info = localStorage.getItem('user_info');
    return info ? JSON.parse(info).userId : '';
  };
  // 获取菜单
  const getMenuByPath = (
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
  // 获取当前路由名称
  const getRouterName = () => {
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
  // 获取当前菜单名称
  const getMenuName = (
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
  // 递归循环菜单（后面迭代）
  const cloneData: (data: any, addSome?: object) => any = (
    data: any,
    addSome?: object,
  ) => {
    const tree: any[] = []; //新建空数组
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
  // 递归循环菜单(前几个迭代)
  const cloneList: (data: any, addSome?: object) => any = (
    data: any,
    addSome?: object,
  ) => {
    const tree: any[] = []; //新建空数组
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
  const getStartYearDate = (num: number = 0, unit: any = 'year') => {
    return moment().subtract(num, unit).startOf(unit).format('YYYY-MM');
  };
  const getEndYearDate = (num: number = 0, unit: any = 'year') => {
    return moment().subtract(num, unit).endOf(unit).format('YYYY-MM');
  };
  /**
   * 获取指定时间单位前的起始日期。
   *
   * 该函数使用moment.js库来处理日期和时间。它根据指定的数量和时间单位，计算出当前日期之前某个时间单位的起始日期，并以指定的格式返回该日期。
   * 默认情况下，函数返回当前日期前一年的起始日期。
   *
   * @param num 时间单位的数量，用于计算起始日期。默认值为0，表示当前时间单位。
   * @param unit 时间单位，可以是年、月、日等。这个参数决定了计算起始日期的方式。默认值为'year'。
   * @returns 返回一个字符串，表示计算得到的起始日期，格式为'YYYY-MM-DD'。
   */
  const getStartDate = (num: number = 0, unit: any = 'year') => {
    return moment().subtract(num, unit).startOf(unit).format('YYYY-MM-DD');
  };
  /**
   * 获取指定时间单位前的结束日期。
   *
   * 该函数使用moment.js库来处理日期和时间。它根据输入的数量和时间单位，计算出当前日期之前指定时间单位的结束日期，并以YYYY-MM-DD格式返回。
   * 默认情况下，时间单位为年，数量为0，即返回当前年的结束日期。
   *
   * @param num 时间单位的数量，默认为0。
   * @param unit 时间单位，可以是年（year）、月（month）、日（day）等，，默认为'year'。
   * @returns 返回计算得到的结束日期的字符串表示。
   */
  const getEndDate = (num: number = 0, unit: any = 'year') => {
    return moment().subtract(num, unit).endOf(unit).format('YYYY-MM-DD');
  };
  /**
   * 获取指定年份的结束日期。
   *
   * 该函数使用moment.js库来处理日期和时间。它主要用于计算并返回指定年份的结束日期，
   * 默认返回去年的结束日期。通过传入参数num，可以指定返回更早年份的结束日期。
   *
   * @param num 指定的年份偏移量，默认为1，表示去年。如果传入其他数字，将返回相应年份之前的结束日期。
   * @returns 返回计算得到的年份结束日期的字符串格式（YYYY-MM-DD）。
   */
  const getYearEndDate = (num = 1) => {
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
   *
   * 该函数通过moment.js库操作日期，返回指定年份的开始日期的字符串格式（YYYY-MM-DD）。
   * 默认情况下，返回去年的开始日期。如果传入参数num，则返回num年前的年份的开始日期。
   *
   * @param num 年份偏移量，默认为1，表示去年。可正可负，用于指定相对当前年份的偏移。
   * @returns 返回指定年份的开始日期的字符串格式（YYYY-MM-DD）。
   */
  const getYearStartOfDate = (num = 1) => {
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
  // 获取上个月的最后一天的日期(也可以通过传入参数来获取几个月前的最后一天日期。)
  const getMonthEndDate = (num = 1) => {
    return moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
  };
  // 根据key查找树的某条数据
  const findKeyById = (data: any, key: any, id: any) => {
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
  // 处理table数据
  const processingTableData = (data: any, key = 'children') =>
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
  // 获取选中的key
  const findKeys = (arr: any, level: any) => {
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
  // 拉平表头数组
  const DataProcess = (data: any, initAry: any = []) => {
    return data.reduce((prev: any, cur: any) => {
      if (cur.children && !isEmpty(cur.children)) {
        prev.concat(DataProcess(cur.children, prev));
      } else {
        prev.push(cur);
      }
      return prev;
    }, initAry);
  };
  // 处理树形表格数据
  const getExpandedRowKeys = (
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
  const getExpandedRowKeysId = (
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
  const getTreeItem = (list: any, val: any) => {
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (a.key === val) {
        return a;
      }
    }
  };
  /** 获取所有id+name的list */
  const useTreeItem = (data = [], keys = [], id = 'id', name = 'name') => {
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
   * @param data 数据数组，每个元素是一个键值对对象
   * @param keys 需要提取数据的键数组
   * @param mappingFields 需要映射的字段数组
   * @returns 返回一个对象，其键是mappingFields中的字段，值是对应字段在data中keys指定的键上的值数组
   */
  const getValuesForFields = (
    data: { [key: string]: any }[] = [],
    keys: string[] = [],
    mappingFields: string[] = [],
  ): { [key: string]: any[] } => {
    // 检查输入参数是否为空
    if (keys.length === 0 || mappingFields.length === 0) {
      return {};
    }

    const result: { [key: string]: any[] } = {};

    // 初始化结果对象
    mappingFields.forEach((field) => {
      result[field] = [];
    });

    // 遍历 keys 并获取对应的值
    keys.forEach((key) => {
      const item = getTreeItem(data, key);

      // 检查 item 是否存在
      if (item) {
        mappingFields.forEach((field) => {
          result[field].push(item[field]);
        });
      }
    });

    return result;
  };
  /** 获取所有当前item的key */
  const useTreePath = (data: any, keys: any) => {
    let useTreePaths = [] as any;
    keys.forEach((item: any, index: any) => {
      const list = getTreeItem(treeToArray(cloneDeep(data)), keys[index]);
      useTreePaths.push(list.path);
    });
    return useTreePaths;
  };
  /** 获取所有当前行业下拉数据 */
  const useTreeKye = (data: any, keys: any) => {
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
  const useTreeLevelItem = (data: any, level: any) => {
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
  const treeToArray = (tree: any) => {
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
  const allValuesInArrayExist = (valuesToCheck: any, referenceArray: any) => {
    for (const value of valuesToCheck) {
      if (!referenceArray.includes(value)) {
        return false;
      }
    }
    return true;
  };
  /** 判断树形是否包含数据 */
  const arrayCompare = (data: any, list: any) => {
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
  const compareArrays = (arr1: any, arr2: any) => {
    const diff = [];
    // 遍历第一个数组
    for (let i = 0; i < arr1.length; i++) {
      const item = arr1[i];
      let found = false;
      // 查找是否在第二个数组中存在相同的元素
      for (let j = 0; j < arr2.length; j++) {
        if (arr2[j] === item) {
          found = true;
          break;
        }
      }
      // 如果在第二个数组中不存在相同元素，则将其添加到diff数组中
      if (!found) {
        diff.push(item);
      }
    }
    return diff;
  };
  /** 数组分割 */
  const splitArray = (arr: any) => {
    const item = arr.pop(); // 移除并返回最后一个元素
    const lastItem = item === undefined ? [] : item;
    return { otherItems: arr, lastItem };
  };

  const diffOldValueInTree = (data: any, oldVal: any) => {
    return data.some((item: any) => {
      const { children = [], value } = item;
      if (children && children.length > 0) {
        return diffOldValueInTree(children, oldVal);
      }
      return value === oldVal;
    });
  };
  /** 获取treeName */
  const getTreeName = (list: any, val: any) => {
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
  // 处理树形表格小数点与空children
  const clearAllChildren = (items: any, childrenName = 'children') => {
    return items.map((i: any) => {
      if (i && i[childrenName] && i[childrenName].length === 0) {
        delete i[childrenName];
      } else {
        i[childrenName] = clearAllChildren(i[childrenName], childrenName);
      }
      return i;
    });
  };
  const openObjectAry = (data = []): any => {
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
  const getHeight = (height: number) => {
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

  const screenShotImage = async (domId: string) => {
    const dom = cloneDom(domId);
    const targetElement: HTMLElement | null = document.querySelector(
      `#${domId}`,
    );

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

  const disabledSecurity = (current: any) => {
    return (
      current &&
      (current < moment('2009-01-01') || current > moment().subtract(2, 'days'))
    );
  };
  const disabledProvide = (current: any) => {
    return (
      current &&
      (current < moment('2018-04-01') || current > moment().subtract(2, 'days'))
    );
  };
  const disabledInitiate = (current: any) => {
    return (
      current &&
      (current < moment('2002-01-01') || current > moment().subtract(2, 'days'))
    );
  };
  const disabledFinish = (current: any) => {
    return (
      current &&
      (current < moment('2016-12-26') || current > moment().subtract(2, 'days'))
    );
  };

  // 禁止选择今天及今天之后日期
  const disabledDate = (current: any) => {
    return current && current > moment().subtract(1, 'days').endOf('day');
  };

  // 禁止选择今天之后日期
  const disabledDateDay = (current: any) => {
    return current && current > moment().endOf('day');
  };

  // 表头高亮
  const tableColumns = (data: any, val: any) => {
    const list = cloneDeep(data);
    list.map((item: any, key: any) => {
      item.className = val === item.key ? 'highlightColor' : '';
      return item;
    });
    return list;
  };

  //判断某行是否要合并 data表格数据  colName列属性(可能有多列需要合并)
  //colName 按照从左到右的顺序写，防止第二列有重复合并的问题
  const getRowSpan = (data = [], colNameList: string[]) => {
    colNameList.forEach((colName: string, index: number) => {
      const field = 'rowSpan' + colName;
      const leftField = index ? 'rowSpan' + colNameList[index - 1] : '';
      //  增加 (!leftField || item[leftField] == 0)   为了当左侧列为不合并时使右侧列虽然同名但依然不合并该项
      data.forEach((item: any, index: number) => {
        if (item[colName] === '-') {
          item[field] = 1;
        } else if (
          data[index - 1] &&
          item[colName] === data[index - 1][colName] &&
          (!leftField || item[leftField] === 0)
        ) {
          // 判断当前行的colName和上一行是否一样  且左侧为已合并的列 一样则设置为0
          item[field] = 0;
        } else {
          // 不一样则遍历剩余的数组 判断连续出现了几次(最少一次)
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
  //递归给数据增加单位字段
  const deepAddField = (data: any, fieldObj: any, unitAttr: string) => {
    return data.map((item: any) => {
      if (item.children?.length) {
        return {
          ...item,
          children: deepAddField(item.children, fieldObj, unitAttr),
        };
      }
      return item[unitAttr] ? { ...item, ...fieldObj } : item;
    });
  };
  // 处理双日期框日期为正常参数
  const formateDateRange = (dateRange: any) => {
    const {
      date: [beginDate, endDate],
    } = dateRange;
    return {
      beginDate: beginDate.replace(/-/g, ''),
      endDate: endDate.replace(/-/g, ''),
    };
  };

  const openObjectArry = (data = []) => {
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
  //percentage中的列乘100 并处理小数
  const percentageHandler = (
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
   * 合并对象中的指定字段值到一个新的字段，并在字段值之间添加分隔符
   * 如果数据是树结构，则递归处理每个节点的子节点
   *
   * @param data - 需要处理的数据数组，数组中的每个元素都是一个对象
   * @param options - 包含合并选项的对象
   * @param options.fields - 需要合并的字段名称数组
   * @param options.targetField - 合并后的新字段名称
   * @param options.Separator - 合并字段值时使用的分隔符，默认为'*'
   * @returns 返回处理后的数据数组
   */
  const mergeFieldsOnTree = (
    data: any[],
    options: { fields?: string[]; targetField?: string; Separator?: string } = {
      fields: [],
      targetField: '',
      Separator: '*',
    },
  ) => {
    // 解构赋值方式提取options中的属性，提供默认值
    const { fields = [], targetField = '', Separator = '*' } = options;

    // 遍历数据数组中的每个元素
    data.forEach((element: any) => {
      // 如果指定了合并后的字段名和至少一个需要合并的字段，则执行合并操作
      if (targetField && fields.length > 0) {
        // 使用reduce函数将指定的字段值合并，并添加到新的字段中
        element[targetField] = fields.reduce((acc, cur) => {
          return acc + Separator + element[cur];
        }, '');
      }

      // 如果当前元素有子节点且子节点数量大于0，则递归调用mergeFieldsOnTree函数处理子节点
      if (element.children && element.children.length > 0) {
        mergeFieldsOnTree(element.children, options);
      }
    });

    // 返回处理后的数据数组
    return data;
  };

  const getFirstOrDefault = (
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
   * @param {Array} treeArray - 树形结构数组
   * @param {string} childrenKey - 子节点数组的键名，默认为'children'
   * @returns {Object|null} 找到的第一个叶子节点，没有找到则返回null
   */
  const findFirstLeafNodeInArray: any = (
    treeArray: any[],
    childrenKey = 'children',
  ) => {
    // 检查参数有效性
    if (!Array.isArray(treeArray) || treeArray.length === 0) {
      return null;
    }

    // 遍历数组中的每个节点
    for (const node of treeArray) {
      if (typeof node !== 'object' || node === null) {
        continue;
      }

      // 检查当前节点是否有子节点
      const hasChildren =
        node[childrenKey] &&
        Array.isArray(node[childrenKey]) &&
        node[childrenKey].length > 0;

      // 如果是叶子节点，直接返回
      if (!hasChildren) {
        return node;
      }

      // 如果不是叶子节点，递归检查其子节点
      const leafNode = findFirstLeafNodeInArray(node[childrenKey], childrenKey);
      if (leafNode) {
        return leafNode;
      }
    }
    // 遍历完所有节点都没有找到叶子节点
    return null;
  };

  /**
   * 递归遍历树形数组并根据条件函数设置disabled属性
   * @param {Array} treeArray - 树形结构数组
   * @param {Function} conditionFn - 条件判断函数，返回true时将节点disabled设为true
   * @param {string} childrenKey - 子节点数组的键名，默认为'children'
   * @returns {Array} 返回处理后的新树形数组
   */
  const setDisabledByCondition = (
    treeArray: any[],
    conditionFn: (node: any) => boolean,
    childrenKey = 'children',
  ) => {
    // 检查参数有效性
    if (!Array.isArray(treeArray)) {
      return [];
    }
    if (typeof conditionFn !== 'function') {
      return treeArray;
    }

    // 创建新数组避免修改原数据
    return treeArray.map((node) => {
      // 创建节点副本
      const newNode = { ...node };

      // 根据条件函数设置disabled属性
      if (conditionFn(newNode)) {
        newNode.disabled = true;
      }

      // 递归处理子节点（如果有）
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

  return {
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
    unitOption,
    moneyList,
    DateOptions,
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
};
