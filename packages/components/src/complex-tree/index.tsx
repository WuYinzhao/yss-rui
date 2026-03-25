import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import outdent from '../assets/images/outdent.svg';
import BaseTree from './baseTree';
import './index.less';
import { DivIcon, Open, Packup } from './styled';
import {
  arrayTreeFilter,
  filterFn,
  getAllKeysForTreeData,
  getFirstLevelKeys,
} from './utils';
/*
props父组件传值
width：左侧菜单宽度
treeData  data数据
title prohibitSubordinates是多选（父子不关联）
*/
export default (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [treeList, setTreeList] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const {
    width = 280,
    treeData,
    checkedKeys,
    describeTips = 'Ctrl+选中：全选所有子节点',
    toggleData = [], //切换组合树
    toggleKey = '', //切换组合树的key
    disabledItemFunc,
    showLine = true,
    switcherIcon = true,
    onClickToggle,
    onClickCheck,
    isCtrl = false, // 是否启用按住ctrl选中子节点
    multiple_check = true, // 是否为多选
    checkStrictly = true, // 是否禁用父子关联属性
    disableChildren = false, //父节点选中后是否禁用子节点
  } = props;

  /** 初始化tree数据 */
  useEffect(() => {
    const treeList = getTreeDataForSearch(searchValue);
    setTreeList(treeList);
    const result = getFirstLevelKeys(treeList);
    setExpandedKeys(result);
  }, [treeData]);

  //切换树
  const onChangeToggle = (val: any) => {
    onClickToggle && onClickToggle(val);
  };

  //展开全部
  const expandAll = () => {
    const reselt = getAllKeysForTreeData(treeList);
    setExpandedKeys(reselt);
  };

  // 收起
  const collapseAll = () => {
    setExpandedKeys([]);
  };

  // 单个展开
  const onExpand = (val: any) => {
    if (isEmpty(val)) return;
    setExpandedKeys(val);
  };

  // 通过筛选获取需要展示的treeData
  const getTreeDataForSearch = (val: any) => {
    const treeList = cloneDeep(treeData);
    if (val === '') {
      return treeList;
    } else {
      return arrayTreeFilter(treeList, filterFn, val);
    }
  };

  // 搜索
  const onChangeSearch = (e: any) => {
    if (isEmpty(e.target)) return;
    let value = e.target.value;
    setSearchValue(value);
    const result: any = getTreeDataForSearch(value);
    setTreeList(result);
    if (value === '') {
      const expKeys = getFirstLevelKeys(result);
      setExpandedKeys(expKeys);
    } else {
      const expKeys: any = getAllKeysForTreeData(result);
      setExpandedKeys(expKeys);
    }
  };

  return (
    <div
      id="complex-tree"
      className={collapsed ? 'complex-tree-shrink' : ''}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        flex: `0 0 ${width}px`,
        height: '100%',
      }}
    >
      <div className="collapsed" onClick={() => setCollapsed(!collapsed)}>
        <img
          src={outdent}
          style={{
            transform: collapsed ? 'rotate(180deg)' : '',
          }}
          alt=""
        />
      </div>
      <div
        style={{
          display: collapsed ? 'none' : switcherIcon ? 'block' : 'none',
          marginBottom: '8px',
        }}
      >
        <div className="search">
          <Input
            placeholder="快速检索"
            size="middle"
            suffix={<SearchOutlined />}
            bordered={false}
            onChange={onChangeSearch}
          />
          <DivIcon>
            <Open onClick={expandAll}></Open>
            <i></i>
            <Packup onClick={collapseAll}></Packup>
          </DivIcon>
        </div>
      </div>
      <div
        style={{
          display: collapsed ? 'none' : toggleData.length ? 'block' : 'none',
          marginBottom: '2px',
        }}
      >
        <div className="toggle-container">
          {toggleData.length &&
            toggleData.map((item: any) => (
              <span
                onClick={() => {
                  onChangeToggle(item.value);
                }}
                key={item.value}
                className={
                  toggleKey === item.value || toggleData.length === 1
                    ? 'toggle-item-active'
                    : ''
                }
                title={item.label}
              >
                {item.label}
              </span>
            ))}
        </div>
      </div>
      <div
        style={{ display: collapsed ? 'none' : isCtrl ? 'block' : 'none' }}
        className="isCtrlStr"
      >
        {describeTips}
      </div>
      <div
        style={{
          display: collapsed ? 'none' : 'block',
          height: `calc(100% - 88px - ${isCtrl ? '32px' : '0px'} - ${
            toggleData.length ? '30px' : '0px'
          })`,
          padding: '8px  0 0 12px',
          background: '#fff',
        }}
      >
        <BaseTree
          showLine={showLine}
          switcherIcon={switcherIcon}
          checkedKeys={checkedKeys}
          treeList={treeList}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          disabledItemFunc={disabledItemFunc}
          searchValue={searchValue}
          onClickCheck={onClickCheck}
          disableChildren={disableChildren}
          checkStrictly={checkStrictly}
          isCtrl={isCtrl}
          multiple_check={multiple_check}
        ></BaseTree>
      </div>
    </div>
  );
};
