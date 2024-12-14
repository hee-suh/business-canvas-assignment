export interface CommonField {
  name: string;
  label: string;
  required: boolean;
}

export interface TextField extends CommonField {
  type: 'text';
}

export interface TextAreaField extends CommonField {
  type: 'textarea';
}

export interface DateField extends CommonField {
  type: 'date';
}

export interface CheckboxField extends CommonField {
  type: 'checkbox';
}

export interface SelectField extends CommonField {
  type: 'select';
  options: string[];
}

export type Field = TextField | TextAreaField | DateField | CheckboxField | SelectField;
