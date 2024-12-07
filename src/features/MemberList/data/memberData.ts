import type { MemberField, MemberRecord } from '@/models/member.interface';
import { v4 as uuidv4 } from 'uuid';

export const fields: MemberField[] = [
  { type: 'text', label: '이름', name: 'name', required: true },
  { type: 'text', label: '주소', name: 'address', required: false },
  { type: 'textarea', label: '메모', name: 'memo', required: false },
  { type: 'date', label: '가입일', name: 'joinDate', required: true },
  {
    type: 'select',
    label: '직업',
    name: 'job',
    required: false,
    options: ['개발자', 'PO', '디자이너'],
  },
  { type: 'checkbox', label: '이메일 수신 동의', name: 'emailSubscription', required: false },
];

export const defaultRecords: MemberRecord[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    joinDate: '2024-10-02',
    job: '개발자',
    emailSubscription: true,
  },
  {
    id: uuidv4(),
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    joinDate: '2024-10-01',
    job: 'PO',
    emailSubscription: false,
  },
];
