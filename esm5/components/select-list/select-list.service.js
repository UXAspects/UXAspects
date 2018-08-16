/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
var SelectListService = /** @class */ (function () {
    function SelectListService() {
        this.multiple = false;
        this.selected$ = new BehaviorSubject([]);
        this.focused$ = new ReplaySubject();
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    SelectListService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} items
     * @return {?}
     */
    SelectListService.prototype.initialise = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
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
            .subscribe(function () { return _this.focused$.next(_this._focusKeyManager.activeItem); });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectListService.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.multiple ? this.selected$.next(tslib_1.__spread(this.selected$.value, [item])) : this.selected$.next([item]);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectListService.prototype.deselect = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.selected$.next(this.selected$.value.filter(function (_item) { return _item !== item; }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectListService.prototype.focus = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._focusKeyManager.activeItem !== item) {
            this._focusKeyManager.setActiveItem(this.getIndexOfItem(item));
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectListService.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._focusKeyManager.onKeydown(event);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectListService.prototype.getIndexOfItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this._items.toArray().indexOf(item);
    };
    SelectListService.decorators = [
        { type: Injectable }
    ];
    return SelectListService;
}());
export { SelectListService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC1saXN0L3NlbGVjdC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O3dCQU1mLEtBQUs7eUJBQ2IsSUFBSSxlQUFlLENBQVEsRUFBRSxDQUFDO3dCQUMvQixJQUFJLGFBQWEsRUFBMkI7MEJBSWxDLElBQUksT0FBTyxFQUFROzs7OztJQUV4Qyx1Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsc0NBQVU7Ozs7SUFBVixVQUFXLEtBQXlDO1FBQXBELGlCQWtCQzs7UUFmRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7UUFHcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQzthQUM3Qyx1QkFBdUIsRUFBRTthQUN6QixRQUFRLEVBQUUsQ0FBQzs7UUFHaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7O1FBR0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4RCxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO0tBQzlFOzs7OztJQUVELGtDQUFNOzs7O0lBQU4sVUFBTyxJQUFTO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGtCQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFFLElBQUksR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdEc7Ozs7O0lBRUQsb0NBQVE7Ozs7SUFBUixVQUFTLElBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEtBQUssSUFBSSxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUM7S0FDN0U7Ozs7O0lBRUQsaUNBQUs7Ozs7SUFBTCxVQUFNLElBQTZCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNsRTtLQUNKOzs7OztJQUVELHFDQUFTOzs7O0lBQVQsVUFBVSxLQUFvQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFDOzs7OztJQUVPLDBDQUFjOzs7O2NBQUMsSUFBNkI7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Z0JBdkRsRCxVQUFVOzs0QkFSWDs7U0FTYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMvUmVwbGF5U3ViamVjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlbGVjdExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlbGVjdExpc3RTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2VsZWN0ZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4oW10pO1xuICAgIGZvY3VzZWQkID0gbmV3IFJlcGxheVN1YmplY3Q8U2VsZWN0TGlzdEl0ZW1Db21wb25lbnQ+KCk7XG5cbiAgICBwcml2YXRlIF9pdGVtczogUXVlcnlMaXN0PFNlbGVjdExpc3RJdGVtQ29tcG9uZW50PjtcbiAgICBwcml2YXRlIF9mb2N1c0tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxTZWxlY3RMaXN0SXRlbUNvbXBvbmVudD47XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXNlKGl0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0TGlzdEl0ZW1Db21wb25lbnQ+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGl0ZW1zXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBmb2N1cyBrZXkgbWFuYWdlclxuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyKGl0ZW1zKVxuICAgICAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgIC53aXRoV3JhcCgpO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGZpcnN0IGl0ZW0gdGFiYmFibGUgYnkgZGVmYXVsdFxuICAgICAgICBpZiAoaXRlbXMuZmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCQubmV4dChpdGVtcy5maXJzdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWl0IHRoZSBmb2N1c2VkIGl0ZW0gYW55IHRpbWUgaXQgY2hhbmdlc1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZm9jdXNlZCQubmV4dCh0aGlzLl9mb2N1c0tleU1hbmFnZXIuYWN0aXZlSXRlbSkpO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tdWx0aXBsZSA/IHRoaXMuc2VsZWN0ZWQkLm5leHQoWy4uLnRoaXMuc2VsZWN0ZWQkLnZhbHVlLCBpdGVtXSkgOiB0aGlzLnNlbGVjdGVkJC5uZXh0KFtpdGVtXSk7XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQodGhpcy5zZWxlY3RlZCQudmFsdWUuZmlsdGVyKF9pdGVtID0+IF9pdGVtICE9PSBpdGVtKSk7XG4gICAgfVxuXG4gICAgZm9jdXMoaXRlbTogU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5hY3RpdmVJdGVtICE9PSBpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLmdldEluZGV4T2ZJdGVtKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluZGV4T2ZJdGVtKGl0ZW06IFNlbGVjdExpc3RJdGVtQ29tcG9uZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLnRvQXJyYXkoKS5pbmRleE9mKGl0ZW0pO1xuICAgIH1cblxufSJdfQ==