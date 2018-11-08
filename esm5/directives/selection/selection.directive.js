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
/**
 * @template T
 */
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
        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEssT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFpQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztJQXNDcEUsNEJBQW9CLGlCQUFzQyxFQUFVLE1BQXlCO1FBQTdGLGlCQUVDO1FBRm1CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjt3QkFSbkMsSUFBSTtpQ0FFaEMsSUFBSSxZQUFZLEVBQU87MEJBSWhDLElBQUksT0FBTyxFQUFRO1FBR3RDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztLQUN0SDtJQTlCRCxzQkFBYSwyQ0FBVzs7Ozs7UUFBeEIsVUFBeUIsS0FBVTtZQUNqQyxDQUFBLEtBQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFBLENBQUMsTUFBTSw0QkFBSSxLQUFL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QVlhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VsZWN0aW9uSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGUsIFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3NlbGVjdGlvbi5zdHJhdGVneSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFNlbGVjdGlvbl0nLFxuICBleHBvcnRBczogJ3V4LXNlbGVjdGlvbicsXG4gIHByb3ZpZGVyczogWyBTZWxlY3Rpb25TZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzZXQgdXhTZWxlY3Rpb24oaXRlbXM6IFRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0KC4uLml0ZW1zKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2V0RGlzYWJsZWQoZGlzYWJsZWQpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogU2VsZWN0aW9uTW9kZSB8IFNlbGVjdGlvblN0cmF0ZWd5PFQ+KSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXRTdHJhdGVneShtb2RlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBjbGlja1NlbGVjdGlvbihpc0NsaWNrRW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNDbGlja0VuYWJsZWQgPSBpc0NsaWNrRW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBrZXlib2FyZFNlbGVjdGlvbihpc0tleWJvYXJkRW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNLZXlib2FyZEVuYWJsZWQgPSBpc0tleWJvYXJkRW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpIHRhYmluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSB1eFNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdPigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0aW9uSXRlbURpcmVjdGl2ZSkgaXRlbXM6IFF1ZXJ5TGlzdDxTZWxlY3Rpb25JdGVtRGlyZWN0aXZlPFQ+PjtcblxuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2U8VD4sIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIF9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGlvbiQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGl0ZW1zID0+IHRoaXMudXhTZWxlY3Rpb25DaGFuZ2UuZW1pdChpdGVtcykpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIHByb3ZpZGUgdGhlIGluaXRpYWwgbGlzdCBvZiBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgLy8gaWYgdGhlIGxpc3QgY2hhbmdlcyB0aGVuIGluZm9ybSB0aGUgc2VydmljZVxuICAgIHRoaXMuaXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZGF0YXNldCB0byByZWZsZWN0IHRoZSBsYXRlc3Qgc2VsZWN0aW9uIGl0ZW1zXG4gICAqL1xuICB1cGRhdGUoKTogdm9pZCB7XG5cbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXQgPSB0aGlzLml0ZW1zLm1hcChpdGVtID0+IGl0ZW0udXhTZWxlY3Rpb25JdGVtKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGEgdGFiIHRhcmdldCBoYXMgYmVlbiBkZWZpbmVkIHNvIHRoYXQgdGhlIGNvbXBvbmVudCBjYW4gYmUgdGFiYmVkIHRvLlxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzJC5nZXRWYWx1ZSgpID09PSBudWxsICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzJC5uZXh0KHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldFswXSk7XG4gICAgfVxuXG4gICAgLy8gVGhlIGFib3ZlIGNvdWxkIHRyaWdnZXIgYSBjaGFuZ2UgaW4gdGhlIGNvbXB1dGVkIHRhYmluZGV4IGZvciBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIGxpc3RcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbXNcbiAgICovXG4gIGRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5kZXNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxufVxuIl19