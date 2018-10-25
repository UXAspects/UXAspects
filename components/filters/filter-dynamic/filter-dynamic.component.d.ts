import { ElementRef, OnDestroy } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FilterService } from '../filter.service';
import { FilterDynamicListConfig } from '../interfaces/filter-dynamic-list-config.interface';
import { Filter } from '../interfaces/filter.interface';
export declare class FilterDynamicComponent implements OnDestroy {
    typeaheadKeyService: TypeaheadKeyService;
    private _filterService;
    private _elementRef;
    /** The list of possible filter options */
    filters: Filter[];
    /** Specify if there should be an initially selected filter */
    initial: Filter;
    /** Get the options with the defaults for any missing options */
    /** Specify the typeahead options */
    options: FilterDynamicListConfig;
    /** Get the dropdown directive */
    dropdown: BsDropdownDirective;
    /** Generate a unique id for the typeahead */
    typeaheadId: string;
    /** Store the current search query */
    query$: BehaviorSubject<string>;
    /** Store the selected filter */
    selected: Filter;
    /** Indicate whether or not the typeahead should be shown */
    showTypeahead: boolean;
    /** Store the items that should be displayed in the typeahead */
    typeaheadItems: string[];
    /** Store the currently highlighted element */
    highlightedElement: HTMLElement;
    /** Store the open state of the typeahead */
    typeaheadOpen: boolean;
    /** The default options */
    private _defaultOptions;
    /** Store the user specified typeahead options */
    private _options;
    /** Unsubscribe from all subscriptions */
    private _onDestroy;
    constructor(typeaheadKeyService: TypeaheadKeyService, _filterService: FilterService, _elementRef: ElementRef);
    /** Set up the initial conditions */
    ngOnInit(): void;
    /** Cleanup all subscriptions */
    ngOnDestroy(): void;
    /** Get the items to display in the typeahead based on the search query */
    getItems(): string[];
    /** Handle selection of a typeahead options */
    selectOption(typeaheadOption: TypeaheadMatch): void;
    /** If a click occurred that was outside the dropdown then close the dropdown */
    clickOff(target: HTMLElement): void;
    /** If a filter needs removed, and is not the initial filter then remove it */
    removeFilter(): void;
    /** Select a specific filter */
    selectFilter(filter: Filter): void;
    /** Update typeahead items and visibility */
    updateTypeahead(query: string): void;
    /** Select a filter from a typeahead item */
    select(event: TypeaheadOptionEvent): void;
}
