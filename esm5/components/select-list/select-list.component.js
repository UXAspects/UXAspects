/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from '../../directives/selection/selection.service';
import { MultipleSelectListStrategy } from './multiple-select-list.strategy';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SingleSelectListStrategy } from './single-select-list.strategy';
/**
 * @template T
 */
var SelectListComponent = /** @class */ (function () {
    function SelectListComponent(_selection) {
        var _this = this;
        this._selection = _selection;
        /**
         * Emit when the selection changes
         */
        this.selectedChange = new EventEmitter();
        /**
         * Automatically unsubscribe all observables
         */
        this._onDestroy = new Subject();
        // set the selection strategy to single by default
        this._selection.setStrategy(new SingleSelectListStrategy());
        // emit the selection changes when they occur
        this._selection.selection$.pipe(takeUntil(this._onDestroy))
            .subscribe(function (selection) { return _this.selectedChange.emit(selection); });
    }
    Object.defineProperty(SelectListComponent.prototype, "multiple", {
        /** Determine if we allow multiple items to be selected */
        set: /**
         * Determine if we allow multiple items to be selected
         * @param {?} multiple
         * @return {?}
         */
        function (multiple) {
            this._selection.strategy.deselectAll();
            this._selection.setStrategy(multiple ? new MultipleSelectListStrategy() : new SingleSelectListStrategy());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectListComponent.prototype, "selected", {
        /** Set the selected items */
        set: /**
         * Set the selected items
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            // deselect all currently selected items
            this._selection.deselectAll();
            // select only the specified items
            if (Array.isArray(selected)) {
                (_a = this._selection).select.apply(_a, tslib_1.__spread(selected));
            }
            else {
                this._selection.select(selected);
            }
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectListComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // supply the initial item set
        this._selection.dataset = this.items.map(function (item) { return item.data; });
        // if the item set changes update the list
        this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this._selection.dataset = _this.items.map(function (item) { return item.data; }); });
    };
    /**
     * @return {?}
     */
    SelectListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    SelectListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select-list',
                    template: "<ng-content></ng-content>",
                    providers: [SelectionService],
                    host: {
                        role: 'list'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectListComponent.ctorParameters = function () { return [
        { type: SelectionService }
    ]; };
    SelectListComponent.propDecorators = {
        multiple: [{ type: Input }],
        selected: [{ type: Input }],
        selectedChange: [{ type: Output }],
        items: [{ type: ContentChildren, args: [SelectListItemComponent,] }]
    };
    return SelectListComponent;
}());
export { SelectListComponent };
function SelectListComponent_tsickle_Closure_declarations() {
    /**
     * Emit when the selection changes
     * @type {?}
     */
    SelectListComponent.prototype.selectedChange;
    /**
     * Find all select list items
     * @type {?}
     */
    SelectListComponent.prototype.items;
    /**
     * Automatically unsubscribe all observables
     * @type {?}
     */
    SelectListComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListComponent.prototype._selection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2VsZWN0LWxpc3Qvc2VsZWN0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7SUF5Q3JFLDZCQUFvQixVQUErQjtRQUFuRCxpQkFPQztRQVBtQixlQUFVLEdBQVYsVUFBVSxDQUFxQjs7Ozs4QkFSeEIsSUFBSSxZQUFZLEVBQU87Ozs7MEJBTTdCLElBQUksT0FBTyxFQUFROztRQUlwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdCQUF3QixFQUFLLENBQUMsQ0FBQzs7UUFHL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdEQsU0FBUyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztLQUNwRTtJQW5DRCxzQkFBYSx5Q0FBUTtRQURyQiwwREFBMEQ7Ozs7OztRQUMxRCxVQUFzQixRQUFpQjtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksMEJBQTBCLEVBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSx3QkFBd0IsRUFBSyxDQUFDLENBQUM7U0FDbkg7OztPQUFBO0lBR0Qsc0JBQWEseUNBQVE7UUFEckIsNkJBQTZCOzs7Ozs7UUFDN0IsVUFBc0IsUUFBaUI7O1lBR25DLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBRzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFBLEtBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFDLE1BQU0sNEJBQUksUUFBUSxHQUFFO2FBQ3ZDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEM7O1NBQ0o7OztPQUFBOzs7O0lBb0JELGdEQUFrQjs7O0lBQWxCO1FBQUEsaUJBT0M7O1FBSkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxFQUFULENBQVMsQ0FBQyxDQUFDOztRQUc1RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxFQUFULENBQVMsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDLENBQUM7S0FDcEk7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7O2dCQTVESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIscUNBQTJDO29CQUMzQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsSUFBSSxFQUFFO3dCQUNGLElBQUksRUFBRSxNQUFNO3FCQUNmO2lCQUNKOzs7O2dCQVpRLGdCQUFnQjs7OzJCQWdCcEIsS0FBSzsyQkFNTCxLQUFLO2lDQWNMLE1BQU07d0JBR04sZUFBZSxTQUFDLHVCQUF1Qjs7OEJBMUM1Qzs7U0FnQmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE11bHRpcGxlU2VsZWN0TGlzdFN0cmF0ZWd5IH0gZnJvbSAnLi9tdWx0aXBsZS1zZWxlY3QtbGlzdC5zdHJhdGVneSc7XG5pbXBvcnQgeyBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWxpc3QtaXRlbS9zZWxlY3QtbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW5nbGVTZWxlY3RMaXN0U3RyYXRlZ3kgfSBmcm9tICcuL3NpbmdsZS1zZWxlY3QtbGlzdC5zdHJhdGVneSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbU2VsZWN0aW9uU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICByb2xlOiAnbGlzdCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdExpc3RDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIERldGVybWluZSBpZiB3ZSBhbGxvdyBtdWx0aXBsZSBpdGVtcyB0byBiZSBzZWxlY3RlZCAqL1xuICAgIEBJbnB1dCgpIHNldCBtdWx0aXBsZShtdWx0aXBsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3RyYXRlZ3kuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnNldFN0cmF0ZWd5KG11bHRpcGxlID8gbmV3IE11bHRpcGxlU2VsZWN0TGlzdFN0cmF0ZWd5PFQ+KCkgOiBuZXcgU2luZ2xlU2VsZWN0TGlzdFN0cmF0ZWd5PFQ+KCkpO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIHNlbGVjdGVkIGl0ZW1zICovXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBUIHwgVFtdKSB7XG5cbiAgICAgICAgLy8gZGVzZWxlY3QgYWxsIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtc1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uZGVzZWxlY3RBbGwoKTtcblxuICAgICAgICAvLyBzZWxlY3Qgb25seSB0aGUgc3BlY2lmaWVkIGl0ZW1zXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdGVkKSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnNlbGVjdCguLi5zZWxlY3RlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc2VsZWN0KHNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbWl0IHdoZW4gdGhlIHNlbGVjdGlvbiBjaGFuZ2VzICovXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10+KCk7XG5cbiAgICAvKiogRmluZCBhbGwgc2VsZWN0IGxpc3QgaXRlbXMgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFNlbGVjdExpc3RJdGVtQ29tcG9uZW50KSBpdGVtczogUXVlcnlMaXN0PFNlbGVjdExpc3RJdGVtQ29tcG9uZW50PFQ+PjtcblxuICAgIC8qKiBBdXRvbWF0aWNhbGx5IHVuc3Vic2NyaWJlIGFsbCBvYnNlcnZhYmxlcyAqL1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvblNlcnZpY2U8VD4pIHtcbiAgICAgICAgLy8gc2V0IHRoZSBzZWxlY3Rpb24gc3RyYXRlZ3kgdG8gc2luZ2xlIGJ5IGRlZmF1bHRcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnNldFN0cmF0ZWd5KG5ldyBTaW5nbGVTZWxlY3RMaXN0U3RyYXRlZ3k8VD4oKSk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgc2VsZWN0aW9uIGNoYW5nZXMgd2hlbiB0aGV5IG9jY3VyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zZWxlY3Rpb24kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGVjdGlvbiA9PiB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0aW9uKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN1cHBseSB0aGUgaW5pdGlhbCBpdGVtIHNldFxuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uZGF0YXNldCA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5kYXRhKTtcblxuICAgICAgICAvLyBpZiB0aGUgaXRlbSBzZXQgY2hhbmdlcyB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgdGhpcy5pdGVtcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9zZWxlY3Rpb24uZGF0YXNldCA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5kYXRhKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn0iXX0=