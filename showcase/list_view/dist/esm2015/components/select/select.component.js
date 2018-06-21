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
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._subscription = new Subscription();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        this.valueChange.emit(value);
        this.propagateChange(value);
        // if we are not allow multiple selection update the input value (supporting ngModel)
        if (!this.multiple && value !== null) {
            this.input = this.getDisplay(value);
        }
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
    set input(value) {
        this._input$.next(value);
        this.inputChange.emit(value);
    }
    /**
     * @return {?}
     */
    get dropdownOpen() {
        return this._dropdownOpen;
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
    ngOnInit() {
        // Changes to the input field
        const /** @type {?} */ onInput = this._input$.pipe(filter(value => this.allowNull), filter(value => !this.multiple && value !== this.getDisplay(this.value))).subscribe(value => this.value = null);
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(input => !this.multiple && input === this.getDisplay(this.value) ? '' : input), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        const /** @type {?} */ onFilter = this.filter$.pipe(filter(value => value && value.length > 0)).subscribe(() => this.dropdownOpen = true);
        // store the subscriptions
        this._subscription.add(onInput);
        this._subscription.add(onFilter);
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
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj !== undefined && obj !== this._value) {
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
                template: `<ux-tag-input *ngIf="multiple"
    [id]="id + '-input'"
    [(tags)]="value"
    [(input)]="input"
    [addOnPaste]="false"
    [disabled]="disabled"
    [display]="display"
    [freeInput]="false"
    [placeholder]="placeholder"
    [showTypeaheadOnClick]="true">

    <ux-typeahead #multipleTypeahead
        [id]="id + '-typeahead'"
        [options]="options"
        [filter]="filter$ | async"
        [(open)]="dropdownOpen"
        [display]="display"
        [key]="key"
        [disabledOptions]="value"
        [dropDirection]="dropDirection"
        [maxHeight]="maxHeight"
        [multiselectable]="true"
        [pageSize]="pageSize"
        [selectFirst]="true"
        [loadingTemplate]="loadingTemplate"
        [optionTemplate]="optionTemplate"
        [noOptionsTemplate]="noOptionsTemplate">
    </ux-typeahead>

</ux-tag-input>

<div *ngIf="!multiple"
    class="inner-addon right-addon"
    [class.disabled]="disabled"
    role="combobox"
    [attr.aria-expanded]="dropdownOpen"
    aria-haspopup="listbox">

    <i class="hpe-icon"
        [class.hpe-down]="dropDirection === 'down'"
        [class.hpe-up]="dropDirection === 'up'"></i>

    <input #singleInput type="text" [attr.id]="id + '-input'" class="form-control"
        [attr.aria-activedescendant]="highlightedElement?.id"
        aria-autocomplete="list"
        [attr.aria-controls]="singleTypeahead.id"
        aria-multiline="false"
        [(ngModel)]="input"
        [placeholder]="placeholder"
        [disabled]="disabled"
        (click)="inputClickHandler($event)"
        (blur)="inputBlurHandler($event)"
        (keydown)="inputKeyHandler($event)">

    <ux-typeahead #singleTypeahead
        [id]="id + '-typeahead'"
        [options]="options"
        [filter]="filter$ | async"
        [(open)]="dropdownOpen"
        [display]="display"
        [key]="key"
        [dropDirection]="dropDirection"
        [maxHeight]="maxHeight"
        [multiselectable]="false"
        [openOnFilterChange]="false"
        [pageSize]="pageSize"
        [selectFirst]="true"
        [loadingTemplate]="loadingTemplate"
        [optionTemplate]="optionTemplate"
        [noOptionsTemplate]="noOptionsTemplate"
        (optionSelected)="singleOptionSelected($event)"
        (highlightedElementChange)="highlightedElement = $event">
    </ux-typeahead>

</div>
`,
                providers: [SELECT_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
SelectComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: TypeaheadKeyService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDek0sT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBd0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRyxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLE1BQU0sQ0FBQyx1QkFBTSxxQkFBcUIsR0FBbUI7SUFDakQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sZUFBZSxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWtGRixNQUFNOzs7Ozs7SUFxRUYsWUFDWSxVQUNrQixXQUNsQjtRQUZBLGFBQVEsR0FBUixRQUFRO1FBQ1UsY0FBUyxHQUFULFNBQVM7UUFDM0IseUJBQW9CLEdBQXBCLG9CQUFvQjtrQkF0RWMsYUFBYSxFQUFFLFFBQVEsRUFBRTt5QkFzQ3pDLEtBQUs7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TixTQUFTLFNBQUMsYUFBYTtrQ0FDdkIsU0FBUyxTQUFDLG1CQUFtQjtnQ0FDN0IsU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBTdGF0aWNQcm92aWRlciwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxMb2FkRnVuY3Rpb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbXBvbmVudCwgVHlwZWFoZWFkS2V5U2VydmljZSwgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuLi90eXBlYWhlYWQvaW5kZXgnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjb25zdCBTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IFN0YXRpY1Byb3ZpZGVyID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC1zZWxlY3QnLFxyXG4gICAgdGVtcGxhdGU6IGA8dXgtdGFnLWlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIlxyXG4gICAgW2lkXT1cImlkICsgJy1pbnB1dCdcIlxyXG4gICAgWyh0YWdzKV09XCJ2YWx1ZVwiXHJcbiAgICBbKGlucHV0KV09XCJpbnB1dFwiXHJcbiAgICBbYWRkT25QYXN0ZV09XCJmYWxzZVwiXHJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgW2Rpc3BsYXldPVwiZGlzcGxheVwiXHJcbiAgICBbZnJlZUlucHV0XT1cImZhbHNlXCJcclxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXHJcbiAgICBbc2hvd1R5cGVhaGVhZE9uQ2xpY2tdPVwidHJ1ZVwiPlxyXG5cclxuICAgIDx1eC10eXBlYWhlYWQgI211bHRpcGxlVHlwZWFoZWFkXHJcbiAgICAgICAgW2lkXT1cImlkICsgJy10eXBlYWhlYWQnXCJcclxuICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCJcclxuICAgICAgICBbZmlsdGVyXT1cImZpbHRlciQgfCBhc3luY1wiXHJcbiAgICAgICAgWyhvcGVuKV09XCJkcm9wZG93bk9wZW5cIlxyXG4gICAgICAgIFtkaXNwbGF5XT1cImRpc3BsYXlcIlxyXG4gICAgICAgIFtrZXldPVwia2V5XCJcclxuICAgICAgICBbZGlzYWJsZWRPcHRpb25zXT1cInZhbHVlXCJcclxuICAgICAgICBbZHJvcERpcmVjdGlvbl09XCJkcm9wRGlyZWN0aW9uXCJcclxuICAgICAgICBbbWF4SGVpZ2h0XT1cIm1heEhlaWdodFwiXHJcbiAgICAgICAgW211bHRpc2VsZWN0YWJsZV09XCJ0cnVlXCJcclxuICAgICAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxyXG4gICAgICAgIFtzZWxlY3RGaXJzdF09XCJ0cnVlXCJcclxuICAgICAgICBbbG9hZGluZ1RlbXBsYXRlXT1cImxvYWRpbmdUZW1wbGF0ZVwiXHJcbiAgICAgICAgW29wdGlvblRlbXBsYXRlXT1cIm9wdGlvblRlbXBsYXRlXCJcclxuICAgICAgICBbbm9PcHRpb25zVGVtcGxhdGVdPVwibm9PcHRpb25zVGVtcGxhdGVcIj5cclxuICAgIDwvdXgtdHlwZWFoZWFkPlxyXG5cclxuPC91eC10YWctaW5wdXQ+XHJcblxyXG48ZGl2ICpuZ0lmPVwiIW11bHRpcGxlXCJcclxuICAgIGNsYXNzPVwiaW5uZXItYWRkb24gcmlnaHQtYWRkb25cIlxyXG4gICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRyb3Bkb3duT3BlblwiXHJcbiAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiPlxyXG5cclxuICAgIDxpIGNsYXNzPVwiaHBlLWljb25cIlxyXG4gICAgICAgIFtjbGFzcy5ocGUtZG93bl09XCJkcm9wRGlyZWN0aW9uID09PSAnZG93bidcIlxyXG4gICAgICAgIFtjbGFzcy5ocGUtdXBdPVwiZHJvcERpcmVjdGlvbiA9PT0gJ3VwJ1wiPjwvaT5cclxuXHJcbiAgICA8aW5wdXQgI3NpbmdsZUlucHV0IHR5cGU9XCJ0ZXh0XCIgW2F0dHIuaWRdPVwiaWQgKyAnLWlucHV0J1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiaGlnaGxpZ2h0ZWRFbGVtZW50Py5pZFwiXHJcbiAgICAgICAgYXJpYS1hdXRvY29tcGxldGU9XCJsaXN0XCJcclxuICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cInNpbmdsZVR5cGVhaGVhZC5pZFwiXHJcbiAgICAgICAgYXJpYS1tdWx0aWxpbmU9XCJmYWxzZVwiXHJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJpbnB1dFwiXHJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgIChjbGljayk9XCJpbnB1dENsaWNrSGFuZGxlcigkZXZlbnQpXCJcclxuICAgICAgICAoYmx1cik9XCJpbnB1dEJsdXJIYW5kbGVyKCRldmVudClcIlxyXG4gICAgICAgIChrZXlkb3duKT1cImlucHV0S2V5SGFuZGxlcigkZXZlbnQpXCI+XHJcblxyXG4gICAgPHV4LXR5cGVhaGVhZCAjc2luZ2xlVHlwZWFoZWFkXHJcbiAgICAgICAgW2lkXT1cImlkICsgJy10eXBlYWhlYWQnXCJcclxuICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCJcclxuICAgICAgICBbZmlsdGVyXT1cImZpbHRlciQgfCBhc3luY1wiXHJcbiAgICAgICAgWyhvcGVuKV09XCJkcm9wZG93bk9wZW5cIlxyXG4gICAgICAgIFtkaXNwbGF5XT1cImRpc3BsYXlcIlxyXG4gICAgICAgIFtrZXldPVwia2V5XCJcclxuICAgICAgICBbZHJvcERpcmVjdGlvbl09XCJkcm9wRGlyZWN0aW9uXCJcclxuICAgICAgICBbbWF4SGVpZ2h0XT1cIm1heEhlaWdodFwiXHJcbiAgICAgICAgW211bHRpc2VsZWN0YWJsZV09XCJmYWxzZVwiXHJcbiAgICAgICAgW29wZW5PbkZpbHRlckNoYW5nZV09XCJmYWxzZVwiXHJcbiAgICAgICAgW3BhZ2VTaXplXT1cInBhZ2VTaXplXCJcclxuICAgICAgICBbc2VsZWN0Rmlyc3RdPVwidHJ1ZVwiXHJcbiAgICAgICAgW2xvYWRpbmdUZW1wbGF0ZV09XCJsb2FkaW5nVGVtcGxhdGVcIlxyXG4gICAgICAgIFtvcHRpb25UZW1wbGF0ZV09XCJvcHRpb25UZW1wbGF0ZVwiXHJcbiAgICAgICAgW25vT3B0aW9uc1RlbXBsYXRlXT1cIm5vT3B0aW9uc1RlbXBsYXRlXCJcclxuICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwic2luZ2xlT3B0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgKGhpZ2hsaWdodGVkRWxlbWVudENoYW5nZSk9XCJoaWdobGlnaHRlZEVsZW1lbnQgPSAkZXZlbnRcIj5cclxuICAgIDwvdXgtdHlwZWFoZWFkPlxyXG5cclxuPC9kaXY+XHJcbmAsXHJcbiAgICBwcm92aWRlcnM6IFtTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC1zZWxlY3QtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIGlmIHdlIGFyZSBub3QgYWxsb3cgbXVsdGlwbGUgc2VsZWN0aW9uIHVwZGF0ZSB0aGUgaW5wdXQgdmFsdWUgKHN1cHBvcnRpbmcgbmdNb2RlbClcclxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgaW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0JC52YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBpbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXQkLm5leHQodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCBkcm9wZG93bk9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duT3BlbjtcclxuICAgIH1cclxuICAgIHNldCBkcm9wZG93bk9wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9kcm9wZG93bk9wZW4gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbkNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnlbXSB8IEluZmluaXRlU2Nyb2xsTG9hZEZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBrZXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgYWxsb3dOdWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZHJvcERpcmVjdGlvbjogJ3VwJyB8ICdkb3duJyA9ICdkb3duJztcclxuICAgIEBJbnB1dCgpIG1heEhlaWdodDogc3RyaW5nID0gJzI1MHB4JztcclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyID0gMjA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIG5vT3B0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgb3B0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlSW5wdXQnKSBzaW5nbGVJbnB1dDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ211bHRpcGxlVHlwZWFoZWFkJykgbXVsdGlwbGVUeXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoJ3NpbmdsZVR5cGVhaGVhZCcpIHNpbmdsZVR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG5cclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBmaWx0ZXIkOiBPYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcclxuICAgIHByaXZhdGUgX2lucHV0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcbiAgICBwcml2YXRlIF9kcm9wZG93bk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBfdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZXMgdG8gdGhlIGlucHV0IGZpZWxkXHJcbiAgICAgICAgY29uc3Qgb25JbnB1dCA9IHRoaXMuX2lucHV0JC5waXBlKFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdGhpcy5hbGxvd051bGwpLFxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gIXRoaXMubXVsdGlwbGUgJiYgdmFsdWUgIT09IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKSlcclxuICAgICAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLnZhbHVlID0gbnVsbCk7XHJcblxyXG4gICAgICAgIC8vIFNldCB1cCBmaWx0ZXIgZnJvbSBpbnB1dFxyXG4gICAgICAgIHRoaXMuZmlsdGVyJCA9IHRoaXMuX2lucHV0JC5waXBlKFxyXG4gICAgICAgICAgICBtYXAoaW5wdXQgPT4gIXRoaXMubXVsdGlwbGUgJiYgaW5wdXQgPT09IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKSA/ICcnIDogaW5wdXQpLFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIE9wZW4gdGhlIGRyb3Bkb3duIHdoZW4gZmlsdGVyIGlzIG5vbmVtcHR5LlxyXG4gICAgICAgIGNvbnN0IG9uRmlsdGVyID0gdGhpcy5maWx0ZXIkLnBpcGUoZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kcm9wZG93bk9wZW4gPSB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdGhlIHN1YnNjcmlwdGlvbnNcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKG9uSW5wdXQpO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQob25GaWx0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5tdWx0aXBsZSAmJiAhY2hhbmdlcy5tdWx0aXBsZS5maXJzdENoYW5nZSAmJiBjaGFuZ2VzLm11bHRpcGxlLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5tdWx0aXBsZS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IHRoaXMuX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQgeyB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRDbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdElucHV0VGV4dCgpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEJsdXJIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xyXG5cclxuICAgICAgICAvLyBJZiBhIGNsaWNrIG9uIHRoZSB0eXBlYWhlYWQgaXMgaW4gcHJvZ3Jlc3MsIGp1c3QgcmVmb2N1cyB0aGUgaW5wdXQuXHJcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYW4gaXNzdWUgaW4gSUUgd2hlcmUgY2xpY2tpbmcgYSBzY3JvbGxiYXIgZHJvcHMgZm9jdXMuXHJcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlVHlwZWFoZWFkICYmIHRoaXMuc2luZ2xlVHlwZWFoZWFkLmNsaWNraW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG9zZSBkcm9wZG93biBhbmQgcmVzZXQgdGV4dCBpbnB1dCBpZiBmb2N1cyBpcyBsb3N0XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RGlzcGxheSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLZXkgaGFuZGxlciBmb3Igc2luZ2xlIHNlbGVjdCBvbmx5LiBNdWx0aXBsZSBzZWxlY3Qga2V5IGhhbmRsaW5nIGlzIGluIFRhZ0lucHV0Q29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBpbnB1dEtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gU3RhbmRhcmQga2V5cyBmb3IgdHlwZWFoZWFkICh1cC9kb3duL2VzYylcclxuICAgICAgICB0aGlzLl90eXBlYWhlYWRLZXlTZXJ2aWNlLmhhbmRsZUtleShldmVudCwgdGhpcy5zaW5nbGVUeXBlYWhlYWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZHJvcGRvd25PcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBoaWdobGlnaHRlZCBvcHRpb24gYXMgdGhlIHZhbHVlIGFuZCBjbG9zZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnNpbmdsZVR5cGVhaGVhZC5oaWdobGlnaHRlZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5wdXQgZmllbGQuIElmIGRyb3Bkb3duIGlzbid0IG9wZW4gdGhlbiByZXNldCBpdCB0byB0aGUgcHJldmlvdXMgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy5nZXREaXNwbGF5KHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaW5nbGVPcHRpb25TZWxlY3RlZChldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQub3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBldmVudC5vcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBnZXREaXNwbGF5KG9wdGlvbjogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAob3B0aW9uID09PSBudWxsIHx8IG9wdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheShvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycgJiYgb3B0aW9uLmhhc093blByb3BlcnR5KHRoaXMuZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbls8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RJbnB1dFRleHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdCgpO1xyXG4gICAgfVxyXG59Il19