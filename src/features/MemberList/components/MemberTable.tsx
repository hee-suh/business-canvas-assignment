import Checkbox from '@/components/ui/Checkbox';
import Table from '@/components/ui/Table';
import { fields } from '@/features/MemberList/data/memberData';
import { memberStorageOperation } from '@/features/MemberList/services/memberStorage';
import type { MemberRecord } from '@/models/member.interface';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps, TableColumnType } from 'antd';
import { Button, Dropdown } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';
import { useState } from 'react';

interface MemberTableProps {
  records: MemberRecord[];
  updateRecords: VoidFunction;
  showModal: (id: string) => void;
}

export default function MemberTable({ records, updateRecords, showModal }: MemberTableProps) {
  const [recordId, setRecordId] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const getColumnFilterProps = (dataIndex: keyof MemberRecord): TableColumnType<MemberRecord> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
      const uniqueOptions = [...new Set(records.map((item) => item[dataIndex]))]
        .filter((x) => x !== undefined && x !== null && x !== '')
        .map((option) => {
          return {
            label:
              dataIndex === 'emailSubscription'
                ? option
                  ? '선택됨'
                  : '선택 안함'
                : String(option),
            value: option,
          };
        });

      return (
        <Checkbox.Group
          options={uniqueOptions}
          value={selectedKeys as (string | boolean)[]}
          onChange={(checkedValues) => {
            setSelectedKeys(checkedValues as Key[]);
            confirm();
          }}
        />
      );
    },
    onFilter: (value, record) => {
      const field = record[dataIndex];
      if (dataIndex === 'emailSubscription') {
        return value === field;
      } else {
        return String(field).includes(String(value));
      }
    },
  });

  const columns = [
    ...fields.map((field) => ({
      title: field.label,
      dataIndex: field.name,
      key: field.name,
      render: (value: string | boolean) =>
        field.type === 'checkbox' ? <Checkbox checked={Boolean(value)} /> : value,
      ...getColumnFilterProps(field.name),
    })),
  ];

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

  const onSelectChange = (newSelecteRowKeys: Key[]) => {
    setSelectedRowKeys(newSelecteRowKeys);
  };

  const rowSelection: TableRowSelection<MemberRecord> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: (
        <Button type="text" onClick={handleClickUpdate}>
          수정
        </Button>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'remove',
      label: (
        <Button type="text" danger onClick={handleClickDelete}>
          삭제
        </Button>
      ),
    },
  ];

  return (
    <Table<MemberRecord>
      className="member-table"
      rowSelection={rowSelection}
      columns={[
        ...columns,
        {
          key: 'actions',
          render: (_, record) => (
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button
                type="text"
                icon={<MoreOutlined />}
                onClick={() => handleClickAction(record.id)}
              />
            </Dropdown>
          ),
        },
      ]}
      dataSource={records.map((record, index) => ({ ...record, key: index }))}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
