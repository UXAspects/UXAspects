import { StorageAdapter } from './storage-adapter';

export class CookieAdapter implements StorageAdapter {

    getItem(key: string): string {

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

    setItem(key: string, value: string): void {
        document.cookie = key + '=' + value + '; path=/';
    }

    removeItem(key: string): void {
        // making cookie expire
        document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    clear(): void {
        
        document.cookie.split(';').forEach(cookie => {
            let eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            // make cookie expire
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });
    }

    getSupported(): StorageAdapter {
        // cookies are supported in all browsers
        return this;
    }

}