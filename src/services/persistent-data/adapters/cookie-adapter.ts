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
        document.cookie = `${key}=${value}; path=/`;
    }

    removeItem(key: string): void {

        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;

            if (name === key) {
                document.cookie = cookie.trim().replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        });
    }

    clear(): void {

        // call remove item on each cookie
        document.cookie.split(';').map(cookie => cookie.split('=')[0].trim())
            .forEach(cookie => this.removeItem(cookie));
    }

    getSupported(): StorageAdapter {
        // cookies are supported in all browsers
        return this;
    }

}