import { TypeaheadOptionEvent } from './typeahead-event';
import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class TypeaheadComponent implements OnInit, OnChanges {
    typeaheadElement: ElementRef;
    options: any[];
    filter: string;
    private _open;
    open: boolean;
    openChange: EventEmitter<boolean>;
    display: (option: any) => string | string;
    key: (option: any) => string | string;
    disabledOptions: any[];
    dropDirection: 'up' | 'down';
    maxHeight: string;
    optionTemplate: TemplateRef<any>;
    noOptionsTemplate: TemplateRef<any>;
    pageSize: number;
    selectFirst: boolean;
    optionSelected: EventEmitter<TypeaheadOptionEvent>;
    highlighted: BehaviorSubject<any>;
    private _defaultOptionTemplate;
    private _defaultNoOptionsTemplate;
    protected visibleOptions: any[];
    private _highlightedOption;
    private highlightedOption;
    optionApi: TypeaheadOptionApi;
    constructor(typeaheadElement: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    optionMousedownHandler(event: MouseEvent): void;
    optionClickHandler(event: MouseEvent, option: any): void;
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
    getDisplayHtml(option: any): string;
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    select(option: any): void;
    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    isDisabled(option: any): boolean;
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    highlight(option: any): void;
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveHighlight(d: number): any;
    /**
     * Returns true if the given option is the highlighted option.
     */
    isHighlighted(option: any): boolean;
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
