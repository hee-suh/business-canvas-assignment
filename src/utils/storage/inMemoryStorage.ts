import type { StorageInterface } from '@/utils/storage/index';

export class InMemoryStorage implements StorageInterface {
  private storage: Record<string, any> = {};

  getItem(key: string) {
    return this.storage[key] || null;
  }
  setItem(key: string, value: any) {
    this.storage[key] = value;
  }
  removeItem(key: string) {
    delete this.storage[key];
  }
}
