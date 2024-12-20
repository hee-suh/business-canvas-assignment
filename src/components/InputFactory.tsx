import type { InputHTMLAttributes } from 'react';

import dayjs from 'dayjs';

import Checkbox from '@/components/ui/Checkbox';
import DatePicker from '@/components/ui/DatePicker';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import type { Field } from '@/models/field.interface';

interface InputFactoryProps<T> {
  field: T;
  value?: unknown;
  onChange?: (value: unknown) => void;
}

type InputValueType = InputHTMLAttributes<HTMLInputElement>['value'] | bigint;
type CheckboxValueType = boolean | undefined;

const InputFactory = <T extends Field>({ field, value, onChange }: InputFactoryProps<T>) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          placeholder="Input"
          value={value as InputValueType}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );
    case 'textarea':
      return (
        <Input.TextArea
          placeholder="Textarea"
          value={value as InputValueType}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );
    case 'date':
      return (
        <DatePicker
          placement="bottomLeft"
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
      return (
        <Checkbox
          checked={value as CheckboxValueType}
          onChange={(e) => onChange?.(e.target.checked)}
        />
      );
    default:
      return null;
  }
};

export default InputFactory;
