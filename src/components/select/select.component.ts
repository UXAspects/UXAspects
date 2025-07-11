import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import { ENTER } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  StaticProvider,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  skip,
  take,
  takeUntil,
} from 'rxjs/operators';
import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TagInputComponent, TagTemplateContext } from '../tag-input/index';
import { TypeaheadComponent, TypeaheadKeyService, TypeaheadOptionEvent } from '../typeahead/index';
import { TypeaheadOptionContext } from '../typeahead/typeahead-option-context';

let uniqueId = 0;

export const SELECT_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'ux-select, ux-combobox, ux-dropdown',
  templateUrl: 'select.component.html',
  providers: [SELECT_VALUE_ACCESSOR],
  host: {
    '[class.ux-select-custom-icon]': '!!icon',
    '[class.ux-select-disabled]': 'disabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectComponent<T> implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  private readonly _element = inject(ElementRef);

  private readonly _platform = inject(Platform);

  private readonly _typeaheadKeyService = inject(TypeaheadKeyService);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  private readonly _document = inject<Document>(DOCUMENT);

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
    this._input$.next({ ...this._input$.value, value });
  }
  get input() {
    return this._input$.value.value;
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

  /** ID of the element which serves as a label for the input element. */
  @Input() ariaLabelledby: string;

  /** The aria-label to apply to the typeahead listbox */
  @Input() listboxAriaLabel: string;

  /** Controls the disabled state of the tag input. */
  @Input() disabled: boolean = false;

  /** The positioning of the typeahead dropdown in relation to its parent. */
  @Input() dropDirection: 'auto' | 'up' | 'down' = 'down';

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

  @Input() optionsHeadingTemplate: TemplateRef<void>;

  @Input() recentOptionsHeadingTemplate: TemplateRef<void>;

  /**
   * Defines the `autocomplete` property on the `input` element which can be used to prevent the browser from
   * displaying autocomplete suggestions.
   */
  @Input() autocomplete: string = 'off';

  /** A template which will be rendered in the dropdown while options are being loaded. */
  @Input() loadingTemplate: TemplateRef<void>;

  /** A template which will be rendered in the dropdown if no options match the current filter value. */
  @Input() noOptionsTemplate: TemplateRef<void>;

  /** If `true` the input field will be readonly and selection can only occur by using the dropdown. */
  @Input() readonlyInput: boolean = false;

  /** Determine if we should show the clear all button */
  @Input() clearButton: boolean = false;

  /** Determine an aria label for the clear button */
  @Input() clearButtonAriaLabel: string = 'Reset selection';

  /** Determine if the dropdown panel should close on external click.*/
  @Input() set autoCloseDropdown(value: boolean) {
    this._autoCloseDropdown = coerceBooleanProperty(value);
  }

  get autoCloseDropdown(): boolean {
    return this._autoCloseDropdown;
  }

  /**
   * A template which will be rendered in the dropdown for each option.
   * The following context properties are available in the template:
   * - option: any - the string or custom object representing the option.
   * - api: TypeaheadOptionApi - provides the functions `getKey`, `getDisplay` and `getDisplayHtml`.
   */
  @Input() optionTemplate: TemplateRef<TypeaheadOptionContext<T>>;

  /**
   * An initial list of recently selected options, to be presented above the full list of options.
   * Bind an empty array to `recentOptions` to enable this feature without providing an initial set.
   */
  @Input() recentOptions: ReadonlyArray<T>;

  /** Maximum number of displayed recently selected options. */
  @Input() recentOptionsMaxCount: number;

  /** Specified if this is a required input. */
  @Input() required: boolean;

  /** Specify the debounceTime value for the select filter */
  @Input() get filterDebounceTime(): number {
    return this._filterDebounceTime;
  }

  set filterDebounceTime(filterDebounceTime: number) {
    this._filterDebounceTime = coerceNumberProperty(filterDebounceTime);
  }

  /** Emits when `value` changes. */
  @Output() valueChange = new EventEmitter<T | ReadonlyArray<T>>();

  /** Emits when `input` changes. */
  @Output() inputChange = new EventEmitter<string>();

  /** Emits when `dropdownOpen` changes. */
  @Output() dropdownOpenChange = new EventEmitter<boolean>();

  /** Emits when recently selected options change. */
  @Output() recentOptionsChange = new EventEmitter<ReadonlyArray<T>>();

  /** Allow a custom icon to be used instead of the chevron */
  @ContentChild('icon', { static: false }) icon: TemplateRef<void>;

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
  private readonly _input$ = new BehaviorSubject<InputValue>({ userInteraction: false, value: '' });
  private _dropdownOpen: boolean = false;
  private _userInput: boolean = false;
  private _filterDebounceTime: number = 200;
  private _autoCloseDropdown: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange = (_: T | ReadonlyArray<T>) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched = () => {};
  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    // Emit change events
    this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
      this._value = value;
      this._hasValue = !!value;
    });

    // Changes to the input field
    this._input$
      .pipe(
        skip(1),
        filter(() => this.allowNull),
        filter(value => !this.multiple && value.value !== this.getDisplay(this.value)),
        takeUntil(this._onDestroy)
      )
      .subscribe(input => {
        if (input.userInteraction && input.value === '') {
          this.value = null;
          this._onChange(null);
          this.valueChange.next(null);
        }
      });

    // open the dropdown once the filter debounce has elapsed
    this.filter$
      .pipe(
        filter(() => this._userInput),
        take(1),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        this.dropdownOpen = true;
        this._userInput = false;
      });

    // Update the single-select input when the model changes
    this._value$
      .pipe(
        distinctUntilChanged(),
        delay(0),
        filter(value => value !== null && !this.multiple),
        takeUntil(this._onDestroy)
      )
      .subscribe(value => {
        const inputValue = this.getDisplay(value);

        // check if the input value has changed and if so the emit
        if (inputValue !== this.input) {
          this.input = inputValue;
          this.inputChange.emit(this.input);
        }

        this._changeDetector.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.multiple &&
      !changes.multiple.firstChange &&
      changes.multiple.currentValue !== changes.multiple.previousValue
    ) {
      this.input = '';
    }

    // Set up filter from input
    this.filter$ = this._input$.pipe(
      map(input =>
        !this.multiple && input.value === this.getDisplay(this.value) ? '' : input.value
      ),
      debounceTime(this.filterDebounceTime)
    );
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  writeValue(obj: T): void {
    if (obj !== undefined && obj !== this.value) {
      this.value = obj;
      this._changeDetector.markForCheck();
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
    this._changeDetector.markForCheck();
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
      if (
        !this._element.nativeElement.contains(this._document.activeElement) &&
        this._autoCloseDropdown
      ) {
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
        this.singleTypeahead.selectHighlighted();
      } else {
        this.dropdownOpen = true;
      }

      // Update the input field. If dropdown isn't open then reset it to the previous value.
      this.input = this.getDisplay(this.value);
      event.preventDefault();
    }

    // when the user types and the value is not empty then we should open the dropdown except for non printable keys.
    if (event.key.length === 1) {
      this._userInput = true;
      this._dropdownOpen = true;
    }
  }

  /** This gets called whenever the user types in the input */
  onInputChange(input: string): void {
    this._input$.next({
      value: input,
      userInteraction: true,
    });

    this.inputChange.emit(this.input);
  }

  /** Whenever a single select item is selected emit the values */
  _singleOptionSelected(event: TypeaheadOptionEvent): void {
    if (event.option !== null && event.option !== this.value) {
      this.value = event.option;
      this.dropdownOpen = false;
      this.valueChange.emit(this.value);
      this._onChange(this.value);
    }
  }

  /** Whenever a multi-select item is selected emit the values */
  _multipleOptionSelected(selection: ReadonlyArray<T>): void {
    // update the internal selection
    this._value$.next(selection);
    this.valueChange.emit(this.value);
    this._onChange(this.value);
  }

  /**
   * Returns the display value of the given option.
   */
  getDisplay(option: T | readonly T[]): string {
    if (option === null || option === undefined) {
      return '';
    }

    if (typeof this.display === 'function') {
      return this.display(option as T);
    }

    if (
      typeof this.display === 'string' &&
      typeof option === 'object' &&
      // eslint-disable-next-line no-prototype-builtins
      option.hasOwnProperty(this.display)
    ) {
      return option[this.display];
    }

    return option as string;
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
      this._platform.FIREFOX
        ? requestAnimationFrame(() => element.setSelectionRange(0, 0))
        : element.setSelectionRange(0, 0);
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

    // emit the latest values
    this.valueChange.emit(this.value);
    this._onChange(this.value);
    this.inputChange.emit(this.input);
  }

  private selectInputText(): void {
    if (!this.readonlyInput) {
      this.singleInput.nativeElement.select();
    }
  }

  static ngAcceptInputType_filterDebounceTime: NumberInput;
  static ngAcceptInputType_autoCloseDropdown: BooleanInput;
}

interface InputValue {
  value: string;
  userInteraction: boolean;
}
