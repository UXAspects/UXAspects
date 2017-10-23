import { Injectable } from '@angular/core';

@Injectable()
export class PersistentDataService {

    /**
     * Save the item in some form of persistent storage
     */
    setItem(key: string, value: string, storageType: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): void {

        // check if storage is supported - otherwise fallback
        storageType = this.getStorageType(storageType);

        // peform the save on the desire storage target
        switch (storageType) {

            case PersistentDataStorageType.LocalStorage:
                this.setItemStorage(localStorage, key, value);
                break;

            case PersistentDataStorageType.SessionStorage:
                this.setItemStorage(sessionStorage, key, value);
                break;

            case PersistentDataStorageType.Cookie:
                this.setItemCookie(key, value);
                break;
        }
    }

    /**
     * Get a stored value from persistent storage
     */
    getItem(key: string, storageType: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): string {

        // get the supported storage type
        storageType = this.getStorageType(storageType);

        switch (storageType) {

            case PersistentDataStorageType.LocalStorage:
                return this.getItemStorage(localStorage, key);

            case PersistentDataStorageType.SessionStorage:
                return this.getItemStorage(sessionStorage, key);

            case PersistentDataStorageType.Cookie:
                return this.getItemCookie(key);
        }
    }

    /**
     * Remove a stored value from persistent storage
     */
    removeItem(key: string, storageType: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): void {

        // get the supported storage type
        storageType = this.getStorageType(storageType);

        // peform the save on the desire storage target
        switch (storageType) {

            case PersistentDataStorageType.LocalStorage:
                this.removeItemStorage(localStorage, key);
                break;

            case PersistentDataStorageType.SessionStorage:
                this.removeItemStorage(sessionStorage, key);
                break;

            case PersistentDataStorageType.Cookie:
                this.removeItemCookie(key);
                break;
        }
    }

    /**
     * Remove a stored value from persistent storage
     */
    clear(storageType: PersistentDataStorageType = PersistentDataStorageType.LocalStorage): void {

        // get the supported storage type
        storageType = this.getStorageType(storageType);

        // peform the save on the desire storage target
        switch (storageType) {

            case PersistentDataStorageType.LocalStorage:
                this.clearStorage(localStorage);
                break;

            case PersistentDataStorageType.SessionStorage:
                this.clearStorage(sessionStorage);
                break;

            case PersistentDataStorageType.Cookie:
                this.clearCookie();
                break;
        }
    }

    /**
     * Store value in either local or session storage
     */
    private setItemStorage(storage: Storage, key: string, value: string): void {
        storage.setItem(key, value);
    }

    /**
     * Save the value in a cookie 
     */
    private setItemCookie(key: string, value: string): void {
        document.cookie = key + '=' + value + '; path=/';
    }

    /**
     * Retrieve value in either local or session storage
     */
    private getItemStorage(storage: Storage, key: string): string {
        return storage.getItem(key);
    }

    /**
     * Retrieve the value in a cookie 
     */
    private getItemCookie(key: string): string {

        if (document.cookie) {

            // get all the cookies for this site
            const cookies = document.cookie.split(';');

            // process the cookies into a from we can easily manage
            const match = cookies
                .map(cookie => ({ key: cookie.split('=')[0].trim(), value: cookie.split('=')[1].trim() }))
                .find(cookie => cookie.key === key);

            return match ? match.value : null;

        }
    
        return null;        
    }

    /**
     * Remove value in either local or session storage
     */
    private removeItemStorage(storage: Storage, key: string): void {
        storage.removeItem(key);
    }

    /**
     * Remove a cookie 
     */
    private removeItemCookie(key: string): void {
        // making cookie expire
        document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        console.log(document.cookie);
    }

    /**
     * Clear either local or session storage
     */
    private clearStorage(storage: Storage): void {
        storage.clear();
    }

    /**
     * Remove a cookie 
     */
    private clearCookie(): void {

        // get all the cookies for this site
        const cookies = document.cookie.split(';');

        cookies.forEach(cookie => {
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            // make cookie expire
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
        
        console.log(document.cookie);
    }

    /**
     * Determine which storage method can be used by the browser
     */
    private getStorageType(desiredType: PersistentDataStorageType): PersistentDataStorageType {

        // If local storage is desired then make sure we can use it - or fallback to cookies
        if (desiredType === PersistentDataStorageType.LocalStorage) {
            return this.getStorageSupported(localStorage) ? PersistentDataStorageType.LocalStorage : PersistentDataStorageType.Cookie;
        }

        // If session storage is desired then make sure we can use it - or fallback to cookies
        if (desiredType === PersistentDataStorageType.SessionStorage) {
            return this.getStorageSupported(sessionStorage) ? PersistentDataStorageType.LocalStorage : PersistentDataStorageType.Cookie;
        }

        return desiredType;
    }

    /**
     * Perform a test to see if the storage option is supported
     * @param storage Either local storage or session storage
     */
    private getStorageSupported(storage: Storage): boolean {

        // if the storage type is null or undefined then fall back to cookies
        if (!storage) {
            return false;
        }

        try {
            storage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            storage.removeItem('ux-persistent-data-service');
            return true;
        } catch (err) {
            return false;
        }
    }

}

export enum PersistentDataStorageType {
    LocalStorage,
    Cookie,
    SessionStorage
}