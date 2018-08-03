/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, HostBinding, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
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
        this._subscriptions = new Subscription();
        this._subscriptions.add(_selectionService.selection$.subscribe(items => this.uxSelectionChange.emit(items)));
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
        this._selectionService.setMode(mode);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set clickSelection(enabled) {
        this._selectionService.clickEnabled = enabled;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set keyboardSelection(enabled) {
        this._selectionService.keyboardEnabled = enabled;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // provide the initial list of selection items
        this.update();
        // if the list changes then inform the service
        this._subscriptions.add(this.items.changes.subscribe(() => this.update()));
        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }
    /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    update() {
        this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);
        // Make sure that a tab target has been defined so that the component can be tabbed to.
        if (this._selectionService.focusTarget$.getValue() === null && this._selectionService.dataset.length > 0) {
            this._selectionService.focusTarget$.next(this._selectionService.dataset[0]);
        }
    }
    /**
     * Select all the items in the list
     * @return {?}
     */
    selectAll() {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.selectAll();
        }
    }
    /**
     * Deselect all currently selected items
     * @return {?}
     */
    deselectAll() {
        if (this._selectionService.enabled) {
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
    SelectionDirective.prototype._subscriptions;
    /** @type {?} */
    SelectionDirective.prototype._selectionService;
    /** @type {?} */
    SelectionDirective.prototype._cdRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFpQixnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBU3RFLE1BQU07Ozs7O0lBOEJKLFlBQW9CLGlCQUFtQyxFQUFVLE1BQXlCO1FBQXRFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjt3QkFSaEMsSUFBSTtpQ0FFaEMsSUFBSSxZQUFZLEVBQVM7OEJBSTlCLElBQUksWUFBWSxFQUFFO1FBR3pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5Rzs7Ozs7SUE5QkQsSUFBYSxXQUFXLENBQUMsS0FBWTtRQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDekM7Ozs7O0lBRUQsSUFBYSxRQUFRLENBQUMsUUFBaUI7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5Qzs7Ozs7SUFFRCxJQUFhLElBQUksQ0FBQyxJQUF1QztRQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDOzs7OztJQUVELElBQWEsY0FBYyxDQUFDLE9BQWdCO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0tBQy9DOzs7OztJQUVELElBQWEsaUJBQWlCLENBQUMsT0FBZ0I7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7S0FDbEQ7Ozs7SUFjRCxrQkFBa0I7O1FBRWhCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFHZCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFHM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM3Qjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ25DOzs7OztJQUtELE1BQU07UUFFSixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUc5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RTtLQUNGOzs7OztJQUtELFNBQVM7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzdDO0tBQ0Y7Ozs7O0lBS0QsV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0M7S0FDRjs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFFLGdCQUFnQixDQUFFO2FBQ2hDOzs7O1lBUnVCLGdCQUFnQjtZQUhiLGlCQUFpQjs7OzBCQWN6QyxLQUFLO3VCQUlMLEtBQUs7bUJBSUwsS0FBSzs2QkFJTCxLQUFLO2dDQUlMLEtBQUs7dUJBSUwsS0FBSyxZQUFJLFdBQVcsU0FBQyxlQUFlO2dDQUVwQyxNQUFNO29CQUVOLGVBQWUsU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25JdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Rpb24taXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZSwgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhTZWxlY3Rpb25dJyxcbiAgZXhwb3J0QXM6ICd1eC1zZWxlY3Rpb24nLFxuICBwcm92aWRlcnM6IFsgU2VsZWN0aW9uU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgc2V0IHV4U2VsZWN0aW9uKGl0ZW1zOiBhbnlbXSkge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0KC4uLml0ZW1zKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2V0RGlzYWJsZWQoZGlzYWJsZWQpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1vZGUobW9kZTogU2VsZWN0aW9uTW9kZSB8IFNlbGVjdGlvblN0cmF0ZWd5KSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXRNb2RlKG1vZGUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNsaWNrU2VsZWN0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWNrRW5hYmxlZCA9IGVuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQga2V5Ym9hcmRTZWxlY3Rpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uua2V5Ym9hcmRFbmFibGVkID0gZW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpIHRhYmluZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSB1eFNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3Rpb25JdGVtRGlyZWN0aXZlKSBpdGVtczogUXVlcnlMaXN0PFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmU+O1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSwgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQoX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0aW9uJC5zdWJzY3JpYmUoaXRlbXMgPT4gdGhpcy51eFNlbGVjdGlvbkNoYW5nZS5lbWl0KGl0ZW1zKSkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIHByb3ZpZGUgdGhlIGluaXRpYWwgbGlzdCBvZiBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgLy8gaWYgdGhlIGxpc3QgY2hhbmdlcyB0aGVuIGluZm9ybSB0aGUgc2VydmljZVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRoaXMuaXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSkpO1xuXG4gICAgLy8gVGhlIGFib3ZlIGNvdWxkIHRyaWdnZXIgYSBjaGFuZ2UgaW4gdGhlIGNvbXB1dGVkIHRhYmluZGV4IGZvciBzZWxlY3Rpb24gaXRlbXNcbiAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBkYXRhc2V0IHRvIHJlZmxlY3QgdGhlIGxhdGVzdCBzZWxlY3Rpb24gaXRlbXNcbiAgICovXG4gIHVwZGF0ZSgpOiB2b2lkIHtcblxuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldCA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS51eFNlbGVjdGlvbkl0ZW0pO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgYSB0YWIgdGFyZ2V0IGhhcyBiZWVuIGRlZmluZWQgc28gdGhhdCB0aGUgY29tcG9uZW50IGNhbiBiZSB0YWJiZWQgdG8uXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXNUYXJnZXQkLmdldFZhbHVlKCkgPT09IG51bGwgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXNUYXJnZXQkLm5leHQodGhpcy5fc2VsZWN0aW9uU2VydmljZS5kYXRhc2V0WzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCB0aGUgaXRlbXMgaW4gdGhlIGxpc3RcbiAgICovXG4gIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAqL1xuICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmRlc2VsZWN0QWxsKCk7XG4gICAgfVxuICB9XG59XG4iXX0=