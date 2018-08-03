/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListService } from './tabbable-list.service';
var TabbableListItemDirective = /** @class */ (function () {
    function TabbableListItemDirective(_tabbableList, _elementRef) {
        this._tabbableList = _tabbableList;
        this._elementRef = _elementRef;
        this.disabled = false;
        this.tabindex = -1;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.onInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._tabbableList.focusKeyManager.change.pipe(takeUntil(this._onDestroy), map(function (index) { return _this._tabbableList.isItemActive(_this); }))
            .subscribe(function (active) { return _this.tabindex = active ? 0 : -1; });
    };
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        // apply focus to the element
        this._elementRef.nativeElement.focus();
        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TabbableListItemDirective.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._tabbableList.focusKeyManager.onKeydown(event);
    };
    TabbableListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabbableListItem]',
                },] }
    ];
    /** @nocollapse */
    TabbableListItemDirective.ctorParameters = function () { return [
        { type: TabbableListService },
        { type: ElementRef }
    ]; };
    TabbableListItemDirective.propDecorators = {
        disabled: [{ type: Input }],
        tabindex: [{ type: HostBinding }],
        focus: [{ type: HostListener, args: ['focus',] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return TabbableListItemDirective;
}());
export { TabbableListItemDirective };
function TabbableListItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListItemDirective.prototype.disabled;
    /** @type {?} */
    TabbableListItemDirective.prototype.tabindex;
    /** @type {?} */
    TabbableListItemDirective.prototype._onDestroy;
    /** @type {?} */
    TabbableListItemDirective.prototype._tabbableList;
    /** @type {?} */
    TabbableListItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBVzFELG1DQUFvQixhQUFrQyxFQUFVLFdBQXVCO1FBQW5FLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQUwxRCxLQUFLO3dCQUNBLENBQUMsQ0FBQzswQkFFZixJQUFJLE9BQU8sRUFBUTtLQUVtRDs7OztJQUUzRiwrQ0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7SUFFRCwwQ0FBTTs7O0lBQU47UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO2FBQzFILFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7S0FDN0Q7Ozs7SUFHRCx5Q0FBSzs7O0lBREw7O1FBSUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELDZDQUFTOzs7O0lBRFQsVUFDVSxLQUFvQjtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkQ7O2dCQWxDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtpQkFDbkM7Ozs7Z0JBSlEsbUJBQW1CO2dCQUhSLFVBQVU7OzsyQkFTekIsS0FBSzsyQkFDTCxXQUFXO3dCQWdCWCxZQUFZLFNBQUMsT0FBTzs0QkFVcEIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7b0NBckN2Qzs7U0FTYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBUYWJiYWJsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi90YWJiYWJsZS1saXN0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRhYmJhYmxlTGlzdEl0ZW1dJyxcbn0pXG5leHBvcnQgY2xhc3MgVGFiYmFibGVMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygpIHRhYmluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgb25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoaW5kZXggPT4gdGhpcy5fdGFiYmFibGVMaXN0LmlzSXRlbUFjdGl2ZSh0aGlzKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFjdGl2ZSA9PiB0aGlzLnRhYmluZGV4ID0gYWN0aXZlID8gMCA6IC0xKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gICAgZm9jdXMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gYXBwbHkgZm9jdXMgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBmb2N1cyBrZXkgbWFuYWdlciB1cGRhdGVzIHRoZSBhY3RpdmUgaXRlbSBjb3JyZWN0bHlcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmFjdGl2YXRlKHRoaXMpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuZm9jdXNLZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxufSJdfQ==