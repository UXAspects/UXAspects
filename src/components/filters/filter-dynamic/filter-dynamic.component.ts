import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
import { FilterDynamicListConfig } from '../interfaces/filter-dynamic-list-config.interface';
import { Filter } from '../interfaces/filter.interface';

let uniqueId = 1;

@Component({
    selector: 'ux-filter-dynamic',
    templateUrl: './filter-dynamic.component.html'
})
export class FilterDynamicComponent implements OnInit, OnDestroy {

    /** The list of possible filter options */
    @Input() filters: Filter[] = [];

    /** Specify if there should be an initially selected filter */
    @Input() initial: Filter;

    /** Specify the typeahead options */
    @Input() set options(options: FilterDynamicListConfig) { this._options = options; }

    /** Get the options with the defaults for any missing options */
    get options(): FilterDynamicListConfig {
        return { ... this._defaultOptions, ...this._options };
    }

    /** Generate a unique id for the typeahead */
    typeaheadId: string = `ux-filter-dynamic-typeahead-${uniqueId++}`;

    /** Store the current search query */
    query$ = new BehaviorSubject<string>('');

    /** Store the selected filter */
    selected: Filter;

    /** Indicate whether or not the typeahead should be shown */
    showTypeahead: boolean = true;

    /** Store the items that should be displayed in the typeahead */
    typeaheadItems: string[] = [];

    /** Store the currently highlighted element */
    highlightedElement: HTMLElement;

    /** Store the open state of the typeahead */
    typeaheadOpen: boolean = false;

    /** The default options */
    private _defaultOptions: FilterDynamicListConfig = { placeholder: '', minCharacters: 3, maxResults: Infinity };

    /** Store the user specified typeahead options */
    private _options: FilterDynamicListConfig = { ...this._defaultOptions };

    /** Unsubscribe from all subscriptions */
    private _onDestroy = new Subject<void>();

    constructor(public typeaheadKeyService: TypeaheadKeyService, private _filterService: FilterService) {
        // listen for remove all events in which case we should deselect event initial filters
        _filterService.events$.pipe(takeUntil(this._onDestroy), rxFilter(event => event instanceof FilterRemoveAllEvent))
            .subscribe(() => this.removeFilter());

        // ensure that the current selected filter is still selected when the active filters change
        _filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            if (this.selected && filters.indexOf(this.selected) === -1) {
                this.removeFilter();
            }
        });
    }

    /** Set up the initial conditions */
    ngOnInit(): void {

        // The initially selected item should be set the the specified initial item
        this.selected = this.initial;

        // watch for changes to the selected filters
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            filters.forEach(filter => {
                if (this.filters.indexOf(filter) !== -1) {
                    this.selected = filter;
                }
            });
        });

        // get the items to be displayed in the typeahead
        this.typeaheadItems = this.getItems();

        // determine if we should show the typeahead control
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }

    /** Cleanup all subscriptions */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Get the items to display in the typeahead based on the search query */
    getItems(): string[] {
        const query = this.query$.value.toLowerCase();

        return this.filters.filter(item => item !== this.initial && item.name.toLowerCase().indexOf(query) !== -1)
            .map(item => item.name)
            .slice(0, this._options.maxResults);
    }

    /** When the dropdown is closed clear the query */
    onClose(): void {
        this.query$.next('');
    }

    /** If a filter needs removed, and is not the initial filter then remove it */
    removeFilter(): void {

        // check if the filter we want to remove is the initial filter
        if (this.selected !== this.initial) {
            this._filterService.remove(this.selected);
            this.selected = this.initial;
        }

        // clear the search query
        this.query$.next('');
    }

    /** Select a specific filter */
    selectFilter(filter: Filter): void {

        // clear any current filters
        this.removeFilter();

        // store the newly selected filter
        this.selected = filter;

        // store the filter in the service
        this._filterService.add(this.selected);
    }

    /** Update typeahead items and visibility */
    updateTypeahead(query: string): void {
        this.typeaheadOpen = query.length >= this._options.minCharacters;
        this.typeaheadItems = this.getItems();
    }

    /** Select a filter from a typeahead item */
    select(event: TypeaheadOptionEvent): void {
        // find the filter with the matching name
        const filter = this.filters.find(_filter => _filter.name === event.option);

        if (filter) {
            this.selectFilter(filter);
        }
    }

}