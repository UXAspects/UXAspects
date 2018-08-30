/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
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
        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQWlCLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFTdEUsTUFBTTs7Ozs7SUE4QkosWUFBb0IsaUJBQW1DLEVBQVUsTUFBeUI7UUFBdEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQW1CO3dCQVJoQyxJQUFJO2lDQUVoQyxJQUFJLFlBQVksRUFBUzswQkFJbEMsSUFBSSxPQUFPLEVBQVE7UUFHdEMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3RIOzs7OztJQTlCRCxJQUFhLFdBQVcsQ0FBQyxLQUFZO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCxJQUFhLFFBQVEsQ0FBQyxRQUFpQjtRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzlDOzs7OztJQUVELElBQWEsSUFBSSxDQUFDLElBQXVDO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7O0lBRUQsSUFBYSxjQUFjLENBQUMsY0FBdUI7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7S0FDeEQ7Ozs7O0lBRUQsSUFBYSxpQkFBaUIsQ0FBQyxpQkFBMEI7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0tBQzlEOzs7O0lBY0Qsa0JBQWtCOztRQUVoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O1FBR2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7O1FBR25GLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDN0I7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUtELE1BQU07UUFFSixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUc5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTtLQUNGOzs7OztJQUtELFNBQVM7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzdDO0tBQ0Y7Ozs7O0lBS0QsV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0M7S0FDRjs7O1lBcEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFFLGdCQUFnQixDQUFFO2FBQ2hDOzs7O1lBUnVCLGdCQUFnQjtZQUpiLGlCQUFpQjs7OzBCQWV6QyxLQUFLO3VCQUlMLEtBQUs7bUJBSUwsS0FBSzs2QkFJTCxLQUFLO2dDQUlMLEtBQUs7dUJBSUwsS0FBSyxZQUFJLFdBQVcsU0FBQyxlQUFlO2dDQUVwQyxNQUFNO29CQUVOLGVBQWUsU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlLCBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFNlbGVjdGlvbl0nLFxuICBleHBvcnRBczogJ3V4LXNlbGVjdGlvbicsXG4gIHByb3ZpZGVyczogWyBTZWxlY3Rpb25TZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzZXQgdXhTZWxlY3Rpb24oaXRlbXM6IGFueVtdKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3QoLi4uaXRlbXMpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbW9kZShtb2RlOiBTZWxlY3Rpb25Nb2RlIHwgU2VsZWN0aW9uU3RyYXRlZ3kpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNldFN0cmF0ZWd5KG1vZGUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNsaWNrU2VsZWN0aW9uKGlzQ2xpY2tFbmFibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0NsaWNrRW5hYmxlZCA9IGlzQ2xpY2tFbmFibGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGtleWJvYXJkU2VsZWN0aW9uKGlzS2V5Ym9hcmRFbmFibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0tleWJvYXJkRW5hYmxlZCA9IGlzS2V5Ym9hcmRFbmFibGVkO1xuICB9XG5cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JykgdGFiaW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHV4U2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUpIGl0ZW1zOiBRdWVyeUxpc3Q8U2VsZWN0aW9uSXRlbURpcmVjdGl2ZT47XG5cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlLCBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBfc2VsZWN0aW9uU2VydmljZS5zZWxlY3Rpb24kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShpdGVtcyA9PiB0aGlzLnV4U2VsZWN0aW9uQ2hhbmdlLmVtaXQoaXRlbXMpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBwcm92aWRlIHRoZSBpbml0aWFsIGxpc3Qgb2Ygc2VsZWN0aW9uIGl0ZW1zXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIC8vIGlmIHRoZSBsaXN0IGNoYW5nZXMgdGhlbiBpbmZvcm0gdGhlIHNlcnZpY2VcbiAgICB0aGlzLml0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlKCkpO1xuXG4gICAgLy8gVGhlIGFib3ZlIGNvdWxkIHRyaWdnZXIgYSBjaGFuZ2UgaW4gdGhlIGNvbXB1dGVkIHRhYmluZGV4IGZvciBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZGF0YXNldCB0byByZWZsZWN0IHRoZSBsYXRlc3Qgc2VsZWN0aW9uIGl0ZW1zXG4gICAqL1xuICB1cGRhdGUoKTogdm9pZCB7XG5cbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXQgPSB0aGlzLml0ZW1zLm1hcChpdGVtID0+IGl0ZW0udXhTZWxlY3Rpb25JdGVtKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGEgdGFiIHRhcmdldCBoYXMgYmVlbiBkZWZpbmVkIHNvIHRoYXQgdGhlIGNvbXBvbmVudCBjYW4gYmUgdGFiYmVkIHRvLlxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzJC5nZXRWYWx1ZSgpID09PSBudWxsICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzJC5uZXh0KHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldFswXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgdGhlIGl0ZW1zIGluIHRoZSBsaXN0XG4gICAqL1xuICBzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuZGVzZWxlY3RBbGwoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==