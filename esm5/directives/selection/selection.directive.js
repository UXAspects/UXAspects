/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
var SelectionDirective = (function () {
    function SelectionDirective(_selectionService) {
        var _this = this;
        this._selectionService = _selectionService;
        this.tabindex = 0;
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
     * If the directive element receives focus then activate the first item
     * @return {?}
     */
    SelectionDirective.prototype.focus = /**
     * If the directive element receives focus then activate the first item
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled && this._selectionService.dataset.length > 0) {
            this._selectionService.activate(this._selectionService.dataset[0]);
        }
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
                },] },
    ];
    /** @nocollapse */
    SelectionDirective.ctorParameters = function () { return [
        { type: SelectionService, },
    ]; };
    SelectionDirective.propDecorators = {
        "uxSelection": [{ type: Input },],
        "disabled": [{ type: Input },],
        "mode": [{ type: Input },],
        "clickSelection": [{ type: Input },],
        "keyboardSelection": [{ type: Input },],
        "tabindex": [{ type: Input }, { type: HostBinding, args: ['tabindex',] },],
        "uxSelectionChange": [{ type: Output },],
        "items": [{ type: ContentChildren, args: [SelectionItemDirective,] },],
        "focus": [{ type: HostListener, args: ['focus',] },],
    };
    return SelectionDirective;
}());
export { SelectionDirective };
function SelectionDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectionDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectionDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SelectionDirective.propDecorators;
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNKLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQWlCLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBc0NwRSw0QkFBb0IsaUJBQW1DO1FBQXZELGlCQUVDO1FBRm1CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7d0JBUkYsQ0FBQztpQ0FFeEIsSUFBSSxZQUFZLEVBQVM7OEJBSTlCLElBQUksWUFBWSxFQUFFO1FBR3pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUMsQ0FBQztLQUM5RzswQkE5QlksMkNBQVc7Ozs7O2tCQUFDLEtBQVk7WUFDbkMsQ0FBQSxLQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQSxDQUFDLE1BQU0sNEJBQUksS0FBSyxHQUFFOzs7Ozs7MEJBRzdCLHdDQUFROzs7OztrQkFBQyxRQUFpQjtZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzswQkFHbEMsb0NBQUk7Ozs7O2tCQUFDLElBQW1CO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7OzBCQUcxQiw4Q0FBYzs7Ozs7a0JBQUMsT0FBZ0I7WUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7Ozs7OzBCQUduQyxpREFBaUI7Ozs7O2tCQUFDLE9BQWdCO1lBQzdDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDOzs7Ozs7OztJQWVuRCwrQ0FBa0I7OztJQUFsQjtRQUFBLGlCQU1DOztRQUpDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFHZCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDO0tBQzVFOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNuQzs7Ozs7SUFLc0Isa0NBQUs7Ozs7O1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRTs7SUFHSDs7T0FFRzs7Ozs7SUFDSCxtQ0FBTTs7OztJQUFOO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxlQUFlLEVBQXBCLENBQW9CLENBQUMsQ0FBQztLQUMvRTtJQUVEOztPQUVHOzs7OztJQUNILHNDQUFTOzs7O0lBQVQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzdDO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7SUFDSCx3Q0FBVzs7OztJQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMvQztLQUNGOztnQkFuRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLENBQUU7aUJBQ2hDOzs7O2dCQVB1QixnQkFBZ0I7OztnQ0FVckMsS0FBSzs2QkFJTCxLQUFLO3lCQUlMLEtBQUs7bUNBSUwsS0FBSztzQ0FJTCxLQUFLOzZCQUlMLEtBQUssWUFBSSxXQUFXLFNBQUMsVUFBVTtzQ0FFL0IsTUFBTTswQkFFTixlQUFlLFNBQUMsc0JBQXNCOzBCQXVCdEMsWUFBWSxTQUFDLE9BQU87OzZCQTVEdkI7O1NBV2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlLCBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24uc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4U2VsZWN0aW9uXScsXG4gIGV4cG9ydEFzOiAndXgtc2VsZWN0aW9uJyxcbiAgcHJvdmlkZXJzOiBbIFNlbGVjdGlvblNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHNldCB1eFNlbGVjdGlvbihpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdCguLi5pdGVtcyk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IFNlbGVjdGlvbk1vZGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNldE1vZGUobW9kZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY2xpY2tTZWxlY3Rpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpY2tFbmFibGVkID0gZW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBrZXlib2FyZFNlbGVjdGlvbihlbmFibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5rZXlib2FyZEVuYWJsZWQgPSBlbmFibGVkO1xuICB9XG5cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuXG4gIEBPdXRwdXQoKSB1eFNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3Rpb25JdGVtRGlyZWN0aXZlKSBpdGVtczogUXVlcnlMaXN0PFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmU+O1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSkge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKF9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGlvbiQuc3Vic2NyaWJlKGl0ZW1zID0+IHRoaXMudXhTZWxlY3Rpb25DaGFuZ2UuZW1pdChpdGVtcykpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBwcm92aWRlIHRoZSBpbml0aWFsIGxpc3Qgb2Ygc2VsZWN0aW9uIGl0ZW1zXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIC8vIGlmIHRoZSBsaXN0IGNoYW5nZXMgdGhlbiBpbmZvcm0gdGhlIHNlcnZpY2VcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLml0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlKCkpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgZGlyZWN0aXZlIGVsZW1lbnQgcmVjZWl2ZXMgZm9jdXMgdGhlbiBhY3RpdmF0ZSB0aGUgZmlyc3QgaXRlbVxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKSBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldFswXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZGF0YXNldCB0byByZWZsZWN0IHRoZSBsYXRlc3Qgc2VsZWN0aW9uIGl0ZW1zXG4gICAqL1xuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnV4U2VsZWN0aW9uSXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIGxpc3RcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmRlc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG59XG4iXX0=