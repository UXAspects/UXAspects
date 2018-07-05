/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
export class NavigationMenuService {
    /**
     * @param {?} _navigationMenuService
     */
    constructor(_navigationMenuService) {
        this._navigationMenuService = _navigationMenuService;
    }
    /**
     * @return {?}
     */
    show() {
        this._navigationMenuService.show();
    }
    /**
     * @return {?}
     */
    hide() {
        this._navigationMenuService.hide();
    }
    /**
     * @return {?}
     */
    visible() {
        return this._navigationMenuService.visible();
    }
    /**
     * @return {?}
     */
    collapseAtWidth() {
        return this._navigationMenuService.collapseAtWidth();
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setCollapseAtWidth(width) {
        this._navigationMenuService.setCollapseAtWidth(width);
    }
    /**
     * @return {?}
     */
    setDefaultCollapseAtWidth() {
        this._navigationMenuService.setDefaultCollapseAtWidth();
    }
}
NavigationMenuService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationMenuService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['$navigationMenu',] },] },
];
function NavigationMenuService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NavigationMenuService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NavigationMenuService.ctorParameters;
    /** @type {?} */
    NavigationMenuService.prototype._navigationMenuService;
}
/**
 * @param {?} injector
 * @return {?}
 */
export function navigationMenuServiceFactory(injector) {
    return injector.get('$navigationMenu');
}
export const /** @type {?} */ navigationMenuServiceProvider = {
    provide: '$navigationMenu',
    useFactory: navigationMenuServiceFactory,
    deps: ['$injector']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL3NlcnZpY2VzL25hdmlnYXRpb24tbWVudS9uYXZpZ2F0aW9uLW1lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJN0QsTUFBTTs7OztJQUVGLFlBQWdEO1FBQUEsMkJBQXNCLEdBQXRCLHNCQUFzQjtLQUE2Qjs7OztJQUVuRyxJQUFJO1FBQ0EsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3RDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN0Qzs7OztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hEOzs7O0lBRUQsZUFBZTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDeEQ7Ozs7O0lBRUQsa0JBQWtCLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekQ7Ozs7SUFFRCx5QkFBeUI7UUFDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHlCQUF5QixFQUFFLENBQUM7S0FDM0Q7OztZQTNCSixVQUFVOzs7OzRDQUdPLE1BQU0sU0FBQyxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEIxQyxNQUFNLHVDQUF1QyxRQUFrQjtJQUMzRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0NBQzFDO0FBRUQsTUFBTSxDQUFDLHVCQUFNLDZCQUE2QixHQUFHO0lBQ3pDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsVUFBVSxFQUFFLDRCQUE0QjtJQUN4QyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7Q0FDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElOYXZpZ2F0aW9uTWVudVNlcnZpY2UgfSBmcm9tICcuL25hdmlnYXRpb24tbWVudS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbk1lbnVTZXJ2aWNlIGltcGxlbWVudHMgSU5hdmlnYXRpb25NZW51U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciggQEluamVjdCgnJG5hdmlnYXRpb25NZW51JykgcHJpdmF0ZSBfbmF2aWdhdGlvbk1lbnVTZXJ2aWNlOiBJTmF2aWdhdGlvbk1lbnVTZXJ2aWNlKSB7IH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25NZW51U2VydmljZS5zaG93KCk7XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbk1lbnVTZXJ2aWNlLmhpZGUoKTtcbiAgICB9XG5cbiAgICB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGlvbk1lbnVTZXJ2aWNlLnZpc2libGUoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUF0V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb25NZW51U2VydmljZS5jb2xsYXBzZUF0V2lkdGgoKTtcbiAgICB9XG5cbiAgICBzZXRDb2xsYXBzZUF0V2lkdGgod2lkdGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uTWVudVNlcnZpY2Uuc2V0Q29sbGFwc2VBdFdpZHRoKHdpZHRoKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0Q29sbGFwc2VBdFdpZHRoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uTWVudVNlcnZpY2Uuc2V0RGVmYXVsdENvbGxhcHNlQXRXaWR0aCgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGlvbk1lbnVTZXJ2aWNlRmFjdG9yeShpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICByZXR1cm4gaW5qZWN0b3IuZ2V0KCckbmF2aWdhdGlvbk1lbnUnKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5hdmlnYXRpb25NZW51U2VydmljZVByb3ZpZGVyID0ge1xuICAgIHByb3ZpZGU6ICckbmF2aWdhdGlvbk1lbnUnLFxuICAgIHVzZUZhY3Rvcnk6IG5hdmlnYXRpb25NZW51U2VydmljZUZhY3RvcnksXG4gICAgZGVwczogWyckaW5qZWN0b3InXVxufTsiXX0=