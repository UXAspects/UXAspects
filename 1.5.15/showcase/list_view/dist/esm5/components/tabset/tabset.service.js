/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var TabsetService = (function () {
    function TabsetService() {
        this.tabs$ = new BehaviorSubject([]);
        this.active$ = new BehaviorSubject(null);
        this.focused$ = new BehaviorSubject(false);
        this.highlighted$ = new BehaviorSubject(null);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsetService.prototype.add = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabs$.next(tslib_1.__spread(this.tabs$.value, [tab]));
        // check if this is the only tab. If so select this by default
        if (!this.active$.value) {
            this.select(tab);
        }
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsetService.prototype.remove = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        // remove the tab
        this.tabs$.next(this.tabs$.value.filter(function (_tab) { return _tab !== tab; }));
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsetService.prototype.select = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (!tab.disabled) {
            this.active$.next(tab);
            this.highlighted$.next(tab);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TabsetService.prototype.selectAtIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // if there are no tabs then do nothing
        if (this.tabs$.value.length === 0) {
            return;
        }
        // check if the index is within the bounds
        if (index < 0) {
            return this.selectAtIndex(this.tabs$.value.length - 1);
        }
        else if (index >= this.tabs$.value.length) {
            return this.selectAtIndex(0);
        }
        var /** @type {?} */ target = this.tabs$.value[index];
        if (target) {
            this.select(target);
        }
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectNextTab = /**
     * @return {?}
     */
    function () {
        // find the currently selected index
        var /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs after the active one to see if there are any selectable tabs
        var /** @type {?} */ tabs = this.tabs$.value.slice(index + 1);
        try {
            // check if any of the tabs are not disabled
            for (var tabs_1 = tslib_1.__values(tabs), tabs_1_1 = tabs_1.next(); !tabs_1_1.done; tabs_1_1 = tabs_1.next()) {
                var tab = tabs_1_1.value;
                if (!tab.disabled) {
                    return this.select(tab);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tabs_1_1 && !tabs_1_1.done && (_a = tabs_1.return)) _a.call(tabs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // if we reach here then no tab could be selected - select the first tab
        this.selectFirstTab();
        var e_1, _a;
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectPreviousTab = /**
     * @return {?}
     */
    function () {
        // find the currently selected index
        var /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs before the active one to see if there are any selectable tabs
        var /** @type {?} */ tabs = this.tabs$.value.slice(0, index);
        try {
            // check if any of the tabs are not disabled
            for (var _a = tslib_1.__values(tabs.reverse()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var tab = _b.value;
                if (!tab.disabled) {
                    return this.select(tab);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // if we reach here then no previous tab could be selected - select the last tab
        this.selectLastTab();
        var e_2, _c;
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectFirstTab = /**
     * @return {?}
     */
    function () {
        // find the index of the first non-disabled tab
        var /** @type {?} */ tabIndex = this.tabs$.value.findIndex(function (tab) { return !tab.disabled; });
        if (tabIndex !== -1) {
            this.selectAtIndex(tabIndex);
        }
    };
    /**
     * @return {?}
     */
    TabsetService.prototype.selectLastTab = /**
     * @return {?}
     */
    function () {
        // find the index of the first non-disabled tab
        var /** @type {?} */ tabIndex = this.tabs$.value.slice().reverse().findIndex(function (tab) { return !tab.disabled; });
        if (tabIndex !== -1) {
            this.selectAtIndex((this.tabs$.value.length - 1) - tabIndex);
        }
    };
    TabsetService.decorators = [
        { type: Injectable },
    ];
    return TabsetService;
}());
export { TabsetService };
function TabsetService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TabsetService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TabsetService.ctorParameters;
    /** @type {?} */
    TabsetService.prototype.tabs$;
    /** @type {?} */
    TabsetService.prototype.active$;
    /** @type {?} */
    TabsetService.prototype.focused$;
    /** @type {?} */
    TabsetService.prototype.highlighted$;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJzZXQvdGFic2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O3FCQU0zQyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDO3VCQUNyQyxJQUFJLGVBQWUsQ0FBZSxJQUFJLENBQUM7d0JBQ3RDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs0QkFDL0IsSUFBSSxlQUFlLENBQWUsSUFBSSxDQUFDOzs7Ozs7SUFFdEQsMkJBQUc7Ozs7SUFBSCxVQUFJLEdBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxrQkFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRSxHQUFHLEdBQUUsQ0FBQzs7UUFHNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtLQUNKOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxHQUFpQjs7UUFHcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEdBQUcsRUFBWixDQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ2xFOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxHQUFpQjtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFP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QUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7S0FDSjs7OztJQUVELHFDQUFhOzs7SUFBYjs7UUFFSSxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBRXBGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNoRTtLQUNKOztnQkF2R0osVUFBVTs7d0JBSlg7O1NBS2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFic2V0U2VydmljZSB7XG5cbiAgICB0YWJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VGFiQ29tcG9uZW50W10+KFtdKTtcbiAgICBhY3RpdmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYWJDb21wb25lbnQ+KG51bGwpO1xuICAgIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgaGlnaGxpZ2h0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYWJDb21wb25lbnQ+KG51bGwpO1xuXG4gICAgYWRkKHRhYjogVGFiQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFicyQubmV4dChbLi4udGhpcy50YWJzJC52YWx1ZSwgdGFiXSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyB0aGUgb25seSB0YWIuIElmIHNvIHNlbGVjdCB0aGlzIGJ5IGRlZmF1bHRcbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZSQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRhYik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmUodGFiOiBUYWJDb21wb25lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyByZW1vdmUgdGhlIHRhYlxuICAgICAgICB0aGlzLnRhYnMkLm5leHQodGhpcy50YWJzJC52YWx1ZS5maWx0ZXIoX3RhYiA9PiBfdGFiICE9PSB0YWIpKTtcbiAgICB9XG5cbiAgICBzZWxlY3QodGFiOiBUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlJC5uZXh0KHRhYik7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkJC5uZXh0KHRhYik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RBdEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gdGFicyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMudGFicyQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgaW5kZXggaXMgd2l0aGluIHRoZSBib3VuZHNcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0QXRJbmRleCh0aGlzLnRhYnMkLnZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID49IHRoaXMudGFicyQudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RBdEluZGV4KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YWJzJC52YWx1ZVtpbmRleF07XG5cbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5leHRUYWIoKTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudGFicyQudmFsdWUuaW5kZXhPZih0aGlzLmFjdGl2ZSQudmFsdWUpO1xuXG4gICAgICAgIC8vIGNoZWNrIHRoZSB0YWJzIGFmdGVyIHRoZSBhY3RpdmUgb25lIHRvIHNlZSBpZiB0aGVyZSBhcmUgYW55IHNlbGVjdGFibGUgdGFic1xuICAgICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzJC52YWx1ZS5zbGljZShpbmRleCArIDEpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFicyBhcmUgbm90IGRpc2FibGVkXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XG4gICAgICAgICAgICBpZiAoIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdCh0YWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgcmVhY2ggaGVyZSB0aGVuIG5vIHRhYiBjb3VsZCBiZSBzZWxlY3RlZCAtIHNlbGVjdCB0aGUgZmlyc3QgdGFiXG4gICAgICAgIHRoaXMuc2VsZWN0Rmlyc3RUYWIoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcmV2aW91c1RhYigpOiB2b2lkIHtcbiAgICAgICAgLy8gZmluZCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YWJzJC52YWx1ZS5pbmRleE9mKHRoaXMuYWN0aXZlJC52YWx1ZSk7XG5cbiAgICAgICAgLy8gY2hlY2sgdGhlIHRhYnMgYmVmb3JlIHRoZSBhY3RpdmUgb25lIHRvIHNlZSBpZiB0aGVyZSBhcmUgYW55IHNlbGVjdGFibGUgdGFic1xuICAgICAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzJC52YWx1ZS5zbGljZSgwLCBpbmRleCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YWJzIGFyZSBub3QgZGlzYWJsZWRcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMucmV2ZXJzZSgpKSB7XG4gICAgICAgICAgICBpZiAoIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdCh0YWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgcmVhY2ggaGVyZSB0aGVuIG5vIHByZXZpb3VzIHRhYiBjb3VsZCBiZSBzZWxlY3RlZCAtIHNlbGVjdCB0aGUgbGFzdCB0YWJcbiAgICAgICAgdGhpcy5zZWxlY3RMYXN0VGFiKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0Rmlyc3RUYWIoKTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBub24tZGlzYWJsZWQgdGFiXG4gICAgICAgIGNvbnN0IHRhYkluZGV4ID0gdGhpcy50YWJzJC52YWx1ZS5maW5kSW5kZXgodGFiID0+ICF0YWIuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmICh0YWJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QXRJbmRleCh0YWJJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RMYXN0VGFiKCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIHRhYlxuICAgICAgICBjb25zdCB0YWJJbmRleCA9IHRoaXMudGFicyQudmFsdWUuc2xpY2UoKS5yZXZlcnNlKCkuZmluZEluZGV4KHRhYiA9PiAhdGFiLmRpc2FibGVkKTtcblxuICAgICAgICBpZiAodGFiSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEF0SW5kZXgoKHRoaXMudGFicyQudmFsdWUubGVuZ3RoIC0gMSkgLSB0YWJJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59ICJdfQ==