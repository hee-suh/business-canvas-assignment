import Select from '@/components/ui/Select';
import type { Field, SelectField } from '@/models/field.interface';
import { Checkbox, DatePicker, Input } from 'antd';
import dayjs from 'dayjs';

interface InputFactoryProps<T> {
  field: T;
  value?: any;
  onChange?: (value: any) => void;
}

export const InputFactory = <T extends Field | SelectField>({
  field,
  value,
  onChange,
}: InputFactoryProps<T>) => {
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
      return <Checkbox checked={value} onChange={(e) => onChange?.(e.target.checked)} />;
    default:
      return null;
  }
};
