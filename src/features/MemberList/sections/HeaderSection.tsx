import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

interface HeaderSectionProps {
  showModal: (id?: string) => void;
}

export default function HeaderSection({ showModal }: HeaderSectionProps) {
  return (
    <Flex justify="space-between" align="center" style={{ paddingBlock: 8, paddingInline: 14 }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        회원 목록
      </Typography.Title>
      <Button color="primary" variant="solid" icon={<PlusOutlined />} onClick={() => showModal()}>
        추가
      </Button>
    </Flex>
  );
}
