/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CookieAdapter } from './cookie-adapter';
export class LocalStorageAdapter {
    /**
     * @param {?} key
     * @return {?}
     */
    getItem(key) {
        return localStorage.getItem(key);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeItem(key) {
        localStorage.removeItem(key);
    }
    /**
     * @return {?}
     */
    clear() {
        localStorage.clear();
    }
    /**
     * @return {?}
     */
    getSupported() {
        // if local storage variable does not exist fall back to cookies
        if (!localStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            localStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            localStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (/** @type {?} */ err) {
            return new CookieAdapter();
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL3BlcnNpc3RlbnQtZGF0YS9hZGFwdGVycy9sb2NhbC1zdG9yYWdlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNOzs7OztJQUVGLE9BQU8sQ0FBQyxHQUFXO1FBQ2YsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEM7Ozs7OztJQUVELE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYTtRQUM5QixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBVztRQUNsQixZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hDOzs7O0lBRUQsS0FBSztRQUNELFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN4Qjs7OztJQUVELFlBQVk7O1FBR1IsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBQzlCOztRQUdELElBQUksQ0FBQztZQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztZQUNqRixZQUFZLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFFdEQsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsR0FBRyxFQUFFLENBQUM7WUFDWCxNQUFNLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztTQUM5QjtLQUNKO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlQWRhcHRlciB9IGZyb20gJy4vc3RvcmFnZS1hZGFwdGVyJztcbmltcG9ydCB7IENvb2tpZUFkYXB0ZXIgfSBmcm9tICcuL2Nvb2tpZS1hZGFwdGVyJztcblxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUFkYXB0ZXIgaW1wbGVtZW50cyBTdG9yYWdlQWRhcHRlciB7XG5cbiAgICBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGdldFN1cHBvcnRlZCgpOiBTdG9yYWdlQWRhcHRlciB7XG5cbiAgICAgICAgLy8gaWYgbG9jYWwgc3RvcmFnZSB2YXJpYWJsZSBkb2VzIG5vdCBleGlzdCBmYWxsIGJhY2sgdG8gY29va2llc1xuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb29raWVBZGFwdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cnkgdG8gbWFrZSBhIHRlc3Qgc2F2ZSB0byBsb2NhbCBzdG9yYWdlIHRvIHNlZSBpZiB0aGVyZSBhcmUgYW55IGV4Y2VwdGlvbnNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1eC1wZXJzaXN0ZW50LWRhdGEtc2VydmljZScsICd1eC1wZXJzaXN0ZW50LWRhdGEtc2VydmljZScpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3V4LXBlcnNpc3RlbnQtZGF0YS1zZXJ2aWNlJyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29va2llQWRhcHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19