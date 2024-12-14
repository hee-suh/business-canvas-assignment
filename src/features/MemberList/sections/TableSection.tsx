import type { Key } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { ColumnGroupType, ColumnType, TableRowSelection } from 'antd/es/table/interface';

import Checkbox from '@/components/ui/Checkbox';
import Table from '@/components/ui/Table';
import { createActionColumn } from '@/components/ui/Table/utils/createActionColumn';
import { createColumnFilters } from '@/components/ui/Table/utils/createColumnFilters';
import { fields } from '@/features/MemberList/data/memberData';
import { memberStorageOperation } from '@/features/MemberList/services/memberStorage';
import type { MemberRecord } from '@/models/member.interface';

interface TableSectionProps {
  records: MemberRecord[];
  updateRecords: VoidFunction;
  showModal: (id: string) => void;
}

export default function TableSection({ records, updateRecords, showModal }: TableSectionProps) {
  const recordIdRef = useRef<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelecteRowKeys: Key[]) => {
    setSelectedRowKeys(newSelecteRowKeys);
  };

  const rowSelection: TableRowSelection<MemberRecord> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClickAction = (id: string) => {
    recordIdRef.current = id;
  };

  const handleClickUpdate = useCallback(() => {
    if (recordIdRef.current) {
      showModal(recordIdRef.current);
    }
  }, [showModal]);

  const handleClickDelete = useCallback(() => {
    if (recordIdRef.current) {
      memberStorageOperation(recordIdRef.current);
    }
    updateRecords();
  }, [updateRecords]);

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
  }, [handleClickDelete, handleClickUpdate]);

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
    [actionColumn, records],
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
