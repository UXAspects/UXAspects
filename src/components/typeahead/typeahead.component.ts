import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { InfiniteScrollLoadedEvent, InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadOptionApi } from './typeahead-option-api';
import { TypeaheadOptionContext } from './typeahead-option-context';
import { TypeaheadVisibleOption } from './typeahead-visible-option';
import { TypeaheadService } from './typeahead.service';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ResizeService } from '../../directives/resize/index';
import { PopoverOrientationService, PopoverOrientation, PopoverOrientationListener } from '../../services/popover-orientation/popover-orientation.service';

let uniqueId = 0;

@Component({
    selector: 'ux-typeahead',
    templateUrl: 'typeahead.component.html',
    providers: [TypeaheadService, PopoverOrientationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'role': 'listbox',
        '[class.open]': 'open',
        '[class.drop-up]': 'dropDirection === "up"',
        '[style.maxHeight]': 'maxHeight'
    }
})
export class TypeaheadComponent<T = any> implements OnChanges, OnDestroy {

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
    @Input() display: (option: T) => string | string;

    /** Extract the key from an option */
    @Input() key: (option: T) => string | string;

    /** Specify which options are disabled */
    @Input() disabledOptions: T[];

    /** Specify the drop direction */
    @Input() dropDirection: 'auto' | 'up' | 'down' = 'down';

    /** Specify the max height of the dropdown */
    @Input() maxHeight: string = '250px';

    /** Specify the aria multi selectable attribute value */
    @Input()
    @HostBinding('attr.aria-multiselectable')
    multiselectable: boolean = false;

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
    @Input() loadingTemplate: TemplateRef<{}>;

    /** Specify a custom option template */
    @Input() optionTemplate: TemplateRef<TypeaheadOptionContext<T>>;

    /** Specify a custom template to display when there are no options */
    @Input() noOptionsTemplate: TemplateRef<{}>;

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

    private _onDestroy = new Subject<void>();

    private _popoverOrientationListener: PopoverOrientationListener;

    optionApi: TypeaheadOptionApi<T> = {
        getKey: this.getKey.bind(this),
        getDisplay: this.getDisplay.bind(this),
        getDisplayHtml: this.getDisplayHtml.bind(this)
    };

    constructor(
        public typeaheadElement: ElementRef,
        private _changeDetector: ChangeDetectorRef,
        public popoverOrientation: PopoverOrientationService,
        private _service: TypeaheadService,
        private _viewportRuler: ViewportRuler,
        private _renderer: Renderer2,
        private _resizeService: ResizeService,
    ) {
        this.loadOptionsCallback = (pageNum: number, pageSize: number, filter: any) => {
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

        this._popoverOrientationListener = this.popoverOrientation.createPopoverOrientationListener(this.typeaheadElement.nativeElement, this.typeaheadElement.nativeElement.parentElement);

        this._popoverOrientationListener.orientation$.pipe(takeUntil(this._onDestroy))
            .subscribe(direction => {
                if (this.dropDirection === 'auto') {
                    this._dropUp = direction === PopoverOrientation.Up;
                } else {
                    this._dropUp = this.dropDirection === 'up';
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

        combineLatest([
            this._service.open$,
            this._service.highlightedElement$,
            this.visibleOptions$
        ])
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
            if (this.openOnFilterChange && changes.filter.currentValue && changes.filter.currentValue.length > 0) {
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

        if (changes.dropDirection.currentValue === 'auto') {
            this._dropUp = this._popoverOrientationListener.orientation$.getValue() === PopoverOrientation.Up;
        } else {
            this._dropUp = changes.dropDirection.currentValue === 'up';
        }

        // Re-filter visibleOptions
        this.updateOptions();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this._popoverOrientationListener.destroy();
    }

    @HostListener('mousedown')
    mousedownHandler(): void {
        this.clicking = true;
    }

    @HostListener('mouseup')
    mouseupHandler(): void {
        this.clicking = false;
    }

    @HostBinding('class.drop-up')
    private _dropUp: boolean;

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
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[<string>this.key];
        }
        return this.getDisplay(option);
    }

    /**
     * Returns the display value of the given option.
     */
    getDisplay(option: T): string {
        if (typeof this.display === 'function') {
            return this.display(option);
        }

        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[<string>this.display];
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
        const displayText = this.getDisplay(option)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        let displayHtml = displayText;
        if (this.filter) {
            const length = this.filter.length;
            const matchIndex = displayText
                .toLowerCase()
                .indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var highlight = `<span class="ux-filter-match">${displayText.substr(matchIndex, length)}</span>`;
                displayHtml =
                    displayText.substr(0, matchIndex) +
                    highlight +
                    displayText.substr(matchIndex + length);
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
        if (!option.isDisabled) {
            this.optionSelected.emit(
                new TypeaheadOptionEvent(option.value, origin)
            );
            this.highlighted$.next(null);
            this.open = false;
            this.addToRecentOptions(option.value);
        }
    }

    addToRecentOptions(value: T) {
        if (this._recentOptions) {
            this._recentOptions = [
                value,
                ...this._recentOptions.filter(
                    recentOption => recentOption !== value
                )
            ].slice(0, this.recentOptionsMaxCount);

            this.recentOptionsChange.emit(this._recentOptions);
        }
    }

    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    isDisabled(option: T): boolean {
        if (this.disabledOptions && Array.isArray(this.disabledOptions)) {
            const result = this.disabledOptions.find(selectedOption => {
                return this.getKey(selectedOption) === this.getKey(option);
            });
            return result !== undefined;
        }
        return false;
    }

    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    highlight(option: TypeaheadVisibleOption<T>): void {
        if (!option.isDisabled) {
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
            disabled = inBounds && this.allVisibleOptions[newIndex].isDisabled;
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

        this.visibleRecentOptions$.next(this.getVisibleOptions(this._recentOptions, normalisedInput, true));

        this.initOptions();

        this._changeDetector.detectChanges();
    }

    /**
     * Convert a set of raw options into a filtered list of `TypeaheadVisibleOption` objects.
     * @param options Set of raw options
     * @param filter The filter expression
     * @param isRecentOptions Whether `options` is a set of recent options
     */
    private getVisibleOptions(options: T[], filter: string = '', isRecentOptions: boolean = false): TypeaheadVisibleOption<T>[] {
        if (options) {
            return options
                .filter(option => this.getDisplay(option).toLowerCase().indexOf(filter) >= 0)
                .map(value => ({
                    value: value,
                    key: this.getKey(value),
                    isDisabled: this.isDisabled(value),
                    isRecentOption: isRecentOptions
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
                return (
                    el.key === option.key &&
                    el.isRecentOption === option.isRecentOption
                );
            });
        }

        return -1;
    }
}
