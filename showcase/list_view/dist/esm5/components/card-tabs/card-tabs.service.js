/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';
var CardTabsService = (function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    CardTabsService.ctorParameters = function () { return []; };
    return CardTabsService;
}());
export { CardTabsService };
function CardTabsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CardTabsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CardTabsService.ctorParameters;
    /** @type {?} */
    CardTabsService.prototype.tab$;
    /** @type {?} */
    CardTabsService.prototype.tabs$;
    /** @type {?} */
    CardTabsService.prototype.position$;
    /** @type {?} */
    CardTabsService.prototype._subscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jYXJkLXRhYnMvY2FyZC10YWJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBWXRDO1FBQUEsaUJBTUM7b0JBWk0sSUFBSSxlQUFlLENBQW1CLElBQUksQ0FBQztxQkFDMUMsSUFBSSxlQUFlLENBQXFCLEVBQUUsQ0FBQzt5QkFDdkMsSUFBSSxlQUFlLENBQVMsS0FBSyxDQUFDOztRQU81QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNsQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBdkIsQ0FBdUIsQ0FBQyxFQUE5RCxDQUE4RCxDQUFDLENBQy9FLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7S0FDdkU7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2xDO0lBRUQ7O09BRUc7Ozs7OztJQUNILGdDQUFNOzs7OztJQUFOLFVBQU8sR0FBcUI7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLGtCQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFFLEdBQUcsR0FBRSxDQUFDO0tBQzdDO0lBRUQ7O09BRUc7Ozs7OztJQUNILG1DQUFTOzs7OztJQUFULFVBQVUsR0FBcUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEdBQUcsRUFBWixDQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQ7O09BRUc7Ozs7OztJQUNILGdDQUFNOzs7OztJQUFOLFVBQU8sR0FBcUI7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckI7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gscUNBQVc7Ozs7O0lBQVgsVUFBWSxRQUFnQjtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMvQjs7Z0JBL0NGLFVBQVU7Ozs7MEJBTlg7O1NBT2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FyZFRhYkNvbXBvbmVudCB9IGZyb20gJy4vY2FyZC10YWIvY2FyZC10YWIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhcmRUYWJzU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgdGFiJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Q2FyZFRhYkNvbXBvbmVudD4obnVsbCk7XG4gIHRhYnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDYXJkVGFiQ29tcG9uZW50W10+KFtdKTtcbiAgcG9zaXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCd0b3AnKTtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIC8vIHdoZW4gYSB0YWIgaXMgYWRkZWQgb3IgcmVtb3ZlZCBlbnN1cmUgd2UgYWx3YXlzIHNlbGVjdCBvbmUgaWYgYW55IGFyZSBhdmFpbGFibGVcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnRhYnMkLnBpcGUoXG4gICAgICBmaWx0ZXIodGFicyA9PiAhdGhpcy50YWIkLnZhbHVlIHx8ICF0YWJzLmZpbmQodGFiID0+IHRhYiA9PT0gdGhpcy50YWIkLnZhbHVlKSksXG4gICAgKS5zdWJzY3JpYmUodGFicyA9PiB0aGlzLnRhYiQubmV4dCh0YWJzLmxlbmd0aCA+IDAgPyB0YWJzWzBdIDogbnVsbCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgdGFiIHRvIHRoZSBsaXN0IG9mIHRhYnNcbiAgICovXG4gIGFkZFRhYih0YWI6IENhcmRUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnRhYnMkLm5leHQoWy4uLnRoaXMudGFicyQudmFsdWUsIHRhYl0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHRhYiBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICByZW1vdmVUYWIodGFiOiBDYXJkVGFiQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy50YWJzJC5uZXh0KHRoaXMudGFicyQudmFsdWUuZmlsdGVyKF90YWIgPT4gX3RhYiAhPT0gdGFiKSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHRoZSB0YWJcbiAgICovXG4gIHNlbGVjdCh0YWI6IENhcmRUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnRhYiQubmV4dCh0YWIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIHRhYiBjb250ZW50XG4gICAqL1xuICBzZXRQb3NpdGlvbihwb3NpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbiQubmV4dChwb3NpdGlvbik7XG4gIH1cbn1cbiJdfQ==