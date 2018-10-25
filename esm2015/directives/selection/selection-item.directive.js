/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from './selection.service';
export class SelectionItemDirective {
    /**
     * @param {?} _selectionService
     * @param {?} _elementRef
     */
    constructor(_selectionService, _elementRef) {
        this._selectionService = _selectionService;
        this._elementRef = _elementRef;
        this.tabindex = null;
        this.selectedChange = new EventEmitter();
        this.active = false;
        this._selected = false;
        this._managedTabIndex = -1;
        this._onDestroy = new Subject();
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        selected ? this.select() : this.deselect();
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    get attrTabIndex() {
        return (this.tabindex !== null) ? this.tabindex : this._managedTabIndex;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // if there is no associated data then throw an error
        if (!this.uxSelectionItem) {
            throw new Error('The uxSelectionItem directive must have data associated with it.');
        }
        // subscribe to selection changes on this item
        this._selectionService.getSelectionState(this.uxSelectionItem).pipe(takeUntil(this._onDestroy)).subscribe(selected => {
            // store the selected state
            this._selected = selected;
            // emit the selected state
            this.selectedChange.emit(selected);
        });
        this._selected = this._selectionService.isSelected(this.uxSelectionItem);
        this.selectedChange.emit(this._selected);
        // subscribe to changes to the active state
        this._selectionService.active$.pipe(takeUntil(this._onDestroy), map(active => active === this.uxSelectionItem)).subscribe(active => {
            // store the focus state
            this.active = active;
            // if it is active then focus the element
            if (active === true) {
                this._selectionService.focus$.next(this.uxSelectionItem);
                this._elementRef.nativeElement.focus();
            }
        });
        // Subscribe to changes to the focus target
        // This is mostly the same as active$, except that it has an initial value of the first item in the collection.
        this._selectionService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(focusTarget => {
            this._managedTabIndex = (focusTarget === this.uxSelectionItem) ? 0 : -1;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    click(event) {
        if (this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
            this._selectionService.strategy.click(event, this.uxSelectionItem);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        if (this._selectionService.isEnabled && this._selectionService.isClickEnabled) {
            this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        if (this._selectionService.isEnabled && this._selectionService.isKeyboardEnabled) {
            this._selectionService.strategy.keydown(event, this.uxSelectionItem);
        }
    }
    /**
     * @return {?}
     */
    focus() {
        // If tabbed to from outside the component, activate.
        if (this._selectionService.active$.getValue() !== this.uxSelectionItem) {
            this._selectionService.activate(this.uxSelectionItem);
        }
    }
    /**
     * Select this item using the current strategy
     * @return {?}
     */
    select() {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.select(this.uxSelectionItem);
        }
    }
    /**
     * Deselect this item using the current strategy
     * @return {?}
     */
    deselect() {
        if (this._selectionService.isEnabled) {
            this._selectionService.strategy.deselect(this.uxSelectionItem);
        }
    }
}
SelectionItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSelectionItem]',
                exportAs: 'ux-selection-item'
            },] }
];
/** @nocollapse */
SelectionItemDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTXZELE1BQU07Ozs7O0lBOEJGLFlBQW9CLGlCQUFtQyxFQUFVLFdBQXVCO1FBQXBFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt3QkFmNUQsSUFBSTs4QkFFTCxJQUFJLFlBQVksRUFBVztzQkFFTyxLQUFLO3lCQU9yQyxLQUFLO2dDQUNDLENBQUMsQ0FBQzswQkFDaEIsSUFBSSxPQUFPLEVBQVE7S0FFcUQ7Ozs7O0lBMUI3RixJQUdJLFFBQVEsQ0FBQyxRQUFpQjtRQUMxQixRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7Ozs7SUFRRCxJQUNJLFlBQVk7UUFDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENB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QWU7b0JBeUQzQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQU9oQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQU9wQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQU9sQyxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhTZWxlY3Rpb25JdGVtXScsXHJcbiAgICBleHBvcnRBczogJ3V4LXNlbGVjdGlvbi1pdGVtJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uSXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSB1eFNlbGVjdGlvbkl0ZW06IGFueTtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1zZWxlY3Rpb24tc2VsZWN0ZWQnKVxyXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxyXG4gICAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdCgpIDogdGhpcy5kZXNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IG51bGw7XHJcblxyXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudXgtc2VsZWN0aW9uLWZvY3VzZWQnKSBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKVxyXG4gICAgZ2V0IGF0dHJUYWJJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy50YWJpbmRleCAhPT0gbnVsbCkgPyB0aGlzLnRhYmluZGV4IDogdGhpcy5fbWFuYWdlZFRhYkluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9tYW5hZ2VkVGFiSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gYXNzb2NpYXRlZCBkYXRhIHRoZW4gdGhyb3cgYW4gZXJyb3JcclxuICAgICAgICBpZiAoIXRoaXMudXhTZWxlY3Rpb25JdGVtKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHV4U2VsZWN0aW9uSXRlbSBkaXJlY3RpdmUgbXVzdCBoYXZlIGRhdGEgYXNzb2NpYXRlZCB3aXRoIGl0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIHNlbGVjdGlvbiBjaGFuZ2VzIG9uIHRoaXMgaXRlbVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZ2V0U2VsZWN0aW9uU3RhdGUodGhpcy51eFNlbGVjdGlvbkl0ZW0pLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShzZWxlY3RlZCA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc2VsZWN0ZWQgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuXHJcbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIHNlbGVjdGVkIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc1NlbGVjdGVkKHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuX3NlbGVjdGVkKTtcclxuXHJcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgdG8gdGhlIGFjdGl2ZSBzdGF0ZVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoYWN0aXZlID0+IGFjdGl2ZSA9PT0gdGhpcy51eFNlbGVjdGlvbkl0ZW0pKS5zdWJzY3JpYmUoYWN0aXZlID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmb2N1cyBzdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjdGl2ZSB0aGVuIGZvY3VzIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXMkLm5leHQodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgdG8gdGhlIGZvY3VzIHRhcmdldFxyXG4gICAgICAgIC8vIFRoaXMgaXMgbW9zdGx5IHRoZSBzYW1lIGFzIGFjdGl2ZSQsIGV4Y2VwdCB0aGF0IGl0IGhhcyBhbiBpbml0aWFsIHZhbHVlIG9mIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuZm9jdXMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmb2N1c1RhcmdldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZWRUYWJJbmRleCA9IChmb2N1c1RhcmdldCA9PT0gdGhpcy51eFNlbGVjdGlvbkl0ZW0pID8gMCA6IC0xO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0NsaWNrRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmNsaWNrKGV2ZW50LCB0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgICBtb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0NsaWNrRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5Lm1vdXNlZG93bihldmVudCwgdGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICAgIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQgJiYgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0tleWJvYXJkRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmtleWRvd24oZXZlbnQsIHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gICAgZm9jdXMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gSWYgdGFiYmVkIHRvIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50LCBhY3RpdmF0ZS5cclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5hY3RpdmUkLmdldFZhbHVlKCkgIT09IHRoaXMudXhTZWxlY3Rpb25JdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGlzIGl0ZW0gdXNpbmcgdGhlIGN1cnJlbnQgc3RyYXRlZ3lcclxuICAgICAqL1xyXG4gICAgc2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LnNlbGVjdCh0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzZWxlY3QgdGhpcyBpdGVtIHVzaW5nIHRoZSBjdXJyZW50IHN0cmF0ZWd5XHJcbiAgICAgKi9cclxuICAgIGRlc2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLnN0cmF0ZWd5LmRlc2VsZWN0KHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19