import { Table as AntdTable, TableProps } from 'antd';
import styled from 'styled-components';

const StyledTableWrapper = styled.div`
  th {
    border-top: 1px solid ${(props) => props.theme.antd.colorSplit};
  }
  td.ant-table-selection-column {
    border-right: 1px solid ${(props) => props.theme.antd.colorSplit};
    border-left: 1px solid ${(props) => props.theme.antd.colorSplit};
  }
`;

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return (
    <StyledTableWrapper>
      <AntdTable {...props} />
    </StyledTableWrapper>
  );
}

Table.displayName = 'StyledTable';

export default Table;
