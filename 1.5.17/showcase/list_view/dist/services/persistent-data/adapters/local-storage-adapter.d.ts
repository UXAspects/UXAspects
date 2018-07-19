import { StorageAdapter } from './storage-adapter';
export declare class LocalStorageAdapter implements StorageAdapter {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
    getSupported(): StorageAdapter;
}
