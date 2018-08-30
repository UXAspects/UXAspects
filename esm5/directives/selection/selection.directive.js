/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
var SelectionDirective = /** @class */ (function () {
    function SelectionDirective(_selectionService, _cdRef) {
        var _this = this;
        this._selectionService = _selectionService;
        this._cdRef = _cdRef;
        this.tabindex = null;
        this.uxSelectionChange = new EventEmitter();
        this._onDestroy = new Subject();
        _selectionService.selection$.pipe(takeUntil(this._onDestroy)).subscribe(function (items) { return _this.uxSelectionChange.emit(items); });
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
            this._selectionService.setStrategy(mode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "clickSelection", {
        set: /**
         * @param {?} isClickEnabled
         * @return {?}
         */
        function (isClickEnabled) {
            this._selectionService.isClickEnabled = isClickEnabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionDirective.prototype, "keyboardSelection", {
        set: /**
         * @param {?} isKeyboardEnabled
         * @return {?}
         */
        function (isKeyboardEnabled) {
            this._selectionService.isKeyboardEnabled = isKeyboardEnabled;
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
        this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.update(); });
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
        this._onDestroy.next();
        this._onDestroy.complete();
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
        if (this._selectionService.focus$.getValue() === null && this._selectionService.dataset.length > 0) {
            this._selectionService.focus$.next(this._selectionService.dataset[0]);
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
        if (this._selectionService.isEnabled) {
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
        if (this._selectionService.isEnabled) {
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
    SelectionDirective.prototype._onDestroy;
    /** @type {?} */
    SelectionDirective.prototype._selectionService;
    /** @type {?} */
    SelectionDirective.prototype._cdRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFpQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXVDcEUsNEJBQW9CLGlCQUFtQyxFQUFVLE1BQXlCO1FBQTFGLGlCQUVDO1FBRm1CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjt3QkFSaEMsSUFBSTtpQ0FFaEMsSUFBSSxZQUFZLEVBQVM7MEJBSWxDLElBQUksT0FBTyxFQUFRO1FBR3RDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztLQUN0SDtJQTlCRCxzQkFBYSwyQ0FBVzs7Ozs7UUFBeEIsVUFBeUIsS0FBWTtZQUNuQyxDQUFBLEtBQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFBLENBQUMsTUFBTSw0QkFBSSxLQUFLLEdB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LGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VsZWN0aW9uSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGUsIFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4U2VsZWN0aW9uXScsXG4gIGV4cG9ydEFzOiAndXgtc2VsZWN0aW9uJyxcbiAgcHJvdmlkZXJzOiBbIFNlbGVjdGlvblNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHNldCB1eFNlbGVjdGlvbihpdGVtczogYW55W10pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdCguLi5pdGVtcyk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IFNlbGVjdGlvbk1vZGUgfCBTZWxlY3Rpb25TdHJhdGVneSkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2V0U3RyYXRlZ3kobW9kZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY2xpY2tTZWxlY3Rpb24oaXNDbGlja0VuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzQ2xpY2tFbmFibGVkID0gaXNDbGlja0VuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQga2V5Ym9hcmRTZWxlY3Rpb24oaXNLZXlib2FyZEVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzS2V5Ym9hcmRFbmFibGVkID0gaXNLZXlib2FyZEVuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKSB0YWJpbmRleDogbnVtYmVyID0gbnVsbDtcblxuICBAT3V0cHV0KCkgdXhTZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0aW9uSXRlbURpcmVjdGl2ZSkgaXRlbXM6IFF1ZXJ5TGlzdDxTZWxlY3Rpb25JdGVtRGlyZWN0aXZlPjtcblxuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UsIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIF9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGlvbiQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGl0ZW1zID0+IHRoaXMudXhTZWxlY3Rpb25DaGFuZ2UuZW1pdChpdGVtcykpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIHByb3ZpZGUgdGhlIGluaXRpYWwgbGlzdCBvZiBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgLy8gaWYgdGhlIGxpc3QgY2hhbmdlcyB0aGVuIGluZm9ybSB0aGUgc2VydmljZVxuICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSk7XG5cbiAgICAvLyBUaGUgYWJvdmUgY291bGQgdHJpZ2dlciBhIGNoYW5nZSBpbiB0aGUgY29tcHV0ZWQgdGFiaW5kZXggZm9yIHNlbGVjdGlvbiBpdGVtc1xuICAgIHRoaXMuX2NkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBkYXRhc2V0IHRvIHJlZmxlY3QgdGhlIGxhdGVzdCBzZWxlY3Rpb24gaXRlbXNcbiAgICovXG4gIHVwZGF0ZSgpOiB2b2lkIHtcblxuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldCA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS51eFNlbGVjdGlvbkl0ZW0pO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgYSB0YWIgdGFyZ2V0IGhhcyBiZWVuIGRlZmluZWQgc28gdGhhdCB0aGUgY29tcG9uZW50IGNhbiBiZSB0YWJiZWQgdG8uXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXMkLmdldFZhbHVlKCkgPT09IG51bGwgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXMkLm5leHQodGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0WzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIGxpc3RcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5kZXNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxufVxuIl19