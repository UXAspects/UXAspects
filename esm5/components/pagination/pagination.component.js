/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return PaginationComponent; }),
    multi: true
};
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        /**
         * Specify if we should show the next and previous buttons
         */
        this.directionButtons = true;
        /**
         * Limit the number of pages shown at any given time
         */
        this.maxSize = 5;
        /**
         * Specify if the component should be disabled
         */
        this.disabled = false;
        /**
         * Aria Label for the component navigation
         */
        this.ariaLabel = 'Pagination Navigation';
        /**
         * Aria label for the previous button
         */
        this.previousAriaLabel = 'Navigate to the previous page';
        /**
         * Aria label for the next button
         */
        this.nextAriaLabel = 'Navigate to the next page';
        /**
         * Emit the current page number
         */
        this.pageChange = new EventEmitter();
        /**
         * Emit the total number of pages
         */
        this.numPages = new EventEmitter();
        /**
         * Store a list of pages to display in the UI
         */
        this.pages = [];
        /**
         * ControlValueAccessor functions
         */
        this.onTouched = function () { };
        this.onChange = function () { };
        this.isKeyboardEvent = false;
        this._page = 1;
        this._total = 100;
        this._pagesize = 10;
    }
    Object.defineProperty(PaginationComponent.prototype, "page", {
        get: /**
         * @return {?}
         */
        function () {
            return this._page;
        },
        /** Specify the index of the active page */
        set: /**
         * Specify the index of the active page
         * @param {?} page
         * @return {?}
         */
        function (page) {
            // do nothing if the page has not changed
            if (page === this._page) {
                return;
            }
            this._page = page;
            this.pages = this.getPages();
            // mark this component as changed
            this.onChange(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
        /** Specify the page size */
        set: /**
         * Specify the page size
         * @param {?} pagesize
         * @return {?}
         */
        function (pagesize) {
            this._pagesize = pagesize;
            this.pages = this.getPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        /** Specify how many items there are in total */
        set: /**
         * Specify how many items there are in total
         * @param {?} total
         * @return {?}
         */
        function (total) {
            this._total = total;
            this.pages = this.getPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageCount", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.ceil(this._total / this._pagesize);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PaginationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.pages = this.getPages();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PaginationComponent.prototype.select = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // find the page we want to go to
        var /** @type {?} */ target = this.pages.find(function (page) { return page.index === index; });
        // if the page is out of bounds then do nothing
        if (!target) {
            return;
        }
        // mark this component as touched
        this.onTouched();
        // set this as the current page
        this.page = target.index;
        // update the visible pages
        this.pages = this.getPages();
        // emit the current page
        this.pageChange.emit(this.page);
    };
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    PaginationComponent.prototype.trackByFn = /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return item.index;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PaginationComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PaginationComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    PaginationComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} page
     * @return {?}
     */
    PaginationComponent.prototype.writeValue = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        this.page = page;
    };
    /**
     * @return {?}
     */
    PaginationComponent.prototype.getPages = /**
     * @return {?}
     */
    function () {
        // create a new array to store the pages
        var /** @type {?} */ pages = [];
        // create all possible pages
        for (var /** @type {?} */ index = 1; index <= this.pageCount; index++) {
            pages.push({ index: index, visible: this.isPageVisible(index) });
        }
        // emit the number of pages
        this.numPages.emit(this.pageCount);
        return pages;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PaginationComponent.prototype.isPageVisible = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        // if we do not have a max size specified or the number of pages is less than the max size then it is always visible
        if (!this.maxSize || this.pageCount <= this.maxSize) {
            return true;
        }
        // find the starting position
        var /** @type {?} */ start = Math.max(1, Math.ceil(this.page - (this.maxSize / 2)));
        var /** @type {?} */ end = Math.min(start + this.maxSize, this.pageCount + 1);
        // if the range is less than the max size we need to adjust the starting point
        var /** @type {?} */ range = end - start;
        if (range < this.maxSize) {
            start = start - (this.maxSize - range);
        }
        // if the item equals the start position or is less than the end position then show it
        return index >= start && index < end;
    };
    PaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-pagination',
                    template: "<nav role=\"navigation\" [attr.aria-label]=\"ariaLabel\">\n  <ul #container class=\"pagination\"\n    [ngClass]=\"classes\"\n    direction=\"horizontal\"\n    (blur)=\"isKeyboardEvent = false\"\n    (keydown.ArrowLeft)=\"select(page - 1); isKeyboardEvent = true\"\n    (keydown.ArrowRight)=\"select(page + 1); isKeyboardEvent = true\"\n    (keydown.Home)=\"select(1); isKeyboardEvent = true; $event.preventDefault()\"\n    (keydown.End)=\"select(pageCount); isKeyboardEvent = true; $event.preventDefault()\">\n\n    <li class=\"pagination-prev page-item\"\n        *ngIf=\"directionButtons\"\n        [class.disabled]=\"page === 1 || disabled\">\n\n      <a class=\"page-link ux-keyboard-focus\"\n         tabindex=\"0\"\n         cdkMonitorElementFocus\n         [attr.aria-label]=\"previousAriaLabel\"\n         [ngClass]=\"pageBtnClass\"\n         (click)=\"select(page - 1)\"\n         (keydown.enter)=\"select(page - 1)\">\n        <ng-container [ngTemplateOutlet]=\"previousBtnTemplate || defaultPreviousBtnTemplate\"></ng-container>\n      </a>\n    </li>\n\n    <ng-container *ngFor=\"let pg of pages; trackBy: trackByFn\">\n      <li *ngIf=\"pg.visible\"\n          [class.disabled]=\"disabled\"\n          [class.active]=\"page === pg.index\"\n          class=\"pagination-page page-item\">\n\n        <a class=\"page-link ux-keyboard-focus\"\n           tabindex=\"0\"\n           [ngClass]=\"pageBtnClass\"\n           cdkMonitorElementFocus\n           [focusIf]=\"isKeyboardEvent && page === pg.index\"\n           [attr.aria-current]=\"page === pg.index\"\n           [attr.aria-setsize]=\"pageCount\"\n           [attr.aria-posinset]=\"pg.index\"\n           (click)=\"select(pg.index)\"\n           (keydown.enter)=\"select(pg.index)\">\n            {{ pg.index }}\n        </a>\n      </li>\n    </ng-container>\n\n    <li class=\"pagination-next page-item\"\n        *ngIf=\"directionButtons\"\n        [class.disabled]=\"page === pageCount || disabled\">\n\n      <a class=\"page-link ux-keyboard-focus\"\n         tabindex=\"0\"\n         cdkMonitorElementFocus\n         [attr.aria-label]=\"nextAriaLabel\"\n         [ngClass]=\"pageBtnClass\"\n         (click)=\"select(page + 1)\"\n         (keydown.enter)=\"select(page + 1)\">\n\n        <ng-container [ngTemplateOutlet]=\"nextBtnTemplate || defaultNextBtnTemplate\"></ng-container>\n      </a>\n    </li>\n  </ul>\n</nav>\n\n<ng-template #defaultPreviousBtnTemplate>\n  <span class=\"hpe-icon hpe-previous\"></span>\n</ng-template>\n\n<ng-template #defaultNextBtnTemplate>\n  <span class=\"hpe-icon hpe-next\"></span>\n</ng-template>\n",
                    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
                }] }
    ];
    PaginationComponent.propDecorators = {
        directionButtons: [{ type: Input }],
        maxSize: [{ type: Input }],
        disabled: [{ type: Input }],
        classes: [{ type: Input, args: ['class',] }],
        pageBtnClass: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        previousAriaLabel: [{ type: Input }],
        nextAriaLabel: [{ type: Input }],
        page: [{ type: Input }],
        previousBtnTemplate: [{ type: Input }],
        nextBtnTemplate: [{ type: Input }],
        itemsPerPage: [{ type: Input }],
        totalItems: [{ type: Input }],
        pageChange: [{ type: Output }],
        numPages: [{ type: Output }]
    };
    return PaginationComponent;
}());
export { PaginationComponent };
function PaginationComponent_tsickle_Closure_declarations() {
    /**
     * Specify if we should show the next and previous buttons
     * @type {?}
     */
    PaginationComponent.prototype.directionButtons;
    /**
     * Limit the number of pages shown at any given time
     * @type {?}
     */
    PaginationComponent.prototype.maxSize;
    /**
     * Specify if the component should be disabled
     * @type {?}
     */
    PaginationComponent.prototype.disabled;
    /**
     * Apply classes to the bootstrap pagination element
     * @type {?}
     */
    PaginationComponent.prototype.classes;
    /**
     * Allow custom class to be added to page buttons
     * @type {?}
     */
    PaginationComponent.prototype.pageBtnClass;
    /**
     * Aria Label for the component navigation
     * @type {?}
     */
    PaginationComponent.prototype.ariaLabel;
    /**
     * Aria label for the previous button
     * @type {?}
     */
    PaginationComponent.prototype.previousAriaLabel;
    /**
     * Aria label for the next button
     * @type {?}
     */
    PaginationComponent.prototype.nextAriaLabel;
    /**
     * Define a custom template for the previous button
     * @type {?}
     */
    PaginationComponent.prototype.previousBtnTemplate;
    /**
     * Define a custom template for the next button
     * @type {?}
     */
    PaginationComponent.prototype.nextBtnTemplate;
    /**
     * Emit the current page number
     * @type {?}
     */
    PaginationComponent.prototype.pageChange;
    /**
     * Emit the total number of pages
     * @type {?}
     */
    PaginationComponent.prototype.numPages;
    /**
     * Store a list of pages to display in the UI
     * @type {?}
     */
    PaginationComponent.prototype.pages;
    /**
     * ControlValueAccessor functions
     * @type {?}
     */
    PaginationComponent.prototype.onTouched;
    /** @type {?} */
    PaginationComponent.prototype.onChange;
    /** @type {?} */
    PaginationComponent.prototype.isKeyboardEvent;
    /** @type {?} */
    PaginationComponent.prototype._page;
    /** @type {?} */
    PaginationComponent.prototype._total;
    /** @type {?} */
    PaginationComponent.prototype._pagesize;
}
/**
 * @record
 */
export function Page() { }
function Page_tsickle_Closure_declarations() {
    /** @type {?} */
    Page.prototype.index;
    /** @type {?} */
    Page.prototype.visible;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxxQkFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG1CQUFtQixFQUFuQixDQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7Ozs7O2dDQVVxQyxJQUFJOzs7O3VCQUdkLENBQUM7Ozs7d0JBR0MsS0FBSzs7Ozt5QkFTTyx1QkFBdUI7Ozs7aUNBRzNCLCtCQUErQjs7Ozs2QkFHbkMsMkJBQTJCOzs7OzBCQXdDckMsSUFBSSxZQUFZLEVBQVU7Ozs7d0JBRzVCLElBQUksWUFBWSxFQUFVOzs7O3FCQUdsQixFQUFFOzs7O3lCQUdULGVBQVE7d0JBQ1QsZUFBUTsrQkFFRixLQUFLO3FCQUVSLENBQUM7c0JBQ0EsR0FBRzt5QkFDQSxFQUFFOztJQXJEOUIsc0JBQWEscUNBQUk7Ozs7UUFjakI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQWpCRCwyQ0FBMkM7Ozs7OztRQUMzQyxVQUFrQixJQUFZOztZQUc1QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQzthQUNSO1lBRUQsSUFBSSxDQUFDLEtBQUss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OzJCQUdOLE1BQU07OzhCQWpGVDs7U0FjYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgUEFHSU5BVElPTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQYWdpbmF0aW9uQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1BBR0lOQVRJT05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIC8qKiBTcGVjaWZ5IGlmIHdlIHNob3VsZCBzaG93IHRoZSBuZXh0IGFuZCBwcmV2aW91cyBidXR0b25zICovXG4gIEBJbnB1dCgpIGRpcmVjdGlvbkJ1dHRvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBMaW1pdCB0aGUgbnVtYmVyIG9mIHBhZ2VzIHNob3duIGF0IGFueSBnaXZlbiB0aW1lICovXG4gIEBJbnB1dCgpIG1heFNpemU6IG51bWJlciA9IDU7XG5cbiAgLyoqIFNwZWNpZnkgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogQXBwbHkgY2xhc3NlcyB0byB0aGUgYm9vdHN0cmFwIHBhZ2luYXRpb24gZWxlbWVudCAqL1xuICBASW5wdXQoJ2NsYXNzJykgY2xhc3Nlczogc3RyaW5nO1xuXG4gIC8qKiBBbGxvdyBjdXN0b20gY2xhc3MgdG8gYmUgYWRkZWQgdG8gcGFnZSBidXR0b25zICovXG4gIEBJbnB1dCgpIHBhZ2VCdG5DbGFzczogc3RyaW5nO1xuXG4gIC8qKiBBcmlhIExhYmVsIGZvciB0aGUgY29tcG9uZW50IG5hdmlnYXRpb24gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnUGFnaW5hdGlvbiBOYXZpZ2F0aW9uJztcblxuICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIGJ1dHRvbiAqL1xuICBASW5wdXQoKSBwcmV2aW91c0FyaWFMYWJlbDogc3RyaW5nID0gJ05hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBwYWdlJztcblxuICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIG5leHQgYnV0dG9uICovXG4gIEBJbnB1dCgpIG5leHRBcmlhTGFiZWw6IHN0cmluZyA9ICdOYXZpZ2F0ZSB0byB0aGUgbmV4dCBwYWdlJztcblxuICAvKiogU3BlY2lmeSB0aGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBwYWdlICovXG4gIEBJbnB1dCgpIHNldCBwYWdlKHBhZ2U6IG51bWJlcikge1xuXG4gICAgLy8gZG8gbm90aGluZyBpZiB0aGUgcGFnZSBoYXMgbm90IGNoYW5nZWRcbiAgICBpZiAocGFnZSA9PT0gdGhpcy5fcGFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BhZ2UgPSBwYWdlO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKCk7XG5cbiAgICAvLyBtYXJrIHRoaXMgY29tcG9uZW50IGFzIGNoYW5nZWRcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucGFnZSk7XG4gIH1cblxuICBnZXQgcGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlO1xuICB9XG5cbiAgLyoqIERlZmluZSBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIHByZXZpb3VzIGJ1dHRvbiAqL1xuICBASW5wdXQoKSBwcmV2aW91c0J0blRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKiBEZWZpbmUgYSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBuZXh0IGJ1dHRvbiAqL1xuICBASW5wdXQoKSBuZXh0QnRuVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIFNwZWNpZnkgdGhlIHBhZ2Ugc2l6ZSAqL1xuICBASW5wdXQoKSBzZXQgaXRlbXNQZXJQYWdlKHBhZ2VzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlc2l6ZSA9IHBhZ2VzaXplO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKCk7XG4gIH1cblxuICAvKiogU3BlY2lmeSBob3cgbWFueSBpdGVtcyB0aGVyZSBhcmUgaW4gdG90YWwgKi9cbiAgQElucHV0KCkgc2V0IHRvdGFsSXRlbXModG90YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3RvdGFsID0gdG90YWw7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXMoKTtcbiAgfVxuXG4gIC8qKiBFbWl0IHRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyICovXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIEVtaXQgdGhlIHRvdGFsIG51bWJlciBvZiBwYWdlcyAqL1xuICBAT3V0cHV0KCkgbnVtUGFnZXMgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogU3RvcmUgYSBsaXN0IG9mIHBhZ2VzIHRvIGRpc3BsYXkgaW4gdGhlIFVJICovXG4gIHBhZ2VzOiBSZWFkb25seUFycmF5PFBhZ2U+ID0gW107XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGZ1bmN0aW9ucyAqL1xuICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGlzS2V5Ym9hcmRFdmVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3BhZ2U6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgX3RvdGFsOiBudW1iZXIgPSAxMDA7XG4gIHByaXZhdGUgX3BhZ2VzaXplOiBudW1iZXIgPSAxMDtcblxuICBnZXQgcGFnZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLl90b3RhbCAvIHRoaXMuX3BhZ2VzaXplKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKCk7XG4gIH1cblxuICBzZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXG4gICAgLy8gZmluZCB0aGUgcGFnZSB3ZSB3YW50IHRvIGdvIHRvXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5wYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS5pbmRleCA9PT0gaW5kZXgpO1xuXG4gICAgLy8gaWYgdGhlIHBhZ2UgaXMgb3V0IG9mIGJvdW5kcyB0aGVuIGRvIG5vdGhpbmdcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1hcmsgdGhpcyBjb21wb25lbnQgYXMgdG91Y2hlZFxuICAgIHRoaXMub25Ub3VjaGVkKCk7XG5cbiAgICAvLyBzZXQgdGhpcyBhcyB0aGUgY3VycmVudCBwYWdlXG4gICAgdGhpcy5wYWdlID0gdGFyZ2V0LmluZGV4O1xuXG4gICAgLy8gdXBkYXRlIHRoZSB2aXNpYmxlIHBhZ2VzXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXMoKTtcblxuICAgIC8vIGVtaXQgdGhlIGN1cnJlbnQgcGFnZVxuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG4gIH1cblxuICB0cmFja0J5Rm4oX2luZGV4OiBudW1iZXIsIGl0ZW06IFBhZ2UpOiBudW1iZXIge1xuICAgIHJldHVybiBpdGVtLmluZGV4O1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHdyaXRlVmFsdWUocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFnZXMoKTogUGFnZVtdIHtcblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBhcnJheSB0byBzdG9yZSB0aGUgcGFnZXNcbiAgICBjb25zdCBwYWdlczogUGFnZVtdID0gW107XG5cbiAgICAvLyBjcmVhdGUgYWxsIHBvc3NpYmxlIHBhZ2VzXG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8PSB0aGlzLnBhZ2VDb3VudDsgaW5kZXgrKykge1xuICAgICAgcGFnZXMucHVzaCh7IGluZGV4LCB2aXNpYmxlOiB0aGlzLmlzUGFnZVZpc2libGUoaW5kZXgpIH0pO1xuICAgIH1cblxuICAgIC8vIGVtaXQgdGhlIG51bWJlciBvZiBwYWdlc1xuICAgIHRoaXMubnVtUGFnZXMuZW1pdCh0aGlzLnBhZ2VDb3VudCk7XG5cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICBwcml2YXRlIGlzUGFnZVZpc2libGUoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuXG4gICAgLy8gaWYgd2UgZG8gbm90IGhhdmUgYSBtYXggc2l6ZSBzcGVjaWZpZWQgb3IgdGhlIG51bWJlciBvZiBwYWdlcyBpcyBsZXNzIHRoYW4gdGhlIG1heCBzaXplIHRoZW4gaXQgaXMgYWx3YXlzIHZpc2libGVcbiAgICBpZiAoIXRoaXMubWF4U2l6ZSB8fCB0aGlzLnBhZ2VDb3VudCA8PSB0aGlzLm1heFNpemUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZpbmQgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHRoaXMucGFnZSAtICh0aGlzLm1heFNpemUgLyAyKSkpO1xuICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgdGhpcy5tYXhTaXplLCB0aGlzLnBhZ2VDb3VudCArIDEpO1xuXG4gICAgLy8gaWYgdGhlIHJhbmdlIGlzIGxlc3MgdGhhbiB0aGUgbWF4IHNpemUgd2UgbmVlZCB0byBhZGp1c3QgdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgY29uc3QgcmFuZ2UgPSBlbmQgLSBzdGFydDtcblxuICAgIGlmIChyYW5nZSA8IHRoaXMubWF4U2l6ZSkge1xuICAgICAgc3RhcnQgPSBzdGFydCAtICh0aGlzLm1heFNpemUgLSByYW5nZSk7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGl0ZW0gZXF1YWxzIHRoZSBzdGFydCBwb3NpdGlvbiBvciBpcyBsZXNzIHRoYW4gdGhlIGVuZCBwb3NpdGlvbiB0aGVuIHNob3cgaXRcbiAgICByZXR1cm4gaW5kZXggPj0gc3RhcnQgJiYgaW5kZXggPCBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlIHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgdmlzaWJsZTogYm9vbGVhbjtcbn1cbiJdfQ==