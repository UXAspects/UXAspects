import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadOptionEvent } from './typeahead-event';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ux-typeahead',
    templateUrl: 'typeahead.component.html',
    host: {
        '[class.open]': 'open',
        '[class.drop-up]': 'dropDirection === "up"',
        '[style.maxHeight]': 'maxHeight'
    }
})
export class TypeaheadComponent implements AfterViewInit, OnChanges {

    @Input() options: any[] | InfiniteScrollLoadFunction;
    @Input() filter: string;

    private _open: boolean = false;
    @Input('open')
    get open() {
        return this._open;
    }
    set open(value: boolean) {
        const originalValue = this._open;
        this._open = value;
        if (value !== originalValue) {
            this.openChange.emit(value);
            if (value) {
                this.initOptions();
            }
        }
    }

    @Output() openChange = new EventEmitter<boolean>();

    @Input() display: (option: any) => string | string;
    @Input() key: (option: any) => string | string;
    @Input() disabledOptions: any[];
    @Input() dropDirection: 'up' | 'down' = 'down';
    @Input() maxHeight: string = '250px';
    @Input() openOnFilterChange: boolean = true;
    @Input() pageSize: number = 20;
    @Input() selectFirst: boolean = true;

    @Input() loadingTemplate: TemplateRef<any>;
    @Input() optionTemplate: TemplateRef<any>;
    @Input() noOptionsTemplate: TemplateRef<any>;

    @Output() optionSelected = new EventEmitter<TypeaheadOptionEvent>();

    private _highlighted = new BehaviorSubject<any>(null);
    @Output()
    get highlighted(): any {
        return this._highlighted.getValue();
    }

    @ViewChild('defaultLoadingTemplate') private _defaultLoadingTemplate: TemplateRef<any>;
    @ViewChild('defaultOptionTemplate') private _defaultOptionTemplate: TemplateRef<any>;
    @ViewChild('defaultNoOptionsTemplate') private _defaultNoOptionsTemplate: TemplateRef<any>;

    loadOptionsCallback: InfiniteScrollLoadFunction;
    visibleOptions: any[] = [];
    loading = false;

    optionApi: TypeaheadOptionApi = {
        getKey: this.getKey.bind(this),
        getDisplay: this.getDisplay.bind(this),
        getDisplayHtml: this.getDisplayHtml.bind(this)
    };

    constructor(public typeaheadElement: ElementRef, private cdRef: ChangeDetectorRef) {

        this.loadOptionsCallback = (pageNum: number, pageSize: number, filter: any) => {
            if (typeof this.options === 'function') {
                return this.options(pageNum, pageSize, filter);
            }
            return null;
        };
    }

    ngAfterViewInit() {
        // Attach default loading template
        if (!this.loadingTemplate) {
            this.loadingTemplate = this._defaultLoadingTemplate;
        }

        // Attach default option template
        if (!this.optionTemplate) {
            this.optionTemplate = this._defaultOptionTemplate;
        }

        // Attach default "no results" template
        if (!this.noOptionsTemplate) {
            this.noOptionsTemplate = this._defaultNoOptionsTemplate;
        }

        this.cdRef.detectChanges();
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

    optionMousedownHandler(event: MouseEvent) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    }

    optionClickHandler(event: MouseEvent, option: any) {
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
        let displayText;
        if (typeof option === 'string') {
            displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        } else {
            displayText = this.getDisplay(option.name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
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
    select(option: any) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option));
            this._highlighted.next(null);
            this.open = false;
        }
    }

    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    isDisabled(option: any): boolean {
        if (this.disabledOptions) {
            const optionKey = this.getKey(option);
            const result = this.disabledOptions.find((selectedOption) => {
                return this.getKey(selectedOption) === optionKey;
            });
            return result !== undefined;
        }
        return false;
    }

    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    highlight(option: any) {
        if (!this.isDisabled(option)) {
            this._highlighted.next(option);
        }
    }

    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveHighlight(d: number): any {
        const highlightIndex = this.indexOfVisibleOption(this.highlighted);
        let newIndex = highlightIndex;
        let disabled = true;
        let inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < this.visibleOptions.length);
            disabled = inBounds && this.isDisabled(this.visibleOptions[newIndex]);
        }
        while (inBounds && disabled);

        if (!disabled && inBounds) {
            this._highlighted.next(this.visibleOptions[newIndex]);
        }

        return this.highlighted;
    }

    /**
     * Returns true if the given option is the highlighted option.
     */
    isHighlighted(option: any): boolean {
        return this.getKey(option) === this.getKey(this.highlighted);
    }

    /**
     * Set up the options before the dropdown is displayed.
     */
    initOptions() {
        // Clear previous highlight
        this._highlighted.next(null);
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
            this.visibleOptions = this.options.filter((option) => {
                return this.getDisplay(option).toLowerCase().indexOf(normalisedInput) >= 0;
            });
        }

        this.initOptions();
    }

    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     */
    private indexOfVisibleOption(option: any): number {
        if (option) {
            const optionKey = this.getKey(option);
            return this.visibleOptions.findIndex((el) => {
                return this.getKey(el) === optionKey;
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