import { Injectable } from '@angular/core';
import { StorageAdapter } from './adapters/storage-adapter';
import { CookieAdapter } from './adapters/cookie-adapter';
import { LocalStorageAdapter } from './adapters/local-storage-adapter';
import { SessionStorageAdapter } from './adapters/session-storage-adapter';

@Injectable()
export class PersistentDataService {

    /**
     * Save the item in some form of persistent storage
     */
    setItem(key: string, value: string, type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): void {
        this.getAdapter(type).setItem(key, value);
    }

    /**
     * Get a stored value from persistent storage
     */
    getItem(key: string, type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): string {
        return this.getAdapter(type).getItem(key);
    }

    /**
     * Remove a stored value from persistent storage
     */
    removeItem(key: string, type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): void {
        this.getAdapter(type).removeItem(key);
    }

    /**
     * Remove a stored value from persistent storage
     */
    clear(type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): void {
        this.getAdapter(type).clear();
    }

    /**
     * Return the appropriate adapter based on the type requested
     */
    private getAdapter(type: PersistentDataStorageType): StorageAdapter {

        switch (type) {

            case PersistentDataStorageType.Cookie:
                return new CookieAdapter();

            case PersistentDataStorageType.LocalStorage:
                const localStorageAdapter = new LocalStorageAdapter();
                return localStorageAdapter.getSupported();

            case PersistentDataStorageType.SessionStorage:
                const sessionStorageAdapter = new SessionStorageAdapter();
                return sessionStorageAdapter.getSupported();
        }
    }
}

export enum PersistentDataStorageType {
    LocalStorage,
    Cookie,
    SessionStorage
}