/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class TabsetService {
    constructor() {
        this.tabs$ = new BehaviorSubject([]);
        this.active$ = new BehaviorSubject(null);
        this.focused$ = new BehaviorSubject(false);
        this.highlighted$ = new BehaviorSubject(null);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    add(tab) {
        this.tabs$.next([...this.tabs$.value, tab]);
        // check if this is the only tab. If so select this by default
        if (!this.active$.value) {
            this.select(tab);
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    remove(tab) {
        // remove the tab
        this.tabs$.next(this.tabs$.value.filter(_tab => _tab !== tab));
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    select(tab) {
        if (!tab.disabled) {
            this.active$.next(tab);
            this.highlighted$.next(tab);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectAtIndex(index) {
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
        const /** @type {?} */ target = this.tabs$.value[index];
        if (target) {
            this.select(target);
        }
    }
    /**
     * @return {?}
     */
    selectNextTab() {
        // find the currently selected index
        const /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs after the active one to see if there are any selectable tabs
        const /** @type {?} */ tabs = this.tabs$.value.slice(index + 1);
        // check if any of the tabs are not disabled
        for (let /** @type {?} */ tab of tabs) {
            if (!tab.disabled) {
                return this.select(tab);
            }
        }
        // if we reach here then no tab could be selected - select the first tab
        this.selectFirstTab();
    }
    /**
     * @return {?}
     */
    selectPreviousTab() {
        // find the currently selected index
        const /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs before the active one to see if there are any selectable tabs
        const /** @type {?} */ tabs = this.tabs$.value.slice(0, index);
        // check if any of the tabs are not disabled
        for (let /** @type {?} */ tab of tabs.reverse()) {
            if (!tab.disabled) {
                return this.select(tab);
            }
        }
        // if we reach here then no previous tab could be selected - select the last tab
        this.selectLastTab();
    }
    /**
     * @return {?}
     */
    selectFirstTab() {
        // find the index of the first non-disabled tab
        const /** @type {?} */ tabIndex = this.tabs$.value.findIndex(tab => !tab.disabled);
        if (tabIndex !== -1) {
            this.selectAtIndex(tabIndex);
        }
    }
    /**
     * @return {?}
     */
    selectLastTab() {
        // find the index of the first non-disabled tab
        const /** @type {?} */ tabIndex = this.tabs$.value.slice().reverse().findIndex(tab => !tab.disabled);
        if (tabIndex !== -1) {
            this.selectAtIndex((this.tabs$.value.length - 1) - tabIndex);
        }
    }
}
TabsetService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TabsetService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90YWJzZXQvdGFic2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSXZELE1BQU07O3FCQUVNLElBQUksZUFBZSxDQUFpQixFQUFFLENBQUM7dUJBQ3JDLElBQUksZUFBZSxDQUFlLElBQUksQ0FBQzt3QkFDdEMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzRCQUMvQixJQUFJLGVBQWUsQ0FBZSxJQUFJLENBQUM7Ozs7OztJQUV0RCxHQUFHLENBQUMsR0FBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1FBRzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7S0FDSjs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBaUI7O1FBR3BCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbEU7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQWlCO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFD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LENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDaEU7S0FDSjs7O1lBdkdKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYnNldFNlcnZpY2Uge1xuXG4gICAgdGFicyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRhYkNvbXBvbmVudFtdPihbXSk7XG4gICAgYWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VGFiQ29tcG9uZW50PihudWxsKTtcbiAgICBmb2N1c2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGhpZ2hsaWdodGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VGFiQ29tcG9uZW50PihudWxsKTtcblxuICAgIGFkZCh0YWI6IFRhYkNvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYnMkLm5leHQoWy4uLnRoaXMudGFicyQudmFsdWUsIHRhYl0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgdGhlIG9ubHkgdGFiLiBJZiBzbyBzZWxlY3QgdGhpcyBieSBkZWZhdWx0XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUkLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCh0YWIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKHRhYjogVGFiQ29tcG9uZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSB0YWJcbiAgICAgICAgdGhpcy50YWJzJC5uZXh0KHRoaXMudGFicyQudmFsdWUuZmlsdGVyKF90YWIgPT4gX3RhYiAhPT0gdGFiKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KHRhYjogVGFiQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSQubmV4dCh0YWIpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZCQubmV4dCh0YWIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0QXRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIHRhYnMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLnRhYnMkLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGluZGV4IGlzIHdpdGhpbiB0aGUgYm91bmRzXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdEF0SW5kZXgodGhpcy50YWJzJC52YWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+PSB0aGlzLnRhYnMkLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0QXRJbmRleCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFicyQudmFsdWVbaW5kZXhdO1xuXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VGFiKCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5kZXhcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRhYnMkLnZhbHVlLmluZGV4T2YodGhpcy5hY3RpdmUkLnZhbHVlKTtcblxuICAgICAgICAvLyBjaGVjayB0aGUgdGFicyBhZnRlciB0aGUgYWN0aXZlIG9uZSB0byBzZWUgaWYgdGhlcmUgYXJlIGFueSBzZWxlY3RhYmxlIHRhYnNcbiAgICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFicyQudmFsdWUuc2xpY2UoaW5kZXggKyAxKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBhbnkgb2YgdGhlIHRhYnMgYXJlIG5vdCBkaXNhYmxlZFxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgdGFicykge1xuICAgICAgICAgICAgaWYgKCF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3QodGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIHJlYWNoIGhlcmUgdGhlbiBubyB0YWIgY291bGQgYmUgc2VsZWN0ZWQgLSBzZWxlY3QgdGhlIGZpcnN0IHRhYlxuICAgICAgICB0aGlzLnNlbGVjdEZpcnN0VGFiKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoKTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpbmRleFxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudGFicyQudmFsdWUuaW5kZXhPZih0aGlzLmFjdGl2ZSQudmFsdWUpO1xuXG4gICAgICAgIC8vIGNoZWNrIHRoZSB0YWJzIGJlZm9yZSB0aGUgYWN0aXZlIG9uZSB0byBzZWUgaWYgdGhlcmUgYXJlIGFueSBzZWxlY3RhYmxlIHRhYnNcbiAgICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFicyQudmFsdWUuc2xpY2UoMCwgaW5kZXgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGFueSBvZiB0aGUgdGFicyBhcmUgbm90IGRpc2FibGVkXG4gICAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzLnJldmVyc2UoKSkge1xuICAgICAgICAgICAgaWYgKCF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3QodGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIHJlYWNoIGhlcmUgdGhlbiBubyBwcmV2aW91cyB0YWIgY291bGQgYmUgc2VsZWN0ZWQgLSBzZWxlY3QgdGhlIGxhc3QgdGFiXG4gICAgICAgIHRoaXMuc2VsZWN0TGFzdFRhYigpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpcnN0VGFiKCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGUgZmlyc3Qgbm9uLWRpc2FibGVkIHRhYlxuICAgICAgICBjb25zdCB0YWJJbmRleCA9IHRoaXMudGFicyQudmFsdWUuZmluZEluZGV4KHRhYiA9PiAhdGFiLmRpc2FibGVkKTtcblxuICAgICAgICBpZiAodGFiSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEF0SW5kZXgodGFiSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0TGFzdFRhYigpOiB2b2lkIHtcbiAgICAgICAgLy8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IG5vbi1kaXNhYmxlZCB0YWJcbiAgICAgICAgY29uc3QgdGFiSW5kZXggPSB0aGlzLnRhYnMkLnZhbHVlLnNsaWNlKCkucmV2ZXJzZSgpLmZpbmRJbmRleCh0YWIgPT4gIXRhYi5kaXNhYmxlZCk7XG5cbiAgICAgICAgaWYgKHRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBdEluZGV4KCh0aGlzLnRhYnMkLnZhbHVlLmxlbmd0aCAtIDEpIC0gdGFiSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufSAiXX0=