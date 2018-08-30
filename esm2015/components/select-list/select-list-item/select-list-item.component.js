/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from '../../../directives/selection/selection.service';
export class SelectListItemComponent {
    /**
     * @param {?} _selection
     * @param {?} elementRef
     */
    constructor(_selection, elementRef) {
        this._selection = _selection;
        this.tabindex = -1;
        this._onDestroy = new Subject();
        _selection.active$.pipe(takeUntil(this._onDestroy), filter(data => data === this.data)).subscribe(active => {
            _selection.focus$.next(active);
            elementRef.nativeElement.focus();
        });
        // make this item tabbable or not based on the focused element
        _selection.focus$.pipe(takeUntil(this._onDestroy))
            .subscribe(focused => this.tabindex = focused === this.data ? 0 : -1);
    }
    /**
     * @param {?} isSelected
     * @return {?}
     */
    set selected(isSelected) {
        isSelected ? this._selection.select(this.data) : this._selection.deselect(this.data);
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selection.isSelected(this.data);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        this._selection.strategy.mousedown(event, this.data);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this._selection.strategy.click(event, this.data);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._selection.strategy.keydown(event, this.data);
    }
}
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
SelectListItemComponent.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef }
];
SelectListItemComponent.propDecorators = {
    data: [{ type: Input }],
    tabindex: [{ type: HostBinding, args: ['tabindex',] }],
    selected: [{ type: HostBinding, args: ['class.selected',] }, { type: HostBinding, args: ['attr.aria-selected',] }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFTbkYsTUFBTTs7Ozs7SUFpQkYsWUFBb0IsVUFBNEIsRUFBRSxVQUFzQjtRQUFwRCxlQUFVLEdBQVYsVUFBVSxDQUFrQjt3QkFkSixDQUFDLENBQUM7MEJBWXpCLElBQUksT0FBTyxFQUFRO1FBSXBDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2RyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3BDLENBQUMsQ0FBQzs7UUFHSCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RTs7Ozs7SUF0QkQsSUFFSSxRQUFRLENBQUMsVUFBbUI7UUFDNUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4Rjs7OztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7Ozs7SUFnQkQsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBaUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEQ7Ozs7O0lBR0QsT0FBTyxDQUFDLEtBQWlCO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BEOzs7OztJQUdELFNBQVMsQ0FBQyxLQUFvQjtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RDs7O1lBdERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixxQ0FBZ0Q7Z0JBQ2hELElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsVUFBVTtpQkFDbkI7YUFDSjs7OztZQVJRLGdCQUFnQjtZQUhMLFVBQVU7OzttQkFjekIsS0FBSzt1QkFDTCxXQUFXLFNBQUMsVUFBVTt1QkFFdEIsV0FBVyxTQUFDLGdCQUFnQixjQUM1QixXQUFXLFNBQUMsb0JBQW9COzBCQTRCaEMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkFLcEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFLaEMsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0LWxpc3QtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ2xpc3RpdGVtJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZGF0YTogYW55O1xuICAgIEBIb3N0QmluZGluZygndGFiaW5kZXgnKSB0YWJpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJylcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gICAgc2V0IHNlbGVjdGVkKGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaXNTZWxlY3RlZCA/IHRoaXMuX3NlbGVjdGlvbi5zZWxlY3QodGhpcy5kYXRhKSA6IHRoaXMuX3NlbGVjdGlvbi5kZXNlbGVjdCh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgICAgIF9zZWxlY3Rpb24uYWN0aXZlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBmaWx0ZXIoZGF0YSA9PiBkYXRhID09PSB0aGlzLmRhdGEpKS5zdWJzY3JpYmUoYWN0aXZlID0+IHtcbiAgICAgICAgICAgIF9zZWxlY3Rpb24uZm9jdXMkLm5leHQoYWN0aXZlKTtcbiAgICAgICAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBtYWtlIHRoaXMgaXRlbSB0YWJiYWJsZSBvciBub3QgYmFzZWQgb24gdGhlIGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBfc2VsZWN0aW9uLmZvY3VzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmb2N1c2VkID0+IHRoaXMudGFiaW5kZXggPSBmb2N1c2VkID09PSB0aGlzLmRhdGEgPyAwIDogLTEpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zdHJhdGVneS5tb3VzZWRvd24oZXZlbnQsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnN0cmF0ZWd5LmNsaWNrKGV2ZW50LCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3RyYXRlZ3kua2V5ZG93bihldmVudCwgdGhpcy5kYXRhKTtcbiAgICB9XG59Il19