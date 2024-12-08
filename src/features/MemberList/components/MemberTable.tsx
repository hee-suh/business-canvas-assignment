import Checkbox from '@/components/ui/Checkbox';
import Table from '@/components/ui/Table';
import { createActionColumn } from '@/components/ui/Table/utils/createActionColumn';
import { createColumnFilters } from '@/components/ui/Table/utils/createColumnFilters';
import { fields } from '@/features/MemberList/data/memberData';
import { memberStorageOperation } from '@/features/MemberList/services/memberStorage';
import type { MemberRecord } from '@/models/member.interface';
import type { ColumnGroupType, ColumnType, TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';
import { useMemo, useState } from 'react';

interface MemberTableProps {
  records: MemberRecord[];
  updateRecords: VoidFunction;
  showModal: (id: string) => void;
}

export default function MemberTable({ records, updateRecords, showModal }: MemberTableProps) {
  const [recordId, setRecordId] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelecteRowKeys: Key[]) => {
    setSelectedRowKeys(newSelecteRowKeys);
  };

  const rowSelection: TableRowSelection<MemberRecord> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClickAction = (id: string) => {
    setRecordId(id);
  };

  const handleClickUpdate = () => {
    showModal(recordId);
  };

  const handleClickDelete = () => {
    memberStorageOperation(recordId);
    updateRecords();
  };

  const actionColumn = useMemo(() => {
    return createActionColumn<MemberRecord>(
      [
        { key: 'edit', label: '수정', onClick: handleClickUpdate },
        { key: 'delete', label: '삭제', danger: true, onClick: handleClickDelete },
      ],
      (record) => {
        if (record) {
          handleClickAction(record.id);
        }
      },
    );
  }, [showModal, updateRecords]);

  const columns: (ColumnType<MemberRecord> | ColumnGroupType<MemberRecord>)[] = useMemo(
    () => [
      ...fields.map((field) => ({
        title: field.label,
        dataIndex: field.name,
        key: field.name,
        render: (value: string | boolean) =>
          field.type === 'checkbox' ? <Checkbox checked={Boolean(value)} /> : value,
        ...createColumnFilters<MemberRecord>(field.type, field.name, records),
      })),
      actionColumn,
    ],
    [actionColumn],
  );

  return (
    <Table<MemberRecord>
      className="member-table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={records.map((record, index) => ({ ...record, key: index }))}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
