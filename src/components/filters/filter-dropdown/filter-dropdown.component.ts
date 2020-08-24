import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
import { Filter } from '../interfaces/filter.interface';

let uniqueId = 0;

@Component({
    selector: 'ux-filter-dropdown',
    templateUrl: './filter-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDropdownComponent implements OnInit, OnDestroy {

    /** Store the unique id so we only increment the counter once per instance */
    private readonly _uniqueId: number = uniqueId++;

    /** Define the input for the component */
    @Input() id: string;

    /** The list of items to display in the dropdown */
    @Input() filters: Filter[] = [];

    /** Define an initial item to select */
    @Input() initial: Filter;

    selected: Filter;

    get filterId(): string {
        return this.id ?? `ux-filter-dropdown-${ this._uniqueId }`;
    }

    private readonly _onDestroy = new Subject<void>();

    constructor(private readonly _filterService: FilterService,
                private readonly _changeDetector: ChangeDetectorRef) {

        _filterService.events$.pipe(rxFilter(event => event instanceof FilterRemoveAllEvent), takeUntil(this._onDestroy))
            .subscribe(() => this.removeFilter());

        // ensure that the current selected filter is still selected when the active filters change
        _filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            if (this.selected && filters.indexOf(this.selected) === -1) {
                this.removeFilter();
            }
        });
    }

    ngOnInit(): void {
        this.selected = this.initial;

        // check to see if any of the filters have been preselected or changes to selected filters
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
            filters.forEach(filter => {
                if (this.filters.indexOf(filter) !== -1) {
                    this.selected = filter;
                }
            });

            this._changeDetector.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    selectFilter(filter: Filter, event: MouseEvent) {
        this.removeFilter();
        this.selected = filter;
        this._filterService.add(this.selected);

        event.stopPropagation();
        event.preventDefault();
    }

    removeFilter(): void {
        this._filterService.remove(this.selected);
        this.selected = this.initial;
        this._changeDetector.markForCheck();
    }

}
