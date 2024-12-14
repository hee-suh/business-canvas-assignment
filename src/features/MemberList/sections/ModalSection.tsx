import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Flex, Form, Typography } from 'antd';
import dayjs from 'dayjs';

import InputFactory from '@/components/InputFactory';
import Modal from '@/components/ui/Modal';
import { fields } from '@/features/MemberList/data/memberData';
import { memberStorageOperation } from '@/features/MemberList/services/memberStorage';
import type { MemberField, MemberRecord } from '@/models/member.interface';
import { storage } from '@/utils/storage';

interface ModalSectionProps {
  id?: string;
  isOpen: boolean;
  closeModal: VoidFunction;
  updateRecords: VoidFunction;
}

const initialValues = {
  name: '',
  address: '',
  memo: '',
  joinDate: null,
  job: '개발자',
  emailSubscription: false,
};

export default function ModalSection({ id, isOpen, closeModal, updateRecords }: ModalSectionProps) {
  const [submittable, setSubmittable] = useState(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    if (!id) return;

    const records = storage.getItem<MemberRecord[]>('members') ?? [];
    const member = records.find((record) => record.id === id);

    if (member) {
      form.setFieldsValue({ ...member, joinDate: dayjs(member.joinDate) });
    } else {
      closeModal();
    }
  }, [closeModal, form, id]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleClickSave = () => {
    const memberRecord = {
      ...values,
      joinDate: values.joinDate.format('YYYY-MM-DD'),
    };

    try {
      memberStorageOperation(id, memberRecord);
      updateRecords();
    } catch {
      alert('회원 정보를 저장하는 중 오류가 발생했습니다');
    }

    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      title={`회원 ${id ? '수정' : '추가'}`}
      width={520}
      okText="저장"
      cancelText="취소"
      onCancel={closeModal}
      onClose={closeModal}
      afterClose={() => form.resetFields()}
      okButtonProps={{ autoFocus: true, htmlType: 'submit', disabled: !submittable }}
      modalRender={(dom) => (
        <Form
          layout="vertical"
          name="member-form"
          form={form}
          initialValues={initialValues}
          onFinish={handleClickSave}
          requiredMark={(label: ReactNode, { required }: { required?: boolean }) => (
            <Flex gap={4} align="center">
              {label}
              {required && <Typography.Text type="danger">*</Typography.Text>}
            </Flex>
          )}
        >
          {dom}
        </Form>
      )}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.required ? [{ required: true, message: `${field.name} is required` }] : []}
          valuePropName={field.type === 'checkbox' ? 'checked' : undefined}
        >
          <InputFactory<MemberField>
            field={field}
            value={values?.[field.name]}
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
        </Form.Item>
      ))}
    </Modal>
  );
}
