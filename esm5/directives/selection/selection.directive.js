/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
var SelectionDirective = /** @class */ (function () {
    function SelectionDirective(_selectionService, _cdRef) {
        var _this = this;
        this._selectionService = _selectionService;
        this._cdRef = _cdRef;
        this.tabindex = null;
        this.uxSelectionChange = new EventEmitter();
        this._subscriptions = new Subscription();
        this._subscriptions.add(_selectionService.selection$.subscribe(function (items) { return _this.uxSelectionChange.emit(items); }));
    }
    Object.defineProperty(SelectionDirective.prototype, "uxSelection", {
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            (_a = this._selectionService).select.apply(_a, tslib_1.__spread(items));
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "disabled", {
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this._selectionService.setDisabled(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "mode", {
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this._selectionService.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "clickSelection", {
        set: /**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) {
            this._selectionService.clickEnabled = enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "keyboardSelection", {
        set: /**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) {
            this._selectionService.keyboardEnabled = enabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // provide the initial list of selection items
        this.update();
        // if the list changes then inform the service
        this._subscriptions.add(this.items.changes.subscribe(function () { return _this.update(); }));
        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
    };
    /**
     * @return {?}
     */
    SelectionDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.unsubscribe();
    };
    /**
     * Update the dataset to reflect the latest selection items
     */
    /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    SelectionDirective.prototype.update = /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    function () {
        this._selectionService.dataset = this.items.map(function (item) { return item.uxSelectionItem; });
        // Make sure that a tab target has been defined so that the component can be tabbed to.
        if (this._selectionService.focusTarget$.getValue() === null && this._selectionService.dataset.length > 0) {
            this._selectionService.focusTarget$.next(this._selectionService.dataset[0]);
        }
    };
    /**
     * Select all the items in the list
     */
    /**
     * Select all the items in the list
     * @return {?}
     */
    SelectionDirective.prototype.selectAll = /**
     * Select all the items in the list
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.selectAll();
        }
    };
    /**
     * Deselect all currently selected items
     */
    /**
     * Deselect all currently selected items
     * @return {?}
     */
    SelectionDirective.prototype.deselectAll = /**
     * Deselect all currently selected items
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.deselectAll();
        }
    };
    SelectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSelection]',
                    exportAs: 'ux-selection',
                    providers: [SelectionService]
                },] }
    ];
    /** @nocollapse */
    SelectionDirective.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ChangeDetectorRef }
    ]; };
    SelectionDirective.propDecorators = {
        uxSelection: [{ type: Input }],
        disabled: [{ type: Input }],
        mode: [{ type: Input }],
        clickSelection: [{ type: Input }],
        keyboardSelection: [{ type: Input }],
        tabindex: [{ type: Input }, { type: HostBinding, args: ['attr.tabindex',] }],
        uxSelectionChange: [{ type: Output }],
        items: [{ type: ContentChildren, args: [SelectionItemDirective,] }]
    };
    return SelectionDirective;
}());
export { SelectionDirective };
function SelectionDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionDirective.prototype.tabindex;
    /** @type {?} */
    SelectionDirective.prototype.uxSelectionChange;
    /** @type {?} */
    SelectionDirective.prototype.items;
    /** @type {?} */
    SelectionDirective.prototype._subscriptions;
    /** @type {?} */
    SelectionDirective.prototype._selectionService;
    /** @type {?} */
    SelectionDirective.prototype._cdRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUF1Q3BFLDRCQUFvQixpQkFBbUMsRUFBVSxNQUF5QjtRQUExRixpQkFFQztRQUZtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7d0JBUmhDLElBQUk7aUNBRWhDLElBQUksWUFBWSxFQUFTOzhCQUk5QixJQUFJLFlBQVksRUFBRTtRQUd6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLENBQUM7S0FDOUc7SUE5QkQsc0JBQWEsMkNBQVc7Ozs7O1FBQXhCLFVBQXlCLEtBQVk7WUFDbkMsQ0FBQSxLQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQSxDQUFDLE1BQU0sNEJBQUksS0FBSyxHQUFFOztTQUN6Qzs7O09BQUE7SUFFRCxzQkFBYSx3Q0FBUTs7Ozs7UUFBckIsVUFBc0IsUUFBaUI7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5Qzs7O09BQUE7SUFFRCxzQkFBYSxvQ0FBSTs7Ozs7UUFBakIsVUFBa0IsSUFBdUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0Qzs7O09BQUE7SUFFRCxzQkFBYSw4Q0FBYzs7Ozs7UUFBM0IsVUFBNEIsT0FBZ0I7WUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7U0FDL0M7OztPQUFBO0lBRUQsc0JBQWEsaURBQWlCOzs7OztRQUE5QixVQUErQixPQUFnQjtZQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztTQUNsRDs7O09BQUE7Ozs7SUFjRCwrQ0FBa0I7OztJQUFsQjtRQUFBLGlCQVNDOztRQVBDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFHZCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDOztRQUczRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzdCOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNuQztJQUVEOztPQUVHOzs7OztJQUNILG1DQUFNOzs7O0lBQU47UUFFRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLGVBQWUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDOztRQUc5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RTtLQUNGO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsc0NBQVM7Ozs7SUFBVDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDN0M7S0FDRjtJQUVEOztPQUVHOzs7OztJQUNILHdDQUFXOzs7O0lBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQy9DO0tBQ0Y7O2dCQW5GRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRTtpQkFDaEM7Ozs7Z0JBUnVCLGdCQUFnQjtnQkFIYixpQkFBaUI7Ozs4QkFjekMsS0FBSzsyQkFJTCxLQUFLO3VCQUlMLEtBQUs7aUNBSUwsS0FBSztvQ0FJTCxLQUFLOzJCQUlMLEtBQUssWUFBSSxXQUFXLFNBQUMsZUFBZTtvQ0FFcEMsTUFBTTt3QkFFTixlQUFlLFNBQUMsc0JBQXNCOzs2QkF0Q3pDOztTQVlhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlLCBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFNlbGVjdGlvbl0nLFxuICBleHBvcnRBczogJ3V4LXNlbGVjdGlvbicsXG4gIHByb3ZpZGVyczogWyBTZWxlY3Rpb25TZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzZXQgdXhTZWxlY3Rpb24oaXRlbXM6IGFueVtdKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3QoLi4uaXRlbXMpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbW9kZShtb2RlOiBTZWxlY3Rpb25Nb2RlIHwgU2VsZWN0aW9uU3RyYXRlZ3kpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNldE1vZGUobW9kZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY2xpY2tTZWxlY3Rpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpY2tFbmFibGVkID0gZW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBrZXlib2FyZFNlbGVjdGlvbihlbmFibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5rZXlib2FyZEVuYWJsZWQgPSBlbmFibGVkO1xuICB9XG5cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JykgdGFiaW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHV4U2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUpIGl0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0aW9uSXRlbURpcmVjdGl2ZT47XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlLCBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChfc2VsZWN0aW9uU2VydmljZS5zZWxlY3Rpb24kLnN1YnNjcmliZShpdGVtcyA9PiB0aGlzLnV4U2VsZWN0aW9uQ2hhbmdlLmVtaXQoaXRlbXMpKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gcHJvdmlkZSB0aGUgaW5pdGlhbCBsaXN0IG9mIHNlbGVjdGlvbiBpdGVtc1xuICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAvLyBpZiB0aGUgbGlzdCBjaGFuZ2VzIHRoZW4gaW5mb3JtIHRoZSBzZXJ2aWNlXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZSgpKSk7XG5cbiAgICAvLyBUaGUgYWJvdmUgY291bGQgdHJpZ2dlciBhIGNoYW5nZSBpbiB0aGUgY29tcHV0ZWQgdGFiaW5kZXggZm9yIHNlbGVjdGlvbiBpdGVtc1xuICAgIHRoaXMuX2NkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGRhdGFzZXQgdG8gcmVmbGVjdCB0aGUgbGF0ZXN0IHNlbGVjdGlvbiBpdGVtc1xuICAgKi9cbiAgdXBkYXRlKCk6IHZvaWQge1xuXG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnV4U2VsZWN0aW9uSXRlbSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCBhIHRhYiB0YXJnZXQgaGFzIGJlZW4gZGVmaW5lZCBzbyB0aGF0IHRoZSBjb21wb25lbnQgY2FuIGJlIHRhYmJlZCB0by5cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1c1RhcmdldCQuZ2V0VmFsdWUoKSA9PT0gbnVsbCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1c1RhcmdldCQubmV4dCh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXRbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYWxsIHRoZSBpdGVtcyBpbiB0aGUgbGlzdFxuICAgKi9cbiAgc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuZGVzZWxlY3RBbGwoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==