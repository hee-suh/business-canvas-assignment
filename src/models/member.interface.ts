import type { Field, SelectField } from '@/models/field.interface';

type MemberName = 'name' | 'address' | 'memo' | 'joinDate' | 'job' | 'emailSubscription';
type MemberLabel = '이름' | '주소' | '메모' | '가입일' | '직업' | '이메일 수신 동의';

export type MemberField =
  | Field<Exclude<MemberName, 'job'>, Exclude<MemberLabel, '직업'>>
  | SelectField<Extract<MemberName, 'job'>, Extract<MemberLabel, '직업'>>;

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
