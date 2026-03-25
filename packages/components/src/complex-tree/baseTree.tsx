import { Tree } from 'antd';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { findParentKeys, getAllKeysForTreeData, macSystem } from './utils';
const { TreeNode } = Tree;

const isMac = macSystem();
export default (props: any) => {
  const {
    searchValue = '',
    treeList,
    checkedKeys,
    expandedKeys,
    showLine = true,
    switcherIcon = true,
    disabledItemFunc,
    onClickCheck,
    onExpand,
    isCtrl = false, // 是否启用按住ctrl选中子节点
    multiple_check = true, // 是否为多选
    checkStrictly = true, // 是否禁用父子关联属性
    disableChildren = false, //父节点选中后是否禁用子节点
  } = props;

  const ctrlRef = useRef<boolean>(false);

  /** 监听键盘事件 */
  useEffect(() => {
    if (isCtrl) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  // Ctrl按下
  const handleKeyDown = (event: KeyboardEvent) => {
    const { keyCode, key } = event;
    const isControl = isMac ? key === 'Meta' : keyCode === 17;
    if (!isControl) {
      return;
    }
    ctrlRef.current = true;
  };
  // Ctrl弹起
  const handleKeyUp = (event: KeyboardEvent) => {
    const { keyCode, key } = event;
    const isControl = isMac ? key === 'Meta' : keyCode === 17;
    if (!isControl) {
      return;
    }
    ctrlRef.current = false;
  };

  const getItemDisabled = (item: any): boolean | undefined => {
    // 满足项返回数据为禁用，或者有在前端逻辑内禁用 两个条件均满足其一则使节点处于禁用状态
    return item.disabled || (disabledItemFunc ? disabledItemFunc(item) : false);
  };
  /***
   * 整合checkedKes,
   * 逻辑：
   * 当checked 为true 即选中时，需要将checkedKeys和当前点击的currentClickedKeys去重合并
   * 当checked 为false 即取消勾选时，需要从checkedKeys中去除掉当前点击的currentClickedKeys
   */
  const integrateKeys = (currentClickedKeys: string[], checked: boolean) => {
    if (checked) {
      return _.union(checkedKeys, currentClickedKeys);
    } else {
      return _.difference(checkedKeys, currentClickedKeys);
    }
  };

  // 点击选中
  const onCheck = (val: any, e: any) => {
    const { checked, node } = e;
    let currentClickedKeys = [];
    // 当前节点为点击选中状态时或者为多选节点时，需要获取到当前节点点击后影响的所有key
    if (checked || multiple_check) {
      //选中时  父子不关联或者没有按下ctrl时为单选
      if (checkStrictly && !ctrlRef.current) {
        currentClickedKeys.push(node.key);
      } else {
        currentClickedKeys = getAllKeysForTreeData([node], getItemDisabled);
        if (!checked) {
          currentClickedKeys.push(...findParentKeys(treeList, node.key));
        }
      }
    }
    // 如果为多选的话 则合并原来的checkKeys并去重
    if (multiple_check) {
      const result = integrateKeys(currentClickedKeys, checked);
      onClickCheck && onClickCheck(result, e);
    } else {
      onClickCheck && onClickCheck(currentClickedKeys, e);
    }
  };
  // 处理树
  const renderTreeNode = (data: any, disabled = false) => {
    //生成树结构函数
    if (data.length === 0) {
      return;
    }
    return data.map((item: any) => {
      const index = item.name.indexOf(searchValue);
      const beforeStr = item.name.substr(0, index);
      const afterStr = item.name.substr(index + searchValue.length);
      const name =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.name}</span>
        );
      if (item.children && item.children?.length > 0) {
        const childDisabled =
          disableChildren && (disabled || checkedKeys.includes(item.key));
        return (
          <TreeNode
            key={item.key}
            title={name}
            data={item}
            disabled={disabled || getItemDisabled(item)}
          >
            {renderTreeNode(item.children, childDisabled)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.key}
          title={name}
          disabled={disabled || getItemDisabled(item)}
          data={item}
        ></TreeNode>
      );
    });
  };

  return (
    <Tree
      showLine={showLine}
      style={{
        overflow: 'auto',
        position: 'relative',
        height: '100%',
        ...(typeof switcherIcon === 'boolean'
          ? { '--switcherIcon': switcherIcon ? '1' : '0' }
          : {}),
      }}
      checkable
      checkStrictly
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      checkedKeys={checkedKeys}
      onCheck={onCheck}
    >
      {renderTreeNode(treeList)}
    </Tree>
  );
};
