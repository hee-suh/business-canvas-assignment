import type { StorageInterface } from '@/utils/storage/index';

export class InMemoryStorage implements StorageInterface {
  private storage: Record<string, unknown> = {};

  getItem<T>(key: string) {
    return (this.storage[key] as T) || null;
  }
  setItem<T>(key: string, value: T): void {
    this.storage[key] = value;
  }
  removeItem(key: string) {
    delete this.storage[key];
  }
}
