export interface BaseField<TName extends string = string, TLabel extends string = string> {
  type: 'text' | 'textarea' | 'date' | 'checkbox';
  name: TName;
  label: TLabel;
  required: boolean;
}

export interface SelectField<TName extends string = string, TLabel extends string = string> {
  type: 'select';
  name: TName;
  label: TLabel;
  required: boolean;
  options: string[];
}

export type Field = BaseField | SelectField;
