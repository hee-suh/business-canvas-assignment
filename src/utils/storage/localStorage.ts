import type { StorageInterface } from '@/utils/storage/index';

export class LocalStorage implements StorageInterface {
  getItem<T>(key: string) {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
