import { StorageAdapter } from './storage-adapter';
import { CookieAdapter } from './cookie-adapter';

export class SessionStorageAdapter implements StorageAdapter {

    getItem(key: string): string {
        return sessionStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    }

    clear(): void {
        sessionStorage.clear();
    }

    getSupported(): StorageAdapter {

        // if local storage variable does not exist fall back to cookies
        if (!sessionStorage) {
            return new CookieAdapter();
        }

        // try to make a test save to local storage to see if there are any exceptions
        try {
            sessionStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            sessionStorage.removeItem('ux-persistent-data-service');

            return this;
        } catch (err) {
            return new CookieAdapter();
        }
    }

}