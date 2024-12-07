import MemberFormModal from '@/features/MemberList/components/MemberFormModal';
import MemberTable from '@/features/MemberList/components/MemberTable';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useState } from 'react';

export default function MemberList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberId, setMemberId] = useState('');

  const showModal = (id?: string) => {
    if (id) {
      setMemberId(id);
    }
    setIsModalOpen(true);
  };

  const closeFormModal = () => {
    setMemberId('');
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
        <MemberFormModal id={memberId} isOpen={isModalOpen} closeModal={closeFormModal} />
      </Flex>
      <MemberTable showModal={showModal} />
    </>
  );
}
