/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectListService } from '../select-list.service';
var SelectListItemComponent = /** @class */ (function () {
    function SelectListItemComponent(_selectTable, _elementRef) {
        this._selectTable = _selectTable;
        this._elementRef = _elementRef;
        this.tabindex = -1;
        this.isSelected = false;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    SelectListItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // watch for changes to the selected state
        this._selectTable.selected$.pipe(takeUntil(this._onDestroy), map(function (selected) { return selected.indexOf(_this.data) !== -1; }))
            .subscribe(function (isSelected) { return _this.isSelected = isSelected; });
        // watch for changes to the focus item - debounce to avoid expression has changed after check warning
        this._selectTable.focused$.pipe(debounceTime(1), takeUntil(this._onDestroy)).subscribe(function (active) { return _this.tabindex = active === _this ? 0 : -1; });
    };
    /**
     * @return {?}
     */
    SelectListItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    SelectListItemComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
        this._selectTable.focus(this);
    };
    /**
     * @return {?}
     */
    SelectListItemComponent.prototype.select = /**
     * @return {?}
     */
    function () {
        // select or deselect the item accordingly
        this.isSelected ? this._selectTable.deselect(this.data) : this._selectTable.select(this.data);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectListItemComponent.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._selectTable.onKeydown(event);
    };
    SelectListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select-list-item',
                    template: "<ng-content></ng-content>",
                    host: {
                        role: 'listitem'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectListItemComponent.ctorParameters = function () { return [
        { type: SelectListService },
        { type: ElementRef }
    ]; };
    SelectListItemComponent.propDecorators = {
        data: [{ type: Input }],
        tabindex: [{ type: HostBinding, args: ['tabindex',] }],
        isSelected: [{ type: HostBinding, args: ['class.selected',] }, { type: HostBinding, args: ['attr.aria-selected',] }],
        focus: [{ type: HostListener, args: ['focus',] }],
        select: [{ type: HostListener, args: ['click',] }, { type: HostListener, args: ['keydown.enter',] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return SelectListItemComponent;
}());
export { SelectListItemComponent };
function SelectListItemComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectListItemComponent.prototype.data;
    /** @type {?} */
    SelectListItemComponent.prototype.tabindex;
    /** @type {?} */
    SelectListItemComponent.prototype.isSelected;
    /** @type {?} */
    SelectListItemComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListItemComponent.prototype._selectTable;
    /** @type {?} */
    SelectListItemComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDM0csT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFpQnZELGlDQUFvQixZQUErQixFQUFVLFdBQXVCO1FBQWhFLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQUx4QyxDQUFDLENBQUM7MEJBQzBDLEtBQUs7MEJBRXhFLElBQUksT0FBTyxFQUFRO0tBRWlEOzs7O0lBRXpGLDBDQUFROzs7SUFBUjtRQUFBLGlCQVFDOztRQUxHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFDLFFBQWUsSUFBSyxPQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUM7YUFDckgsU0FBUyxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLEVBQTVCLENBQTRCLENBQUMsQ0FBQzs7UUFHM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLEtBQUssS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDLENBQUM7S0FDOUk7Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7SUFHRCx1Q0FBSzs7O0lBREw7UUFFSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQzs7OztJQUlELHdDQUFNOzs7SUFGTjs7UUFJSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqRzs7Ozs7SUFHRCwyQ0FBUzs7OztJQURULFVBQ1UsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7O2dCQWhESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IscUNBQWdEO29CQUNoRCxJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLFVBQVU7cUJBQ25CO2lCQUNKOzs7O2dCQVJRLGlCQUFpQjtnQkFITixVQUFVOzs7dUJBY3pCLEtBQUs7MkJBQ0wsV0FBVyxTQUFDLFVBQVU7NkJBQ3RCLFdBQVcsU0FBQyxnQkFBZ0IsY0FBRyxXQUFXLFNBQUMsb0JBQW9CO3dCQXFCL0QsWUFBWSxTQUFDLE9BQU87eUJBTXBCLFlBQVksU0FBQyxPQUFPLGNBQ3BCLFlBQVksU0FBQyxlQUFlOzRCQU01QixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOztrQ0FuRHZDOztTQWFhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTZWxlY3RMaXN0U2VydmljZSB9IGZyb20gJy4uL3NlbGVjdC1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNlbGVjdC1saXN0LWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdsaXN0aXRlbSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdExpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEZvY3VzYWJsZU9wdGlvbiB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBhbnk7XG4gICAgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIHRhYmluZGV4OiBudW1iZXIgPSAtMTtcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJykgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKSBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0VGFibGU6IFNlbGVjdExpc3RTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBzZWxlY3RlZCBzdGF0ZVxuICAgICAgICB0aGlzLl9zZWxlY3RUYWJsZS5zZWxlY3RlZCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKChzZWxlY3RlZDogYW55W10pID0+IHNlbGVjdGVkLmluZGV4T2YodGhpcy5kYXRhKSAhPT0gLTEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShpc1NlbGVjdGVkID0+IHRoaXMuaXNTZWxlY3RlZCA9IGlzU2VsZWN0ZWQpO1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBmb2N1cyBpdGVtIC0gZGVib3VuY2UgdG8gYXZvaWQgZXhwcmVzc2lvbiBoYXMgY2hhbmdlZCBhZnRlciBjaGVjayB3YXJuaW5nXG4gICAgICAgIHRoaXMuX3NlbGVjdFRhYmxlLmZvY3VzZWQkLnBpcGUoZGVib3VuY2VUaW1lKDEpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGFjdGl2ZSA9PiB0aGlzLnRhYmluZGV4ID0gYWN0aXZlID09PSB0aGlzID8gMCA6IC0xKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0VGFibGUuZm9jdXModGhpcyk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInKVxuICAgIHNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gc2VsZWN0IG9yIGRlc2VsZWN0IHRoZSBpdGVtIGFjY29yZGluZ2x5XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA/IHRoaXMuX3NlbGVjdFRhYmxlLmRlc2VsZWN0KHRoaXMuZGF0YSkgOiB0aGlzLl9zZWxlY3RUYWJsZS5zZWxlY3QodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0VGFibGUub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG59Il19