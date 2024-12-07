import { fields } from '@/features/MemberList/data/memberData';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import type { MemberField, MemberRecord } from '@/models/member.interface';
import { storage } from '@/utils/storage';
import { Checkbox, DatePicker, Flex, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ModalProps {
  id?: string;
  isOpen: boolean;
  closeModal: VoidFunction;
}

type MemberForm = Omit<MemberRecord, 'id'>;

const initialValues = {
  name: '',
  address: '',
  memo: '',
  joinDate: null,
  job: '개발자',
  emailSubscription: false,
};

interface InputFactoryProps {
  field: MemberField;
  value?: any;
  onChange?: (value: any) => void;
}

const InputFactory = ({ field, value, onChange }: InputFactoryProps) => {
  switch (field.type) {
    case 'text':
      return (
        <Input placeholder="Input" value={value} onChange={(e) => onChange?.(e.target.value)} />
      );
    case 'textarea':
      return (
        <Input.TextArea
          placeholder="Textarea"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{ height: 64 }}
        />
      );
    case 'date':
      return (
        <DatePicker
          placeholder="Select date"
          value={value}
          onChange={(value) => onChange?.(value)}
          maxDate={dayjs(new Date())}
          showToday={false}
        />
      );
    case 'select':
      return (
        <Select
          value={value}
          onChange={(value) => onChange?.(value)}
          options={field.options?.map((option) => ({ label: option, value: option }))}
        />
      );
    case 'checkbox':
      return <Checkbox onChange={(value) => onChange?.(value)} />;
  }
};

export default function MemberFormModal({ id, isOpen, closeModal }: ModalProps) {
  const [submittable, setSubmittable] = useState(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const updateMemberInStorage = (MemberRecord: MemberForm) => {
    const members = storage.getItem('members') || [];
    members.push(MemberRecord);
    storage.setItem('members', members);
  };

  const handleClickSave = (values: Omit<MemberForm, 'joinDate'> & { joinDate: dayjs.Dayjs }) => {
    const MemberRecord = {
      id: uuidv4(),
      ...values,
      joinDate: values.joinDate.format('YYYY-MM-DD'),
    };
    updateMemberInStorage(MemberRecord);
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
          onFinish={(values) => handleClickSave(values)}
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
          <InputFactory field={field} />
        </Form.Item>
      ))}
    </Modal>
  );
}
