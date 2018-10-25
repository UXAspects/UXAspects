/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaginationComponent),
    multi: true
};
export class PaginationComponent {
    constructor() {
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
        this.onTouched = () => { };
        this.onChange = () => { };
        this.isKeyboardEvent = false;
        this._page = 1;
        this._total = 100;
        this._pagesize = 10;
    }
    /**
     * Specify the index of the active page
     * @param {?} page
     * @return {?}
     */
    set page(page) {
        // do nothing if the page has not changed
        if (page === this._page) {
            return;
        }
        this._page = page;
        this.pages = this.getPages();
        // mark this component as changed
        this.onChange(this.page);
    }
    /**
     * @return {?}
     */
    get page() {
        return this._page;
    }
    /**
     * Specify the page size
     * @param {?} pagesize
     * @return {?}
     */
    set itemsPerPage(pagesize) {
        this._pagesize = pagesize;
        this.pages = this.getPages();
    }
    /**
     * Specify how many items there are in total
     * @param {?} total
     * @return {?}
     */
    set totalItems(total) {
        this._total = total;
        this.pages = this.getPages();
    }
    /**
     * @return {?}
     */
    get pageCount() {
        return Math.ceil(this._total / this._pagesize);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.pages = this.getPages();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    select(index) {
        // find the page we want to go to
        const /** @type {?} */ target = this.pages.find(page => page.index === index);
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
    }
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    trackByFn(_index, item) {
        return item.index;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    writeValue(page) {
        this.page = page;
    }
    /**
     * @return {?}
     */
    getPages() {
        // create a new array to store the pages
        const /** @type {?} */ pages = [];
        // create all possible pages
        for (let /** @type {?} */ index = 1; index <= this.pageCount; index++) {
            pages.push({ index, visible: this.isPageVisible(index) });
        }
        // emit the number of pages
        this.numPages.emit(this.pageCount);
        return pages;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isPageVisible(index) {
        // if we do not have a max size specified or the number of pages is less than the max size then it is always visible
        if (!this.maxSize || this.pageCount <= this.maxSize) {
            return true;
        }
        // find the starting position
        let /** @type {?} */ start = Math.max(1, Math.ceil(this.page - (this.maxSize / 2)));
        const /** @type {?} */ end = Math.min(start + this.maxSize, this.pageCount + 1);
        // if the range is less than the max size we need to adjust the starting point
        const /** @type {?} */ range = end - start;
        if (range < this.maxSize) {
            start = start - (this.maxSize - range);
        }
        // if the item equals the start position or is less than the end position then show it
        return index >= start && index < end;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyx1QkFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBT0YsTUFBTTs7Ozs7Z0NBR2lDLElBQUk7Ozs7dUJBR2QsQ0FBQzs7Ozt3QkFHQyxLQUFLOzs7O3lCQVNPLHVCQUF1Qjs7OztpQ0FHM0IsK0JBQStCOzs7OzZCQUduQywyQkFBMkI7Ozs7MEJBd0NyQyxJQUFJLFlBQVksRUFBVTs7Ozt3QkFHNUIsSUFBSSxZQUFZLEVBQVU7Ozs7cUJBR2xCLEVBQUU7Ozs7eUJBR1QsR0FBRyxFQUFFLElBQUc7d0JBQ1QsR0FBRyxFQUFFLElBQUc7K0JBRUYsS0FBSztxQkFFUixDQUFDO3NCQUNBLEdBQUc7eUJBQ0EsRUFBRTs7Ozs7OztJQXJEOUIsSUFBYSxJQUFJLENBQUMsSUFBWTs7UUFHNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMs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R0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSx1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDOztRQUcvRCx1QkFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDeEM7O1FBR0QsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQzs7OztZQTdLeEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6Qixna0ZBQTBDO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQzthQUMvQzs7OytCQUlFLEtBQUs7c0JBR0wsS0FBSzt1QkFHTCxLQUFLO3NCQUdMLEtBQUssU0FBQyxPQUFPOzJCQUdiLEtBQUs7d0JBR0wsS0FBSyxTQUFDLFlBQVk7Z0NBR2xCLEtBQUs7NEJBR0wsS0FBSzttQkFHTCxLQUFLO2tDQW1CTCxLQUFLOzhCQUdMLEtBQUs7MkJBR0wsS0FBSzt5QkFNTCxLQUFLO3lCQU1MLE1BQU07dUJBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBQQUdJTkFUSU9OX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBhZ2luYXRpb25Db21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbUEFHSU5BVElPTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgLyoqIFNwZWNpZnkgaWYgd2Ugc2hvdWxkIHNob3cgdGhlIG5leHQgYW5kIHByZXZpb3VzIGJ1dHRvbnMgKi9cbiAgQElucHV0KCkgZGlyZWN0aW9uQnV0dG9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIExpbWl0IHRoZSBudW1iZXIgb2YgcGFnZXMgc2hvd24gYXQgYW55IGdpdmVuIHRpbWUgKi9cbiAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyID0gNTtcblxuICAvKiogU3BlY2lmeSBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZCAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBBcHBseSBjbGFzc2VzIHRvIHRoZSBib290c3RyYXAgcGFnaW5hdGlvbiBlbGVtZW50ICovXG4gIEBJbnB1dCgnY2xhc3MnKSBjbGFzc2VzOiBzdHJpbmc7XG5cbiAgLyoqIEFsbG93IGN1c3RvbSBjbGFzcyB0byBiZSBhZGRlZCB0byBwYWdlIGJ1dHRvbnMgKi9cbiAgQElucHV0KCkgcGFnZUJ0bkNsYXNzOiBzdHJpbmc7XG5cbiAgLyoqIEFyaWEgTGFiZWwgZm9yIHRoZSBjb21wb25lbnQgbmF2aWdhdGlvbiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICdQYWdpbmF0aW9uIE5hdmlnYXRpb24nO1xuXG4gIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgYnV0dG9uICovXG4gIEBJbnB1dCgpIHByZXZpb3VzQXJpYUxhYmVsOiBzdHJpbmcgPSAnTmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHBhZ2UnO1xuXG4gIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgbmV4dCBidXR0b24gKi9cbiAgQElucHV0KCkgbmV4dEFyaWFMYWJlbDogc3RyaW5nID0gJ05hdmlnYXRlIHRvIHRoZSBuZXh0IHBhZ2UnO1xuXG4gIC8qKiBTcGVjaWZ5IHRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHBhZ2UgKi9cbiAgQElucHV0KCkgc2V0IHBhZ2UocGFnZTogbnVtYmVyKSB7XG5cbiAgICAvLyBkbyBub3RoaW5nIGlmIHRoZSBwYWdlIGhhcyBub3QgY2hhbmdlZFxuICAgIGlmIChwYWdlID09PSB0aGlzLl9wYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGFnZSA9IHBhZ2U7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXMoKTtcblxuICAgIC8vIG1hcmsgdGhpcyBjb21wb25lbnQgYXMgY2hhbmdlZFxuICAgIHRoaXMub25DaGFuZ2UodGhpcy5wYWdlKTtcbiAgfVxuXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gIH1cblxuICAvKiogRGVmaW5lIGEgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgcHJldmlvdXMgYnV0dG9uICovXG4gIEBJbnB1dCgpIHByZXZpb3VzQnRuVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIERlZmluZSBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIG5leHQgYnV0dG9uICovXG4gIEBJbnB1dCgpIG5leHRCdG5UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKiogU3BlY2lmeSB0aGUgcGFnZSBzaXplICovXG4gIEBJbnB1dCgpIHNldCBpdGVtc1BlclBhZ2UocGFnZXNpemU6IG51bWJlcikge1xuICAgIHRoaXMuX3BhZ2VzaXplID0gcGFnZXNpemU7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXMoKTtcbiAgfVxuXG4gIC8qKiBTcGVjaWZ5IGhvdyBtYW55IGl0ZW1zIHRoZXJlIGFyZSBpbiB0b3RhbCAqL1xuICBASW5wdXQoKSBzZXQgdG90YWxJdGVtcyh0b3RhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWwgPSB0b3RhbDtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcygpO1xuICB9XG5cbiAgLyoqIEVtaXQgdGhlIGN1cnJlbnQgcGFnZSBudW1iZXIgKi9cbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogRW1pdCB0aGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzICovXG4gIEBPdXRwdXQoKSBudW1QYWdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBTdG9yZSBhIGxpc3Qgb2YgcGFnZXMgdG8gZGlzcGxheSBpbiB0aGUgVUkgKi9cbiAgcGFnZXM6IFJlYWRvbmx5QXJyYXk8UGFnZT4gPSBbXTtcblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgZnVuY3Rpb25zICovXG4gIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgaXNLZXlib2FyZEV2ZW50OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcGFnZTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfdG90YWw6IG51bWJlciA9IDEwMDtcbiAgcHJpdmF0ZSBfcGFnZXNpemU6IG51bWJlciA9IDEwO1xuXG4gIGdldCBwYWdlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuX3RvdGFsIC8gdGhpcy5fcGFnZXNpemUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXMoKTtcbiAgfVxuXG4gIHNlbGVjdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAvLyBmaW5kIHRoZSBwYWdlIHdlIHdhbnQgdG8gZ28gdG9cbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnBhZ2VzLmZpbmQocGFnZSA9PiBwYWdlLmluZGV4ID09PSBpbmRleCk7XG5cbiAgICAvLyBpZiB0aGUgcGFnZSBpcyBvdXQgb2YgYm91bmRzIHRoZW4gZG8gbm90aGluZ1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbWFyayB0aGlzIGNvbXBvbmVudCBhcyB0b3VjaGVkXG4gICAgdGhpcy5vblRvdWNoZWQoKTtcblxuICAgIC8vIHNldCB0aGlzIGFzIHRoZSBjdXJyZW50IHBhZ2VcbiAgICB0aGlzLnBhZ2UgPSB0YXJnZXQuaW5kZXg7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHZpc2libGUgcGFnZXNcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcygpO1xuXG4gICAgLy8gZW1pdCB0aGUgY3VycmVudCBwYWdlXG4gICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcbiAgfVxuXG4gIHRyYWNrQnlGbihfaW5kZXg6IG51bWJlciwgaXRlbTogUGFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGl0ZW0uaW5kZXg7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYWdlcygpOiBQYWdlW10ge1xuXG4gICAgLy8gY3JlYXRlIGEgbmV3IGFycmF5IHRvIHN0b3JlIHRoZSBwYWdlc1xuICAgIGNvbnN0IHBhZ2VzOiBQYWdlW10gPSBbXTtcblxuICAgIC8vIGNyZWF0ZSBhbGwgcG9zc2libGUgcGFnZXNcbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDw9IHRoaXMucGFnZUNvdW50OyBpbmRleCsrKSB7XG4gICAgICBwYWdlcy5wdXNoKHsgaW5kZXgsIHZpc2libGU6IHRoaXMuaXNQYWdlVmlzaWJsZShpbmRleCkgfSk7XG4gICAgfVxuXG4gICAgLy8gZW1pdCB0aGUgbnVtYmVyIG9mIHBhZ2VzXG4gICAgdGhpcy5udW1QYWdlcy5lbWl0KHRoaXMucGFnZUNvdW50KTtcblxuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIHByaXZhdGUgaXNQYWdlVmlzaWJsZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG5cbiAgICAvLyBpZiB3ZSBkbyBub3QgaGF2ZSBhIG1heCBzaXplIHNwZWNpZmllZCBvciB0aGUgbnVtYmVyIG9mIHBhZ2VzIGlzIGxlc3MgdGhhbiB0aGUgbWF4IHNpemUgdGhlbiBpdCBpcyBhbHdheXMgdmlzaWJsZVxuICAgIGlmICghdGhpcy5tYXhTaXplIHx8IHRoaXMucGFnZUNvdW50IDw9IHRoaXMubWF4U2l6ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gZmluZCB0aGUgc3RhcnRpbmcgcG9zaXRpb25cbiAgICBsZXQgc3RhcnQgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwodGhpcy5wYWdlIC0gKHRoaXMubWF4U2l6ZSAvIDIpKSk7XG4gICAgY29uc3QgZW5kID0gTWF0aC5taW4oc3RhcnQgKyB0aGlzLm1heFNpemUsIHRoaXMucGFnZUNvdW50ICsgMSk7XG5cbiAgICAvLyBpZiB0aGUgcmFuZ2UgaXMgbGVzcyB0aGFuIHRoZSBtYXggc2l6ZSB3ZSBuZWVkIHRvIGFkanVzdCB0aGUgc3RhcnRpbmcgcG9pbnRcbiAgICBjb25zdCByYW5nZSA9IGVuZCAtIHN0YXJ0O1xuXG4gICAgaWYgKHJhbmdlIDwgdGhpcy5tYXhTaXplKSB7XG4gICAgICBzdGFydCA9IHN0YXJ0IC0gKHRoaXMubWF4U2l6ZSAtIHJhbmdlKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgaXRlbSBlcXVhbHMgdGhlIHN0YXJ0IHBvc2l0aW9uIG9yIGlzIGxlc3MgdGhhbiB0aGUgZW5kIHBvc2l0aW9uIHRoZW4gc2hvdyBpdFxuICAgIHJldHVybiBpbmRleCA+PSBzdGFydCAmJiBpbmRleCA8IGVuZDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2Uge1xuICBpbmRleDogbnVtYmVyO1xuICB2aXNpYmxlOiBib29sZWFuO1xufVxuIl19