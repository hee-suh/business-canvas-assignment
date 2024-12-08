import { Checkbox } from 'antd';
import styled from 'styled-components';

export const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  .ant-checkbox-wrapper {
    padding: 5px 0 5px 12px;
  }
`;
