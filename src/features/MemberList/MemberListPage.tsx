import { useEffect, useState } from 'react';

import { defaultRecords } from '@/features/MemberList/data/memberData';
import HeaderSection from '@/features/MemberList/sections/HeaderSection';
import ModalSection from '@/features/MemberList/sections/ModalSection';
import TableSection from '@/features/MemberList/sections/TableSection';
import type { MemberRecord } from '@/models/member.interface';
import { storage } from '@/utils/storage';

export default function MemberListPage() {
  const [records, setRecords] = useState<MemberRecord[]>([]);
  const [recordId, setRecordId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const members = storage.getItem('members');
    if (!members) {
      storage.setItem('members', defaultRecords);
      setRecords(defaultRecords);
    } else {
      setRecords(members);
    }
  }, []);

  const updateRecords = () => {
    setRecords(storage.getItem('members') || []);
  };

  const showModal = (id?: string) => {
    setRecordId(id || '');
    setIsModalOpen(true);
  };

  const closeFormModal = () => {
    setRecordId('');
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderSection showModal={showModal} />
      <ModalSection
        id={recordId}
        isOpen={isModalOpen}
        closeModal={closeFormModal}
        updateRecords={updateRecords}
      />
      <TableSection records={records} updateRecords={updateRecords} showModal={showModal} />
    </>
  );
}
