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
    /** @nocollapse */
    TabsetService.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJzZXQvdGFic2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O3FCQU0zQyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDO3VCQUNyQyxJQUFJLGVBQWUsQ0FBZSxJQUFJLENBQUM7d0JBQ3RDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs0QkFDL0IsSUFBSSxlQUFlLENBQWUsSUFBSSxDQUFDOzs7Ozs7SUFFdEQsMkJBQUc7Ozs7SUFBSCxVQUFJLEdBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxrQkFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRSxHQUFHLEdBQUUsQ0FBQzs7UUFHNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtLQUNKOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxHQUFpQjs7UUFHcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEdBQUcsRUFBWixDQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ2xFOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxHQUFpQjtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFP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QUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7S0FDSjs7OztJQUVELHFDQUFhOzs7SUFBYjs7UUFFSSxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBRXBGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNoRTtLQUNKOztnQkF2R0osVUFBVTs7Ozt3QkFKWDs7U0FLYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJzZXRTZXJ2aWNlIHtcblxuICAgIHRhYnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYWJDb21wb25lbnRbXT4oW10pO1xuICAgIGFjdGl2ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRhYkNvbXBvbmVudD4obnVsbCk7XG4gICAgZm9jdXNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBoaWdobGlnaHRlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRhYkNvbXBvbmVudD4obnVsbCk7XG5cbiAgICBhZGQodGFiOiBUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJzJC5uZXh0KFsuLi50aGlzLnRhYnMkLnZhbHVlLCB0YWJdKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIHRoZSBvbmx5IHRhYi4gSWYgc28gc2VsZWN0IHRoaXMgYnkgZGVmYXVsdFxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlJC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QodGFiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZSh0YWI6IFRhYkNvbXBvbmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgdGFiXG4gICAgICAgIHRoaXMudGFicyQubmV4dCh0aGlzLnRhYnMkLnZhbHVlLmZpbHRlcihfdGFiID0+IF90YWIgIT09IHRhYikpO1xuICAgIH1cblxuICAgIHNlbGVjdCh0YWI6IFRhYkNvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUkLm5leHQodGFiKTtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQkLm5leHQodGFiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyB0YWJzIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy50YWJzJC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbmRleCBpcyB3aXRoaW4gdGhlIGJvdW5kc1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RBdEluZGV4KHRoaXMudGFicyQudmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gdGhpcy50YWJzJC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdEF0SW5kZXgoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhYnMkLnZhbHVlW2luZGV4XTtcblxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRhYigpOiB2b2lkIHtcbiAgICAgICAgLy8gZmluZCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50YWJzJC52YWx1ZS5pbmRleE9mKHRoaXMuYWN0aXZlJC52YWx1ZSk7XG5cbiAgICAgICAgLy8gY2hlY2sgdGhlIHRhYnMgYWZ0ZXIgdGhlIGFjdGl2ZSBvbmUgdG8gc2VlIGlmIHRoZXJlIGFyZSBhbnkgc2VsZWN0YWJsZSB0YWJzXG4gICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMkLnZhbHVlLnNsaWNlKGluZGV4ICsgMSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB0YWJzIGFyZSBub3QgZGlzYWJsZWRcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcbiAgICAgICAgICAgIGlmICghdGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KHRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSByZWFjaCBoZXJlIHRoZW4gbm8gdGFiIGNvdWxkIGJlIHNlbGVjdGVkIC0gc2VsZWN0IHRoZSBmaXJzdCB0YWJcbiAgICAgICAgdGhpcy5zZWxlY3RGaXJzdFRhYigpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVGFiKCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5kZXhcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRhYnMkLnZhbHVlLmluZGV4T2YodGhpcy5hY3RpdmUkLnZhbHVlKTtcblxuICAgICAgICAvLyBjaGVjayB0aGUgdGFicyBiZWZvcmUgdGhlIGFjdGl2ZSBvbmUgdG8gc2VlIGlmIHRoZXJlIGFyZSBhbnkgc2VsZWN0YWJsZSB0YWJzXG4gICAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnRhYnMkLnZhbHVlLnNsaWNlKDAsIGluZGV4KTtcblxuICAgICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhYnMgYXJlIG5vdCBkaXNhYmxlZFxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgdGFicy5yZXZlcnNlKCkpIHtcbiAgICAgICAgICAgIGlmICghdGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KHRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSByZWFjaCBoZXJlIHRoZW4gbm8gcHJldmlvdXMgdGFiIGNvdWxkIGJlIHNlbGVjdGVkIC0gc2VsZWN0IHRoZSBsYXN0IHRhYlxuICAgICAgICB0aGlzLnNlbGVjdExhc3RUYWIoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaXJzdFRhYigpOiB2b2lkIHtcbiAgICAgICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCB0YWJcbiAgICAgICAgY29uc3QgdGFiSW5kZXggPSB0aGlzLnRhYnMkLnZhbHVlLmZpbmRJbmRleCh0YWIgPT4gIXRhYi5kaXNhYmxlZCk7XG5cbiAgICAgICAgaWYgKHRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBdEluZGV4KHRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdExhc3RUYWIoKTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBub24tZGlzYWJsZWQgdGFiXG4gICAgICAgIGNvbnN0IHRhYkluZGV4ID0gdGhpcy50YWJzJC52YWx1ZS5zbGljZSgpLnJldmVyc2UoKS5maW5kSW5kZXgodGFiID0+ICF0YWIuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmICh0YWJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QXRJbmRleCgodGhpcy50YWJzJC52YWx1ZS5sZW5ndGggLSAxKSAtIHRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn0gIl19