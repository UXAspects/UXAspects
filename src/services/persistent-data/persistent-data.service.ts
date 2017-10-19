import {
    DOCUMENT
} from '@angular/platform-browser';
import {
    Injectable,
    Inject
} from '@angular/core';

export class PersistentDataService {

    setData(key: string, value: string, storageType?: PersistentDataStorageType) {
        if (!storageType && localStorage || storageType === PersistentDataStorageType.LocalStorage) {
            localStorage.setItem(key, value);
        } else if (!storageType || storageType !== PersistentDataStorageType.SessionStorage) {
            document.cookie = key + '=' + value + '; path=/';
        } else {
            sessionStorage.setItem(key, value);
        }
    }

    getData(key: string, storageType?: PersistentDataStorageType) {
        if (!storageType && localStorage || storageType === PersistentDataStorageType.LocalStorage) {
            return localStorage.getItem(key);
        } else if (!storageType || storageType !== PersistentDataStorageType.SessionStorage) {
            var keyName = key + '=';
            var allCookies = document.cookie.split(';');
            for (var i = 0, max = allCookies.length; i < max; i++) {
                var cookie = allCookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1, cookie.length);
                } 
                if (cookie.indexOf(keyName) === 0) {
                    return cookie.substring(keyName.length, cookie.length);
                } 
            }
            return null;
        } else {
            return sessionStorage.getItem(key);
        }
    }

}

export enum PersistentDataStorageType {
    LocalStorage,
    Cookie,
    SessionStorage
}
