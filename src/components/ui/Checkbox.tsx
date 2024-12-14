import { forwardRef } from 'react';

import { Checkbox as AntdCheckbox } from 'antd';
import styled from 'styled-components';

const StyledCheckboxGroup = styled(AntdCheckbox.Group)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  .ant-checkbox-wrapper {
    padding: 5px 0 5px 12px;
  }
`;

const Checkbox = forwardRef((props, ref) => (
  <AntdCheckbox {...props} ref={ref} />
)) as typeof AntdCheckbox;

Checkbox.Group = StyledCheckboxGroup;

export default Checkbox;
