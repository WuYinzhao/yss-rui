import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { isEmpty } from 'lodash';
import type { Key } from 'react';
import './index.less';
import type { SingleTreeProps } from './type';

/*
props父组件传值

width：左侧菜单宽度
selectedKeys  默认选中
treeData  data数据
onSelectKeys 事件名称
size  大小
showSwitcher  是否显示展开收起按钮
*/
export default (props: SingleTreeProps) => {
  const {
    treeData,
    selectedKeys,
    onSelectKeys,
    size = 'large',
    showSwitcher = false,
  } = props;
  const onSelect = (key: Key[], e: { node: DataNode }) => {
    if (isEmpty(key)) return;
    onSelectKeys && onSelectKeys(key[0], e.node);
  };
  return (
    <div
      style={{
        height: 'calc(100% - 24px)',
      }}
      className={[
        'single-tree',
        `sider-tree-${size}`,
        showSwitcher ? 'show-switcher' : '',
      ].join(' ')}
    >
      {treeData.length > 0 && (
        <Tree
          style={{ overflow: 'auto', position: 'relative', height: '100%' }}
          defaultExpandAll
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          treeData={treeData}
          selectedKeys={selectedKeys !== null ? [selectedKeys as Key] : []}
          onSelect={onSelect}
        ></Tree>
      )}
    </div>
  );
};
