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
        this.initialized = false;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    TabbableListItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }
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
        this.initialized = true;
        this._tabbableList.focusKeyManager.change.pipe(takeUntil(this._onDestroy), map(function () { return _this._tabbableList.isItemActive(_this); }))
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
        // prevent anything happening when modifier keys are pressed if they have been disabled
        if (!this._tabbableList.allowAltModifier && event.altKey || !this._tabbableList.allowCtrlModifier && event.ctrlKey) {
            return;
        }
        this._tabbableList.focusKeyManager.onKeydown(event);
    };
    TabbableListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTabbableListItem]',
                    exportAs: 'ux-tabbable-list-item'
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
    TabbableListItemDirective.prototype.initialized;
    /** @type {?} */
    TabbableListItemDirective.prototype._onDestroy;
    /** @type {?} */
    TabbableListItemDirective.prototype._tabbableList;
    /** @type {?} */
    TabbableListItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBYTFELG1DQUFvQixhQUFrQyxFQUFVLFdBQXVCO1FBQW5FLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQU4xRCxLQUFLO3dCQUNBLENBQUMsQ0FBQzsyQkFDYixLQUFLOzBCQUVQLElBQUksT0FBTyxFQUFRO0tBRW1EOzs7O0lBRTNGLCtDQUFXOzs7SUFBWDs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7O0lBRUQsMENBQU07OztJQUFOO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO2FBQ3ZILFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7S0FDN0Q7Ozs7SUFHRCx5Q0FBSzs7O0lBREw7O1FBSUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELDZDQUFTOzs7O0lBRFQsVUFDVSxLQUFvQjs7UUFHMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pILE1BQU0sQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZEOztnQkFsREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ3BDOzs7O2dCQUxRLG1CQUFtQjtnQkFIUixVQUFVOzs7MkJBVXpCLEtBQUs7MkJBQ0wsV0FBVzt3QkF5QlgsWUFBWSxTQUFDLE9BQU87NEJBVXBCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O29DQS9DdkM7O1NBVWEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUYWJiYWJsZUxpc3RJdGVtXScsXG4gICAgZXhwb3J0QXM6ICd1eC10YWJiYWJsZS1saXN0LWl0ZW0nXG59KVxuZXhwb3J0IGNsYXNzIFRhYmJhYmxlTGlzdEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBGb2N1c2FibGVPcHRpb24sIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASG9zdEJpbmRpbmcoKSB0YWJpbmRleDogbnVtYmVyID0gLTE7XG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBpdGVtIC0gaWYgc28gd2UgbmVlZCB0byBtYWtlIGFub3RoZXIgaXRlbSB0YWJiYWJsZVxuICAgICAgICBpZiAodGhpcy50YWJpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LnNldEZpcnN0SXRlbVRhYmJhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBvbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcCgoKSA9PiB0aGlzLl90YWJiYWJsZUxpc3QuaXNJdGVtQWN0aXZlKHRoaXMpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoYWN0aXZlID0+IHRoaXMudGFiaW5kZXggPSBhY3RpdmUgPyAwIDogLTEpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgICBmb2N1cygpOiB2b2lkIHtcblxuICAgICAgICAvLyBhcHBseSBmb2N1cyB0byB0aGUgZWxlbWVudFxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGZvY3VzIGtleSBtYW5hZ2VyIHVwZGF0ZXMgdGhlIGFjdGl2ZSBpdGVtIGNvcnJlY3RseVxuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3QuYWN0aXZhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gcHJldmVudCBhbnl0aGluZyBoYXBwZW5pbmcgd2hlbiBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkIGlmIHRoZXkgaGF2ZSBiZWVuIGRpc2FibGVkXG4gICAgICAgIGlmICghdGhpcy5fdGFiYmFibGVMaXN0LmFsbG93QWx0TW9kaWZpZXIgJiYgZXZlbnQuYWx0S2V5IHx8ICF0aGlzLl90YWJiYWJsZUxpc3QuYWxsb3dDdHJsTW9kaWZpZXIgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbn0iXX0=