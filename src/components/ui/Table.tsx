import { Table as AntdTable, TableProps } from 'antd';
import styled from 'styled-components';

const StyledTableWrapper = styled.div`
  th {
    border-top: 1px solid ${(props) => props.theme.antd.colorSplit};
    padding: 8px !important;
  }
  td.ant-table-selection-column {
    border-right: 1px solid ${(props) => props.theme.antd.colorSplit};
    border-left: 1px solid ${(props) => props.theme.antd.colorSplit};
  }
  .ant-table-filter-dropdown {
    border-radius: 10px;
  }
`;

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return (
    <StyledTableWrapper>
      <AntdTable
        {...props}
        getPopupContainer={(triggerNode) =>
          triggerNode.closest('.ant-table-container') || document.body
        } // .ant-table-filter-dropdown을 테이블 내부로 이동시켜 css 커스터마이징
      />
    </StyledTableWrapper>
  );
}

Table.displayName = 'StyledTable';

export default Table;
