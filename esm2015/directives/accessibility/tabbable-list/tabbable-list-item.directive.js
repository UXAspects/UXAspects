/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListService } from './tabbable-list.service';
export class TabbableListItemDirective {
    /**
     * @param {?} _tabbableList
     * @param {?} _elementRef
     */
    constructor(_tabbableList, _elementRef) {
        this._tabbableList = _tabbableList;
        this._elementRef = _elementRef;
        this.disabled = false;
        this.tabindex = -1;
        this.initialized = false;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    onInit() {
        this.initialized = true;
        this._tabbableList.focusKeyManager.change.pipe(takeUntil(this._onDestroy), map(() => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);
    }
    /**
     * @return {?}
     */
    focus() {
        // apply focus to the element
        this._elementRef.nativeElement.focus();
        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        // prevent anything happening when modifier keys are pressed if they have been disabled
        if (!this._tabbableList.allowAltModifier && event.altKey || !this._tabbableList.allowCtrlModifier && event.ctrlKey) {
            return;
        }
        this._tabbableList.focusKeyManager.onKeydown(event);
    }
}
TabbableListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabbableListItem]',
                exportAs: 'ux-tabbable-list-item'
            },] }
];
/** @nocollapse */
TabbableListItemDirective.ctorParameters = () => [
    { type: TabbableListService },
    { type: ElementRef }
];
TabbableListItemDirective.propDecorators = {
    disabled: [{ type: Input }],
    tabindex: [{ type: HostBinding }],
    focus: [{ type: HostListener, args: ['focus',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
function TabbableListItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListItemDirective.prototype.disabled;
    /** @type {?} */
    TabbableListItemDirective.prototype.tabindex;
    /** @type {?} */
    TabbableListItemDirective.prototype.initialized;
    /** @type {?} */
    TabbableListItemDirective.prototype._onDestroy;
    /** @type {?} */
    TabbableListItemDirective.prototype._tabbableList;
    /** @type {?} */
    TabbableListItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFNOUQsTUFBTTs7Ozs7SUFPRixZQUFvQixhQUFrQyxFQUFVLFdBQXVCO1FBQW5FLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQU4xRCxLQUFLO3dCQUNBLENBQUMsQ0FBQzsyQkFDYixLQUFLOzBCQUVQLElBQUksT0FBTyxFQUFRO0tBRW1EOzs7O0lBRTNGLFdBQVc7O1FBR1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdkgsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RDs7OztJQUdELEtBQUs7O1FBR0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELFNBQVMsQ0FBQyxLQUFvQjs7UUFHMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pILE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZEOzs7WUFsREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSx1QkFBdUI7YUFDcEM7Ozs7WUFMUSxtQkFBbUI7WUFIUixVQUFVOzs7dUJBVXpCLEtBQUs7dUJBQ0wsV0FBVztvQkF5QlgsWUFBWSxTQUFDLE9BQU87d0JBVXBCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYmJhYmxlTGlzdEl0ZW1dJyxcbiAgICBleHBvcnRBczogJ3V4LXRhYmJhYmxlLWxpc3QtaXRlbSdcbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygpIHRhYmluZGV4OiBudW1iZXIgPSAtMTtcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RhYmJhYmxlTGlzdDogVGFiYmFibGVMaXN0U2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgaXMgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGl0ZW0gLSBpZiBzbyB3ZSBuZWVkIHRvIG1ha2UgYW5vdGhlciBpdGVtIHRhYmJhYmxlXG4gICAgICAgIGlmICh0aGlzLnRhYmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3Quc2V0Rmlyc3RJdGVtVGFiYmFibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5jaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKCgpID0+IHRoaXMuX3RhYmJhYmxlTGlzdC5pc0l0ZW1BY3RpdmUodGhpcykpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShhY3RpdmUgPT4gdGhpcy50YWJpbmRleCA9IGFjdGl2ZSA/IDAgOiAtMSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICAgIGZvY3VzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGFwcGx5IGZvY3VzIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgZm9jdXMga2V5IG1hbmFnZXIgdXBkYXRlcyB0aGUgYWN0aXZlIGl0ZW0gY29ycmVjdGx5XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBwcmV2ZW50IGFueXRoaW5nIGhhcHBlbmluZyB3aGVuIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgaWYgdGhleSBoYXZlIGJlZW4gZGlzYWJsZWRcbiAgICAgICAgaWYgKCF0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dBbHRNb2RpZmllciAmJiBldmVudC5hbHRLZXkgfHwgIXRoaXMuX3RhYmJhYmxlTGlzdC5hbGxvd0N0cmxNb2RpZmllciAmJiBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxufSJdfQ==