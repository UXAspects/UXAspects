import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';

let uniqueId = 0;

@Component({
    selector: 'ux-typeahead',
    templateUrl: 'typeahead.component.html',
    providers: [TypeaheadService],
    host: {
        'role': 'listbox',
        '[class.open]': 'open',
        '[class.drop-up]': 'dropDirection === "up"',
        '[style.maxHeight]': 'maxHeight'
    }
})
export class TypeaheadComponent implements OnChanges, OnDestroy {

    @Input() @HostBinding('attr.id') id: string = `ux-typeahead-${++uniqueId}`;

    @Input() options: any[] | InfiniteScrollLoadFunction;
    @Input() filter: string;

    @Input()
    get open() {
        return this._service.open$.getValue();
    }
    set open(value: boolean) {
        this._service.open$.next(value);
    }

    @Output() openChange = new EventEmitter<boolean>();

    @Input() display: (option: any) => string | string;
    @Input() key: (option: any) => string | string;
    @Input() disabledOptions: any[];
    @Input() dropDirection: 'up' | 'down' = 'down';
    @Input() maxHeight: string = '250px';
    @Input() @HostBinding('attr.aria-multiselectable') multiselectable: boolean = false;
    @Input() openOnFilterChange: boolean = true;
    @Input() pageSize: number = 20;
    @Input() selectFirst: boolean = true;
    @Input() selectOnEnter: boolean = false;
    @Input() loading = false;

    @Input() loadingTemplate: TemplateRef<any>;
    @Input() optionTemplate: TemplateRef<any>;
    @Input() noOptionsTemplate: TemplateRef<any>;

    @Output() optionSelected = new EventEmitter<TypeaheadOptionEvent>();

    @Output() highlightedChange = new EventEmitter<any>();
    @Output() highlightedElementChange = new EventEmitter<HTMLElement>();

    loadOptionsCallback: InfiniteScrollLoadFunction;
    visibleOptions$ = new BehaviorSubject<TypeaheadVisibleOption[]>([]);
    clicking = false;
    highlighted$ = new BehaviorSubject<TypeaheadVisibleOption>(null);
    highlightedKey: string = null;

    get highlighted(): any {
        const value = this.highlighted$.getValue();
        return value ? value.value : null;
    }

    private _onDestroy = new Subject<void>();

    optionApi: TypeaheadOptionApi = {
        getKey: this.getKey.bind(this),
        getDisplay: this.getDisplay.bind(this),
        getDisplayHtml: this.getDisplayHtml.bind(this)
    };

    constructor(
        public typeaheadElement: ElementRef,
        private _changeDetector: ChangeDetectorRef,
        private _service: TypeaheadService
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

                    return newOptions.map((option: any) => {
                        return {
                            value: option,
                            key: this.getKey(option)
                        };
                    });
                });
            }
            return null;
        };

        this._service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((next) => {
            this.openChange.emit(next);

            if (next) {
                this.initOptions();
            }
        });

        this.highlighted$.pipe(takeUntil(this._onDestroy)).subscribe((next) => {
            this.highlightedKey = next ? next.key : null;
            this.highlightedChange.emit(next ? next.value : null);
        });

        combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(([open, highlightedElement, visibleOptions]) => {
                this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        // Open the dropdown if the filter value updates
        if (changes.filter) {
            if (this.openOnFilterChange && changes.filter.currentValue && changes.filter.currentValue.length > 0) {
                this.open = true;
            }
        }

        // Re-filter visibleOptions
        this.updateOptions();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('mousedown')
    mousedownHandler() {
        this.clicking = true;
    }

    @HostListener('mouseup')
    mouseupHandler() {
        this.clicking = false;
    }

    optionMousedownHandler(event: MouseEvent) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    }

    optionClickHandler(event: MouseEvent, option: TypeaheadVisibleOption) {
        this.select(option);
    }

    /**
     * Returns the unique key value of the given option.
     */
    getKey(option: any): string {
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
    getDisplay(option: any): string {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[<string>this.display];
        }
        return option;
    }

    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param option
     */
    getDisplayHtml(option: any) {
        const displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        let displayHtml = displayText;
        if (this.filter) {
            const length = this.filter.length;
            const matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var highlight = `<span class="ux-filter-match">${displayText.substr(matchIndex, length)}</span>`;
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
            }
        }
        return displayHtml;
    }

    /**
     * Returns true if the infinite scroll component should load
     */
    isInfiniteScroll() {
        return typeof this.options === 'function';
    }

    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    select(option: TypeaheadVisibleOption) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option.value));
            this.highlighted$.next(null);
            this.open = false;
        }
    }

    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    isDisabled(option: TypeaheadVisibleOption): boolean {
        if (this.disabledOptions) {
            const result = this.disabledOptions.find((selectedOption) => {
                return this.getKey(selectedOption) === option.key;
            });
            return result !== undefined;
        }
        return false;
    }

    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    highlight(option: TypeaheadVisibleOption) {
        if (!this.isDisabled(option)) {
            this.highlighted$.next(option);
            this._changeDetector.detectChanges();
        }
    }

    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveHighlight(d: number): any {
        const visibleOptions = this.visibleOptions$.getValue();
        const highlightIndex = this.indexOfVisibleOption(this.highlighted);
        let newIndex = highlightIndex;
        let disabled = true;
        let inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < visibleOptions.length);
            disabled = inBounds && this.isDisabled(visibleOptions[newIndex]);
        }
        while (inBounds && disabled);

        if (!disabled && inBounds) {
            this.highlight(visibleOptions[newIndex]);
        }

        return this.highlighted;
    }

    selectHighlighted(): void {
        if (this.highlighted) {
            this.select({ value: this.highlighted, key: this.getKey(this.highlighted)});
        }
    }

    /**
     * Set up the options before the dropdown is displayed.
     */
    initOptions() {
        // Clear previous highlight
        this.highlighted$.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    }

    /**
     * Update the visibleOptions array with the current filter.
     */
    updateOptions() {
        if (typeof this.options === 'object') {
            const normalisedInput = (this.filter || '').toLowerCase();
            const visibleOptions = this.options
                .filter((option) => {
                    return this.getDisplay(option).toLowerCase().indexOf(normalisedInput) >= 0;
                })
                .map((value) => {
                    return {
                        value: value,
                        key: this.getKey(value)
                    };
                });
            this.visibleOptions$.next(visibleOptions);
        }

        this.initOptions();

        this._changeDetector.detectChanges();
    }

    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     */
    private indexOfVisibleOption(option: any): number {
        if (option) {
            const optionKey = this.getKey(option);
            return this.visibleOptions$.getValue().findIndex((el) => {
                return el.key === optionKey;
            });
        }

        return -1;
    }
}

/**
 * The API available to option templates.
 */
export interface TypeaheadOptionApi {

    /**
     * Returns the unique key value of the given option.
     */
    getKey(option: any): string;

    /**
     * Returns the display value of the given option.
     */
    getDisplay(option: any): string;

    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value. Override the ux-filter-match class in CSS to modify the default appearance.
     */
    getDisplayHtml(option: any): string;
}

export interface TypeaheadVisibleOption {
    value: any;
    key: string;
}