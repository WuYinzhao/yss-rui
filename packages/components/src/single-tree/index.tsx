import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import './index.less';

/*
props父组件传值

width：左侧菜单宽度
selectedKeys  默认选中
treeData  data数据
onSelectKeys 事件名称
size  大小
showSwitcher  是否显示展开收起按钮
*/
export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    treeData,
    selectedKeys,
    width = 280,
    onSelectKeys,
    size = 'large',
    showSwitcher = false,
  } = props;
  const onSelect = (key: any, e: any) => {
    if (isEmpty(key)) return;
    onSelectKeys && onSelectKeys(key[0], e.node);
  };
  return (
    <div
      id="sider-tree"
      className={[
        collapsed ? 'pack-sider' : 'unfold-sider',
        `sider-tree-${size}`,
        showSwitcher ? 'show-switcher' : '',
      ].join(' ')}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        flex: `0 0 ${width}px`,
      }}
    >
      <div className="collapsed">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          },
        )}
      </div>
      <div
        style={{
          display: collapsed ? 'none' : 'block',
          height: 'calc(100% - 24px)',
        }}
        className="SiderIndex"
      >
        {treeData.length > 0 && (
          <Tree
            style={{ overflow: 'auto', position: 'relative', height: '100%' }}
            defaultExpandAll
            fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            treeData={treeData}
            selectedKeys={[selectedKeys]}
            onSelect={onSelect}
          ></Tree>
        )}
      </div>
    </div>
  );
};
