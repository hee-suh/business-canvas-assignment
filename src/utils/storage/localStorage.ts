import type { StorageInterface } from '@/utils/storage/index';

export class LocalStorage implements StorageInterface {
  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
