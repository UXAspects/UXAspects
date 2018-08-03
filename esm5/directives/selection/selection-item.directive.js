/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { SelectionService } from './selection.service';
var SelectionItemDirective = /** @class */ (function () {
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
                },] }
    ];
    /** @nocollapse */
    SelectionItemDirective.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ElementRef }
    ]; };
    SelectionItemDirective.propDecorators = {
        uxSelectionItem: [{ type: Input }],
        selected: [{ type: Input }, { type: HostBinding, args: ['class.ux-selection-selected',] }],
        tabindex: [{ type: Input }],
        selectedChange: [{ type: Output }],
        active: [{ type: HostBinding, args: ['class.ux-selection-focused',] }],
        attrTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        click: [{ type: HostListener, args: ['click', ['$event'],] }],
        mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        focus: [{ type: HostListener, args: ['focus',] }]
    };
    return SelectionItemDirective;
}());
export { SelectionItemDirective };
function SelectionItemDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFrQ3JELGdDQUFvQixpQkFBbUMsRUFBVSxXQUF1QjtRQUFwRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7d0JBZjVELElBQUk7OEJBRUwsSUFBSSxZQUFZLEVBQVc7c0JBRU8sS0FBSzt5QkFPckMsS0FBSztnQ0FDQyxDQUFDLENBQUM7OEJBQ1osSUFBSSxZQUFZLEVBQUU7S0FFa0Q7SUF4QjdGLHNCQUNJLDRDQUFROzs7O1FBSVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7UUFQRCxVQUNhLFFBQWlCO1lBQzVCLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDNUM7OztPQUFBO0lBWUQsc0JBQ0ksZ0RBQVk7Ozs7UUFEaEI7WUFFRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxD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QUMsUUFBUSxDQUFDOzBCQU1wQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQU1sQyxZQUFZLFNBQUMsT0FBTzs7aUNBbEd2Qjs7U0FTYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3V4U2VsZWN0aW9uSXRlbV0nLFxyXG4gIGV4cG9ydEFzOiAndXgtc2VsZWN0aW9uLWl0ZW0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25JdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSB1eFNlbGVjdGlvbkl0ZW06IGFueTtcclxuXHJcbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1zZWxlY3Rpb24tc2VsZWN0ZWQnKVxyXG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xyXG4gICAgc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdCgpIDogdGhpcy5kZXNlbGVjdCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IG51bGw7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1zZWxlY3Rpb24tZm9jdXNlZCcpIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKVxyXG4gIGdldCBhdHRyVGFiSW5kZXgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAodGhpcy50YWJpbmRleCAhPT0gbnVsbCkgPyB0aGlzLnRhYmluZGV4IDogdGhpcy5fbWFuYWdlZFRhYkluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIF9tYW5hZ2VkVGFiSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBpZiB0aGVyZSBpcyBubyBhc3NvY2lhdGVkIGRhdGEgdGhlbiB0aHJvdyBhbiBlcnJvclxyXG4gICAgaWYgKCF0aGlzLnV4U2VsZWN0aW9uSXRlbSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB1eFNlbGVjdGlvbkl0ZW0gZGlyZWN0aXZlIG11c3QgaGF2ZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCBpdC4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gc2VsZWN0aW9uIGNoYW5nZXMgb24gdGhpcyBpdGVtXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnNlbGVjdGVkJCh0aGlzLnV4U2VsZWN0aW9uSXRlbSkuc3Vic2NyaWJlKHNlbGVjdGVkID0+IHtcclxuXHJcbiAgICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBzdGF0ZVxyXG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xyXG5cclxuICAgICAgLy8gZW1pdCB0aGUgc2VsZWN0ZWQgc3RhdGVcclxuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyB0byB0aGUgYWN0aXZlIHN0YXRlXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZSQucGlwZShtYXAoYWN0aXZlID0+IGFjdGl2ZSA9PT0gdGhpcy51eFNlbGVjdGlvbkl0ZW0pKS5zdWJzY3JpYmUoYWN0aXZlID0+IHtcclxuXHJcbiAgICAgIC8vIHN0b3JlIHRoZSBmb2N1cyBzdGF0ZVxyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuXHJcbiAgICAgIC8vIGlmIGl0IGlzIGFjdGl2ZSB0aGVuIGZvY3VzIHRoZSBlbGVtZW50XHJcbiAgICAgIGlmIChhY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzVGFyZ2V0JC5uZXh0KHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBmb2N1cyB0YXJnZXRcclxuICAgIC8vIFRoaXMgaXMgbW9zdGx5IHRoZSBzYW1lIGFzIGFjdGl2ZSQsIGV4Y2VwdCB0aGF0IGl0IGhhcyBhbiBpbml0aWFsIHZhbHVlIG9mIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1c1RhcmdldCQuc3Vic2NyaWJlKGZvY3VzVGFyZ2V0ID0+IHtcclxuICAgICAgdGhpcy5fbWFuYWdlZFRhYkluZGV4ID0gKGZvY3VzVGFyZ2V0ID09PSB0aGlzLnV4U2VsZWN0aW9uSXRlbSkgPyAwIDogLTE7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmVuYWJsZWQgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5jbGlja0VuYWJsZWQpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5jbGljayhldmVudCwgdGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuY2xpY2tFbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kubW91c2Vkb3duKGV2ZW50LCB0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZW5hYmxlZCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmtleWJvYXJkRW5hYmxlZCkge1xyXG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmtleWRvd24oZXZlbnQsIHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgZm9jdXMoKTogdm9pZCB7XHJcbiAgICAvLyBJZiB0YWJiZWQgdG8gZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQsIGFjdGl2YXRlLlxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlJC5nZXRWYWx1ZSgpICE9PSB0aGlzLnV4U2VsZWN0aW9uSXRlbSkge1xyXG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdCB0aGlzIGl0ZW0gdXNpbmcgdGhlIGN1cnJlbnQgc3RyYXRlZ3lcclxuICAgKi9cclxuICBzZWxlY3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5lbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuc2VsZWN0KHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc2VsZWN0IHRoaXMgaXRlbSB1c2luZyB0aGUgY3VycmVudCBzdHJhdGVneVxyXG4gICAqL1xyXG4gIGRlc2VsZWN0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZW5hYmxlZCkge1xyXG4gICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmRlc2VsZWN0KHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19