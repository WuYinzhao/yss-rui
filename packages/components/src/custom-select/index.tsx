import { TreeSelect } from 'antd';
import { useMemo, useState } from 'react';
import TreeRender from './treeRender';
import type { CustomSelectProps } from './type';

export default (props: CustomSelectProps) => {
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
    onChange?.(
      checked
        ? (treeData.map(
            (item) =>
              (item as Record<string, unknown>)[fieldNames.value as string],
          ) as string[])
        : [],
    );
  };

  return (
    <TreeSelect
      treeCheckable={true}
      fieldNames={fieldNames}
      treeData={treeData}
      onChange={(value) => {
        onChange?.(value as string[]);
      }}
      onSearch={(value) => {
        setSearchValue(value);
      }}
      value={value}
      popupRender={(node) => {
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
      {...other}
    ></TreeSelect>
  );
};
