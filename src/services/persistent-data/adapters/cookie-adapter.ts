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
        window.document.cookie.split(';').forEach(function(c) {
            let eqPos = c.indexOf('=');
            let name = eqPos > -1 ? c.substr(0, eqPos).replace(' ', '') : c;
            if (name === key) {
                document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'); 
            }
        });
    }

    clear(): void {
        window.document.cookie.split(';').forEach(function(c) {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'); 
        });
    }

    getSupported(): StorageAdapter {
        // cookies are supported in all browsers
        return this;
    }

}