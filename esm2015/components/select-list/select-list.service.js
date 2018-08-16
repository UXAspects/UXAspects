/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
export class SelectListService {
    constructor() {
        this.multiple = false;
        this.selected$ = new BehaviorSubject([]);
        this.focused$ = new ReplaySubject();
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} items
     * @return {?}
     */
    initialise(items) {
        // store the items
        this._items = items;
        // create the focus key manager
        this._focusKeyManager = new FocusKeyManager(items)
            .withVerticalOrientation()
            .withWrap();
        // make the first item tabbable by default
        if (items.first) {
            this.focused$.next(items.first);
        }
        // emit the focused item any time it changes
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.focused$.next(this._focusKeyManager.activeItem));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        this.multiple ? this.selected$.next([...this.selected$.value, item]) : this.selected$.next([item]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    deselect(item) {
        this.selected$.next(this.selected$.value.filter(_item => _item !== item));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    focus(item) {
        if (this._focusKeyManager.activeItem !== item) {
            this._focusKeyManager.setActiveItem(this.getIndexOfItem(item));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._focusKeyManager.onKeydown(event);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getIndexOfItem(item) {
        return this._items.toArray().indexOf(item);
    }
}
SelectListService.decorators = [
    { type: Injectable }
];
function SelectListService_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectListService.prototype.multiple;
    /** @type {?} */
    SelectListService.prototype.selected$;
    /** @type {?} */
    SelectListService.prototype.focused$;
    /** @type {?} */
    SelectListService.prototype._items;
    /** @type {?} */
    SelectListService.prototype._focusKeyManager;
    /** @type {?} */
    SelectListService.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC1saXN0L3NlbGVjdC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSXZDLE1BQU07O3dCQUVrQixLQUFLO3lCQUNiLElBQUksZUFBZSxDQUFRLEVBQUUsQ0FBQzt3QkFDL0IsSUFBSSxhQUFhLEVBQTJCOzBCQUlsQyxJQUFJLE9BQU8sRUFBUTs7Ozs7SUFFeEMsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBeUM7O1FBR2hELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUdwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDO2FBQzdDLHVCQUF1QixFQUFFO2FBQ3pCLFFBQVEsRUFBRSxDQUFDOztRQUdoQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzs7UUFHRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM5RTs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBUztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdEc7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM3RTs7Ozs7SUFFRCxLQUFLLENBQUMsSUFBNkI7UUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO0tBQ0o7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRU8sY0FBYyxDQUFDLElBQTZCO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztZQXZEbEQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcy9SZXBsYXlTdWJqZWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1saXN0LWl0ZW0vc2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VsZWN0TGlzdFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzZWxlY3RlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XG4gICAgZm9jdXNlZCQgPSBuZXcgUmVwbGF5U3ViamVjdDxTZWxlY3RMaXN0SXRlbUNvbXBvbmVudD4oKTtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0TGlzdEl0ZW1Db21wb25lbnQ+O1xuICAgIHByaXZhdGUgX2ZvY3VzS2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPFNlbGVjdExpc3RJdGVtQ29tcG9uZW50PjtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGluaXRpYWxpc2UoaXRlbXM6IFF1ZXJ5TGlzdDxTZWxlY3RMaXN0SXRlbUNvbXBvbmVudD4pOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgaXRlbXNcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIGZvY3VzIGtleSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXIoaXRlbXMpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKVxuICAgICAgICAgICAgLndpdGhXcmFwKCk7XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgZmlyc3QgaXRlbSB0YWJiYWJsZSBieSBkZWZhdWx0XG4gICAgICAgIGlmIChpdGVtcy5maXJzdCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkJC5uZXh0KGl0ZW1zLmZpcnN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVtaXQgdGhlIGZvY3VzZWQgaXRlbSBhbnkgdGltZSBpdCBjaGFuZ2VzXG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5mb2N1c2VkJC5uZXh0KHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3RlZCQubmV4dChbLi4udGhpcy5zZWxlY3RlZCQudmFsdWUsIGl0ZW1dKSA6IHRoaXMuc2VsZWN0ZWQkLm5leHQoW2l0ZW1dKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdChpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dCh0aGlzLnNlbGVjdGVkJC52YWx1ZS5maWx0ZXIoX2l0ZW0gPT4gX2l0ZW0gIT09IGl0ZW0pKTtcbiAgICB9XG5cbiAgICBmb2N1cyhpdGVtOiBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gIT09IGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuZ2V0SW5kZXhPZkl0ZW0oaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5kZXhPZkl0ZW0oaXRlbTogU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMudG9BcnJheSgpLmluZGV4T2YoaXRlbSk7XG4gICAgfVxuXG59Il19