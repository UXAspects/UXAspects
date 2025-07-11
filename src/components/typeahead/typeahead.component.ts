import { FocusOrigin } from '@angular/cdk/a11y';
import { coerceArray } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  InfiniteScrollDirective,
  InfiniteScrollLoadedEvent,
  InfiniteScrollLoadFunction,
} from '../../directives/infinite-scroll/index';
import {
  PopoverOrientation,
  PopoverOrientationListener,
  PopoverOrientationService,
} from '../../services/popover-orientation/popover-orientation.service';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadOptionApi } from './typeahead-option-api';
import { TypeaheadOptionContext } from './typeahead-option-context';
import { TypeaheadVisibleOption } from './typeahead-visible-option';
import { TypeaheadService } from './typeahead.service';

let uniqueId = 0;

@Component({
  selector: 'ux-typeahead',
  templateUrl: 'typeahead.component.html',
  providers: [TypeaheadService, PopoverOrientationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.open]': 'open',
    '[style.maxHeight]': 'maxHeight',
  },
  standalone: false,
})
export class TypeaheadComponent<T = any> implements OnChanges, OnDestroy {
  readonly typeaheadElement = inject(ElementRef);

  readonly popoverOrientation = inject(PopoverOrientationService);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  private readonly _service = inject(TypeaheadService);

  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  /** Define a unique id for the typeahead */
  @Input() @HostBinding('attr.id') id: string = `ux-typeahead-${++uniqueId}`;

  /** Define the options or infinite load function */
  @Input() options: T[] | InfiniteScrollLoadFunction;

  /** Define the filter text */
  @Input() filter: string;

  /** Specify if the typeahead is open */
  @Input()
  get open() {
    return this._service.open$.getValue();
  }
  set open(value: boolean) {
    this._service.open$.next(value);
  }

  /** Extract the test to display from an option */
  @Input() display: ((option: T) => string) | string;

  /** Extract the key from an option */
  @Input() key: ((option: T) => string) | string;

  /** Specify which options are disabled */
  @Input() set disabledOptions(options: T | T[]) {
    this._disabledOptions = coerceArray(options);
  }

  get disabledOptions(): T | T[] {
    return this._disabledOptions;
  }

  _disabledOptions: T[] = [];

  /** Specify the drop direction */
  @Input() dropDirection: 'auto' | 'up' | 'down' = 'down';

  /** Specify the max height of the dropdown */
  @Input()
  get maxHeight(): string {
    return this._maxHeight;
  }

  set maxHeight(maxHeight: string) {
    this._maxHeight = maxHeight;
    if (this.maxHeight.endsWith('px')) {
      this._popoverOrientationListener.maxHeight = Number(this.maxHeight.slice(0, -2));
    }
  }

  /** Specify the aria multi selectable attribute value */
  @Input()
  multiselectable: boolean = false;

  /** Specify the aria label for the listbox */
  @Input()
  ariaLabel: string;

  /** Specify if the dropdown should appear when the filter appears */
  @Input() openOnFilterChange: boolean = true;

  /** Specify the page size */
  @Input() pageSize: number = 20;

  /** Specify if we should select the first item by default */
  @Input() selectFirst: boolean = true;

  /** Specify if we should select an item on enter key press */
  @Input() selectOnEnter: boolean = false;

  /** Specify the loading state */
  @Input() loading = false;

  /** Specify a custom loading template */
  @Input() loadingTemplate: TemplateRef<void>;

  /** Specify a custom option template */
  @Input() optionTemplate: TemplateRef<TypeaheadOptionContext<T>>;

  /** Specify a custom template to display when there are no options */
  @Input() noOptionsTemplate: TemplateRef<void>;

  /** Specify the currently active item */
  @Input() set active(item: T) {
    this.activeKey = this.getKey(item);
  }

  /**
   * An initial list of recently selected options, to be presented above the full list of options.
   * Bind an empty array to `recentOptions` to enable this feature without providing an initial set.
   */
  @Input() recentOptions: ReadonlyArray<T>;

  /** Maximum number of displayed recently selected options. */
  @Input() recentOptionsMaxCount: number = 5;

  @Input() recentOptionsHeadingTemplate: TemplateRef<void>;

  @Input() optionsHeadingTemplate: TemplateRef<void>;

  /** Emit when the open state changes */
  @Output() openChange = new EventEmitter<boolean>();

  /** Emit when an option is selected */
  @Output() optionSelected = new EventEmitter<TypeaheadOptionEvent<T>>();

  /** Emit whenever a highlighted item changes */
  @Output() highlightedChange = new EventEmitter<T>();

  /** Emit the highlighted element when it changes */
  @Output() highlightedElementChange = new EventEmitter<HTMLElement>();

  /** Emits when recently selected options change.*/
  @Output() recentOptionsChange = new EventEmitter<ReadonlyArray<T>>();

  activeKey: string = null;
  clicking = false;
  hasBeenOpened = false;
  highlighted$ = new BehaviorSubject<TypeaheadVisibleOption<T>>(null);
  loadOptionsCallback: InfiniteScrollLoadFunction;
  visibleOptions$ = new BehaviorSubject<TypeaheadVisibleOption<T>[]>([]);
  visibleRecentOptions$ = new BehaviorSubject<TypeaheadVisibleOption<T>[]>([]);
  allVisibleOptions: TypeaheadVisibleOption<T>[] = [];

  get highlighted(): T {
    const value = this.highlighted$.getValue();
    return value ? value.value : null;
  }

  /** Store the list of recent items */
  private _recentOptions: T[];

  private readonly _onDestroy = new Subject<void>();

  private readonly _popoverOrientationListener: PopoverOrientationListener;

  private _maxHeight = '250px';

  @HostBinding('class.drop-up')
  dropUp: boolean;

  optionApi: TypeaheadOptionApi<T> = {
    getKey: this.getKey.bind(this),
    getDisplay: this.getDisplay.bind(this),
    getDisplayHtml: this.getDisplayHtml.bind(this),
    getDisabled: this.isDisabled.bind(this),
  };

  constructor() {
    this.loadOptionsCallback = (pageNum: number, pageSize: number, filter: unknown) => {
      if (typeof this.options === 'function') {
        // Invoke the callback which may return an array or a promise.
        const arrayOrPromise = this.options(pageNum, pageSize, filter);

        // Map the results to an array of TypeaheadVisibleOption.
        return Promise.resolve(arrayOrPromise).then(newOptions => {
          if (!Array.isArray(newOptions)) {
            return newOptions;
          }

          return this.getVisibleOptions(newOptions, '');
        });
      }
      return null;
    };

    this._service.open$
      .pipe(distinctUntilChanged(), takeUntil(this._onDestroy))
      .subscribe(isOpen => {
        this.openChange.emit(isOpen);

        if (isOpen) {
          this.hasBeenOpened = true;
          this.initOptions();
        }
      });

    this._popoverOrientationListener = this.popoverOrientation.createPopoverOrientationListener(
      this.typeaheadElement.nativeElement,
      this.typeaheadElement.nativeElement.parentElement
    );

    this._popoverOrientationListener.orientation$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(direction => {
        if (this.dropDirection === 'auto') {
          this.dropUp = direction === PopoverOrientation.Up;
        }
      });

    this.highlighted$.pipe(takeUntil(this._onDestroy)).subscribe(next => {
      this.highlightedChange.emit(next ? next.value : null);
    });

    combineLatest([this.visibleOptions$, this.visibleRecentOptions$])
      .pipe(takeUntil(this._onDestroy))
      .subscribe(([visibleOptions, visibleRecentOptions]) => {
        this.allVisibleOptions = [...visibleRecentOptions, ...visibleOptions];
      });

    combineLatest([this._service.open$, this._service.highlightedElement$, this.visibleOptions$])
      .pipe(takeUntil(this._onDestroy))
      .subscribe(([open, highlightedElement, visibleOptions]) => {
        this.highlightedElementChange.emit(
          open && visibleOptions.length > 0 ? highlightedElement : null
        );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Open the dropdown if the filter value updates
    if (changes.filter) {
      if (
        this.openOnFilterChange &&
        changes.filter.currentValue &&
        changes.filter.currentValue.length > 0
      ) {
        // if the dropdown item was just selected, and we set the filter value to match the
        // selected value then open will have also just been set to `false`, in which case we do
        // not want to set open to `true`
        if (
          changes.open &&
          changes.open.previousValue === true &&
          changes.open.currentValue === false
        ) {
          return;
        }

        // show the dropdown
        this.open = true;
      }
    }

    // Cut off recentOptions at recentOptionsMaxCount
    if (changes.recentOptions || changes.recentOptionsMaxCount) {
      this._recentOptions = this.recentOptions
        ? this.recentOptions.slice(0, this.recentOptionsMaxCount)
        : undefined;

      if (changes.recentOptionsMaxCount) {
        // Avoid ExpressionChangedAfterChecked error
        setTimeout(() => {
          this.recentOptionsChange.emit(this._recentOptions);
        });
      }
    }

    if (changes.dropDirection) {
      if (changes.dropDirection.currentValue === 'auto') {
        this.dropUp =
          this._popoverOrientationListener.orientation$.getValue() === PopoverOrientation.Up;
      } else {
        this.dropUp = changes.dropDirection.currentValue === 'up';
      }
    }

    if (changes.options && changes.options.firstChange === false) {
      this.infiniteScroll.reset(false);
      this.infiniteScroll.reload();
    }

    // Re-filter visibleOptions
    this.updateOptions();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    this._popoverOrientationListener.destroy();
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  mousedownHandler(event: MouseEvent, target: HTMLElement): void {
    this.clicking = true;

    /**
     * Chrome Bug Workaround: (https://bugs.chromium.org/p/chromium/issues/detail?id=6759)
     * In Chrome, if the typeahead is within a tabbable element, e.g. it has a parent with
     * `tabindex="0"` like our side panel has, then clicking on a scrollbar will remove
     * focus from the input element.
     *
     * To avoid this we can determine if the mousedown event occurred within the scrollbar
     * region of the typeahead and if so preventDefault which will stop the input
     * from losing focus
     */
    if (event.clientX >= target.clientWidth || event.clientY >= target.clientHeight) {
      event.preventDefault();
    }
  }

  @HostListener('mouseup')
  mouseupHandler(): void {
    this.clicking = false;
  }

  optionMousedownHandler(event: MouseEvent): void {
    // Workaround to prevent focus changing when an option is clicked
    event.preventDefault();
  }

  optionClickHandler(_event: MouseEvent, option: TypeaheadVisibleOption<T>): void {
    this.select(option, 'mouse');
  }

  /**
   * Returns the unique key value of the given option.
   */
  getKey(option: T): string {
    if (typeof this.key === 'function') {
      return this.key(option);
    }
    // eslint-disable-next-line no-prototype-builtins
    if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
      return option[this.key];
    }
    return this.getDisplay(option);
  }

  /**
   * Returns the display value of the given option.
   */
  getDisplay(option: T): string | undefined {
    if (typeof this.display === 'function') {
      return this.display(option);
    }

    // eslint-disable-next-line no-prototype-builtins
    if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
      return option[this.display];
    }

    if (typeof option === 'string') {
      return option;
    }
  }

  /**
   * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
   * @param option
   */
  getDisplayHtml(option: T): string {
    const displayText = this.getDisplay(option);

    // getDisplay may return undefined in certain cases
    if (!displayText) {
      return '';
    }

    let displayHtml = displayText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (this.filter) {
      const length = this.filter.length;
      const matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
      if (matchIndex >= 0) {
        const highlight = `<span class="ux-filter-match">${displayText.substr(
          matchIndex,
          length
        )}</span>`;
        displayHtml =
          displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
      }
    }
    return displayHtml;
  }

  /**
   * Returns true if the infinite scroll component should load
   */
  isInfiniteScroll(): boolean {
    return typeof this.options === 'function';
  }

  /**
   * Selects the given option, emitting the optionSelected event and closing the dropdown.
   */
  select(option: TypeaheadVisibleOption<T>, origin?: FocusOrigin): void {
    if (!this.isDisabled(option.value)) {
      this.optionSelected.emit(new TypeaheadOptionEvent(option.value, origin));
      this.highlighted$.next(null);
      this.open = false;
      this.addToRecentOptions(option.value);
    }
  }

  addToRecentOptions(value: T) {
    if (this._recentOptions) {
      this._recentOptions = [
        value,
        ...this._recentOptions.filter(recentOption => recentOption !== value),
      ].slice(0, this.recentOptionsMaxCount);

      this.recentOptionsChange.emit(this._recentOptions);
    }
  }

  /**
   * Returns true if the given option is part of the disabledOptions array.
   */
  isDisabled(option: T): boolean {
    return Array.isArray(this.disabledOptions)
      ? this.disabledOptions.some(
          selectedOption => this.getKey(selectedOption) === this.getKey(option)
        )
      : false;
  }

  /**
   * Set the given option as the current highlighted option, available in the highlightedOption parameter.
   */
  highlight(option: TypeaheadVisibleOption<T>): void {
    if (!this.isDisabled(option.value)) {
      this.highlighted$.next(option);
      this._changeDetector.detectChanges();
    }
  }

  /**
   * Increment or decrement the highlighted option in the list. Disabled options are skipped.
   * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
   */
  moveHighlight(d: -1 | 1): T {
    const highlightIndex = this.indexOfVisibleOption(this.highlighted$.getValue());
    let newIndex = highlightIndex;
    let disabled = true;
    let inBounds = true;
    do {
      newIndex = newIndex + d;
      inBounds = newIndex >= 0 && newIndex < this.allVisibleOptions.length;
      disabled = inBounds && this.isDisabled(this.allVisibleOptions[newIndex].value);
    } while (inBounds && disabled);

    if (!disabled && inBounds) {
      this.highlight(this.allVisibleOptions[newIndex]);
    }

    return this.highlighted;
  }

  selectHighlighted(): void {
    if (this.highlighted$.getValue()) {
      this.select(this.highlighted$.getValue(), 'keyboard');
    }
  }

  /**
   * Set up the options before the dropdown is displayed.
   */
  initOptions(): void {
    // Clear previous highlight
    this.highlighted$.next(null);
    if (this.selectFirst) {
      // This will highlight the first non-disabled option.
      this.moveHighlight(1);
    }
  }

  /**
   * Display the first item as highlighted when there are several pages
   */
  onLoadedHighlight(event: InfiniteScrollLoadedEvent): void {
    if (this.selectFirst && this.options && event.pageNumber === 0) {
      // This will highlight the first non-disabled option.
      this.moveHighlight(1);
    }
  }

  /**
   * Update the visibleOptions and visibleRecentOptions arrays with the current filter.
   */
  updateOptions(): void {
    const normalisedInput = (this.filter || '').toLowerCase();

    // Create new visibleOptions only if `options` is not a function
    if (typeof this.options === 'object') {
      this.visibleOptions$.next(this.getVisibleOptions(this.options, normalisedInput));
    }

    this.visibleRecentOptions$.next(
      this.getVisibleOptions(this._recentOptions, normalisedInput, true)
    );

    this.initOptions();

    this._changeDetector.detectChanges();
  }

  /**
   * Convert a set of raw options into a filtered list of `TypeaheadVisibleOption` objects.
   * @param options Set of raw options
   * @param filter The filter expression
   * @param isRecentOptions Whether `options` is a set of recent options
   */
  private getVisibleOptions(
    options: T[],
    filter: string = '',
    isRecentOptions: boolean = false
  ): TypeaheadVisibleOption<T>[] {
    if (options) {
      return options
        .filter(option => this.getDisplay(option).toLowerCase().indexOf(filter) >= 0)
        .map(value => ({
          value,
          key: this.getKey(value),
          isRecentOption: isRecentOptions,
        }));
    }

    return [];
  }

  /**
   * Return the index of the given option in the allVisibleOptions array.
   * Returns -1 if the option is not currently visible.
   */
  private indexOfVisibleOption(option: TypeaheadVisibleOption<T>): number {
    if (option) {
      return this.allVisibleOptions.findIndex(el => {
        return el.key === option.key && el.isRecentOption === option.isRecentOption;
      });
    }

    return -1;
  }
}
