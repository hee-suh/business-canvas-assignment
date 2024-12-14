import type {
  CheckboxField,
  DateField,
  SelectField,
  TextAreaField,
  TextField,
} from '@/models/field.interface';

export type MemberField =
  | (TextField & { name: 'name'; label: '이름' })
  | (TextField & { name: 'address'; label: '주소' })
  | (TextAreaField & { name: 'memo'; label: '메모' })
  | (DateField & { name: 'joinDate'; label: '가입일' })
  | (SelectField & { name: 'job'; label: '직업' })
  | (CheckboxField & { name: 'emailSubscription'; label: '이메일 수신 동의' });

type Job = '개발자' | 'PO' | '디자이너';

export interface MemberRecord {
  id: string;
  name: string;
  address?: string;
  memo?: string;
  joinDate: string;
  job?: Job;
  emailSubscription?: boolean;
}
