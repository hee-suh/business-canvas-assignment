import Table from '@/components/ui/Table';
import { defaultRecords, fields } from '@/features/MemberList/data/memberData';
import type { MemberRecord } from '@/models/member.interface';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Checkbox, Dropdown } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';
import { useState } from 'react';

interface MemberTableProps {
  showModal: (id: string) => void;
}

const columns = [
  ...fields.map((field) => ({
    title: field.label,
    dataIndex: field.name,
    key: field.name,
    render: (value: string | boolean) =>
      field.type === 'checkbox' ? <Checkbox checked={Boolean(value)} /> : value,
    filters: [], // TODO: filtering
  })),
];

export default function MemberTable({ showModal }: MemberTableProps) {
  const [records, setRecords] = useState(defaultRecords);
  const [recordId, setRecordId] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const handleClickAction = (id: string) => {
    setRecordId(id);
  };

  const handleClickEdit = () => {
    showModal(recordId);
  };

  const handleClickRemove = () => {};

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
        <Button type="text" onClick={handleClickEdit}>
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
        <Button type="text" danger onClick={handleClickRemove}>
          삭제
        </Button>
      ),
    },
  ];

  return (
    <Table<MemberRecord>
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
