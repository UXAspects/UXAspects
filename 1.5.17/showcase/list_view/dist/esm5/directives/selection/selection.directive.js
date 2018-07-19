/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
var SelectionDirective = (function () {
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
                },] },
    ];
    /** @nocollapse */
    SelectionDirective.ctorParameters = function () { return [
        { type: SelectionService, },
        { type: ChangeDetectorRef, },
    ]; };
    SelectionDirective.propDecorators = {
        "uxSelection": [{ type: Input },],
        "disabled": [{ type: Input },],
        "mode": [{ type: Input },],
        "clickSelection": [{ type: Input },],
        "keyboardSelection": [{ type: Input },],
        "tabindex": [{ type: Input }, { type: HostBinding, args: ['attr.tabindex',] },],
        "uxSelectionChange": [{ type: Output },],
        "items": [{ type: ContentChildren, args: [SelectionItemDirective,] },],
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
    /** @type {?} */
    SelectionDirective.prototype._cdRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUF1Q3BFLDRCQUFvQixpQkFBbUMsRUFBVSxNQUF5QjtRQUExRixpQkFFQztRQUZtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7d0JBUmhDLElBQUk7aUNBRWhDLElBQUksWUFBWSxFQUFTOzhCQUk5QixJQUFJLFlBQVksRUFBRTtRQUd6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDLENBQUM7S0FDOUc7MEJBOUJZLDJDQUFXOzs7OztrQkFBQyxLQUFZO1lBQ25DLENBQUEsS0FBQSxJQUFJLENBQUMsaUJBQWlCLENBQUEsQ0FBQyxNQUFNLDRCQUFJLEtBQUssR0FBRTs7Ozs7OzBCQUc3Qix3Q0FBUTs7Ozs7a0JBQUMsUUFBaUI7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7MEJBR2xDLG9DQUFJOzs7OztrQkFBQyxJQUF1QztZQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OzswQkFHMUIsOENBQWM7Ozs7O2tCQUFDLE9BQWdCO1lBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDOzs7OzswQkFHbkMsaURBQWlCOzs7OztrQkFBQyxPQUFnQjtZQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7SUFlbkQsK0NBQWtCOzs7SUFBbEI7UUFBQSxpQkFTQzs7UUFQQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBR2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQzs7UUFHM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM3Qjs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDbkM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxtQ0FBTTs7OztJQUFOO1FBRUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxlQUFlLEVBQXBCLENBQW9CLENBQUMsQ0FBQzs7UUFHOUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0U7S0FDRjtJQUVEOztPQUVHOzs7OztJQUNILHNDQUFTOzs7O0lBQVQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzdDO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7SUFDSCx3Q0FBVzs7OztJQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMvQztLQUNGOztnQkFuRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLENBQUU7aUJBQ2hDOzs7O2dCQVJ1QixnQkFBZ0I7Z0JBSGIsaUJBQWlCOzs7Z0NBY3pDLEtBQUs7NkJBSUwsS0FBSzt5QkFJTCxLQUFLO21DQUlMLEtBQUs7c0NBSUwsS0FBSzs2QkFJTCxLQUFLLFlBQUksV0FBVyxTQUFDLGVBQWU7c0NBRXBDLE1BQU07MEJBRU4sZUFBZSxTQUFDLHNCQUFzQjs7NkJBdEN6Qzs7U0FZYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25JdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Rpb24taXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZSwgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhTZWxlY3Rpb25dJyxcbiAgZXhwb3J0QXM6ICd1eC1zZWxlY3Rpb24nLFxuICBwcm92aWRlcnM6IFsgU2VsZWN0aW9uU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgc2V0IHV4U2VsZWN0aW9uKGl0ZW1zOiBhbnlbXSkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0KC4uLml0ZW1zKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2V0RGlzYWJsZWQoZGlzYWJsZWQpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogU2VsZWN0aW9uTW9kZSB8IFNlbGVjdGlvblN0cmF0ZWd5KSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXRNb2RlKG1vZGUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNsaWNrU2VsZWN0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWNrRW5hYmxlZCA9IGVuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQga2V5Ym9hcmRTZWxlY3Rpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uua2V5Ym9hcmRFbmFibGVkID0gZW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpIHRhYmluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSB1eFNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3Rpb25JdGVtRGlyZWN0aXZlKSBpdGVtczogUXVlcnlMaXN0PFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmU+O1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSwgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0aW9uJC5zdWJzY3JpYmUoaXRlbXMgPT4gdGhpcy51eFNlbGVjdGlvbkNoYW5nZS5lbWl0KGl0ZW1zKSkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIHByb3ZpZGUgdGhlIGluaXRpYWwgbGlzdCBvZiBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgLy8gaWYgdGhlIGxpc3QgY2hhbmdlcyB0aGVuIGluZm9ybSB0aGUgc2VydmljZVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRoaXMuaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSkpO1xuXG4gICAgLy8gVGhlIGFib3ZlIGNvdWxkIHRyaWdnZXIgYSBjaGFuZ2UgaW4gdGhlIGNvbXB1dGVkIHRhYmluZGV4IGZvciBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBkYXRhc2V0IHRvIHJlZmxlY3QgdGhlIGxhdGVzdCBzZWxlY3Rpb24gaXRlbXNcbiAgICovXG4gIHVwZGF0ZSgpOiB2b2lkIHtcblxuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldCA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS51eFNlbGVjdGlvbkl0ZW0pO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgYSB0YWIgdGFyZ2V0IGhhcyBiZWVuIGRlZmluZWQgc28gdGhhdCB0aGUgY29tcG9uZW50IGNhbiBiZSB0YWJiZWQgdG8uXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXNUYXJnZXQkLmdldFZhbHVlKCkgPT09IG51bGwgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXNUYXJnZXQkLm5leHQodGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0WzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIGxpc3RcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmRlc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG59XG4iXX0=