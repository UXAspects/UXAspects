export abstract class StorageAdapter {
    abstract getItem(key: string): string;
    abstract setItem(key: string, value: string): void;
    abstract removeItem(key: string): void;
    abstract clear(): void;
    abstract getSupported(): StorageAdapter;
}