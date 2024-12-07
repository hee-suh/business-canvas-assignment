export interface MemberField {
  type: 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
  label: '이름' | '주소' | '메모' | '가입일' | '직업' | '이메일 수신 동의';
  name: 'name' | 'address' | 'memo' | 'joinDate' | 'job' | 'emailSubscription';
  required: boolean;
  options?: string[];
}

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
