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
        _selection.focus$.pipe(takeUntil(this._onDestroy), tick())
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7O0FBU25GLE1BQU07Ozs7O0lBaUJGLFlBQW9CLFVBQStCLEVBQUUsVUFBc0I7UUFBdkQsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7d0JBZFAsQ0FBQyxDQUFDOzBCQVl6QixJQUFJLE9BQU8sRUFBUTtRQUlwQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQyxDQUFDLENBQUM7O1FBR0gsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNyRCxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0U7Ozs7O0lBdEJELElBRUksUUFBUSxDQUFDLFVBQW1CO1FBQzVCLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEY7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBZ0JELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsV0FBVyxDQUFDLEtBQWlCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUdELE9BQU8sQ0FBQyxLQUFpQjtRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwRDs7Ozs7SUFHRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7OztZQXRESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscUNBQWdEO2dCQUNoRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2FBQ0o7Ozs7WUFSUSxnQkFBZ0I7WUFKTCxVQUFVOzs7bUJBZXpCLEtBQUs7dUJBQ0wsV0FBVyxTQUFDLFVBQVU7dUJBRXRCLFdBQVcsU0FBQyxnQkFBZ0IsY0FDNUIsV0FBVyxTQUFDLG9CQUFvQjswQkE0QmhDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0JBS3BDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBS2hDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyB0aWNrIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2luZGV4JztcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0LWxpc3QtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ2xpc3RpdGVtJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZGF0YTogVDtcbiAgICBASG9zdEJpbmRpbmcoJ3RhYmluZGV4JykgdGFiaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxuICAgIHNldCBzZWxlY3RlZChpc1NlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlzU2VsZWN0ZWQgPyB0aGlzLl9zZWxlY3Rpb24uc2VsZWN0KHRoaXMuZGF0YSkgOiB0aGlzLl9zZWxlY3Rpb24uZGVzZWxlY3QodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvblNlcnZpY2U8VD4sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcblxuICAgICAgICBfc2VsZWN0aW9uLmFjdGl2ZSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKGRhdGEgPT4gZGF0YSA9PT0gdGhpcy5kYXRhKSkuc3Vic2NyaWJlKGFjdGl2ZSA9PiB7XG4gICAgICAgICAgICBfc2VsZWN0aW9uLmZvY3VzJC5uZXh0KGFjdGl2ZSk7XG4gICAgICAgICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbWFrZSB0aGlzIGl0ZW0gdGFiYmFibGUgb3Igbm90IGJhc2VkIG9uIHRoZSBmb2N1c2VkIGVsZW1lbnRcbiAgICAgICAgX3NlbGVjdGlvbi5mb2N1cyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgdGljaygpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmb2N1c2VkID0+IHRoaXMudGFiaW5kZXggPSBmb2N1c2VkID09PSB0aGlzLmRhdGEgPyAwIDogLTEpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zdHJhdGVneS5tb3VzZWRvd24oZXZlbnQsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnN0cmF0ZWd5LmNsaWNrKGV2ZW50LCB0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3RyYXRlZ3kua2V5ZG93bihldmVudCwgdGhpcy5kYXRhKTtcbiAgICB9XG59Il19