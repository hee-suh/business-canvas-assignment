import { DatePicker as AntdDatePicker } from 'antd';
import styled from 'styled-components';

const DatePicker = styled(AntdDatePicker)`
  padding: 5px 12px !important;
  .ant-picker-input > input {
    width: 116px;
  }
`;

export default DatePicker;
