import { v4 as uuidv4 } from 'uuid';

import type { MemberRecord } from '@/models/member.interface';
import { storage } from '@/utils/storage';

export type StorageOperation = 'add' | 'update' | 'delete';
type MemberForm = Omit<MemberRecord, 'id'>;

const handleAdd = (memberRecord: MemberForm) => {
  const members = storage.getItem<MemberRecord[]>('members') || [];
  members.push({ id: uuidv4(), ...memberRecord });
  storage.setItem('members', members);
};

const handleUpdate = (id: string, memberRecord: MemberForm) => {
  let members = storage.getItem<MemberRecord[]>('members') || [];
  members = members.map((member) => (member.id === id ? { id, ...memberRecord } : member));
  storage.setItem('members', members);
};

const handleDelete = (id: string) => {
  let members = storage.getItem<MemberRecord[]>('members') || [];
  members = members.filter((member) => member.id !== id);
  storage.setItem('members', members);
};

export const memberStorageOperation = (id?: string, memberRecord?: MemberForm) => {
  const type: StorageOperation | null =
    id && memberRecord ? 'update' : memberRecord ? 'add' : id ? 'delete' : null;

  switch (type) {
    case 'add':
      if (!memberRecord) throw new Error('Member record is required for add operation');
      handleAdd(memberRecord);
      break;
    case 'update':
      if (!id || !memberRecord)
        throw new Error('ID and Member record are required for update operation');
      handleUpdate(id, memberRecord);
      break;
    case 'delete':
      if (!id) throw new Error('ID record is required for add operation');
      handleDelete(id);
      break;
    default:
      throw new Error(`Unsupported storage operation type: ${type}`);
  }
};
