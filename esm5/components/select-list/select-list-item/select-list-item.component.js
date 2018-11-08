/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { SelectionService } from '../../../directives/selection/selection.service';
/**
 * @template T
 */
var SelectListItemComponent = /** @class */ (function () {
    function SelectListItemComponent(_selection, elementRef) {
        var _this = this;
        this._selection = _selection;
        this.tabindex = -1;
        this._onDestroy = new Subject();
        _selection.active$.pipe(takeUntil(this._onDestroy), filter(function (data) { return data === _this.data; })).subscribe(function (active) {
            _selection.focus$.next(active);
            elementRef.nativeElement.focus();
        });
        // make this item tabbable or not based on the focused element
        _selection.focus$.pipe(takeUntil(this._onDestroy), tick())
            .subscribe(function (focused) { return _this.tabindex = focused === _this.data ? 0 : -1; });
    }
    Object.defineProperty(SelectListItemComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selection.isSelected(this.data);
        },
        set: /**
         * @param {?} isSelected
         * @return {?}
         */
        function (isSelected) {
            isSelected ? this._selection.select(this.data) : this._selection.deselect(this.data);
        },
        enumerable: true,
        configurable: true
    });
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
     * @param {?} event
     * @return {?}
     */
    SelectListItemComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._selection.strategy.mousedown(event, this.data);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectListItemComponent.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._selection.strategy.click(event, this.data);
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
        this._selection.strategy.keydown(event, this.data);
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
        { type: SelectionService },
        { type: ElementRef }
    ]; };
    SelectListItemComponent.propDecorators = {
        data: [{ type: Input }],
        tabindex: [{ type: HostBinding, args: ['tabindex',] }],
        selected: [{ type: HostBinding, args: ['class.selected',] }, { type: HostBinding, args: ['attr.aria-selected',] }],
        onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
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
    SelectListItemComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListItemComponent.prototype._selection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7OztJQTBCL0UsaUNBQW9CLFVBQStCLEVBQUUsVUFBc0I7UUFBM0UsaUJBVUM7UUFWbUIsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7d0JBZFAsQ0FBQyxDQUFDOzBCQVl6QixJQUFJLE9BQU8sRUFBUTtRQUlwQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxLQUFJLENBQUMsSUFBSSxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3BHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEMsQ0FBQyxDQUFDOztRQUdILFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDckQsU0FBUyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLEtBQUssS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDO0tBQzdFO0lBdEJELHNCQUVJLDZDQUFROzs7O1FBSVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hEOzs7OztRQVJELFVBRWEsVUFBbUI7WUFDNUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4Rjs7O09BQUE7Ozs7SUFvQkQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUdELDZDQUFXOzs7O0lBRFgsVUFDWSxLQUFpQjtRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4RDs7Ozs7SUFHRCx5Q0FBTzs7OztJQURQLFVBQ1EsS0FBaUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEQ7Ozs7O0lBR0QsMkNBQVM7Ozs7SUFEVCxVQUNVLEtBQW9CO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3REOztnQkF0REosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLHFDQUFnRDtvQkFDaEQsSUFBSSxFQUFFO3dCQUNGLElBQUksRUFBRSxVQUFVO3FCQUNuQjtpQkFDSjs7OztnQkFSUSxnQkFBZ0I7Z0JBSkwsVUFBVTs7O3VCQWV6QixLQUFLOzJCQUNMLFdBQVcsU0FBQyxVQUFVOzJCQUV0QixXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLFdBQVcsU0FBQyxvQkFBb0I7OEJBNEJoQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQUtwQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUtoQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOztrQ0F6RHZDOztTQWFhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXgnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zZWxlY3QtbGlzdC1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICByb2xlOiAnbGlzdGl0ZW0nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBUO1xuICAgIEBIb3N0QmluZGluZygndGFiaW5kZXgnKSB0YWJpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJylcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gICAgc2V0IHNlbGVjdGVkKGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaXNTZWxlY3RlZCA/IHRoaXMuX3NlbGVjdGlvbi5zZWxlY3QodGhpcy5kYXRhKSA6IHRoaXMuX3NlbGVjdGlvbi5kZXNlbGVjdCh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZTxUPiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgICAgIF9zZWxlY3Rpb24uYWN0aXZlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoZGF0YSA9PiBkYXRhID09PSB0aGlzLmRhdGEpKS5zdWJzY3JpYmUoYWN0aXZlID0+IHtcbiAgICAgICAgICAgIF9zZWxlY3Rpb24uZm9jdXMkLm5leHQoYWN0aXZlKTtcbiAgICAgICAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBtYWtlIHRoaXMgaXRlbSB0YWJiYWJsZSBvciBub3QgYmFzZWQgb24gdGhlIGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBfc2VsZWN0aW9uLmZvY3VzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCB0aWNrKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZvY3VzZWQgPT4gdGhpcy50YWJpbmRleCA9IGZvY3VzZWQgPT09IHRoaXMuZGF0YSA/IDAgOiAtMSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnN0cmF0ZWd5Lm1vdXNlZG93bihldmVudCwgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3RyYXRlZ3kuY2xpY2soZXZlbnQsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zdHJhdGVneS5rZXlkb3duKGV2ZW50LCB0aGlzLmRhdGEpO1xuICAgIH1cbn0iXX0=