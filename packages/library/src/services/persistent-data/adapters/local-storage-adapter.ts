import { StorageAdapter } from './storage-adapter';
import { CookieAdapter } from './cookie-adapter';

export class LocalStorageAdapter implements StorageAdapter {

    getItem(key: string): string {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    getSupported(): StorageAdapter {

        // if local storage variable does not exist fall back to cookies
        if (!localStorage) {
            return new CookieAdapter();
        }

        // try to make a test save to local storage to see if there are any exceptions
        try {
            localStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            localStorage.removeItem('ux-persistent-data-service');

            return this;
        } catch (err) {
            return new CookieAdapter();
        }
    }

}