import MemberFormModal from '@/features/MemberList/components/MemberFormModal';
import MemberTable from '@/features/MemberList/components/MemberTable';
import { defaultRecords } from '@/features/MemberList/data/memberData';
import type { MemberRecord } from '@/models/member.interface';
import { storage } from '@/utils/storage';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';

export default function MemberList() {
  const [records, setRecords] = useState<MemberRecord[]>([]);
  const [recordId, setRecordId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const members = storage.getItem('members');
    if (!members) {
      storage.setItem('members', defaultRecords);
    }
    setRecords(storage.getItem('members'));
  }, []);

  const showModal = (id?: string) => {
    if (id) {
      setRecordId(id);
    }
    setIsModalOpen(true);
  };

  const closeFormModal = () => {
    setRecordId('');
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ paddingBlock: 8, paddingInline: 14 }}>
        <Typography.Title level={5} style={{ marginTop: 0 }}>
          회원 목록
        </Typography.Title>
        <Button color="primary" variant="solid" icon={<PlusOutlined />} onClick={() => showModal()}>
          추가
        </Button>
        <MemberFormModal id={recordId} isOpen={isModalOpen} closeModal={closeFormModal} />
      </Flex>
      <MemberTable records={records} showModal={showModal} />
    </>
  );
}
