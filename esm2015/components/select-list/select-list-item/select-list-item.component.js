/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectListService } from '../select-list.service';
export class SelectListItemComponent {
    /**
     * @param {?} _selectTable
     * @param {?} _elementRef
     */
    constructor(_selectTable, _elementRef) {
        this._selectTable = _selectTable;
        this._elementRef = _elementRef;
        this.tabindex = -1;
        this.isSelected = false;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // watch for changes to the selected state
        this._selectTable.selected$.pipe(takeUntil(this._onDestroy), map((selected) => selected.indexOf(this.data) !== -1))
            .subscribe(isSelected => this.isSelected = isSelected);
        // watch for changes to the focus item - debounce to avoid expression has changed after check warning
        this._selectTable.focused$.pipe(debounceTime(1), takeUntil(this._onDestroy)).subscribe(active => this.tabindex = active === this ? 0 : -1);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
        this._selectTable.focus(this);
    }
    /**
     * @return {?}
     */
    select() {
        // select or deselect the item accordingly
        this.isSelected ? this._selectTable.deselect(this.data) : this._selectTable.select(this.data);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._selectTable.onKeydown(event);
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
    { type: SelectListService },
    { type: ElementRef }
];
SelectListItemComponent.propDecorators = {
    data: [{ type: Input }],
    tabindex: [{ type: HostBinding, args: ['tabindex',] }],
    isSelected: [{ type: HostBinding, args: ['class.selected',] }, { type: HostBinding, args: ['attr.aria-selected',] }],
    focus: [{ type: HostListener, args: ['focus',] }],
    select: [{ type: HostListener, args: ['click',] }, { type: HostListener, args: ['keydown.enter',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDM0csT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVMzRCxNQUFNOzs7OztJQVFGLFlBQW9CLFlBQStCLEVBQVUsV0FBdUI7UUFBaEUsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7d0JBTHhDLENBQUMsQ0FBQzswQkFDMEMsS0FBSzswQkFFeEUsSUFBSSxPQUFPLEVBQVE7S0FFaUQ7Ozs7SUFFekYsUUFBUTs7UUFHSixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFlLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckgsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQzs7UUFHM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUk7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7O0lBR0QsS0FBSztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOzs7O0lBSUQsTUFBTTs7UUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqRzs7Ozs7SUFHRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7OztZQWhESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscUNBQWdEO2dCQUNoRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2FBQ0o7Ozs7WUFSUSxpQkFBaUI7WUFITixVQUFVOzs7bUJBY3pCLEtBQUs7dUJBQ0wsV0FBVyxTQUFDLFVBQVU7eUJBQ3RCLFdBQVcsU0FBQyxnQkFBZ0IsY0FBRyxXQUFXLFNBQUMsb0JBQW9CO29CQXFCL0QsWUFBWSxTQUFDLE9BQU87cUJBTXBCLFlBQVksU0FBQyxPQUFPLGNBQ3BCLFlBQVksU0FBQyxlQUFlO3dCQU01QixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlbGVjdExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2VsZWN0LWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0LWxpc3QtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ2xpc3RpdGVtJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRm9jdXNhYmxlT3B0aW9uIHtcblxuICAgIEBJbnB1dCgpIGRhdGE6IGFueTtcbiAgICBASG9zdEJpbmRpbmcoJ3RhYmluZGV4JykgdGFiaW5kZXg6IG51bWJlciA9IC0xO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0ZWQnKSBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3RUYWJsZTogU2VsZWN0TGlzdFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGNoYW5nZXMgdG8gdGhlIHNlbGVjdGVkIHN0YXRlXG4gICAgICAgIHRoaXMuX3NlbGVjdFRhYmxlLnNlbGVjdGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoKHNlbGVjdGVkOiBhbnlbXSkgPT4gc2VsZWN0ZWQuaW5kZXhPZih0aGlzLmRhdGEpICE9PSAtMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGlzU2VsZWN0ZWQgPT4gdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZCk7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGNoYW5nZXMgdG8gdGhlIGZvY3VzIGl0ZW0gLSBkZWJvdW5jZSB0byBhdm9pZCBleHByZXNzaW9uIGhhcyBjaGFuZ2VkIGFmdGVyIGNoZWNrIHdhcm5pbmdcbiAgICAgICAgdGhpcy5fc2VsZWN0VGFibGUuZm9jdXNlZCQucGlwZShkZWJvdW5jZVRpbWUoMSksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoYWN0aXZlID0+IHRoaXMudGFiaW5kZXggPSBhY3RpdmUgPT09IHRoaXMgPyAwIDogLTEpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLl9zZWxlY3RUYWJsZS5mb2N1cyh0aGlzKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicpXG4gICAgc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICAvLyBzZWxlY3Qgb3IgZGVzZWxlY3QgdGhlIGl0ZW0gYWNjb3JkaW5nbHlcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID8gdGhpcy5fc2VsZWN0VGFibGUuZGVzZWxlY3QodGhpcy5kYXRhKSA6IHRoaXMuX3NlbGVjdFRhYmxlLnNlbGVjdCh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3RUYWJsZS5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbn0iXX0=