export declare class PersistentDataService {
    /**
     * Save the item in some form of persistent storage
     */
    setItem(key: string, value: string, type?: PersistentDataStorageType): void;
    /**
     * Get a stored value from persistent storage
     */
    getItem(key: string, type?: PersistentDataStorageType): string;
    /**
     * Remove a stored value from persistent storage
     */
    removeItem(key: string, type?: PersistentDataStorageType): void;
    /**
     * Remove a stored value from persistent storage
     */
    clear(type?: PersistentDataStorageType): void;
    /**
     * Return the appropriate adapter based on the type requested
     */
    private getAdapter(type);
}
export declare enum PersistentDataStorageType {
    LocalStorage = 0,
    Cookie = 1,
    SessionStorage = 2,
}
