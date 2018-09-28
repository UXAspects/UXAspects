/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, delay, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TagInputComponent } from '../tag-input/index';
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
     * @return {?}
     */
    onfocus() {
        if (this.singleInput) {
            this.singleInput.nativeElement.focus();
        }
        else if (this.tagInput) {
            this.tagInput.focus();
        }
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
                template: "<ux-tag-input *ngIf=\"multiple\"\r\n    #tagInput=\"ux-tag-input\"\r\n    [id]=\"id + '-input'\"\r\n    [(tags)]=\"value\"\r\n    [(input)]=\"input\"\r\n    [addOnPaste]=\"false\"\r\n    [disabled]=\"disabled\"\r\n    [display]=\"display\"\r\n    [freeInput]=\"false\"\r\n    [placeholder]=\"placeholder\"\r\n    [showTypeaheadOnClick]=\"true\">\r\n\r\n    <ux-typeahead #multipleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [disabledOptions]=\"value\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"true\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\">\r\n    </ux-typeahead>\r\n\r\n</ux-tag-input>\r\n\r\n<div *ngIf=\"!multiple\"\r\n    class=\"inner-addon right-addon\"\r\n    [class.disabled]=\"disabled\"\r\n    role=\"combobox\"\r\n    [attr.aria-expanded]=\"dropdownOpen\"\r\n    aria-haspopup=\"listbox\">\r\n\r\n    <i class=\"hpe-icon\"\r\n        [class.hpe-down]=\"dropDirection === 'down'\"\r\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\r\n\r\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\r\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\r\n        aria-autocomplete=\"list\"\r\n        [attr.aria-controls]=\"singleTypeahead.id\"\r\n        aria-multiline=\"false\"\r\n        [(ngModel)]=\"input\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        (click)=\"inputClickHandler($event)\"\r\n        (blur)=\"inputBlurHandler($event)\"\r\n        (keydown)=\"inputKeyHandler($event)\">\r\n\r\n    <ux-typeahead #singleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"false\"\r\n        [openOnFilterChange]=\"false\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\"\r\n        (optionSelected)=\"singleOptionSelected($event)\"\r\n        (highlightedElementChange)=\"highlightedElement = $event\">\r\n    </ux-typeahead>\r\n\r\n</div>\r\n",
                providers: [SELECT_VALUE_ACCESSOR],
                host: {
                    'tabindex': '0'
                }
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
    tagInput: [{ type: ViewChild, args: ['tagInput',] }],
    multipleTypeahead: [{ type: ViewChild, args: ['multipleTypeahead',] }],
    singleTypeahead: [{ type: ViewChild, args: ['singleTypeahead',] }],
    onfocus: [{ type: HostListener, args: ['focus',] }]
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
    SelectComponent.prototype.tagInput;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbkcscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQixNQUFNLENBQUMsdUJBQU0scUJBQXFCLEdBQW1CO0lBQ2pELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDOUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBVUYsTUFBTTs7Ozs7O0lBOERGLFlBQ1ksVUFDa0IsU0FBYyxFQUNoQztRQUZBLGFBQVEsR0FBUixRQUFRO1FBQ1UsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CO2tCQS9EYyxhQUFhLEVBQUUsUUFBUSxFQUFFO3lCQThCekMsS0FBSzt3QkFDTixLQUFLOzZCQUNNLE1BQU07eUJBQ2pCLE9BQU87d0JBQ1AsS0FBSzt3QkFDTixFQUFFOzJCQU9OLElBQUksWUFBWSxFQUFPOzJCQUN2QixJQUFJLFlBQVksRUFBVTtrQ0FDbkIsSUFBSSxZQUFZLEVBQVc7K0JBU3hDLENBQUMsQ0FBTSxFQUFFLEVBQUUsSUFBSTt1QkFFZixJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUM7dUJBQzlCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQzs2QkFDaEIsS0FBSzswQkFDakIsSUFBSSxPQUFPLEVBQVE7S0FLa0I7Ozs7O0lBN0QxRCxJQUNJLEtBQUssQ0FBQyxLQUFVO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7O0lBQ0QsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQzdCOzs7OztJQUVELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7Ozs7SUFDRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDN0I7Ozs7O0lBRUQsSUFDSSxZQUFZLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3ZDOzs7O0lBQ0QsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDN0I7Ozs7SUF3Q0QsUUFBUTs7UUFHSixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEMsQ0FBQyxDQUFDOztRQUdILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUMzRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7O1FBR3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ2xGLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FDcEIsQ0FBQzs7UUFHRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDYixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDN0MsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQzs7UUFHNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFDMUIsb0JBQW9CLEVBQUUsRUFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3BELENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QyxDQUFDLENBQUM7S0FDTjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxnQkFBYSxDQUFDLE9BQU8sYUFBVSxXQUFXLElBQUksT0FBTyxhQUFVLFlBQVksS0FBSyxPQUFPLGFBQVUsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4SCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtLQUNKOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUdELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMxQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0tBQ0o7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVE7UUFDZixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtLQUNKOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7S0FDN0I7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBTyxLQUFXOzs7OztJQUVwQyxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxLQUFpQjtRQUMvQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7S0FDNUI7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsS0FBWTs7O1FBSXpCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQztTQUNWOztRQUdELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVDO2FBQ0o7U0FDSixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7Ozs7OztJQUtELGVBQWUsQ0FBQyxLQUFvQjs7UUFHaEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssT0FBTztnQkFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7b0JBRXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7b0JBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2lCQUM3Qjs7Z0JBR0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUM7U0FDYjtLQUNKOzs7OztJQUVELG9CQUFvQixDQUFDLEtBQTJCO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO0tBQ0o7Ozs7OztJQUtELFVBQVUsQ0FBQyxNQUFXO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNiO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRSxNQUFNLENBQUMsTUFBTSxtQkFBUyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7U0FDdkM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOzs7O0lBRU8sZUFBZTtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7OztZQWpPL0MsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixzckZBQW9DO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsSUFBSSxFQUFFO29CQUNGLFVBQVUsRUFBRSxHQUFHO2lCQUNsQjthQUNKOzs7O1lBekJtQixVQUFVOzRDQTBGckIsTUFBTSxTQUFDLFFBQVE7WUFsRkssbUJBQW1COzs7aUJBb0IzQyxLQUFLLFlBQUksV0FBVyxTQUFDLFNBQVM7b0JBRTlCLEtBQUs7b0JBUUwsS0FBSzsyQkFRTCxLQUFLO3NCQVNMLEtBQUs7c0JBQ0wsS0FBSztrQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBRUwsS0FBSztnQ0FDTCxLQUFLOzZCQUNMLEtBQUs7MEJBRUwsTUFBTTswQkFDTixNQUFNO2lDQUNOLE1BQU07MEJBRU4sU0FBUyxTQUFDLGFBQWE7dUJBQ3ZCLFNBQVMsU0FBQyxVQUFVO2dDQUNwQixTQUFTLFNBQUMsbUJBQW1COzhCQUM3QixTQUFTLFNBQUMsaUJBQWlCO3NCQXFFM0IsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFN0YXRpY1Byb3ZpZGVyLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkZWxheSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5maW5pdGUtc2Nyb2xsL2luZGV4JztcclxuaW1wb3J0IHsgVGFnSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi90YWctaW5wdXQvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UsIFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vdHlwZWFoZWFkL2luZGV4JztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBTdGF0aWNQcm92aWRlciA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW1NFTEVDVF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC1zZWxlY3QtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUkLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBpbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXQkLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGlucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dCQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBkcm9wZG93bk9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9kcm9wZG93bk9wZW4gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbkNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBkcm9wZG93bk9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duT3BlbjtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBrZXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgYWxsb3dOdWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlSW5wdXQnKSBzaW5nbGVJbnB1dDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3RhZ0lucHV0JykgdGFnSW5wdXQ6IFRhZ0lucHV0Q29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnbXVsdGlwbGVUeXBlYWhlYWQnKSBtdWx0aXBsZVR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlVHlwZWFoZWFkJykgc2luZ2xlVHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQ7XHJcblxyXG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGZpbHRlciQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuICAgIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XHJcbiAgICBwcml2YXRlIF9pbnB1dCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG4gICAgcHJpdmF0ZSBfZHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIF90eXBlYWhlYWRLZXlTZXJ2aWNlOiBUeXBlYWhlYWRLZXlTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgLy8gRW1pdCBjaGFuZ2UgZXZlbnRzXHJcbiAgICAgICAgdGhpcy5fdmFsdWUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5wdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZXMgdG8gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgdGhpcy5faW5wdXQkLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdGhpcy5hbGxvd051bGwpLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gIXRoaXMubXVsdGlwbGUgJiYgdmFsdWUgIT09IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKSlcclxuICAgICAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnZhbHVlID0gbnVsbCk7XHJcblxyXG4gICAgICAgIC8vIFNldCB1cCBmaWx0ZXIgZnJvbSBpbnB1dFxyXG4gICAgICAgIHRoaXMuZmlsdGVyJCA9IHRoaXMuX2lucHV0JC5waXBlKFxyXG4gICAgICAgICAgICBtYXAoaW5wdXQgPT4gIXRoaXMubXVsdGlwbGUgJiYgaW5wdXQgPT09IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKSA/ICcnIDogaW5wdXQpLFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIHdoZW4gZmlsdGVyIGlzIG5vbmVtcHR5LlxyXG4gICAgICAgIHRoaXMuZmlsdGVyJC5waXBlKFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kcm9wZG93bk9wZW4gPSB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzaW5nbGUtc2VsZWN0IGlucHV0IHdoZW4gdGhlIG1vZGVsIGNoYW5nZXNcclxuICAgICAgICB0aGlzLl92YWx1ZSQucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXHJcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgIGRlbGF5KDApLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT09IG51bGwgJiYgIXRoaXMubXVsdGlwbGUpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5nZXREaXNwbGF5KHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMubXVsdGlwbGUgJiYgIWNoYW5nZXMubXVsdGlwbGUuZmlyc3RDaGFuZ2UgJiYgY2hhbmdlcy5tdWx0aXBsZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMubXVsdGlwbGUucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxyXG4gICAgb25mb2N1cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaW5nbGVJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFnSW5wdXQpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdJbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG9iaiAhPT0gdW5kZWZpbmVkICYmIG9iaiAhPT0gdGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dFRleHQoKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRCbHVySGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgYSBjbGljayBvbiB0aGUgdHlwZWFoZWFkIGlzIGluIHByb2dyZXNzLCBqdXN0IHJlZm9jdXMgdGhlIGlucHV0LlxyXG4gICAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIGluIElFIHdoZXJlIGNsaWNraW5nIGEgc2Nyb2xsYmFyIGRyb3BzIGZvY3VzLlxyXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZVR5cGVhaGVhZCAmJiB0aGlzLnNpbmdsZVR5cGVhaGVhZC5jbGlja2luZykge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgZHJvcGRvd24gYW5kIHJlc2V0IHRleHQgaW5wdXQgaWYgZm9jdXMgaXMgbG9zdFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2V5IGhhbmRsZXIgZm9yIHNpbmdsZSBzZWxlY3Qgb25seS4gTXVsdGlwbGUgc2VsZWN0IGtleSBoYW5kbGluZyBpcyBpbiBUYWdJbnB1dENvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgaW5wdXRLZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFN0YW5kYXJkIGtleXMgZm9yIHR5cGVhaGVhZCAodXAvZG93bi9lc2MpXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMuc2luZ2xlVHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Ryb3Bkb3duT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGFzIHRoZSB2YWx1ZSBhbmQgY2xvc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5zaW5nbGVUeXBlYWhlYWQuaGlnaGxpZ2h0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGlucHV0IGZpZWxkLiBJZiBkcm9wZG93biBpc24ndCBvcGVuIHRoZW4gcmVzZXQgaXQgdG8gdGhlIHByZXZpb3VzIHZhbHVlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2luZ2xlT3B0aW9uU2VsZWN0ZWQoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50Lm9wdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQub3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG9wdGlvbiA9PT0gbnVsbCB8fCBvcHRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0SW5wdXRUZXh0KCkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3QoKTtcclxuICAgIH1cclxufSJdfQ==