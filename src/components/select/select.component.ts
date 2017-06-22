import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadComponent, TypeaheadKeyService, TypeaheadOptionEvent } from '../typeahead/index';
import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export const SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
    selector: 'ux-select',
    templateUrl: 'select.component.html',
    providers: [SELECT_VALUE_ACCESSOR]
})
export class SelectComponent implements OnInit, OnChanges, ControlValueAccessor {

    private _value: any;
    @Input('value')
    get value() {
        return this._value;
    }
    set value(value: any) {
        this._value = value;
        this.valueChange.emit(value);
        this.propagateChange(value);
    }

    @Output() valueChange = new EventEmitter<any>();

    private _input = new BehaviorSubject<string>('');
    @Input('input')
    get input() {
        return this._input.getValue();
    }
    set input(value: string) {
        this._input.next(value);
        this.inputChange.emit(value);
    }

    @Output() inputChange = new EventEmitter<string>();

    private _dropdownOpen: boolean = false;
    @Input('dropdownOpen')
    get dropdownOpen() {
        return this._dropdownOpen;
    }
    set dropdownOpen(value: boolean) {
        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);
    }

    @Output() dropdownOpenChange = new EventEmitter<boolean>();

    @Input() options: any[] | InfiniteScrollLoadFunction;
    @Input() display: (option: any) => string | string;
    @Input() key: (option: any) => string | string;
    @Input() allowNull: boolean = false;
    @Input() disabled: boolean = false;
    @Input() dropDirection: 'up' | 'down' = 'down';
    @Input() maxHeight: string = '250px';
    @Input() multiple: boolean = false;
    @Input() pageSize: number = 20;
    @Input() placeholder: string;
    
    @Input() loadingTemplate: TemplateRef<any>;
    @Input() noOptionsTemplate: TemplateRef<any>;
    @Input() optionTemplate: TemplateRef<any>;

    @ViewChild('singleInput') protected singleInput: ElementRef;
    @ViewChild('multipleTypeahead') protected multipleTypeahead: TypeaheadComponent;
    @ViewChild('singleTypeahead') protected singleTypeahead: TypeaheadComponent;

    protected filter: Observable<string>;

    private propagateChange = (_: any) => { };

    constructor(
        private _element: ElementRef,
        @Inject(DOCUMENT) private _document: HTMLDocument,
        private _typeaheadKeyService: TypeaheadKeyService) { }

    ngOnInit() {

        // Changes to the input field
        this._input.subscribe((next) => {
            if (!this.multiple && next !== this.getDisplay(this.value)) {
                if (this.allowNull) {
                    this.value = null;
                }
            }
        });

        // Set up filter from input
        this.filter = this._input
            .map((input) => {
                if (!this.multiple && input === this.getDisplay(this.value)) {
                    return '';
                }
                return input;
            })
            .debounceTime(200);
        
        // Changes to filter value
        this.filter.subscribe((next) => {

            // Open the dropdown when filter is nonempty.
            if (next && next.length > 0) {
                this.dropdownOpen = true;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.value) {
            if (!this.multiple && changes.value.currentValue !== null) {
                this.input = this.getDisplay(changes.value.currentValue);
            }
        }
        if (changes.multiple && changes.multiple.currentValue !== changes.multiple.previousValue) {
            this.input = '';
        }
    }

    writeValue(obj: any): void {
        if (obj !== undefined) {
            this._value = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    protected inputClickHandler(event: MouseEvent) {
        this.selectInputText();
        this.dropdownOpen = true;
    }

    protected inputBlurHandler(event: Event) {
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
    protected inputKeyHandler(event: KeyboardEvent) {

        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);

        switch (event.key) {
            case 'Enter':
                if (this.dropdownOpen) {
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

    protected singleOptionSelected(event: TypeaheadOptionEvent) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }

    /**
     * Returns the display value of the given option.
     */
    protected getDisplay(option: any): string {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[<string>this.display];
        }
        return option;
    }

    private selectInputText() {
        this.singleInput.nativeElement.select();
    }
}