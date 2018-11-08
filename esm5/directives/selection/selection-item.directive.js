/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from './selection.service';
/**
 * @template T
 */
var SelectionItemDirective = /** @class */ (function () {
    function SelectionItemDirective(_selectionService, _elementRef) {
        this._selectionService = _selectionService;
        this._elementRef = _elementRef;
        this.tabindex = null;
        this.selectedChange = new EventEmitter();
        this.active = false;
        this._selected = false;
        this._managedTabIndex = -1;
        this._onDestroy = new Subject();
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
        this._selectionService.getSelectionState(this.uxSelectionItem).pipe(takeUntil(this._onDestroy)).subscribe(function (selected) {
            // store the selected state
            // store the selected state
            _this._selected = selected;
            // emit the selected state
            // emit the selected state
            _this.selectedChange.emit(selected);
        });
        this._selected = this._selectionService.isSelected(this.uxSelectionItem);
        this.selectedChange.emit(this._selected);
        // subscribe to changes to the active state
        this._selectionService.active$.pipe(takeUntil(this._onDestroy), map(function (active) { return active === _this.uxSelectionItem; })).subscribe(function (active) {
            // store the focus state
            // store the focus state
            _this.active = active;
            // if it is active then focus the element
            if (active === true) {
                _this._selectionService.focus$.next(_this.uxSelectionItem);
                _this._elementRef.nativeElement.focus();
            }
        });
        // Subscribe to changes to the focus target
        // This is mostly the same as active$, except that it has an initial value of the first item in the collection.
        this._selectionService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(function (focusTarget) {
            _this._managedTabIndex = (focusTarget === _this.uxSelectionItem) ? 0 : -1;
        });
    };
    /**
     * @return {?}
     */
    SelectionItemDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
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
        if (this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
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
        if (this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
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
        if (this._selectionService.isEnabled && this._selectionService.isKeyboardEnabled) {
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
        if (this._selectionService.isEnabled) {
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
        if (this._selectionService.isEnabled) {
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
        selected: [{ type: Input }, { type: HostBinding, args: ['class.ux-selection-selected',] }, { type: HostBinding, args: ['attr.aria-selected',] }],
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
    SelectionItemDirective.prototype._onDestroy;
    /** @type {?} */
    SelectionItemDirective.prototype._selectionService;
    /** @type {?} */
    SelectionItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztJQW9DbkQsZ0NBQW9CLGlCQUFzQyxFQUFVLFdBQXVCO1FBQXZFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt3QkFmL0QsSUFBSTs4QkFFTCxJQUFJLFlBQVksRUFBVztzQkFFTyxLQUFLO3lCQU9yQyxLQUFLO2dDQUNDLENBQUMsQ0FBQzswQkFDaEIsSUFBSSxPQUFPLEVBQVE7S0FFd0Q7SUExQmhHLHNCQUdJLDRDQUFROzs7O1FBSVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN6Qjs7Ozs7UUFURCxVQUdhLFFBQWlCO1lBQzFCLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUM7OztPQUFBO0lBWUQsc0JBQ0ksZ0RBQVk7Ozs7UUFEaEI7WUFFSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJ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QkFDaEM7Ozs7Z0JBTFEsZ0JBQWdCO2dCQUhMLFVBQVU7OztrQ0FXekIsS0FBSzsyQkFFTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLDZCQUE2QixjQUN6QyxXQUFXLFNBQUMsb0JBQW9COzJCQVNoQyxLQUFLO2lDQUVMLE1BQU07eUJBRU4sV0FBVyxTQUFDLDRCQUE0QjsrQkFFeEMsV0FBVyxTQUFDLGVBQWU7d0JBeUQzQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQU9oQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQU9wQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQU9sQyxZQUFZLFNBQUMsT0FBTzs7aUNBNUd6Qjs7U0FTYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZWxlY3Rpb24uc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3V4U2VsZWN0aW9uSXRlbV0nLFxyXG4gICAgZXhwb3J0QXM6ICd1eC1zZWxlY3Rpb24taXRlbSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkl0ZW1EaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgdXhTZWxlY3Rpb25JdGVtOiBUO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnV4LXNlbGVjdGlvbi1zZWxlY3RlZCcpXHJcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXHJcbiAgICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBzZWxlY3RlZCA/IHRoaXMuc2VsZWN0KCkgOiB0aGlzLmRlc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1zZWxlY3Rpb24tZm9jdXNlZCcpIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpXHJcbiAgICBnZXQgYXR0clRhYkluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnRhYmluZGV4ICE9PSBudWxsKSA/IHRoaXMudGFiaW5kZXggOiB0aGlzLl9tYW5hZ2VkVGFiSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX21hbmFnZWRUYWJJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2U8VD4sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBhc3NvY2lhdGVkIGRhdGEgdGhlbiB0aHJvdyBhbiBlcnJvclxyXG4gICAgICAgIGlmICghdGhpcy51eFNlbGVjdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdXhTZWxlY3Rpb25JdGVtIGRpcmVjdGl2ZSBtdXN0IGhhdmUgZGF0YSBhc3NvY2lhdGVkIHdpdGggaXQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gc2VsZWN0aW9uIGNoYW5nZXMgb24gdGhpcyBpdGVtXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5nZXRTZWxlY3Rpb25TdGF0ZSh0aGlzLnV4U2VsZWN0aW9uSXRlbSkucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHNlbGVjdGVkID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBzZWxlY3RlZCBzdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xyXG5cclxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgc2VsZWN0ZWQgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzU2VsZWN0ZWQodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5fc2VsZWN0ZWQpO1xyXG5cclxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyB0byB0aGUgYWN0aXZlIHN0YXRlXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcChhY3RpdmUgPT4gYWN0aXZlID09PSB0aGlzLnV4U2VsZWN0aW9uSXRlbSkpLnN1YnNjcmliZShhY3RpdmUgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZvY3VzIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYWN0aXZlIHRoZW4gZm9jdXMgdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1cyQubmV4dCh0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyB0byB0aGUgZm9jdXMgdGFyZ2V0XHJcbiAgICAgICAgLy8gVGhpcyBpcyBtb3N0bHkgdGhlIHNhbWUgYXMgYWN0aXZlJCwgZXhjZXB0IHRoYXQgaXQgaGFzIGFuIGluaXRpYWwgdmFsdWUgb2YgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5mb2N1cyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGZvY3VzVGFyZ2V0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWFuYWdlZFRhYkluZGV4ID0gKGZvY3VzVGFyZ2V0ID09PSB0aGlzLnV4U2VsZWN0aW9uSXRlbSkgPyAwIDogLTE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgICBjbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzQ2xpY2tFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuY2xpY2soZXZlbnQsIHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcclxuICAgIG1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzQ2xpY2tFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kubW91c2Vkb3duKGV2ZW50LCB0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCAmJiB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzS2V5Ym9hcmRFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kua2V5ZG93bihldmVudCwgdGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgICBmb2N1cygpOiB2b2lkIHtcclxuICAgICAgICAvLyBJZiB0YWJiZWQgdG8gZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQsIGFjdGl2YXRlLlxyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZSQuZ2V0VmFsdWUoKSAhPT0gdGhpcy51eFNlbGVjdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmF0ZSh0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoaXMgaXRlbSB1c2luZyB0aGUgY3VycmVudCBzdHJhdGVneVxyXG4gICAgICovXHJcbiAgICBzZWxlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuc2VsZWN0KHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXNlbGVjdCB0aGlzIGl0ZW0gdXNpbmcgdGhlIGN1cnJlbnQgc3RyYXRlZ3lcclxuICAgICAqL1xyXG4gICAgZGVzZWxlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2Uuc3RyYXRlZ3kuZGVzZWxlY3QodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=