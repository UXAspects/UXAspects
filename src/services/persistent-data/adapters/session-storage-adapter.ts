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

import { CookieAdapter } from './cookie-adapter';
import { StorageAdapter } from './storage-adapter';

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
