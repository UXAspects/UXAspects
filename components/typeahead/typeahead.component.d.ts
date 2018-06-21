import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadOptionEvent } from './typeahead-event';
import { TypeaheadService } from './typeahead.service';
export declare class TypeaheadComponent implements AfterViewInit, OnChanges, OnDestroy {
    typeaheadElement: ElementRef;
    private _cdRef;
    private _service;
    id: string;
    options: any[] | InfiniteScrollLoadFunction;
    filter: string;
    open: boolean;
    openChange: EventEmitter<boolean>;
    display: (option: any) => string | string;
    key: (option: any) => string | string;
    disabledOptions: any[];
    dropDirection: 'up' | 'down';
    maxHeight: string;
    multiselectable: boolean;
    openOnFilterChange: boolean;
    pageSize: number;
    selectFirst: boolean;
    loadingTemplate: TemplateRef<any>;
    optionTemplate: TemplateRef<any>;
    noOptionsTemplate: TemplateRef<any>;
    optionSelected: EventEmitter<TypeaheadOptionEvent>;
    highlightedChange: EventEmitter<any>;
    highlightedElementChange: EventEmitter<HTMLElement>;
    private _defaultLoadingTemplate;
    private _defaultOptionTemplate;
    private _defaultNoOptionsTemplate;
    loadOptionsCallback: InfiniteScrollLoadFunction;
    visibleOptions$: BehaviorSubject<TypeaheadVisibleOption[]>;
    loading: boolean;
    clicking: boolean;
    highlighted$: BehaviorSubject<TypeaheadVisibleOption>;
    readonly highlighted: any;
    private _open;
    private _subscription;
    optionApi: TypeaheadOptionApi;
    constructor(typeaheadElement: ElementRef, _cdRef: ChangeDetectorRef, _service: TypeaheadService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    mousedownHandler(): void;
    mouseupHandler(): void;
    optionMousedownHandler(event: MouseEvent): void;
    optionClickHandler(event: MouseEvent, option: TypeaheadVisibleOption): void;
    /**
     * Returns the unique key value of the given option.
     */
    getKey(option: any): string;
    /**
     * Returns the display value of the given option.
     */
    getDisplay(option: any): string;
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param option
     */
    getDisplayHtml(option: any): any;
    /**
     * Returns true if the infinite scroll component should load
     */
    isInfiniteScroll(): boolean;
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    select(option: TypeaheadVisibleOption): void;
    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    isDisabled(option: TypeaheadVisibleOption): boolean;
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    highlight(option: TypeaheadVisibleOption): void;
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveHighlight(d: number): any;
    /**
     * Set up the options before the dropdown is displayed.
     */
    initOptions(): void;
    /**
     * Update the visibleOptions array with the current filter.
     */
    updateOptions(): void;
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
export interface TypeaheadVisibleOption {
    value: any;
    key: string;
}
