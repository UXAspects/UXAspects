import { ENTER, ESCAPE } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, StaticProvider, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, skip, take, takeUntil } from 'rxjs/operators';
import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TagApi, TagInputComponent } from '../tag-input/index';
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
    host: {
        '[class.ux-select-custom-icon]': '!!icon',
        '[class.ux-select-disabled]': 'disabled'
    }
})
export class SelectComponent<T> implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

    /** A unique id for the component. */
    @Input() @HostBinding('attr.id') id: string = `ux-select-${++uniqueId}`;

    /** The selected option (for single select) or array of options (for multiple select). */
    @Input()
    set value(value: T | ReadonlyArray<T>) {
        this._value$.next(value);
    }

    get value(): T | ReadonlyArray<T> {
        return this._value;
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
    @Input() placeholder: string = '';

    /**
     * A template which will be rendered as the content of each selected option. The following context
     * properties are available in the template via the TagTemplateContext:
     * - `tag: T` - the string or custom object representing the selected option.
     * - `index: number` - the zero-based index of the selected option as it appears in the dropdown.
     * - `api: TagApi` - provides the functions getTagDisplay, removeTagAt and canRemoveTagAt.
     */
    @Input() tagTemplate: TemplateRef<TagTemplateContext>;

    /**
     * Defines the `autocomplete` property on the `input` element which can be used to prevent the browser from
     * displaying autocomplete suggestions.
     */
    @Input() autocomplete: string = 'off';

    /** A template which will be rendered in the dropdown while options are being loaded. */
    @Input() loadingTemplate: TemplateRef<any>;

    /** A template which will be rendered in the dropdown if no options match the current filter value. */
    @Input() noOptionsTemplate: TemplateRef<any>;

    /** If `true` the input field will be readonly and selection can only occur by using the dropdown. */
    @Input() readonlyInput: boolean = false;

    /** Determine if we should show the clear all button */
    @Input() clearButton: boolean = false;

    /** Determine an aria label for the clear button */
    @Input() clearButtonAriaLabel: string = 'Reset selection';

    /**
     * A template which will be rendered in the dropdown for each option.
     * The following context properties are available in the template:
     * - option: any - the string or custom object representing the option.
     * - api: TypeaheadOptionApi - provides the functions `getKey`, `getDisplay` and `getDisplayHtml`.
     */
    @Input() optionTemplate: TemplateRef<any>;

    /** Container for saving the recently selected options. */
    @Input() recentOptions: ReadonlyArray<T>;

    /** Maximum number of displayed recent options. */
    @Input() recentOptionsMaxCount: number;

    /** Emits when `value` changes. */
    @Output() valueChange = new EventEmitter<T | ReadonlyArray<T>>();

    /** Emits when `input` changes. */
    @Output() inputChange = new EventEmitter<string>();

    /** Emits when `dropdownOpen` changes. */
    @Output() dropdownOpenChange = new EventEmitter<boolean>();

    /** Emits when recently selected options change. */
    @Output() recentOptionsChange = new EventEmitter<ReadonlyArray<T>>();

    /** Allow a custom icon to be used instead of the chevron */
    @ContentChild('icon', { static: false }) icon: TemplateRef<any>;

    @ViewChild('singleInput', { static: false }) singleInput: ElementRef;
    @ViewChild('tagInput', { static: false }) tagInput: TagInputComponent;
    @ViewChild('multipleTypeahead', { static: false }) multipleTypeahead: TypeaheadComponent;
    @ViewChild('singleTypeahead', { static: false }) singleTypeahead: TypeaheadComponent;

    highlightedElement: HTMLElement;
    filter$: Observable<string>;
    _value$ = new ReplaySubject<T | ReadonlyArray<T>>(1);
    _hasValue = false;


    /** We need to store the most recent value*/
    private _value: T | ReadonlyArray<T>;
    private _input$ = new BehaviorSubject<string>('');
    private _dropdownOpen: boolean = false;
    private _userInput: boolean = false;
    private _onChange = (_: any) => { };
    private _onTouched = () => { };
    private _onDestroy = new Subject<void>();

    constructor(
        private _element: ElementRef,
        private _platform: Platform,
        @Inject(DOCUMENT) private _document: any,
        private _typeaheadKeyService: TypeaheadKeyService) { }

    ngOnInit(): void {

        this._value$.pipe(skip(1), distinctUntilChanged(), takeUntil(this._onDestroy))
            .subscribe(value => this.valueChange.emit(value));

        // Emit change events
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this._value = value;
            this._onChange(value);
            this._hasValue = !!value;
        });

        this._input$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.inputChange.emit(value);
        });

        // Changes to the input field
        this._input$.pipe(
            filter(() => this.allowNull),
            filter(value => !this.multiple && value !== this.getDisplay(this.value)),
            takeUntil(this._onDestroy)
        ).subscribe(() => this.value = null);

        // Set up filter from input
        this.filter$ = this._input$.pipe(
            map(input => !this.multiple && input === this.getDisplay(this.value) ? '' : input),
            debounceTime(200)
        );

        // open the dropdown once the filter debounce has elapsed
        this.filter$.pipe(
            filter(() => this._userInput),
            take(1),
            takeUntil(this._onDestroy))
            .subscribe(() => {
                this.dropdownOpen = true;
                this._userInput = false;
            });

        // Update the single-select input when the model changes
        this._value$.pipe(
            distinctUntilChanged(),
            delay(0),
            filter(value => value !== null && !this.multiple),
            takeUntil(this._onDestroy)
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

    registerOnChange(fn: (value: T) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

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

        if (event.keyCode === ENTER) {
            if (this._dropdownOpen) {
                // Set the highlighted option as the value and close
                this.value = this.singleTypeahead.highlighted;
                this.dropdownOpen = false;
            } else {
                this.dropdownOpen = true;
            }

            // Update the input field. If dropdown isn't open then reset it to the previous value.
            this.input = this.getDisplay(this.value);
            this._typeaheadKeyService.addToRecentOptions(this.value, this.singleTypeahead);
            event.preventDefault();
        }

        // when the user types and the value is not empty then we should open the dropdown
        if (event.keyCode !== ESCAPE) {
            this._userInput = true;
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

        // if the select is disabled then do not show the dropdown
        if (this.disabled) {
            return;
        }

        if (this.dropdownOpen) {
            this.dropdownOpen = false;
        } else {
            this.inputClickHandler();
        }
    }

    /** Handle input focus events */
    onFocus(): void {

        // mark form control as touched
        this._onTouched();

        // if the input is readonly we do not want to select the text on focus
        if (this.readonlyInput) {
            // cast the select input element
            const element = this.singleInput.nativeElement as HTMLInputElement;

            // firefox requires a delay before clearing the selection (other browsers don't)
            this._platform.FIREFOX ? requestAnimationFrame(() => element.setSelectionRange(0, 0)) : element.setSelectionRange(0, 0);
        }
    }

    clear(): void {
        if (this.disabled) {
            return;
        }

        // clear the value and input text
        this.value = null;
        this.input = null;
        this.selectInputText();
    }

    private selectInputText(): void {
        if (!this.readonlyInput) {
            this.singleInput.nativeElement.select();
        }
    }
}

export interface TagTemplateContext<T = string | any> {
    tag: T;
    index: number;
    api: TagApi;
}