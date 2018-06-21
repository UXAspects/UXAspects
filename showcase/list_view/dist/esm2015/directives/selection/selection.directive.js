/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChildren, Directive, EventEmitter, HostBinding, HostListener, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionItemDirective } from './selection-item.directive';
import { SelectionService } from './selection.service';
export class SelectionDirective {
    /**
     * @param {?} _selectionService
     */
    constructor(_selectionService) {
        this._selectionService = _selectionService;
        this.tabindex = 0;
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }
    /**
     * If the directive element receives focus then activate the first item
     * @return {?}
     */
    focus() {
        if (this._selectionService.enabled && this._selectionService.dataset.length > 0) {
            this._selectionService.activate(this._selectionService.dataset[0]);
        }
    }
    /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    update() {
        this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);
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
            },] },
];
/** @nocollapse */
SelectionDirective.ctorParameters = () => [
    { type: SelectionService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zZWxlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0osT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVF0RSxNQUFNOzs7O0lBOEJKLFlBQW9CLGlCQUFtQztRQUFuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO3dCQVJGLENBQUM7aUNBRXhCLElBQUksWUFBWSxFQUFTOzhCQUk5QixJQUFJLFlBQVksRUFBRTtRQUd6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5Rzs7Ozs7UUE5QlksV0FBVyxDQUFDLEtBQVk7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHN0IsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztRQUdsQyxJQUFJLENBQUMsSUFBbUI7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O1FBRzFCLGNBQWMsQ0FBQyxPQUFnQjtRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQzs7Ozs7O1FBR25DLGlCQUFpQixDQUFDLE9BQWdCO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDOzs7OztJQWVuRCxrQkFBa0I7O1FBRWhCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7UUFHZCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzVFOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDbkM7Ozs7O0lBS3NCLEtBQUs7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BFOzs7Ozs7SUFNSCxNQUFNO1FBQ0osSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQy9FOzs7OztJQUtELFNBQVM7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzdDO0tBQ0Y7Ozs7O0lBS0QsV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0M7S0FDRjs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFNBQVMsRUFBRSxDQUFFLGdCQUFnQixDQUFFO2FBQ2hDOzs7O1lBUHVCLGdCQUFnQjs7OzRCQVVyQyxLQUFLO3lCQUlMLEtBQUs7cUJBSUwsS0FBSzsrQkFJTCxLQUFLO2tDQUlMLEtBQUs7eUJBSUwsS0FBSyxZQUFJLFdBQVcsU0FBQyxVQUFVO2tDQUUvQixNQUFNO3NCQUVOLGVBQWUsU0FBQyxzQkFBc0I7c0JBdUJ0QyxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTZWxlY3Rpb25JdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Rpb24taXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZSwgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VsZWN0aW9uLnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eFNlbGVjdGlvbl0nLFxuICBleHBvcnRBczogJ3V4LXNlbGVjdGlvbicsXG4gIHByb3ZpZGVyczogWyBTZWxlY3Rpb25TZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzZXQgdXhTZWxlY3Rpb24oaXRlbXM6IGFueVtdKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZWxlY3QoLi4uaXRlbXMpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbW9kZShtb2RlOiBTZWxlY3Rpb25Nb2RlKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zZXRNb2RlKG1vZGUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNsaWNrU2VsZWN0aW9uKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWNrRW5hYmxlZCA9IGVuYWJsZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQga2V5Ym9hcmRTZWxlY3Rpb24oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uua2V5Ym9hcmRFbmFibGVkID0gZW5hYmxlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIEBIb3N0QmluZGluZygndGFiaW5kZXgnKSB0YWJpbmRleDogbnVtYmVyID0gMDtcblxuICBAT3V0cHV0KCkgdXhTZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0aW9uSXRlbURpcmVjdGl2ZSkgaXRlbXM6IFF1ZXJ5TGlzdDxTZWxlY3Rpb25JdGVtRGlyZWN0aXZlPjtcblxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZChfc2VsZWN0aW9uU2VydmljZS5zZWxlY3Rpb24kLnN1YnNjcmliZShpdGVtcyA9PiB0aGlzLnV4U2VsZWN0aW9uQ2hhbmdlLmVtaXQoaXRlbXMpKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gcHJvdmlkZSB0aGUgaW5pdGlhbCBsaXN0IG9mIHNlbGVjdGlvbiBpdGVtc1xuICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAvLyBpZiB0aGUgbGlzdCBjaGFuZ2VzIHRoZW4gaW5mb3JtIHRoZSBzZXJ2aWNlXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZSgpKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGRpcmVjdGl2ZSBlbGVtZW50IHJlY2VpdmVzIGZvY3VzIHRoZW4gYWN0aXZhdGUgdGhlIGZpcnN0IGl0ZW1cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgZm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZW5hYmxlZCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZSh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmRhdGFzZXRbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGRhdGFzZXQgdG8gcmVmbGVjdCB0aGUgbGF0ZXN0IHNlbGVjdGlvbiBpdGVtc1xuICAgKi9cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZGF0YXNldCA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS51eFNlbGVjdGlvbkl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgdGhlIGl0ZW1zIGluIHRoZSBsaXN0XG4gICAqL1xuICBzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZW5hYmxlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5zZWxlY3RBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzZWxlY3QgYWxsIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtc1xuICAgKi9cbiAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZW5hYmxlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5kZXNlbGVjdEFsbCgpO1xuICAgIH1cbiAgfVxufVxuIl19