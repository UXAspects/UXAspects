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

    @Input() @HostBinding('attr.id') id: string = `ux-select-${++uniqueId}`;

    @Input()
    set value(value: T) {
        this._value$.next(value);
    }
    get value() {
        return this._value$.value;
    }

    @Input()
    set input(value: string) {
        this._input$.next(value);
    }
    get input() {
        return this._input$.value;
    }

    @Input()
    set dropdownOpen(value: boolean) {
        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);
    }
    get dropdownOpen() {
        return this._dropdownOpen;
    }

    @Input() options: T[] | InfiniteScrollLoadFunction;
    @Input() display: (option: T) => string | string;
    @Input() key: (option: T) => string | string;
    @Input() allowNull: boolean = false;
    @Input() disabled: boolean = false;
    @Input() dropDirection: 'up' | 'down' = 'down';
    @Input() maxHeight: string = '250px';
    @Input() multiple: boolean = false;
    @Input() pageSize: number = 20;
    @Input() placeholder: string;
    @Input() autocomplete: string = 'off';

    @Input() loadingTemplate: TemplateRef<any>;
    @Input() noOptionsTemplate: TemplateRef<any>;
    @Input() optionTemplate: TemplateRef<any>;

    @Output() valueChange = new EventEmitter<T>();
    @Output() inputChange = new EventEmitter<string>();
    @Output() dropdownOpenChange = new EventEmitter<boolean>();

    @ViewChild('singleInput') singleInput: ElementRef;
    @ViewChild('tagInput') tagInput: TagInputComponent;
    @ViewChild('multipleTypeahead') multipleTypeahead: TypeaheadComponent;
    @ViewChild('singleTypeahead') singleTypeahead: TypeaheadComponent;

    highlightedElement: HTMLElement;
    filter$: Observable<string>;
    propagateChange = (_: any) => { };

    private _value$ = new BehaviorSubject<T>(null);
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
    getDisplay(option: T): string {
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

    private selectInputText(): void {
        this.singleInput.nativeElement.select();
    }
}