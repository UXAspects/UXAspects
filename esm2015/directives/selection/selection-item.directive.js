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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBTXZELE1BQU07Ozs7O0lBOEJGLFlBQW9CLGlCQUFzQyxFQUFVLFdBQXVCO1FBQXZFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBcUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt3QkFmL0QsSUFBSTs4QkFFTCxJQUFJLFlBQVksRUFBVztzQkFFTyxLQUFLO3lCQU9yQyxLQUFLO2dDQUNDLENBQUMsQ0FBQzswQkFDaEIsSUFBSSxPQUFPLEVBQVE7S0FFd0Q7Ozs7O0lBMUJoRyxJQUdJLFFBQVEsQ0FBQyxRQUFpQjtRQUMxQixRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7Ozs7SUFRRCxJQUNJLFlBQVk7UUFDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJ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LGVBQWU7b0JBeUQzQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQU9oQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQU9wQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQU9sQyxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhTZWxlY3Rpb25JdGVtXScsXHJcbiAgICBleHBvcnRBczogJ3V4LXNlbGVjdGlvbi1pdGVtJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uSXRlbURpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSB1eFNlbGVjdGlvbkl0ZW06IFQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudXgtc2VsZWN0aW9uLXNlbGVjdGVkJylcclxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXNlbGVjdGVkJylcclxuICAgIHNldCBzZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHNlbGVjdGVkID8gdGhpcy5zZWxlY3QoKSA6IHRoaXMuZGVzZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnV4LXNlbGVjdGlvbi1mb2N1c2VkJykgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JylcclxuICAgIGdldCBhdHRyVGFiSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMudGFiaW5kZXggIT09IG51bGwpID8gdGhpcy50YWJpbmRleCA6IHRoaXMuX21hbmFnZWRUYWJJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfbWFuYWdlZFRhYkluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZTxUPiwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFzc29jaWF0ZWQgZGF0YSB0aGVuIHRocm93IGFuIGVycm9yXHJcbiAgICAgICAgaWYgKCF0aGlzLnV4U2VsZWN0aW9uSXRlbSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB1eFNlbGVjdGlvbkl0ZW0gZGlyZWN0aXZlIG11c3QgaGF2ZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCBpdC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBzZWxlY3Rpb24gY2hhbmdlcyBvbiB0aGlzIGl0ZW1cclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmdldFNlbGVjdGlvblN0YXRlKHRoaXMudXhTZWxlY3Rpb25JdGVtKS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoc2VsZWN0ZWQgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHNlbGVjdGVkIHN0YXRlXHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBzZWxlY3RlZCBzdGF0ZVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNTZWxlY3RlZCh0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLl9zZWxlY3RlZCk7XHJcblxyXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBhY3RpdmUgc3RhdGVcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2ZSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKGFjdGl2ZSA9PiBhY3RpdmUgPT09IHRoaXMudXhTZWxlY3Rpb25JdGVtKSkuc3Vic2NyaWJlKGFjdGl2ZSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgZm9jdXMgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhY3RpdmUgdGhlbiBmb2N1cyB0aGUgZWxlbWVudFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzJC5uZXh0KHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBmb2N1cyB0YXJnZXRcclxuICAgICAgICAvLyBUaGlzIGlzIG1vc3RseSB0aGUgc2FtZSBhcyBhY3RpdmUkLCBleGNlcHQgdGhhdCBpdCBoYXMgYW4gaW5pdGlhbCB2YWx1ZSBvZiB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgY29sbGVjdGlvbi5cclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmZvY3VzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZm9jdXNUYXJnZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VkVGFiSW5kZXggPSAoZm9jdXNUYXJnZXQgPT09IHRoaXMudXhTZWxlY3Rpb25JdGVtKSA/IDAgOiAtMTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNDbGlja0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5jbGljayhldmVudCwgdGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxyXG4gICAgbW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNDbGlja0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5tb3VzZWRvd24oZXZlbnQsIHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNFbmFibGVkICYmIHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuaXNLZXlib2FyZEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5rZXlkb3duKGV2ZW50LCB0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcclxuICAgIGZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIElmIHRhYmJlZCB0byBmcm9tIG91dHNpZGUgdGhlIGNvbXBvbmVudCwgYWN0aXZhdGUuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvblNlcnZpY2UuYWN0aXZlJC5nZXRWYWx1ZSgpICE9PSB0aGlzLnV4U2VsZWN0aW9uSXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlKHRoaXMudXhTZWxlY3Rpb25JdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhpcyBpdGVtIHVzaW5nIHRoZSBjdXJyZW50IHN0cmF0ZWd5XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5zZWxlY3QodGhpcy51eFNlbGVjdGlvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlc2VsZWN0IHRoaXMgaXRlbSB1c2luZyB0aGUgY3VycmVudCBzdHJhdGVneVxyXG4gICAgICovXHJcbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0aW9uU2VydmljZS5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS5kZXNlbGVjdCh0aGlzLnV4U2VsZWN0aW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==