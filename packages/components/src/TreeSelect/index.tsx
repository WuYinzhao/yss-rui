import { TreeSelect } from 'antd';
import { useMemo, useState } from 'react';
import TreeRender from './treeRender';

export const Component = (props: any) => {
  const {
    treeData = [],
    value = [],
    onChange,
    fieldNames = { label: 'label', value: 'value', children: 'children' },
    queryloading = false,
    ...other
  } = props;
  const [search, setSearchValue] = useState('');

  const checkAll = useMemo(() => {
    return treeData.length === value.length;
  }, [treeData, value]);

  const onCheckAll = (checked: boolean) => {
    onChange(
      checked ? treeData.map((item: any) => item[fieldNames.value]) : [],
    );
  };

  return (
    <TreeSelect
      treeCheckable={true}
      fieldNames={fieldNames}
      treeData={treeData}
      onChange={(value) => {
        onChange(value);
      }}
      onSearch={(value) => {
        setSearchValue(value);
      }}
      value={value}
      dropdownRender={(node) => {
        return (
          <TreeRender
            hasData={treeData.length > 0 ? true : false}
            search={search}
            loading={queryloading}
            checkAllStatus={checkAll}
            onCheckAll={(checked) => {
              onCheckAll(checked);
            }}
          >
            {node}
          </TreeRender>
        );
      }}
      showArrow
      {...other}
    ></TreeSelect>
  );
};

export default Component;
