import { Checkbox, Divider, Spin } from 'antd';
import { ReactNode } from 'react';
import './index.less';
interface PropType {
  hasData: boolean;
  children: ReactNode;
  loading: boolean;
  search: string;
  checkAllStatus: boolean;
  onCheckAll: (status: boolean) => void;
}
export default (props: PropType) => {
  const { children, loading, search, hasData, checkAllStatus, onCheckAll } =
    props;
  return (
    <Spin spinning={loading}>
      {search || !hasData ? (
        <></>
      ) : (
        <>
          <Checkbox
            style={{ marginLeft: 12 }}
            checked={checkAllStatus}
            onClick={() => onCheckAll(!checkAllStatus)}
          >
            全选
          </Checkbox>
          <Divider style={{ margin: '4px 0' }} />
        </>
      )}
      <div className="custom-tree-render">{children}</div>
    </Spin>
  );
};
