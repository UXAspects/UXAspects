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

import { Injectable } from '@angular/core';
import { CookieAdapter } from './adapters/cookie-adapter';
import { LocalStorageAdapter } from './adapters/local-storage-adapter';
import { SessionStorageAdapter } from './adapters/session-storage-adapter';
import { StorageAdapter } from './adapters/storage-adapter';

@Injectable()
export class PersistentDataService {
  /**
   * Save the item in some form of persistent storage
   */
  setItem(
    key: string,
    value: string,
    type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage
  ): void {
    this.getAdapter(type).setItem(key, value);
  }

  /**
   * Get a stored value from persistent storage
   */
  getItem(
    key: string,
    type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage
  ): string {
    return this.getAdapter(type).getItem(key);
  }

  /**
   * Remove a stored value from persistent storage
   */
  removeItem(
    key: string,
    type: PersistentDataStorageType = PersistentDataStorageType.LocalStorage
  ): void {
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
        // eslint-disable-next-line no-case-declarations
        const localStorageAdapter = new LocalStorageAdapter();
        return localStorageAdapter.getSupported();

      case PersistentDataStorageType.SessionStorage:
        // eslint-disable-next-line no-case-declarations
        const sessionStorageAdapter = new SessionStorageAdapter();
        return sessionStorageAdapter.getSupported();
    }
  }
}

export enum PersistentDataStorageType {
  LocalStorage,
  Cookie,
  SessionStorage,
}
