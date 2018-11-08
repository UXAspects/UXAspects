/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
/**
 * @template T
 */
export class SelectionDirective {
    /**
     * @param {?} _selectionService
     * @param {?} _cdRef
     */
    constructor(_selectionService, _cdRef) {
        this._selectionService = _selectionService;
        this._cdRef = _cdRef;
        this.tabindex = null;
        this.uxSelectionChange = new EventEmitter();
        this._onDestroy = new Subject();
        _selectionService.selection$.pipe(takeUntil(this._onDestroy)).subscribe(items => this.uxSelectionChange.emit(items));
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set uxSelection(items) {
        this._selectionService.select(...items);
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._selectionService.setDisabled(disabled);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set mode(mode) {
        this._selectionService.setStrategy(mode);
    }
    /**
     * @param {?} isClickEnabled
     * @return {?}
     */
    set clickSelection(isClickEnabled) {
        this._selectionService.isClickEnabled = isClickEnabled;
    }
    /**
     * @param {?} isKeyboardEnabled
     * @return {?}
     */
    set keyboardSelection(isKeyboardEnabled) {
        this._selectionService.isKeyboardEnabled = isKeyboardEnabled;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // provide the initial list of selection items
        this.update();
        // if the list changes then inform the service
        this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.update());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    update() {
        this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);
        // Make sure that a tab target has been defined so that the component can be tabbed to.
        if (this._selectionService.focus$.getValue() === null && this._selectionService.dataset.length > 0) {
            this._selectionService.focus$.next(this._selectionService.dataset[0]);
        }
        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
    }
    /**
     * Select all the items in the list
     * @return {?}
     */
    selectAll() {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.selectAll();
        }
    }
    /**
     * Deselect all currently selected items
     * @return {?}
     */
    deselectAll() {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.deselectAll();
        }
    }
}
SelectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSelection]',
                exportAs: 'ux-selection',
                providers: [SelectionService]
            },] }
];
/** @nocollapse */
SelectionDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ChangeDetectorRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQWlCLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFRdEUsTUFBTTs7Ozs7SUE4QkosWUFBb0IsaUJBQXNDLEVBQVUsTUFBeUI7UUFBekUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFxQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQW1CO3dCQVJuQyxJQUFJO2lDQUVoQyxJQUFJLFlBQVksRUFBTzswQkFJaEMsSUFBSSxPQUFPLEVBQVE7UUFHdEMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3RIOzs7OztJQTlCRCxJQUFhLFdBQVcsQ0FBQyxLQUFVO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCxJQUFhLFFBQVEsQ0FBQyxRQUFpQjtRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzlDOzs7OztJQUVELElBQWEsSUFBSSxDQUFDLElBQTBDO1FBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRUQsSUFBYSxjQUFjLENBQUMsY0FBdUI7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7S0FDeEQ7Ozs7O0lBRUQsSUFBYSxpQkFBaUIsQ0FBQyxpQkFBMEI7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0tBQzlEOzs7O0lBY0Qsa0JBQWtCOztRQUVoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBR2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDcEY7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUtELE1BQU07UUFFSixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUc5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTs7UUFHRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUtELFNBQVM7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzdDO0tBQ0Y7Ozs7O0lBS0QsV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0M7S0FDRjs7O1lBcEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFFLGdCQUFnQixDQUFFO2FBQ2hDOzs7O1lBUHVCLGdCQUFnQjtZQUpiLGlCQUFpQjs7OzBCQWN6QyxLQUFLO3VCQUlMLEtBQUs7bUJBSUwsS0FBSzs2QkFJTCxLQUFLO2dDQUlMLEtBQUs7dUJBSUwsS0FBSyxZQUFJLFdBQVcsU0FBQyxlQUFlO2dDQUVwQyxNQUFNO29CQUVOLGVBQWUsU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlLCBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhTZWxlY3Rpb25dJyxcbiAgZXhwb3J0QXM6ICd1eC1zZWxlY3Rpb24nLFxuICBwcm92aWRlcnM6IFsgU2VsZWN0aW9uU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkRpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgc2V0IHV4U2VsZWN0aW9uKGl0ZW1zOiBUW10pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdCguLi5pdGVtcyk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IFNlbGVjdGlvbk1vZGUgfCBTZWxlY3Rpb25TdHJhdGVneTxUPikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2V0U3RyYXRlZ3kobW9kZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY2xpY2tTZWxlY3Rpb24oaXNDbGlja0VuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzQ2xpY2tFbmFibGVkID0gaXNDbGlja0VuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQga2V5Ym9hcmRTZWxlY3Rpb24oaXNLZXlib2FyZEVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzS2V5Ym9hcmRFbmFibGVkID0gaXNLZXlib2FyZEVuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKSB0YWJpbmRleDogbnVtYmVyID0gbnVsbDtcblxuICBAT3V0cHV0KCkgdXhTZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXT4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUpIGl0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0aW9uSXRlbURpcmVjdGl2ZTxUPj47XG5cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlPFQ+LCBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBfc2VsZWN0aW9uU2VydmljZS5zZWxlY3Rpb24kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShpdGVtcyA9PiB0aGlzLnV4U2VsZWN0aW9uQ2hhbmdlLmVtaXQoaXRlbXMpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBwcm92aWRlIHRoZSBpbml0aWFsIGxpc3Qgb2Ygc2VsZWN0aW9uIGl0ZW1zXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIC8vIGlmIHRoZSBsaXN0IGNoYW5nZXMgdGhlbiBpbmZvcm0gdGhlIHNlcnZpY2VcbiAgICB0aGlzLml0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGRhdGFzZXQgdG8gcmVmbGVjdCB0aGUgbGF0ZXN0IHNlbGVjdGlvbiBpdGVtc1xuICAgKi9cbiAgdXBkYXRlKCk6IHZvaWQge1xuXG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0ID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnV4U2VsZWN0aW9uSXRlbSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCBhIHRhYiB0YXJnZXQgaGFzIGJlZW4gZGVmaW5lZCBzbyB0aGF0IHRoZSBjb21wb25lbnQgY2FuIGJlIHRhYmJlZCB0by5cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1cyQuZ2V0VmFsdWUoKSA9PT0gbnVsbCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1cyQubmV4dCh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXRbMF0pO1xuICAgIH1cblxuICAgIC8vIFRoZSBhYm92ZSBjb3VsZCB0cmlnZ2VyIGEgY2hhbmdlIGluIHRoZSBjb21wdXRlZCB0YWJpbmRleCBmb3Igc2VsZWN0aW9uIGl0ZW1zXG4gICAgdGhpcy5fY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgdGhlIGl0ZW1zIGluIHRoZSBsaXN0XG4gICAqL1xuICBzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuZGVzZWxlY3RBbGwoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==