import type { SelectProps } from 'antd';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(AntdSelect)`
  width: fit-content !important;
  .ant-select-selector {
    padding: 5px 12px !important;
  }
  .ant-select-selection-wrap {
    display: flex;
    gap: 8px;
  }
  .ant-select-selection-item,
  .ant-select-arrow,
  &.ant-select-open .ant-select-selection-item {
    color: ${(props) => props.theme.antd.colorText};
  }
  &:hover:not(.ant-select-open) .ant-select-selection-item,
  &:hover:not(.ant-select-open) .ant-select-arrow {
    color: ${(props) => props.theme.antd.colorPrimary};
  }
  .ant-select-dropdown {
    width: 190px !important;
  }
  .ant-select-item-option-selected {
    font-weight: 400 !important;
    color: ${(props) => props.theme.antd.colorPrimary} !important;
  }
`;

const Select = (props: SelectProps) => {
  return (
    <StyledSelect {...props} getPopupContainer={(triggerNode) => triggerNode.parentElement!} />
  );
};

export default Select;
