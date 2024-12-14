import { InMemoryStorage } from '@/utils/storage/inMemoryStorage';
import { LocalStorage } from '@/utils/storage/localStorage';

export interface StorageInterface {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
}

const StorageFactory = (): StorageInterface => {
  const storageType = import.meta.env.VITE_STORAGE || 'in-memory';
  switch (storageType) {
    case 'local-storage':
      return new LocalStorage();
    case 'in-memory':
    default:
      return new InMemoryStorage();
  }
};

export const storage = StorageFactory();
