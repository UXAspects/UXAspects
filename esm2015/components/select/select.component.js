/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, delay, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
let /** @type {?} */ uniqueId = 0;
export const /** @type {?} */ SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};
export class SelectComponent {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    constructor(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = `ux-select-${++uniqueId}`;
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.dropdownOpenChange = new EventEmitter();
        this.propagateChange = (_) => { };
        this._value$ = new BehaviorSubject(null);
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._onDestroy = new Subject();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value$.next(value);
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set input(value) {
        this._input$.next(value);
    }
    /**
     * @return {?}
     */
    get input() {
        return this._input$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dropdownOpen(value) {
        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);
    }
    /**
     * @return {?}
     */
    get dropdownOpen() {
        return this._dropdownOpen;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Emit change events
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.valueChange.emit(value);
            this.propagateChange(value);
        });
        this._input$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.inputChange.emit(value);
        });
        // Changes to the input field
        this._input$.pipe(takeUntil(this._onDestroy), filter(value => this.allowNull), filter(value => !this.multiple && value !== this.getDisplay(this.value))).subscribe(value => this.value = null);
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(input => !this.multiple && input === this.getDisplay(this.value) ? '' : input), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        this.filter$.pipe(takeUntil(this._onDestroy), filter(value => value && value.length > 0)).subscribe(() => this.dropdownOpen = true);
        // Update the single-select input when the model changes
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(), delay(0), filter(value => value !== null && !this.multiple)).subscribe(value => {
            this.input = this.getDisplay(value);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["multiple"] && !changes["multiple"].firstChange && changes["multiple"].currentValue !== changes["multiple"].previousValue) {
            this.input = '';
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj !== undefined && obj !== this.value) {
            this.value = obj;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputClickHandler(event) {
        this.selectInputText();
        this.dropdownOpen = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputBlurHandler(event) {
        // If a click on the typeahead is in progress, just refocus the input.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.singleTypeahead && this.singleTypeahead.clicking) {
            this.singleInput.nativeElement.focus();
            return;
        }
        // Close dropdown and reset text input if focus is lost
        setTimeout(() => {
            if (!this._element.nativeElement.contains(this._document.activeElement)) {
                this.dropdownOpen = false;
                if (!this.multiple) {
                    this.input = this.getDisplay(this.value);
                }
            }
        }, 200);
    }
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    inputKeyHandler(event) {
        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);
        switch (event.key) {
            case 'Enter':
                if (this._dropdownOpen) {
                    // Set the highlighted option as the value and close
                    this.value = this.singleTypeahead.highlighted;
                    this.dropdownOpen = false;
                }
                // Update the input field. If dropdown isn't open then reset it to the previous value.
                this.input = this.getDisplay(this.value);
                event.preventDefault();
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    singleOptionSelected(event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    getDisplay(option) {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    }
    /**
     * @return {?}
     */
    selectInputText() {
        this.singleInput.nativeElement.select();
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-select',
                template: "<ux-tag-input *ngIf=\"multiple\"\r\n    [id]=\"id + '-input'\"\r\n    [(tags)]=\"value\"\r\n    [(input)]=\"input\"\r\n    [addOnPaste]=\"false\"\r\n    [disabled]=\"disabled\"\r\n    [display]=\"display\"\r\n    [freeInput]=\"false\"\r\n    [placeholder]=\"placeholder\"\r\n    [showTypeaheadOnClick]=\"true\">\r\n\r\n    <ux-typeahead #multipleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [disabledOptions]=\"value\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"true\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\">\r\n    </ux-typeahead>\r\n\r\n</ux-tag-input>\r\n\r\n<div *ngIf=\"!multiple\"\r\n    class=\"inner-addon right-addon\"\r\n    [class.disabled]=\"disabled\"\r\n    role=\"combobox\"\r\n    [attr.aria-expanded]=\"dropdownOpen\"\r\n    aria-haspopup=\"listbox\">\r\n\r\n    <i class=\"hpe-icon\"\r\n        [class.hpe-down]=\"dropDirection === 'down'\"\r\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\r\n\r\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\r\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\r\n        aria-autocomplete=\"list\"\r\n        [attr.aria-controls]=\"singleTypeahead.id\"\r\n        aria-multiline=\"false\"\r\n        [(ngModel)]=\"input\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        (click)=\"inputClickHandler($event)\"\r\n        (blur)=\"inputBlurHandler($event)\"\r\n        (keydown)=\"inputKeyHandler($event)\">\r\n\r\n    <ux-typeahead #singleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"false\"\r\n        [openOnFilterChange]=\"false\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\"\r\n        (optionSelected)=\"singleOptionSelected($event)\"\r\n        (highlightedElementChange)=\"highlightedElement = $event\">\r\n    </ux-typeahead>\r\n\r\n</div>\r\n",
                providers: [SELECT_VALUE_ACCESSOR]
            }] }
];
/** @nocollapse */
SelectComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: TypeaheadKeyService }
];
SelectComponent.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
    value: [{ type: Input }],
    input: [{ type: Input }],
    dropdownOpen: [{ type: Input }],
    options: [{ type: Input }],
    display: [{ type: Input }],
    key: [{ type: Input }],
    allowNull: [{ type: Input }],
    disabled: [{ type: Input }],
    dropDirection: [{ type: Input }],
    maxHeight: [{ type: Input }],
    multiple: [{ type: Input }],
    pageSize: [{ type: Input }],
    placeholder: [{ type: Input }],
    loadingTemplate: [{ type: Input }],
    noOptionsTemplate: [{ type: Input }],
    optionTemplate: [{ type: Input }],
    valueChange: [{ type: Output }],
    inputChange: [{ type: Output }],
    dropdownOpenChange: [{ type: Output }],
    singleInput: [{ type: ViewChild, args: ['singleInput',] }],
    multipleTypeahead: [{ type: ViewChild, args: ['multipleTypeahead',] }],
    singleTypeahead: [{ type: ViewChild, args: ['singleTypeahead',] }]
};
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectComponent.prototype.id;
    /** @type {?} */
    SelectComponent.prototype.options;
    /** @type {?} */
    SelectComponent.prototype.display;
    /** @type {?} */
    SelectComponent.prototype.key;
    /** @type {?} */
    SelectComponent.prototype.allowNull;
    /** @type {?} */
    SelectComponent.prototype.disabled;
    /** @type {?} */
    SelectComponent.prototype.dropDirection;
    /** @type {?} */
    SelectComponent.prototype.maxHeight;
    /** @type {?} */
    SelectComponent.prototype.multiple;
    /** @type {?} */
    SelectComponent.prototype.pageSize;
    /** @type {?} */
    SelectComponent.prototype.placeholder;
    /** @type {?} */
    SelectComponent.prototype.loadingTemplate;
    /** @type {?} */
    SelectComponent.prototype.noOptionsTemplate;
    /** @type {?} */
    SelectComponent.prototype.optionTemplate;
    /** @type {?} */
    SelectComponent.prototype.valueChange;
    /** @type {?} */
    SelectComponent.prototype.inputChange;
    /** @type {?} */
    SelectComponent.prototype.dropdownOpenChange;
    /** @type {?} */
    SelectComponent.prototype.singleInput;
    /** @type {?} */
    SelectComponent.prototype.multipleTypeahead;
    /** @type {?} */
    SelectComponent.prototype.singleTypeahead;
    /** @type {?} */
    SelectComponent.prototype.highlightedElement;
    /** @type {?} */
    SelectComponent.prototype.filter$;
    /** @type {?} */
    SelectComponent.prototype.propagateChange;
    /** @type {?} */
    SelectComponent.prototype._value$;
    /** @type {?} */
    SelectComponent.prototype._input$;
    /** @type {?} */
    SelectComponent.prototype._dropdownOpen;
    /** @type {?} */
    SelectComponent.prototype._onDestroy;
    /** @type {?} */
    SelectComponent.prototype._element;
    /** @type {?} */
    SelectComponent.prototype._document;
    /** @type {?} */
    SelectComponent.prototype._typeaheadKeyService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFpQyxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pNLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRyxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLE1BQU0sQ0FBQyx1QkFBTSxxQkFBcUIsR0FBbUI7SUFDakQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFPRixNQUFNOzs7Ozs7SUE2REYsWUFDWSxVQUNrQixTQUFjLEVBQ2hDO1FBRkEsYUFBUSxHQUFSLFFBQVE7UUFDVSxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ2hDLHlCQUFvQixHQUFwQixvQkFBb0I7a0JBOURjLGFBQWEsRUFBRSxRQUFRLEVBQUU7eUJBOEJ6QyxLQUFLO3dCQUNOLEtBQUs7NkJBQ00sTUFBTTt5QkFDakIsT0FBTzt3QkFDUCxLQUFLO3dCQUNOLEVBQUU7MkJBT04sSUFBSSxZQUFZLEVBQU87MkJBQ3ZCLElBQUksWUFBWSxFQUFVO2tDQUNuQixJQUFJLFlBQVksRUFBVzsrQkFReEMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxJQUFJO3VCQUVmLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQzt1QkFDOUIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDOzZCQUNoQixLQUFLOzBCQUNqQixJQUFJLE9BQU8sRUFBUTtLQUtrQjs7Ozs7SUE1RDFELElBQ0ksS0FBSyxDQUFDLEtBQVU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7SUFDRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDN0I7Ozs7O0lBRUQsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7OztJQUNELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUM3Qjs7Ozs7SUFFRCxJQUNJLFlBQVksQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkM7Ozs7SUFDRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUM3Qjs7OztJQXVDRCxRQUFROztRQUdKLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7O1FBR0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzNFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQzs7UUFHeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDNUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDbEYsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUNwQixDQUFDOztRQUdGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUM3QyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDOztRQUc1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDYixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUMxQixvQkFBb0IsRUFBRSxFQUN0QixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDcEQsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztLQUNOOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLGdCQUFhLENBQUMsT0FBTyxhQUFVLFdBQVcsSUFBSSxPQUFPLGFBQVUsWUFBWSxLQUFLLE9BQU8sYUFBVSxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25CO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDcEI7S0FDSjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU8sS0FBVzs7Ozs7SUFFcEMsZ0JBQWdCLENBQUMsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsS0FBaUI7UUFDL0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0tBQzVCOzs7OztJQUVELGdCQUFnQixDQUFDLEtBQVk7OztRQUl6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QyxNQUFNLENBQUM7U0FDVjs7UUFHRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QzthQUNKO1NBQ0osRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNYOzs7Ozs7SUFLRCxlQUFlLENBQUMsS0FBb0I7O1FBR2hDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVqRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLE9BQU87Z0JBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7O29CQUVyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO29CQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztpQkFDN0I7O2dCQUdELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1NBQ2I7S0FDSjs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxLQUEyQjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QjtLQUNKOzs7Ozs7SUFLRCxVQUFVLENBQUMsTUFBVztRQUNsQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDYjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsTUFBTSxDQUFDLE1BQU0sbUJBQVMsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDO1NBQ3ZDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUNqQjs7OztJQUVPLGVBQWU7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7WUFwTi9DLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsb3BGQUFvQztnQkFDcEMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7YUFDckM7Ozs7WUFyQm1CLFVBQVU7NENBcUZyQixNQUFNLFNBQUMsUUFBUTtZQTlFSyxtQkFBbUI7OztpQkFpQjNDLEtBQUssWUFBSSxXQUFXLFNBQUMsU0FBUztvQkFFOUIsS0FBSztvQkFRTCxLQUFLOzJCQVFMLEtBQUs7c0JBU0wsS0FBSztzQkFDTCxLQUFLO2tCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFFTCxLQUFLO2dDQUNMLEtBQUs7NkJBQ0wsS0FBSzswQkFFTCxNQUFNOzBCQUNOLE1BQU07aUNBQ04sTUFBTTswQkFFTixTQUFTLFNBQUMsYUFBYTtnQ0FDdkIsU0FBUyxTQUFDLG1CQUFtQjs4QkFDN0IsU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFN0YXRpY1Byb3ZpZGVyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkZWxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkQ29tcG9uZW50LCBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uL3R5cGVhaGVhZC9pbmRleCc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogU3RhdGljUHJvdmlkZXIgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC1zZWxlY3QtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUkLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBpbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXQkLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGlucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dCQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBkcm9wZG93bk9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9kcm9wZG93bk9wZW4gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbkNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBkcm9wZG93bk9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duT3BlbjtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBrZXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgYWxsb3dOdWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlSW5wdXQnKSBzaW5nbGVJbnB1dDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ211bHRpcGxlVHlwZWFoZWFkJykgbXVsdGlwbGVUeXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoJ3NpbmdsZVR5cGVhaGVhZCcpIHNpbmdsZVR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG5cclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBmaWx0ZXIkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xyXG4gICAgcHJpdmF0ZSBfaW5wdXQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuICAgIHByaXZhdGUgX2Ryb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBfdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgICAgIC8vIEVtaXQgY2hhbmdlIGV2ZW50c1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lucHV0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDaGFuZ2VzIHRvIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAgICAgIHRoaXMuX2lucHV0JC5waXBlKFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHRoaXMuYWxsb3dOdWxsKSxcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+ICF0aGlzLm11bHRpcGxlICYmIHZhbHVlICE9PSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSkpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy52YWx1ZSA9IG51bGwpO1xyXG5cclxuICAgICAgICAvLyBTZXQgdXAgZmlsdGVyIGZyb20gaW5wdXRcclxuICAgICAgICB0aGlzLmZpbHRlciQgPSB0aGlzLl9pbnB1dCQucGlwZShcclxuICAgICAgICAgICAgbWFwKGlucHV0ID0+ICF0aGlzLm11bHRpcGxlICYmIGlucHV0ID09PSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSkgPyAnJyA6IGlucHV0KSxcclxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDIwMClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBPcGVuIHRoZSBkcm9wZG93biB3aGVuIGZpbHRlciBpcyBub25lbXB0eS5cclxuICAgICAgICB0aGlzLmZpbHRlciQucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXHJcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2luZ2xlLXNlbGVjdCBpbnB1dCB3aGVuIHRoZSBtb2RlbCBjaGFuZ2VzXHJcbiAgICAgICAgdGhpcy5fdmFsdWUkLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxyXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICBkZWxheSgwKSxcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9PSBudWxsICYmICF0aGlzLm11bHRpcGxlKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLm11bHRpcGxlICYmICFjaGFuZ2VzLm11bHRpcGxlLmZpcnN0Q2hhbmdlICYmIGNoYW5nZXMubXVsdGlwbGUuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLm11bHRpcGxlLnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSB0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRDbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdElucHV0VGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEJsdXJIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xyXG5cclxuICAgICAgICAvLyBJZiBhIGNsaWNrIG9uIHRoZSB0eXBlYWhlYWQgaXMgaW4gcHJvZ3Jlc3MsIGp1c3QgcmVmb2N1cyB0aGUgaW5wdXQuXHJcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYW4gaXNzdWUgaW4gSUUgd2hlcmUgY2xpY2tpbmcgYSBzY3JvbGxiYXIgZHJvcHMgZm9jdXMuXHJcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlVHlwZWFoZWFkICYmIHRoaXMuc2luZ2xlVHlwZWFoZWFkLmNsaWNraW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG9zZSBkcm9wZG93biBhbmQgcmVzZXQgdGV4dCBpbnB1dCBpZiBmb2N1cyBpcyBsb3N0XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXkgaGFuZGxlciBmb3Igc2luZ2xlIHNlbGVjdCBvbmx5LiBNdWx0aXBsZSBzZWxlY3Qga2V5IGhhbmRsaW5nIGlzIGluIFRhZ0lucHV0Q29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBpbnB1dEtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gU3RhbmRhcmQga2V5cyBmb3IgdHlwZWFoZWFkICh1cC9kb3duL2VzYylcclxuICAgICAgICB0aGlzLl90eXBlYWhlYWRLZXlTZXJ2aWNlLmhhbmRsZUtleShldmVudCwgdGhpcy5zaW5nbGVUeXBlYWhlYWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZHJvcGRvd25PcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gYXMgdGhlIHZhbHVlIGFuZCBjbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnNpbmdsZVR5cGVhaGVhZC5oaWdobGlnaHRlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5wdXQgZmllbGQuIElmIGRyb3Bkb3duIGlzbid0IG9wZW4gdGhlbiByZXNldCBpdCB0byB0aGUgcHJldmlvdXMgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5nZXREaXNwbGF5KHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaW5nbGVPcHRpb25TZWxlY3RlZChldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQub3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBldmVudC5vcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAob3B0aW9uID09PSBudWxsIHx8IG9wdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RJbnB1dFRleHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xyXG4gICAgfVxyXG59Il19