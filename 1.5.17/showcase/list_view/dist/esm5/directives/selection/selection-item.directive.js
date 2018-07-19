/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { SelectionService } from './selection.service';
var SelectionItemDirective = (function () {
    function SelectionItemDirective(_selectionService, _elementRef) {
        this._selectionService = _selectionService;
        this._elementRef = _elementRef;
        this.tabindex = null;
        this.selectedChange = new EventEmitter();
        this.active = false;
        this._selected = false;
        this._managedTabIndex = -1;
        this._subscriptions = new Subscription();
    }
    Object.defineProperty(SelectionItemDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            selected ? this.select() : this.deselect();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionItemDirective.prototype, "attrTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.tabindex !== null) ? this.tabindex : this._managedTabIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectionItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // if there is no associated data then throw an error
        if (!this.uxSelectionItem) {
            throw new Error('The uxSelectionItem directive must have data associated with it.');
        }
        // subscribe to selection changes on this item
        this._subscriptions.add(this._selectionService.selected$(this.uxSelectionItem).subscribe(function (selected) {
            // store the selected state
            // store the selected state
            _this._selected = selected;
            // emit the selected state
            // emit the selected state
            _this.selectedChange.emit(selected);
        }));
        // subscribe to changes to the active state
        this._subscriptions.add(this._selectionService.active$.pipe(map(function (active) { return active === _this.uxSelectionItem; })).subscribe(function (active) {
            // store the focus state
            // store the focus state
            _this.active = active;
            // if it is active then focus the element
            if (active === true) {
                _this._selectionService.focusTarget$.next(_this.uxSelectionItem);
                _this._elementRef.nativeElement.focus();
            }
        }));
        // Subscribe to changes to the focus target
        // This is mostly the same as active$, except that it has an initial value of the first item in the collection.
        this._subscriptions.add(this._selectionService.focusTarget$.subscribe(function (focusTarget) {
            _this._managedTabIndex = (focusTarget === _this.uxSelectionItem) ? 0 : -1;
        }));
    };
    /**
     * @return {?}
     */
    SelectionItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscriptions.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionItemDirective.prototype.click = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._selectionService.enabled && this._selectionService.clickEnabled) {
            this._selectionService.strategy.click(event, this.uxSelectionItem);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionItemDirective.prototype.mousedown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._selectionService.enabled && this._selectionService.clickEnabled) {
            this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectionItemDirective.prototype.keydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._selectionService.enabled && this._selectionService.keyboardEnabled) {
            this._selectionService.strategy.keydown(event, this.uxSelectionItem);
        }
    };
    /**
     * @return {?}
     */
    SelectionItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        // If tabbed to from outside the component, activate.
        if (this._selectionService.active$.getValue() !== this.uxSelectionItem) {
            this._selectionService.activate(this.uxSelectionItem);
        }
    };
    /**
     * Select this item using the current strategy
     */
    /**
     * Select this item using the current strategy
     * @return {?}
     */
    SelectionItemDirective.prototype.select = /**
     * Select this item using the current strategy
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.select(this.uxSelectionItem);
        }
    };
    /**
     * Deselect this item using the current strategy
     */
    /**
     * Deselect this item using the current strategy
     * @return {?}
     */
    SelectionItemDirective.prototype.deselect = /**
     * Deselect this item using the current strategy
     * @return {?}
     */
    function () {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.deselect(this.uxSelectionItem);
        }
    };
    SelectionItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxSelectionItem]',
                    exportAs: 'ux-selection-item'
                },] },
    ];
    /** @nocollapse */
    SelectionItemDirective.ctorParameters = function () { return [
        { type: SelectionService, },
        { type: ElementRef, },
    ]; };
    SelectionItemDirective.propDecorators = {
        "uxSelectionItem": [{ type: Input },],
        "selected": [{ type: Input }, { type: HostBinding, args: ['class.ux-selection-selected',] },],
        "tabindex": [{ type: Input },],
        "selectedChange": [{ type: Output },],
        "active": [{ type: HostBinding, args: ['class.ux-selection-focused',] },],
        "attrTabIndex": [{ type: HostBinding, args: ['attr.tabindex',] },],
        "click": [{ type: HostListener, args: ['click', ['$event'],] },],
        "mousedown": [{ type: HostListener, args: ['mousedown', ['$event'],] },],
        "keydown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
        "focus": [{ type: HostListener, args: ['focus',] },],
    };
    return SelectionItemDirective;
}());
export { SelectionItemDirective };
function SelectionItemDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectionItemDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectionItemDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SelectionItemDirective.propDecorators;
    /** @type {?} */
    SelectionItemDirective.prototype.uxSelectionItem;
    /** @type {?} */
    SelectionItemDirective.prototype.tabindex;
    /** @type {?} */
    SelectionItemDirective.prototype.selectedChange;
    /** @type {?} */
    SelectionItemDirective.prototype.active;
    /** @type {?} */
    SelectionItemDirective.prototype._selected;
    /** @type {?} */
    SelectionItemDirective.prototype._managedTabIndex;
    /** @type {?} */
    SelectionItemDirective.prototype._subscriptions;
    /** @type {?} */
    SelectionItemDirective.prototype._selectionService;
    /** @type {?} */
    SelectionItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFrQ3JELGdDQUFvQixpQkFBbUMsRUFBVSxXQUF1QjtRQUFwRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7d0JBZjVELElBQUk7OEJBRUwsSUFBSSxZQUFZLEVBQVc7c0JBRU8sS0FBSzt5QkFPckMsS0FBSztnQ0FDQyxDQUFDLENBQUM7OEJBQ1osSUFBSSxZQUFZLEVBQUU7S0FFa0Q7MEJBdkJ6Riw0Q0FBUTs7OztRQUlaO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O2tCQU5ZLFFBQWlCO1lBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7OzswQkFjekMsZ0RBQVk7Ozs7O1lBQ2QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7SUFTMUUseUNBQVE7OztJQUFSO1FBQUEs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ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbdXhTZWxlY3Rpb25JdGVtXScsXHJcbiAgZXhwb3J0QXM6ICd1eC1zZWxlY3Rpb24taXRlbSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIHV4U2VsZWN0aW9uSXRlbTogYW55O1xyXG5cclxuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLnV4LXNlbGVjdGlvbi1zZWxlY3RlZCcpXHJcbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKSB7XHJcbiAgICBzZWxlY3RlZCA/IHRoaXMuc2VsZWN0KCkgOiB0aGlzLmRlc2VsZWN0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnV4LXNlbGVjdGlvbi1mb2N1c2VkJykgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpXHJcbiAgZ2V0IGF0dHJUYWJJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICh0aGlzLnRhYmluZGV4ICE9PSBudWxsKSA/IHRoaXMudGFiaW5kZXggOiB0aGlzLl9tYW5hZ2VkVGFiSW5kZXg7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX21hbmFnZWRUYWJJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFzc29jaWF0ZWQgZGF0YSB0aGVuIHRocm93IGFuIGVycm9yXHJcbiAgICBpZiAoIXRoaXMudXhTZWxlY3Rpb25JdGVtKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHV4U2VsZWN0aW9uSXRlbSBkaXJlY3RpdmUgbXVzdCBoYXZlIGRhdGEgYXNzb2NpYXRlZCB3aXRoIGl0LicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBzZWxlY3Rpb24gY2hhbmdlcyBvbiB0aGlzIGl0ZW1cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc2VsZWN0ZWQkKHRoaXMudXhTZWxlY3Rpb25JdGVtKS5zdWJzY3JpYmUoc2VsZWN0ZWQgPT4ge1xyXG5cclxuICAgICAgLy8gc3RvcmUgdGhlIHNlbGVjdGVkIHN0YXRlXHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcblxyXG4gICAgICAvLyBlbWl0IHRoZSBzZWxlY3RlZCBzdGF0ZVxyXG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBhY3RpdmUgc3RhdGVcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuYWRkKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlJC5waXBlKG1hcChhY3RpdmUgPT4gYWN0aXZlID09PSB0aGlzLnV4U2VsZWN0aW9uSXRlbSkpLnN1YnNjcmliZShhY3RpdmUgPT4ge1xyXG5cclxuICAgICAgLy8gc3RvcmUgdGhlIGZvY3VzIHN0YXRlXHJcbiAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG5cclxuICAgICAgLy8gaWYgaXQgaXMgYWN0aXZlIHRoZW4gZm9jdXMgdGhlIGVsZW1lbnRcclxuICAgICAgaWYgKGFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXNUYXJnZXQkLm5leHQodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgdG8gdGhlIGZvY3VzIHRhcmdldFxyXG4gICAgLy8gVGhpcyBpcyBtb3N0bHkgdGhlIHNhbWUgYXMgYWN0aXZlJCwgZXhjZXB0IHRoYXQgaXQgaGFzIGFuIGluaXRpYWwgdmFsdWUgb2YgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzVGFyZ2V0JC5zdWJzY3JpYmUoZm9jdXNUYXJnZXQgPT4ge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VkVGFiSW5kZXggPSAoZm9jdXNUYXJnZXQgPT09IHRoaXMudXhTZWxlY3Rpb25JdGVtKSA/IDAgOiAtMTtcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBjbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZW5hYmxlZCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmNsaWNrRW5hYmxlZCkge1xyXG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmNsaWNrKGV2ZW50LCB0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmVuYWJsZWQgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGlja0VuYWJsZWQpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5tb3VzZWRvd24oZXZlbnQsIHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uua2V5Ym9hcmRFbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kua2V5ZG93bihldmVudCwgdGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKSBmb2N1cygpOiB2b2lkIHtcclxuICAgIC8vIElmIHRhYmJlZCB0byBmcm9tIG91dHNpZGUgdGhlIGNvbXBvbmVudCwgYWN0aXZhdGUuXHJcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmUkLmdldFZhbHVlKCkgIT09IHRoaXMudXhTZWxlY3Rpb25JdGVtKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IHRoaXMgaXRlbSB1c2luZyB0aGUgY3VycmVudCBzdHJhdGVneVxyXG4gICAqL1xyXG4gIHNlbGVjdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmVuYWJsZWQpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5zZWxlY3QodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzZWxlY3QgdGhpcyBpdGVtIHVzaW5nIHRoZSBjdXJyZW50IHN0cmF0ZWd5XHJcbiAgICovXHJcbiAgZGVzZWxlY3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuZGVzZWxlY3QodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=