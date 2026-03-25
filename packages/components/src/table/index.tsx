import { Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { VList } from 'virtuallist-antd';
import './index.less';
//  获取有几级表头
const calculateDepth = (arr: any, depth = 0) => {
  let maxDepth = depth;
  if (arr !== null && arr !== undefined) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.children && obj.children.length > 0) {
        const childDepth = calculateDepth(obj.children, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    }
  }
  return maxDepth;
};
/**
 *
 * @param props
 * lineHeight 表头行高
 * paddingNum=表格上下的边距24*2
 */
export default (props: any) => {
  const {
    size = 'middle',
    bordered = true,
    pagination = false,
    rowKey = 'id',
    id = 'independent',
    height,
    isScroll = true,
    columns,
    dataSource,
    isVirtualTable,
    virtualId = 'virtualTableid',
    lineHeight = 40,
    paddingNum = 48,
  } = props;

  const paginationHieght = pagination ? 60 : 0;

  const [headerHeight, setHeaderHeight] = useState<number>(0);
  // 计算表头高度
  const countHeight = () => {
    setTimeout(() => {
      let num = 0;
      const depth = calculateDepth(columns);
      if (columns) {
        num += (depth + 1) * lineHeight;
      }
      setHeaderHeight(num);
    });
  };
  useEffect(countHeight, [columns, dataSource]);
  useEffect(countHeight, []);
  const vList = useMemo(
    () =>
      VList({ vid: virtualId, resetTopWhenDataChange: false, height: height }),
    [height, virtualId],
  );
  return (
    <Table
      id={id}
      size={size}
      bordered={bordered}
      pagination={pagination}
      rowKey={rowKey}
      scroll={{
        y: `${Math.floor(
          height - headerHeight - paddingNum - paginationHieght,
        )}px`,
      }}
      {...props}
      components={isVirtualTable ? vList : undefined}
    ></Table>
  );
};
