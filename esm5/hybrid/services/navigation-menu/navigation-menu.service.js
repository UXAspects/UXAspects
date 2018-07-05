/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
var NavigationMenuService = (function () {
    function NavigationMenuService(_navigationMenuService) {
        this._navigationMenuService = _navigationMenuService;
    }
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.show = /**
     * @return {?}
     */
    function () {
        this._navigationMenuService.show();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.hide = /**
     * @return {?}
     */
    function () {
        this._navigationMenuService.hide();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.visible = /**
     * @return {?}
     */
    function () {
        return this._navigationMenuService.visible();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.collapseAtWidth = /**
     * @return {?}
     */
    function () {
        return this._navigationMenuService.collapseAtWidth();
    };
    /**
     * @param {?} width
     * @return {?}
     */
    NavigationMenuService.prototype.setCollapseAtWidth = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        this._navigationMenuService.setCollapseAtWidth(width);
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.setDefaultCollapseAtWidth = /**
     * @return {?}
     */
    function () {
        this._navigationMenuService.setDefaultCollapseAtWidth();
    };
    NavigationMenuService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationMenuService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['$navigationMenu',] },] },
    ]; };
    return NavigationMenuService;
}());
export { NavigationMenuService };
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
export var /** @type {?} */ navigationMenuServiceProvider = {
    provide: '$navigationMenu',
    useFactory: navigationMenuServiceFactory,
    deps: ['$injector']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL3NlcnZpY2VzL25hdmlnYXRpb24tbWVudS9uYXZpZ2F0aW9uLW1lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7O0lBTXpELCtCQUFnRDtRQUFBLDJCQUFzQixHQUF0QixzQkFBc0I7S0FBNkI7Ozs7SUFFbkcsb0NBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3RDOzs7O0lBRUQsb0NBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3RDOzs7O0lBRUQsdUNBQU87OztJQUFQO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoRDs7OztJQUVELCtDQUFlOzs7SUFBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDeEQ7Ozs7O0lBRUQsa0RBQWtCOzs7O0lBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pEOzs7O0lBRUQseURBQXlCOzs7SUFBekI7UUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMseUJBQXlCLEVBQUUsQ0FBQztLQUMzRDs7Z0JBM0JKLFVBQVU7Ozs7Z0RBR08sTUFBTSxTQUFDLGlCQUFpQjs7Z0NBTjFDOztTQUlhLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7OztBQThCbEMsTUFBTSx1Q0FBdUMsUUFBa0I7SUFDM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztDQUMxQztBQUVELE1BQU0sQ0FBQyxxQkFBTSw2QkFBNkIsR0FBRztJQUN6QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFVBQVUsRUFBRSw0QkFBNEI7SUFDeEMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0NBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTmF2aWdhdGlvbk1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLW1lbnUuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25NZW51U2VydmljZSBpbXBsZW1lbnRzIElOYXZpZ2F0aW9uTWVudVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoJyRuYXZpZ2F0aW9uTWVudScpIHByaXZhdGUgX25hdmlnYXRpb25NZW51U2VydmljZTogSU5hdmlnYXRpb25NZW51U2VydmljZSkgeyB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uTWVudVNlcnZpY2Uuc2hvdygpO1xuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX25hdmlnYXRpb25NZW51U2VydmljZS5oaWRlKCk7XG4gICAgfVxuXG4gICAgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb25NZW51U2VydmljZS52aXNpYmxlKCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VBdFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uTWVudVNlcnZpY2UuY29sbGFwc2VBdFdpZHRoKCk7XG4gICAgfVxuXG4gICAgc2V0Q29sbGFwc2VBdFdpZHRoKHdpZHRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbk1lbnVTZXJ2aWNlLnNldENvbGxhcHNlQXRXaWR0aCh3aWR0aCk7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdENvbGxhcHNlQXRXaWR0aCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbmF2aWdhdGlvbk1lbnVTZXJ2aWNlLnNldERlZmF1bHRDb2xsYXBzZUF0V2lkdGgoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpb25NZW51U2VydmljZUZhY3RvcnkoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgcmV0dXJuIGluamVjdG9yLmdldCgnJG5hdmlnYXRpb25NZW51Jyk7XG59XG5cbmV4cG9ydCBjb25zdCBuYXZpZ2F0aW9uTWVudVNlcnZpY2VQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiAnJG5hdmlnYXRpb25NZW51JyxcbiAgICB1c2VGYWN0b3J5OiBuYXZpZ2F0aW9uTWVudVNlcnZpY2VGYWN0b3J5LFxuICAgIGRlcHM6IFsnJGluamVjdG9yJ11cbn07Il19