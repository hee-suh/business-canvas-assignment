import { Input as AntdInput } from 'antd';
import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled(AntdInput.TextArea)`
  border-radius: 10px;
  height: 64px !important;
`;

const Input = forwardRef((props, ref) => <AntdInput {...props} ref={ref} />) as typeof AntdInput;

Input.TextArea = StyledTextArea;

export default Input;
