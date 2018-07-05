/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CookieAdapter } from './adapters/cookie-adapter';
import { LocalStorageAdapter } from './adapters/local-storage-adapter';
import { SessionStorageAdapter } from './adapters/session-storage-adapter';
export class PersistentDataService {
    /**
     * Save the item in some form of persistent storage
     * @param {?} key
     * @param {?} value
     * @param {?=} type
     * @return {?}
     */
    setItem(key, value, type = PersistentDataStorageType.LocalStorage) {
        this.getAdapter(type).setItem(key, value);
    }
    /**
     * Get a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    getItem(key, type = PersistentDataStorageType.LocalStorage) {
        return this.getAdapter(type).getItem(key);
    }
    /**
     * Remove a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    removeItem(key, type = PersistentDataStorageType.LocalStorage) {
        this.getAdapter(type).removeItem(key);
    }
    /**
     * Remove a stored value from persistent storage
     * @param {?=} type
     * @return {?}
     */
    clear(type = PersistentDataStorageType.LocalStorage) {
        this.getAdapter(type).clear();
    }
    /**
     * Return the appropriate adapter based on the type requested
     * @param {?} type
     * @return {?}
     */
    getAdapter(type) {
        switch (type) {
            case PersistentDataStorageType.Cookie:
                return new CookieAdapter();
            case PersistentDataStorageType.LocalStorage:
                const /** @type {?} */ localStorageAdapter = new LocalStorageAdapter();
                return localStorageAdapter.getSupported();
            case PersistentDataStorageType.SessionStorage:
                const /** @type {?} */ sessionStorageAdapter = new SessionStorageAdapter();
                return sessionStorageAdapter.getSupported();
        }
    }
}
PersistentDataService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PersistentDataService.ctorParameters = () => [];
function PersistentDataService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PersistentDataService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PersistentDataService.ctorParameters;
}
/** @enum {number} */
const PersistentDataStorageType = {
    LocalStorage: 0,
    Cookie: 1,
    SessionStorage: 2,
};
export { PersistentDataStorageType };
PersistentDataStorageType[PersistentDataStorageType.LocalStorage] = "LocalStorage";
PersistentDataStorageType[PersistentDataStorageType.Cookie] = "Cookie";
PersistentDataStorageType[PersistentDataStorageType.SessionStorage] = "SessionStorage";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdGVudC1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsic2VydmljZXMvcGVyc2lzdGVudC1kYXRhL3BlcnNpc3RlbnQtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUczRSxNQUFNOzs7Ozs7OztJQUtGLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLE9BQWtDLHlCQUF5QixDQUFDLFlBQVk7UUFDeEcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdDOzs7Ozs7O0lBS0QsT0FBTyxDQUFDLEdBQVcsRUFBRSxPQUFrQyx5QkFBeUIsQ0FBQyxZQUFZO1FBQ3pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM3Qzs7Ozs7OztJQUtELFVBQVUsQ0FBQyxHQUFXLEVBQUUsT0FBa0MseUJBQXlCLENBQUMsWUFBWTtRQUM1RixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6Qzs7Ozs7O0lBS0QsS0FBSyxDQUFDLE9BQWtDLHlCQUF5QixDQUFDLFlBQVk7UUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNqQzs7Ozs7O0lBS08sVUFBVSxDQUFDLElBQStCO1FBRTlDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFWCxLQUFLLHlCQUF5QixDQUFDLE1BQU07Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBRS9CLEtBQUsseUJBQXlCLENBQUMsWUFBWTtnQkFDdkMsdUJBQU0sbUJBQW1CLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO2dCQUN0RCxNQUFNLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFOUMsS0FBSyx5QkFBeUIsQ0FBQyxjQUFjO2dCQUN6Qyx1QkFBTSxxQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7Z0JBQzFELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNuRDs7OztZQWhEUixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmFnZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL3N0b3JhZ2UtYWRhcHRlcic7XG5pbXBvcnQgeyBDb29raWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9jb29raWUtYWRhcHRlcic7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9sb2NhbC1zdG9yYWdlLWFkYXB0ZXInO1xuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9zZXNzaW9uLXN0b3JhZ2UtYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQZXJzaXN0ZW50RGF0YVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogU2F2ZSB0aGUgaXRlbSBpbiBzb21lIGZvcm0gb2YgcGVyc2lzdGVudCBzdG9yYWdlXG4gICAgICovXG4gICAgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdHlwZTogUGVyc2lzdGVudERhdGFTdG9yYWdlVHlwZSA9IFBlcnNpc3RlbnREYXRhU3RvcmFnZVR5cGUuTG9jYWxTdG9yYWdlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0QWRhcHRlcih0eXBlKS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHN0b3JlZCB2YWx1ZSBmcm9tIHBlcnNpc3RlbnQgc3RvcmFnZVxuICAgICAqL1xuICAgIGdldEl0ZW0oa2V5OiBzdHJpbmcsIHR5cGU6IFBlcnNpc3RlbnREYXRhU3RvcmFnZVR5cGUgPSBQZXJzaXN0ZW50RGF0YVN0b3JhZ2VUeXBlLkxvY2FsU3RvcmFnZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFkYXB0ZXIodHlwZSkuZ2V0SXRlbShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHN0b3JlZCB2YWx1ZSBmcm9tIHBlcnNpc3RlbnQgc3RvcmFnZVxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcsIHR5cGU6IFBlcnNpc3RlbnREYXRhU3RvcmFnZVR5cGUgPSBQZXJzaXN0ZW50RGF0YVN0b3JhZ2VUeXBlLkxvY2FsU3RvcmFnZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEFkYXB0ZXIodHlwZSkucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHN0b3JlZCB2YWx1ZSBmcm9tIHBlcnNpc3RlbnQgc3RvcmFnZVxuICAgICAqL1xuICAgIGNsZWFyKHR5cGU6IFBlcnNpc3RlbnREYXRhU3RvcmFnZVR5cGUgPSBQZXJzaXN0ZW50RGF0YVN0b3JhZ2VUeXBlLkxvY2FsU3RvcmFnZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEFkYXB0ZXIodHlwZSkuY2xlYXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGFwcHJvcHJpYXRlIGFkYXB0ZXIgYmFzZWQgb24gdGhlIHR5cGUgcmVxdWVzdGVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBZGFwdGVyKHR5cGU6IFBlcnNpc3RlbnREYXRhU3RvcmFnZVR5cGUpOiBTdG9yYWdlQWRhcHRlciB7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgUGVyc2lzdGVudERhdGFTdG9yYWdlVHlwZS5Db29raWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb29raWVBZGFwdGVyKCk7XG5cbiAgICAgICAgICAgIGNhc2UgUGVyc2lzdGVudERhdGFTdG9yYWdlVHlwZS5Mb2NhbFN0b3JhZ2U6XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlQWRhcHRlciA9IG5ldyBMb2NhbFN0b3JhZ2VBZGFwdGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZUFkYXB0ZXIuZ2V0U3VwcG9ydGVkKCk7XG5cbiAgICAgICAgICAgIGNhc2UgUGVyc2lzdGVudERhdGFTdG9yYWdlVHlwZS5TZXNzaW9uU3RvcmFnZTpcbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RvcmFnZUFkYXB0ZXIgPSBuZXcgU2Vzc2lvblN0b3JhZ2VBZGFwdGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlQWRhcHRlci5nZXRTdXBwb3J0ZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gUGVyc2lzdGVudERhdGFTdG9yYWdlVHlwZSB7XG4gICAgTG9jYWxTdG9yYWdlLFxuICAgIENvb2tpZSxcbiAgICBTZXNzaW9uU3RvcmFnZVxufSJdfQ==