import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

const Modal = styled(AntdModal)`
  .ant-modal-content {
    padding: 0;
  }
  .ant-modal-header {
    padding: 12px 16px;
    border: 1px solid ${(props) => props.theme.antd.colorBorderSecondary};
  }
  .ant-modal-body {
    padding: 10px 24px 0 24px;
  }
  .ant-modal-footer {
    padding: 12px 16px;
    background-color: ${(props) => props.theme.antd.colorFillAlter};
    border: 1px solid ${(props) => props.theme.antd.colorSplit};
  }
  .ant-form-item-label > label {
    color: ${(props) => props.theme.antd.colorTextTertiary};
  }
`;

export default Modal;
