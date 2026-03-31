/** 用于处理对象数组 的公共方法*/
/** 将对象数据按照字段展开成数组 */
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

/** 获取对象数组中的第一个元素的值 */
export const getFirstOrDefault = (
  data: Array<{ [key: string]: string }>,
  key: string = 'key',
) => {
  if (data && data.length > 0) {
    return data[0][key];
  }
  return '';
};
