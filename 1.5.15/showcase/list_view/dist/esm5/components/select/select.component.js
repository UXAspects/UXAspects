/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, Inject, Input, Output, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
var /** @type {?} */ uniqueId = 0;
export var /** @type {?} */ SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
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
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.dropdownOpenChange = new EventEmitter();
        this.propagateChange = function (_) { };
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._subscription = new Subscription();
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this.propagateChange(value);
            // if we are not allow multiple selection update the input value (supporting ngModel)
            if (!this.multiple && value !== null) {
                this.input = this.getDisplay(value);
            }
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
            this.inputChange.emit(value);
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
        // Changes to the input field
        var /** @type {?} */ onInput = this._input$.pipe(filter(function (value) { return _this.allowNull; }), filter(function (value) { return !_this.multiple && value !== _this.getDisplay(_this.value); })).subscribe(function (value) { return _this.value = null; });
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(function (input) { return !_this.multiple && input === _this.getDisplay(_this.value) ? '' : input; }), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        var /** @type {?} */ onFilter = this.filter$.pipe(filter(function (value) { return value && value.length > 0; })).subscribe(function () { return _this.dropdownOpen = true; });
        // store the subscriptions
        this._subscription.add(onInput);
        this._subscription.add(onFilter);
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
        this._subscription.unsubscribe();
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
        if (obj !== undefined && obj !== this._value) {
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
                    template: "<ux-tag-input *ngIf=\"multiple\"\n    [id]=\"id + '-input'\"\n    [(tags)]=\"value\"\n    [(input)]=\"input\"\n    [addOnPaste]=\"false\"\n    [disabled]=\"disabled\"\n    [display]=\"display\"\n    [freeInput]=\"false\"\n    [placeholder]=\"placeholder\"\n    [showTypeaheadOnClick]=\"true\">\n\n    <ux-typeahead #multipleTypeahead\n        [id]=\"id + '-typeahead'\"\n        [options]=\"options\"\n        [filter]=\"filter$ | async\"\n        [(open)]=\"dropdownOpen\"\n        [display]=\"display\"\n        [key]=\"key\"\n        [disabledOptions]=\"value\"\n        [dropDirection]=\"dropDirection\"\n        [maxHeight]=\"maxHeight\"\n        [multiselectable]=\"true\"\n        [pageSize]=\"pageSize\"\n        [selectFirst]=\"true\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [optionTemplate]=\"optionTemplate\"\n        [noOptionsTemplate]=\"noOptionsTemplate\">\n    </ux-typeahead>\n\n</ux-tag-input>\n\n<div *ngIf=\"!multiple\"\n    class=\"inner-addon right-addon\"\n    [class.disabled]=\"disabled\"\n    role=\"combobox\"\n    [attr.aria-expanded]=\"dropdownOpen\"\n    aria-haspopup=\"listbox\">\n\n    <i class=\"hpe-icon\"\n        [class.hpe-down]=\"dropDirection === 'down'\"\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\n\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\n        aria-autocomplete=\"list\"\n        [attr.aria-controls]=\"singleTypeahead.id\"\n        aria-multiline=\"false\"\n        [(ngModel)]=\"input\"\n        [placeholder]=\"placeholder\"\n        [disabled]=\"disabled\"\n        (click)=\"inputClickHandler($event)\"\n        (blur)=\"inputBlurHandler($event)\"\n        (keydown)=\"inputKeyHandler($event)\">\n\n    <ux-typeahead #singleTypeahead\n        [id]=\"id + '-typeahead'\"\n        [options]=\"options\"\n        [filter]=\"filter$ | async\"\n        [(open)]=\"dropdownOpen\"\n        [display]=\"display\"\n        [key]=\"key\"\n        [dropDirection]=\"dropDirection\"\n        [maxHeight]=\"maxHeight\"\n        [multiselectable]=\"false\"\n        [openOnFilterChange]=\"false\"\n        [pageSize]=\"pageSize\"\n        [selectFirst]=\"true\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [optionTemplate]=\"optionTemplate\"\n        [noOptionsTemplate]=\"noOptionsTemplate\"\n        (optionSelected)=\"singleOptionSelected($event)\"\n        (highlightedElementChange)=\"highlightedElement = $event\">\n    </ux-typeahead>\n\n</div>\n",
                    providers: [SELECT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: TypeaheadKeyService, },
    ]; };
    SelectComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "value": [{ type: Input },],
        "input": [{ type: Input },],
        "dropdownOpen": [{ type: Input },],
        "options": [{ type: Input },],
        "display": [{ type: Input },],
        "key": [{ type: Input },],
        "allowNull": [{ type: Input },],
        "disabled": [{ type: Input },],
        "dropDirection": [{ type: Input },],
        "maxHeight": [{ type: Input },],
        "multiple": [{ type: Input },],
        "pageSize": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "loadingTemplate": [{ type: Input },],
        "noOptionsTemplate": [{ type: Input },],
        "optionTemplate": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "inputChange": [{ type: Output },],
        "dropdownOpenChange": [{ type: Output },],
        "singleInput": [{ type: ViewChild, args: ['singleInput',] },],
        "multipleTypeahead": [{ type: ViewChild, args: ['multipleTypeahead',] },],
        "singleTypeahead": [{ type: ViewChild, args: ['singleTypeahead',] },],
    };
    return SelectComponent;
}());
export { SelectComponent };
function SelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SelectComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SelectComponent.propDecorators;
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
    SelectComponent.prototype._value;
    /** @type {?} */
    SelectComponent.prototype._input$;
    /** @type {?} */
    SelectComponent.prototype._dropdownOpen;
    /** @type {?} */
    SelectComponent.prototype._subscription;
    /** @type {?} */
    SelectComponent.prototype._element;
    /** @type {?} */
    SelectComponent.prototype._document;
    /** @type {?} */
    SelectComponent.prototype._typeaheadKeyService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDek0sT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRyxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLE1BQU0sQ0FBQyxxQkFBTSxxQkFBcUIsR0FBbUI7SUFDakQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxlQUFlLEVBQWYsQ0FBZSxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUF1SkUseUJBQ1ksVUFDa0IsV0FDbEI7UUFGQSxhQUFRLEdBQVIsUUFBUTtRQUNVLGNBQVMsR0FBVCxTQUFTO1FBQzNCLHlCQUFvQixHQUFwQixvQkFBb0I7a0JBdEVjLGVBQWEsRUFBRSxRQUFVO3lCQXNDekMsS0FBSzt3QkFD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LEtBQUs7MEJBZUwsS0FBSztpQ0FTTCxLQUFLOzRCQVNMLEtBQUs7NEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSztrQ0FDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO2dDQUNMLEtBQUs7b0NBRUwsS0FBSztzQ0FDTCxLQUFLO21DQUNMLEtBQUs7Z0NBRUwsTUFBTTtnQ0FDTixNQUFNO3VDQUNOLE1BQU07Z0NBRU4sU0FBUyxTQUFDLGFBQWE7c0NBQ3ZCLFNBQVMsU0FBQyxtQkFBbUI7b0NBQzdCLFNBQVMsU0FBQyxpQkFBaUI7OzBCQTVKaEM7O1NBa0dhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgU3RhdGljUHJvdmlkZXIsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UsIFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vdHlwZWFoZWFkL2luZGV4JztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY29uc3QgU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBTdGF0aWNQcm92aWRlciA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtc2VsZWN0JyxcclxuICAgIHRlbXBsYXRlOiBgPHV4LXRhZy1pbnB1dCAqbmdJZj1cIm11bHRpcGxlXCJcclxuICAgIFtpZF09XCJpZCArICctaW5wdXQnXCJcclxuICAgIFsodGFncyldPVwidmFsdWVcIlxyXG4gICAgWyhpbnB1dCldPVwiaW5wdXRcIlxyXG4gICAgW2FkZE9uUGFzdGVdPVwiZmFsc2VcIlxyXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgIFtkaXNwbGF5XT1cImRpc3BsYXlcIlxyXG4gICAgW2ZyZWVJbnB1dF09XCJmYWxzZVwiXHJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxyXG4gICAgW3Nob3dUeXBlYWhlYWRPbkNsaWNrXT1cInRydWVcIj5cclxuXHJcbiAgICA8dXgtdHlwZWFoZWFkICNtdWx0aXBsZVR5cGVhaGVhZFxyXG4gICAgICAgIFtpZF09XCJpZCArICctdHlwZWFoZWFkJ1wiXHJcbiAgICAgICAgW29wdGlvbnNdPVwib3B0aW9uc1wiXHJcbiAgICAgICAgW2ZpbHRlcl09XCJmaWx0ZXIkIHwgYXN5bmNcIlxyXG4gICAgICAgIFsob3BlbildPVwiZHJvcGRvd25PcGVuXCJcclxuICAgICAgICBbZGlzcGxheV09XCJkaXNwbGF5XCJcclxuICAgICAgICBba2V5XT1cImtleVwiXHJcbiAgICAgICAgW2Rpc2FibGVkT3B0aW9uc109XCJ2YWx1ZVwiXHJcbiAgICAgICAgW2Ryb3BEaXJlY3Rpb25dPVwiZHJvcERpcmVjdGlvblwiXHJcbiAgICAgICAgW21heEhlaWdodF09XCJtYXhIZWlnaHRcIlxyXG4gICAgICAgIFttdWx0aXNlbGVjdGFibGVdPVwidHJ1ZVwiXHJcbiAgICAgICAgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCJcclxuICAgICAgICBbc2VsZWN0Rmlyc3RdPVwidHJ1ZVwiXHJcbiAgICAgICAgW2xvYWRpbmdUZW1wbGF0ZV09XCJsb2FkaW5nVGVtcGxhdGVcIlxyXG4gICAgICAgIFtvcHRpb25UZW1wbGF0ZV09XCJvcHRpb25UZW1wbGF0ZVwiXHJcbiAgICAgICAgW25vT3B0aW9uc1RlbXBsYXRlXT1cIm5vT3B0aW9uc1RlbXBsYXRlXCI+XHJcbiAgICA8L3V4LXR5cGVhaGVhZD5cclxuXHJcbjwvdXgtdGFnLWlucHV0PlxyXG5cclxuPGRpdiAqbmdJZj1cIiFtdWx0aXBsZVwiXHJcbiAgICBjbGFzcz1cImlubmVyLWFkZG9uIHJpZ2h0LWFkZG9uXCJcclxuICAgIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcm9wZG93bk9wZW5cIlxyXG4gICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIj5cclxuXHJcbiAgICA8aSBjbGFzcz1cImhwZS1pY29uXCJcclxuICAgICAgICBbY2xhc3MuaHBlLWRvd25dPVwiZHJvcERpcmVjdGlvbiA9PT0gJ2Rvd24nXCJcclxuICAgICAgICBbY2xhc3MuaHBlLXVwXT1cImRyb3BEaXJlY3Rpb24gPT09ICd1cCdcIj48L2k+XHJcblxyXG4gICAgPGlucHV0ICNzaW5nbGVJbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlkICsgJy1pbnB1dCdcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImhpZ2hsaWdodGVkRWxlbWVudD8uaWRcIlxyXG4gICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXHJcbiAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJzaW5nbGVUeXBlYWhlYWQuaWRcIlxyXG4gICAgICAgIGFyaWEtbXVsdGlsaW5lPVwiZmFsc2VcIlxyXG4gICAgICAgIFsobmdNb2RlbCldPVwiaW5wdXRcIlxyXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAoY2xpY2spPVwiaW5wdXRDbGlja0hhbmRsZXIoJGV2ZW50KVwiXHJcbiAgICAgICAgKGJsdXIpPVwiaW5wdXRCbHVySGFuZGxlcigkZXZlbnQpXCJcclxuICAgICAgICAoa2V5ZG93bik9XCJpbnB1dEtleUhhbmRsZXIoJGV2ZW50KVwiPlxyXG5cclxuICAgIDx1eC10eXBlYWhlYWQgI3NpbmdsZVR5cGVhaGVhZFxyXG4gICAgICAgIFtpZF09XCJpZCArICctdHlwZWFoZWFkJ1wiXHJcbiAgICAgICAgW29wdGlvbnNdPVwib3B0aW9uc1wiXHJcbiAgICAgICAgW2ZpbHRlcl09XCJmaWx0ZXIkIHwgYXN5bmNcIlxyXG4gICAgICAgIFsob3BlbildPVwiZHJvcGRvd25PcGVuXCJcclxuICAgICAgICBbZGlzcGxheV09XCJkaXNwbGF5XCJcclxuICAgICAgICBba2V5XT1cImtleVwiXHJcbiAgICAgICAgW2Ryb3BEaXJlY3Rpb25dPVwiZHJvcERpcmVjdGlvblwiXHJcbiAgICAgICAgW21heEhlaWdodF09XCJtYXhIZWlnaHRcIlxyXG4gICAgICAgIFttdWx0aXNlbGVjdGFibGVdPVwiZmFsc2VcIlxyXG4gICAgICAgIFtvcGVuT25GaWx0ZXJDaGFuZ2VdPVwiZmFsc2VcIlxyXG4gICAgICAgIFtwYWdlU2l6ZV09XCJwYWdlU2l6ZVwiXHJcbiAgICAgICAgW3NlbGVjdEZpcnN0XT1cInRydWVcIlxyXG4gICAgICAgIFtsb2FkaW5nVGVtcGxhdGVdPVwibG9hZGluZ1RlbXBsYXRlXCJcclxuICAgICAgICBbb3B0aW9uVGVtcGxhdGVdPVwib3B0aW9uVGVtcGxhdGVcIlxyXG4gICAgICAgIFtub09wdGlvbnNUZW1wbGF0ZV09XCJub09wdGlvbnNUZW1wbGF0ZVwiXHJcbiAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cInNpbmdsZU9wdGlvblNlbGVjdGVkKCRldmVudClcIlxyXG4gICAgICAgIChoaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UpPVwiaGlnaGxpZ2h0ZWRFbGVtZW50ID0gJGV2ZW50XCI+XHJcbiAgICA8L3V4LXR5cGVhaGVhZD5cclxuXHJcbjwvZGl2PlxyXG5gLFxyXG4gICAgcHJvdmlkZXJzOiBbU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIGlkOiBzdHJpbmcgPSBgdXgtc2VsZWN0LSR7Kyt1bmlxdWVJZH1gO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodmFsdWUpO1xyXG5cclxuICAgICAgICAvLyBpZiB3ZSBhcmUgbm90IGFsbG93IG11bHRpcGxlIHNlbGVjdGlvbiB1cGRhdGUgdGhlIGlucHV0IHZhbHVlIChzdXBwb3J0aW5nIG5nTW9kZWwpXHJcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdldERpc3BsYXkodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGlucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dCQudmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lucHV0JC5uZXh0KHZhbHVlKTtcclxuICAgICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZHJvcGRvd25PcGVuKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kcm9wZG93bk9wZW47XHJcbiAgICB9XHJcbiAgICBzZXQgZHJvcGRvd25PcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZHJvcGRvd25PcGVuID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bk9wZW5DaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55W10gfCBJbmZpbml0ZVNjcm9sbExvYWRGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIGRpc3BsYXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkga2V5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGFsbG93TnVsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGRyb3BEaXJlY3Rpb246ICd1cCcgfCAnZG93bicgPSAnZG93bic7XHJcbiAgICBASW5wdXQoKSBtYXhIZWlnaHQ6IHN0cmluZyA9ICcyNTBweCc7XHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlciA9IDIwO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBub09wdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgZHJvcGRvd25PcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NpbmdsZUlucHV0Jykgc2luZ2xlSW5wdXQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdtdWx0aXBsZVR5cGVhaGVhZCcpIG11bHRpcGxlVHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKCdzaW5nbGVUeXBlYWhlYWQnKSBzaW5nbGVUeXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuXHJcbiAgICBoaWdobGlnaHRlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgZmlsdGVyJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XHJcbiAgICBwcml2YXRlIF9pbnB1dCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG4gICAgcHJpdmF0ZSBfZHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgX3R5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICAvLyBDaGFuZ2VzIHRvIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAgICAgIGNvbnN0IG9uSW5wdXQgPSB0aGlzLl9pbnB1dCQucGlwZShcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHRoaXMuYWxsb3dOdWxsKSxcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+ICF0aGlzLm11bHRpcGxlICYmIHZhbHVlICE9PSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSkpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy52YWx1ZSA9IG51bGwpO1xyXG5cclxuICAgICAgICAvLyBTZXQgdXAgZmlsdGVyIGZyb20gaW5wdXRcclxuICAgICAgICB0aGlzLmZpbHRlciQgPSB0aGlzLl9pbnB1dCQucGlwZShcclxuICAgICAgICAgICAgbWFwKGlucHV0ID0+ICF0aGlzLm11bHRpcGxlICYmIGlucHV0ID09PSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSkgPyAnJyA6IGlucHV0KSxcclxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDIwMClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBPcGVuIHRoZSBkcm9wZG93biB3aGVuIGZpbHRlciBpcyBub25lbXB0eS5cclxuICAgICAgICBjb25zdCBvbkZpbHRlciA9IHRoaXMuZmlsdGVyJC5waXBlKGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBzdWJzY3JpcHRpb25zXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChvbklucHV0KTtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKG9uRmlsdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMubXVsdGlwbGUgJiYgIWNoYW5nZXMubXVsdGlwbGUuZmlyc3RDaGFuZ2UgJiYgY2hhbmdlcy5tdWx0aXBsZS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMubXVsdGlwbGUucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAob2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSB0aGlzLl92YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dFRleHQoKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRCbHVySGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgYSBjbGljayBvbiB0aGUgdHlwZWFoZWFkIGlzIGluIHByb2dyZXNzLCBqdXN0IHJlZm9jdXMgdGhlIGlucHV0LlxyXG4gICAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIGluIElFIHdoZXJlIGNsaWNraW5nIGEgc2Nyb2xsYmFyIGRyb3BzIGZvY3VzLlxyXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZVR5cGVhaGVhZCAmJiB0aGlzLnNpbmdsZVR5cGVhaGVhZC5jbGlja2luZykge1xyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgZHJvcGRvd24gYW5kIHJlc2V0IHRleHQgaW5wdXQgaWYgZm9jdXMgaXMgbG9zdFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdldERpc3BsYXkodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogS2V5IGhhbmRsZXIgZm9yIHNpbmdsZSBzZWxlY3Qgb25seS4gTXVsdGlwbGUgc2VsZWN0IGtleSBoYW5kbGluZyBpcyBpbiBUYWdJbnB1dENvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgaW5wdXRLZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFN0YW5kYXJkIGtleXMgZm9yIHR5cGVhaGVhZCAodXAvZG93bi9lc2MpXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMuc2luZ2xlVHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Ryb3Bkb3duT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGFzIHRoZSB2YWx1ZSBhbmQgY2xvc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5zaW5nbGVUeXBlYWhlYWQuaGlnaGxpZ2h0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGlucHV0IGZpZWxkLiBJZiBkcm9wZG93biBpc24ndCBvcGVuIHRoZW4gcmVzZXQgaXQgdG8gdGhlIHByZXZpb3VzIHZhbHVlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2luZ2xlT3B0aW9uU2VsZWN0ZWQoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50Lm9wdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQub3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZ2V0RGlzcGxheShvcHRpb246IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG9wdGlvbiA9PT0gbnVsbCB8fCBvcHRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSh0aGlzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25bPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0SW5wdXRUZXh0KCkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3QoKTtcclxuICAgIH1cclxufSJdfQ==