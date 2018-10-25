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
var /** @type {?} */ uniqueId = 0;
export var /** @type {?} */ SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = /** @class */ (function () {
    function SelectComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = "ux-select-" + ++uniqueId;
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.autocomplete = 'off';
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.dropdownOpenChange = new EventEmitter();
        this.propagateChange = function (_) { };
        this._value$ = new BehaviorSubject(null);
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._onDestroy = new Subject();
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "input", {
        get: /**
         * @return {?}
         */
        function () {
            return this._input$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._input$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "dropdownOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropdownOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dropdownOpen = value;
            this.dropdownOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Emit change events
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(function (value) {
            _this.valueChange.emit(value);
            _this.propagateChange(value);
        });
        this._input$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(function (value) {
            _this.inputChange.emit(value);
        });
        // Changes to the input field
        this._input$.pipe(takeUntil(this._onDestroy), filter(function (value) { return _this.allowNull; }), filter(function (value) { return !_this.multiple && value !== _this.getDisplay(_this.value); })).subscribe(function (value) { return _this.value = null; });
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(function (input) { return !_this.multiple && input === _this.getDisplay(_this.value) ? '' : input; }), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        this.filter$.pipe(takeUntil(this._onDestroy), filter(function (value) { return value && value.length > 0; })).subscribe(function () { return _this.dropdownOpen = true; });
        // Update the single-select input when the model changes
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(), delay(0), filter(function (value) { return value !== null && !_this.multiple; })).subscribe(function (value) {
            _this.input = _this.getDisplay(value);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["multiple"] && !changes["multiple"].firstChange && changes["multiple"].currentValue !== changes["multiple"].previousValue) {
            this.input = '';
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.onfocus = /**
     * @return {?}
     */
    function () {
        if (this.singleInput) {
            this.singleInput.nativeElement.focus();
        }
        else if (this.tagInput) {
            this.tagInput.focus();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (obj !== undefined && obj !== this.value) {
            this.value = obj;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputClickHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.selectInputText();
        this.dropdownOpen = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputBlurHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // If a click on the typeahead is in progress, just refocus the input.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.singleTypeahead && this.singleTypeahead.clicking) {
            this.singleInput.nativeElement.focus();
            return;
        }
        // Close dropdown and reset text input if focus is lost
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.dropdownOpen = false;
                if (!_this.multiple) {
                    _this.input = _this.getDisplay(_this.value);
                }
            }
        }, 200);
    };
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     */
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputKeyHandler = /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.singleOptionSelected = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    };
    /**
     * Returns the display value of the given option.
     */
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.getDisplay = /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
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
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.selectInputText = /**
     * @return {?}
     */
    function () {
        this.singleInput.nativeElement.select();
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select',
                    template: "<ux-tag-input *ngIf=\"multiple\"\r\n    #tagInput=\"ux-tag-input\"\r\n    [id]=\"id + '-input'\"\r\n    [(tags)]=\"value\"\r\n    [(input)]=\"input\"\r\n    [autocomplete]=\"autocomplete\"\r\n    [addOnPaste]=\"false\"\r\n    [disabled]=\"disabled\"\r\n    [display]=\"display\"\r\n    [freeInput]=\"false\"\r\n    [placeholder]=\"placeholder\"\r\n    [showTypeaheadOnClick]=\"true\">\r\n\r\n    <ux-typeahead #multipleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [disabledOptions]=\"value\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"true\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\">\r\n    </ux-typeahead>\r\n\r\n</ux-tag-input>\r\n\r\n<div *ngIf=\"!multiple\"\r\n    class=\"inner-addon right-addon\"\r\n    [class.disabled]=\"disabled\"\r\n    role=\"combobox\"\r\n    [attr.aria-expanded]=\"dropdownOpen\"\r\n    aria-haspopup=\"listbox\">\r\n\r\n    <i class=\"hpe-icon\"\r\n        [class.hpe-down]=\"dropDirection === 'down'\"\r\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\r\n\r\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\r\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\r\n        [autocomplete]=\"autocomplete\"\r\n        aria-autocomplete=\"list\"\r\n        [attr.aria-controls]=\"singleTypeahead.id\"\r\n        aria-multiline=\"false\"\r\n        [(ngModel)]=\"input\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        (click)=\"inputClickHandler($event)\"\r\n        (blur)=\"inputBlurHandler($event)\"\r\n        (keydown)=\"inputKeyHandler($event)\">\r\n\r\n    <ux-typeahead #singleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"false\"\r\n        [openOnFilterChange]=\"false\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\"\r\n        (optionSelected)=\"singleOptionSelected($event)\"\r\n        (highlightedElementChange)=\"highlightedElement = $event\">\r\n    </ux-typeahead>\r\n\r\n</div>\r\n",
                    providers: [SELECT_VALUE_ACCESSOR],
                    host: {
                        'tabindex': '0'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: TypeaheadKeyService }
    ]; };
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
        autocomplete: [{ type: Input }],
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
    return SelectComponent;
}());
export { SelectComponent };
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
    SelectComponent.prototype.autocomplete;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2TixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7QUFFbkcscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQixNQUFNLENBQUMscUJBQU0scUJBQXFCLEdBQW1CO0lBQ2pELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWUsQ0FBQztJQUM5QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBeUVFLHlCQUNZLFVBQ2tCLFNBQWMsRUFDaEM7UUFGQSxhQUFRLEdBQVIs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U0FBUzt3QkFFOUIsS0FBSzt3QkFRTCxLQUFLOytCQVFMLEtBQUs7MEJBU0wsS0FBSzswQkFDTCxLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2dDQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUVMLEtBQUs7b0NBQ0wsS0FBSztpQ0FDTCxLQUFLOzhCQUVMLE1BQU07OEJBQ04sTUFBTTtxQ0FDTixNQUFNOzhCQUVOLFNBQVMsU0FBQyxhQUFhOzJCQUN2QixTQUFTLFNBQUMsVUFBVTtvQ0FDcEIsU0FBUyxTQUFDLG1CQUFtQjtrQ0FDN0IsU0FBUyxTQUFDLGlCQUFpQjswQkFxRTNCLFlBQVksU0FBQyxPQUFPOzswQkFwSnpCOztTQTJCYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBTdGF0aWNQcm92aWRlciwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGVsYXksIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcclxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmRleCc7XHJcbmltcG9ydCB7IFRhZ0lucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vdGFnLWlucHV0L2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkQ29tcG9uZW50LCBUeXBlYWhlYWRLZXlTZXJ2aWNlLCBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uL3R5cGVhaGVhZC9pbmRleCc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogU3RhdGljUHJvdmlkZXIgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICd0YWJpbmRleCc6ICcwJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIGlkOiBzdHJpbmcgPSBgdXgtc2VsZWN0LSR7Kyt1bmlxdWVJZH1gO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlJC5uZXh0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgaW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lucHV0JC5uZXh0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGdldCBpbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgZHJvcGRvd25PcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZHJvcGRvd25PcGVuID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bk9wZW5DaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgZHJvcGRvd25PcGVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kcm9wZG93bk9wZW47XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55W10gfCBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIGRpc3BsYXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkga2V5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGFsbG93TnVsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGRyb3BEaXJlY3Rpb246ICd1cCcgfCAnZG93bicgPSAnZG93bic7XHJcbiAgICBASW5wdXQoKSBtYXhIZWlnaHQ6IHN0cmluZyA9ICcyNTBweCc7XHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlciA9IDIwO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogc3RyaW5nID0gJ29mZic7XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgbm9PcHRpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBvcHRpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBpbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgQE91dHB1dCgpIGRyb3Bkb3duT3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdzaW5nbGVJbnB1dCcpIHNpbmdsZUlucHV0OiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgndGFnSW5wdXQnKSB0YWdJbnB1dDogVGFnSW5wdXRDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKCdtdWx0aXBsZVR5cGVhaGVhZCcpIG11bHRpcGxlVHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKCdzaW5nbGVUeXBlYWhlYWQnKSBzaW5nbGVUeXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuXHJcbiAgICBoaWdobGlnaHRlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgZmlsdGVyJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcclxuICAgIHByaXZhdGUgX2lucHV0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcbiAgICBwcml2YXRlIF9kcm9wZG93bk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgX3R5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICAvLyBFbWl0IGNoYW5nZSBldmVudHNcclxuICAgICAgICB0aGlzLl92YWx1ZSQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9pbnB1dCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2hhbmdlcyB0byB0aGUgaW5wdXQgZmllbGRcclxuICAgICAgICB0aGlzLl9pbnB1dCQucGlwZShcclxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXHJcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiB0aGlzLmFsbG93TnVsbCksXHJcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiAhdGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSAhPT0gdGhpcy5nZXREaXNwbGF5KHRoaXMudmFsdWUpKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMudmFsdWUgPSBudWxsKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHVwIGZpbHRlciBmcm9tIGlucHV0XHJcbiAgICAgICAgdGhpcy5maWx0ZXIkID0gdGhpcy5faW5wdXQkLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcChpbnB1dCA9PiAhdGhpcy5tdWx0aXBsZSAmJiBpbnB1dCA9PT0gdGhpcy5nZXREaXNwbGF5KHRoaXMudmFsdWUpID8gJycgOiBpbnB1dCksXHJcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyMDApXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gT3BlbiB0aGUgZHJvcGRvd24gd2hlbiBmaWx0ZXIgaXMgbm9uZW1wdHkuXHJcbiAgICAgICAgdGhpcy5maWx0ZXIkLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMClcclxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWUpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHNpbmdsZS1zZWxlY3QgaW5wdXQgd2hlbiB0aGUgbW9kZWwgY2hhbmdlc1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlJC5waXBlKFxyXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcclxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgICAgICAgZGVsYXkoMCksXHJcbiAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiAhdGhpcy5tdWx0aXBsZSlcclxuICAgICAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdldERpc3BsYXkodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5tdWx0aXBsZSAmJiAhY2hhbmdlcy5tdWx0aXBsZS5maXJzdENoYW5nZSAmJiBjaGFuZ2VzLm11bHRpcGxlLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5tdWx0aXBsZS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgICBvbmZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUlucHV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWdJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0lucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSB0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRDbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdElucHV0VGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEJsdXJIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xyXG5cclxuICAgICAgICAvLyBJZiBhIGNsaWNrIG9uIHRoZSB0eXBlYWhlYWQgaXMgaW4gcHJvZ3Jlc3MsIGp1c3QgcmVmb2N1cyB0aGUgaW5wdXQuXHJcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYW4gaXNzdWUgaW4gSUUgd2hlcmUgY2xpY2tpbmcgYSBzY3JvbGxiYXIgZHJvcHMgZm9jdXMuXHJcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlVHlwZWFoZWFkICYmIHRoaXMuc2luZ2xlVHlwZWFoZWFkLmNsaWNraW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG9zZSBkcm9wZG93biBhbmQgcmVzZXQgdGV4dCBpbnB1dCBpZiBmb2N1cyBpcyBsb3N0XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXkgaGFuZGxlciBmb3Igc2luZ2xlIHNlbGVjdCBvbmx5LiBNdWx0aXBsZSBzZWxlY3Qga2V5IGhhbmRsaW5nIGlzIGluIFRhZ0lucHV0Q29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBpbnB1dEtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gU3RhbmRhcmQga2V5cyBmb3IgdHlwZWFoZWFkICh1cC9kb3duL2VzYylcclxuICAgICAgICB0aGlzLl90eXBlYWhlYWRLZXlTZXJ2aWNlLmhhbmRsZUtleShldmVudCwgdGhpcy5zaW5nbGVUeXBlYWhlYWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZHJvcGRvd25PcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gYXMgdGhlIHZhbHVlIGFuZCBjbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnNpbmdsZVR5cGVhaGVhZC5oaWdobGlnaHRlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5wdXQgZmllbGQuIElmIGRyb3Bkb3duIGlzbid0IG9wZW4gdGhlbiByZXNldCBpdCB0byB0aGUgcHJldmlvdXMgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5nZXREaXNwbGF5KHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaW5nbGVPcHRpb25TZWxlY3RlZChldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQub3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBldmVudC5vcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAob3B0aW9uID09PSBudWxsIHx8IG9wdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RJbnB1dFRleHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xyXG4gICAgfVxyXG59Il19