/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';
var CardTabsService = /** @class */ (function () {
    function CardTabsService() {
        var _this = this;
        this.tab$ = new BehaviorSubject(null);
        this.tabs$ = new BehaviorSubject([]);
        this.position$ = new BehaviorSubject('top');
        // when a tab is added or removed ensure we always select one if any are available
        this._subscription = this.tabs$.pipe(filter(function (tabs) { return !_this.tab$.value || !tabs.find(function (tab) { return tab === _this.tab$.value; }); })).subscribe(function (tabs) { return _this.tab$.next(tabs.length > 0 ? tabs[0] : null); });
    }
    /**
     * @return {?}
     */
    CardTabsService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * Add a tab to the list of tabs
     */
    /**
     * Add a tab to the list of tabs
     * @param {?} tab
     * @return {?}
     */
    CardTabsService.prototype.addTab = /**
     * Add a tab to the list of tabs
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabs$.next(tslib_1.__spread(this.tabs$.value, [tab]));
    };
    /**
     * Remove a tab from the list
     */
    /**
     * Remove a tab from the list
     * @param {?} tab
     * @return {?}
     */
    CardTabsService.prototype.removeTab = /**
     * Remove a tab from the list
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabs$.next(this.tabs$.value.filter(function (_tab) { return _tab !== tab; }));
    };
    /**
     * Select the tab
     */
    /**
     * Select the tab
     * @param {?} tab
     * @return {?}
     */
    CardTabsService.prototype.select = /**
     * Select the tab
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tab$.next(tab);
    };
    /**
     * Set the position of the tab content
     */
    /**
     * Set the position of the tab content
     * @param {?} position
     * @return {?}
     */
    CardTabsService.prototype.setPosition = /**
     * Set the position of the tab content
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.position$.next(position);
    };
    CardTabsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CardTabsService.ctorParameters = function () { return []; };
    return CardTabsService;
}());
export { CardTabsService };
function CardTabsService_tsickle_Closure_declarations() {
    /** @type {?} */
    CardTabsService.prototype.tab$;
    /** @type {?} */
    CardTabsService.prototype.tabs$;
    /** @type {?} */
    CardTabsService.prototype.position$;
    /** @type {?} */
    CardTabsService.prototype._subscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jYXJkLXRhYnMvY2FyZC10YWJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBWXRDO1FBQUEsaUJBTUM7b0JBWk0sSUFBSSxlQUFlLENBQW1CLElBQUksQ0FBQztxQkFDMUMsSUFBSSxlQUFlLENBQXFCLEVBQUUsQ0FBQzt5QkFDdkMsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDOztRQU81QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNsQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBdkIsQ0FBdUIsQ0FBQyxFQUE5RCxDQUE4RCxDQUFDLENBQy9FLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQWhELENBQWdELENBQUMsQ0FBQztLQUN2RTs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDbEM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsZ0NBQU07Ozs7O0lBQU4sVUFBTyxHQUFxQjtRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksa0JBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUUsR0FBRyxHQUFFLENBQUM7S0FDN0M7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsbUNBQVM7Ozs7O0lBQVQsVUFBVSxHQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssR0FBRyxFQUFaLENBQVksQ0FBQyxDQUFDLENBQUM7S0FDaEU7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsZ0NBQU07Ozs7O0lBQU4sVUFBTyxHQUFxQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7Ozs7SUFDSCxxQ0FBVzs7Ozs7SUFBWCxVQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQy9COztnQkEvQ0YsVUFBVTs7OzswQkFOWDs7U0FPYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJkVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJkLXRhYi9jYXJkLXRhYi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FyZFRhYnNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICB0YWIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDYXJkVGFiQ29tcG9uZW50PihudWxsKTtcbiAgdGFicyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENhcmRUYWJDb21wb25lbnRbXT4oW10pO1xuICBwb3NpdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJ3RvcCcpO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgLy8gd2hlbiBhIHRhYiBpcyBhZGRlZCBvciByZW1vdmVkIGVuc3VyZSB3ZSBhbHdheXMgc2VsZWN0IG9uZSBpZiBhbnkgYXJlIGF2YWlsYWJsZVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMudGFicyQucGlwZShcbiAgICAgIGZpbHRlcih0YWJzID0+ICF0aGlzLnRhYiQudmFsdWUgfHwgIXRhYnMuZmluZCh0YWIgPT4gdGFiID09PSB0aGlzLnRhYiQudmFsdWUpKSxcbiAgICApLnN1YnNjcmliZSh0YWJzID0+IHRoaXMudGFiJC5uZXh0KHRhYnMubGVuZ3RoID4gMCA/IHRhYnNbMF0gOiBudWxsKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSB0YWIgdG8gdGhlIGxpc3Qgb2YgdGFic1xuICAgKi9cbiAgYWRkVGFiKHRhYjogQ2FyZFRhYkNvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMudGFicyQubmV4dChbLi4udGhpcy50YWJzJC52YWx1ZSwgdGFiXSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgdGFiIGZyb20gdGhlIGxpc3RcbiAgICovXG4gIHJlbW92ZVRhYih0YWI6IENhcmRUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnRhYnMkLm5leHQodGhpcy50YWJzJC52YWx1ZS5maWx0ZXIoX3RhYiA9PiBfdGFiICE9PSB0YWIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgdGhlIHRhYlxuICAgKi9cbiAgc2VsZWN0KHRhYjogQ2FyZFRhYkNvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMudGFiJC5uZXh0KHRhYik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgdGFiIGNvbnRlbnRcbiAgICovXG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uJC5uZXh0KHBvc2l0aW9uKTtcbiAgfVxufVxuIl19