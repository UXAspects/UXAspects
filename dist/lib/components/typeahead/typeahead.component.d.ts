import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadOptionEvent } from './typeahead-event';
import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
export declare class TypeaheadComponent implements OnInit, OnChanges {
    typeaheadElement: ElementRef;
    options: any[] | InfiniteScrollLoadFunction;
    filter: string;
    private _open;
    open: boolean;
    openChange: EventEmitter<boolean>;
    display: (option: any) => string | string;
    key: (option: any) => string | string;
    disabledOptions: any[];
    dropDirection: 'up' | 'down';
    maxHeight: string;
    openOnFilterChange: boolean;
    pageSize: number;
    selectFirst: boolean;
    loadingTemplate: TemplateRef<any>;
    optionTemplate: TemplateRef<any>;
    noOptionsTemplate: TemplateRef<any>;
    optionSelected: EventEmitter<TypeaheadOptionEvent>;
    private _highlighted;
    readonly highlighted: any;
    private _defaultLoadingTemplate;
    private _defaultOptionTemplate;
    private _defaultNoOptionsTemplate;
    protected loadOptionsCallback: InfiniteScrollLoadFunction;
    protected visibleOptions: any[];
    protected loading: boolean;
    optionApi: TypeaheadOptionApi;
    constructor(typeaheadElement: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    protected optionMousedownHandler(event: MouseEvent): void;
    protected optionClickHandler(event: MouseEvent, option: any): void;
    /**
     * Returns the unique key value of the given option.
     */
    protected getKey(option: any): string;
    /**
     * Returns the display value of the given option.
     */
    protected getDisplay(option: any): string;
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param option
     */
    protected getDisplayHtml(option: any): string;
    /**
     * Returns true if the infinite scroll component should load
     */
    protected isInfiniteScroll(): boolean;
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    protected select(option: any): void;
    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    protected isDisabled(option: any): boolean;
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    protected highlight(option: any): void;
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveHighlight(d: number): any;
    /**
     * Returns true if the given option is the highlighted option.
     */
    protected isHighlighted(option: any): boolean;
    /**
     * Set up the options before the dropdown is displayed.
     */
    private initOptions();
    /**
     * Update the visibleOptions array with the current filter.
     */
    private updateOptions();
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     */
    private indexOfVisibleOption(option);
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
