import Checkbox from '@/components/ui/Checkbox';
import type { Field } from '@/models/field.interface';
import type { TableColumnType } from 'antd';
import type { Key } from 'react';

export const createColumnFilters = <T extends object>(
  type: Field['type'],
  dataIndex: keyof T,
  records: T[],
): TableColumnType<T> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
    const uniqueOptions = [...new Set(records.map((item) => item[dataIndex]))]
      .filter(Boolean)
      .map((option) => {
        return {
          label: type === 'checkbox' ? (option ? '선택됨' : '선택 안함') : String(option),
          value: option as string | number | boolean,
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
    if (type === 'checkbox') {
      return value === field;
    } else {
      return String(field).includes(String(value));
    }
  },
});
