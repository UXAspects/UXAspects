///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

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
        document.cookie = cookie
          .trim()
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      }
    });
  }

  clear(): void {
    // call remove item on each cookie
    document.cookie
      .split(';')
      .map(cookie => cookie.split('=')[0].trim())
      .forEach(cookie => this.removeItem(cookie));
  }

  getSupported(): StorageAdapter {
    // cookies are supported in all browsers
    return this;
  }
}
