import { ENTER } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, StaticProvider, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, delay, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TagInputComponent } from '../tag-input/index';
import { TypeaheadComponent, TypeaheadKeyService, TypeaheadOptionEvent } from '../typeahead/index';

let uniqueId = 0;

export const SELECT_VALUE_ACCESSOR: StaticProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
    selector: 'ux-select, ux-combobox, ux-dropdown',
    templateUrl: 'select.component.html',
    providers: [SELECT_VALUE_ACCESSOR],
})
export class SelectComponent<T> implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

    /** A unique id for the component. */
    @Input() @HostBinding('attr.id') id: string = `ux-select-${++uniqueId}`;

    /** The selected option (for single select) or array of options (for multiple select). */
    @Input()
    set value(value: T | ReadonlyArray<T>) {
        this._value$.next(value);
    }
    get value() {
        return this._value$.value;
    }

    /** The text in the input area. This is used to filter the options dropdown. */
    @Input()
    set input(value: string) {
        this._input$.next(value);
    }
    get input() {
        return this._input$.value;
    }

    /** The status of the typeahead dropdown. */
    @Input()
    set dropdownOpen(value: boolean) {
        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);
    }
    get dropdownOpen() {
        return this._dropdownOpen;
    }

    /**
     * If an array is provided, this is the list of options which can be chosen from. It can be an array of strings or
     * custom objects. If custom objects are required, the display property must also be set. If a function is provided,
     * this is used as a callback to dynamically retrieve data in pages. The function parameters are:
     * @param pageNum The index of the requested page, starting from 0.
     * @param pageSize The number of items requested.
     * @param filter The filter details as provided via the filter binding.
     * @returns Either a promise which resolves to an array, or a plain array in case the data can be loaded
     * synchronously. An empty array or an array with fewer than `pageSize` items can be returned, which indicates that
     * the end of the data set has been reached.
     */
    @Input() options: T[] | InfiniteScrollLoadFunction;

    /**
     * Determines the display value of the `options`, if they are custom objects. This may be a function or a string.
     * If a function is provided, it receives the option object as an argument, and should return the appropriate
     * display value. If the name of a property is provided as a string, that property is used as the display value.
     */
    @Input() display: ((option: T) => string) | string;

    /**
     * Determines the unique key value of the `options`, if they are custom objects. This may be a function or a string.
     * If a function is provided, it receives the option object as an argument, and should return the appropriate
     * key value. If the name of a property is provided as a string, that property is used as the key value.
     */
    @Input() key: ((option: T) => string) | string;

    /**
     * Controls whether the value of the single select control can be cleared by deleting the selected value in the
     * input field. This does not affect the initial state of the control, so specify a value for `value` if null should
     * never be allowed.
     */
    @Input() allowNull: boolean = false;

    /** The aria-label to apply to the child `input` element. */
    @Input() ariaLabel: string;

    /** Controls the disabled state of the tag input. */
    @Input() disabled: boolean = false;

    /** The positioning of the typeahead dropdown in relation to its parent. */
    @Input() dropDirection: 'up' | 'down' = 'down';

    /** The maximum height of the typeahead dropdown, as a CSS value. */
    @Input() maxHeight: string = '250px';

    /**
     * Controls whether the user can select more than one option in the select control. If set to true, selected
     * options will appear as tags in the input area. If set to false, the selected value will appear as editable text
     * in the input area.
     */
    @Input() multiple: boolean = false;

    /**
     * The number of options to request in a page. This should ideally be more than twice the number of items which
     * fit into the height of the dropdown, but this is not required.
     */
    @Input() pageSize: number = 20;

    /** The placeholder text which appears in the text input area when it is empty. */
    @Input() placeholder: string;

    /**
     * Defines the `autocomplete` property on the `input` element which can be used to prevent the browser from
     * displaying autocomplete suggestions.
     */
    @Input() autocomplete: string = 'off';

    /** A template which will be rendered in the dropdown while options are being loaded. */
    @Input() loadingTemplate: TemplateRef<any>;

    /** A template which will be rendered in the dropdown if no options match the current filter value. */
    @Input() noOptionsTemplate: TemplateRef<any>;

    /**
     * A template which will be rendered in the dropdown for each option.
     * The following context properties are available in the template:
     * - option: any - the string or custom object representing the option.
     * - api: TypeaheadOptionApi - provides the functions `getKey`, `getDisplay` and `getDisplayHtml`.
     */
    @Input() optionTemplate: TemplateRef<any>;

    /** Emits when `value` changes. */
    @Output() valueChange = new EventEmitter<T | ReadonlyArray<T>>();

    /** Emits when `input` changes. */
    @Output() inputChange = new EventEmitter<string>();

    /** Emits when `dropdownOpen` changes. */
    @Output() dropdownOpenChange = new EventEmitter<boolean>();

    @ViewChild('singleInput') singleInput: ElementRef;
    @ViewChild('tagInput') tagInput: TagInputComponent;
    @ViewChild('multipleTypeahead') multipleTypeahead: TypeaheadComponent;
    @ViewChild('singleTypeahead') singleTypeahead: TypeaheadComponent;

    highlightedElement: HTMLElement;
    filter$: Observable<string>;
    propagateChange = (_: any) => { };

    private _value$ = new BehaviorSubject<T | ReadonlyArray<T>>(null);
    private _input$ = new BehaviorSubject<string>('');
    private _dropdownOpen: boolean = false;
    private _onDestroy = new Subject<void>();

    constructor(
        private _element: ElementRef,
        @Inject(DOCUMENT) private _document: any,
        private _typeaheadKeyService: TypeaheadKeyService) { }

    ngOnInit(): void {

        // Emit change events
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.valueChange.emit(value);
            this.propagateChange(value);
        });

        this._input$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.inputChange.emit(value);
        });

        // Changes to the input field
        this._input$.pipe(
            takeUntil(this._onDestroy),
            filter(() => this.allowNull),
            filter(value => !this.multiple && value !== this.getDisplay(this.value))
        ).subscribe(() => this.value = null);

        // Set up filter from input
        this.filter$ = this._input$.pipe(
            map(input => !this.multiple && input === this.getDisplay(this.value) ? '' : input),
            debounceTime(200)
        );

        // Open the dropdown when filter is nonempty.
        this.filter$.pipe(
            takeUntil(this._onDestroy),
            filter(value => value && value.length > 0)
        ).subscribe(() => this.dropdownOpen = true);

        // Update the single-select input when the model changes
        this._value$.pipe(
            takeUntil(this._onDestroy),
            distinctUntilChanged(),
            delay(0),
            filter(value => value !== null && !this.multiple)
        ).subscribe(value => {
            this.input = this.getDisplay(value);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.multiple && !changes.multiple.firstChange && changes.multiple.currentValue !== changes.multiple.previousValue) {
            this.input = '';
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    writeValue(obj: T): void {
        if (obj !== undefined && obj !== this.value) {
            this.value = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: T): void { }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    inputClickHandler(): void {
        this.selectInputText();
        this.dropdownOpen = true;
    }

    inputBlurHandler(): void {

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
     */
    inputKeyHandler(event: KeyboardEvent): void {

        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);

        switch (event.keyCode) {
            case ENTER:
                if (this._dropdownOpen) {
                    // Set the highlighted option as the value and close
                    this.value = this.singleTypeahead.highlighted;
                    this.dropdownOpen = false;
                } else {
                    this.dropdownOpen = true;
                }

                // Update the input field. If dropdown isn't open then reset it to the previous value.
                this.input = this.getDisplay(this.value);
                event.preventDefault();
                break;
        }
    }

    singleOptionSelected(event: TypeaheadOptionEvent): void {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }

    /**
     * Returns the display value of the given option.
     */
    getDisplay(option: any): string {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[<string>this.display];
        }
        return option as any;
    }

    /** Toggle the dropdown open state */
    toggle(): void {
        if (this.dropdownOpen) {
            this.dropdownOpen = false;
        } else {
            this.inputClickHandler();
        }
    }

    private selectInputText(): void {
        this.singleInput.nativeElement.select();
    }
}