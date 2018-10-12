import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
import { Filter } from '../interfaces/filter.interface';

@Component({
    selector: 'ux-filter-dropdown',
    templateUrl: './filter-dropdown.component.html',
})
export class FilterDropdownComponent implements OnInit, OnDestroy {

    /** The list of items to display in the dropdown */
    @Input() filters: Filter[];

    /** Define an initial item to select */
    @Input() initial: Filter;

    selected: Filter;

    private _onDestroy = new Subject<void>();

    constructor(private _filterService: FilterService) {
        _filterService.events$.pipe(takeUntil(this._onDestroy), rxFilter(event => event instanceof FilterRemoveAllEvent))
            .subscribe(() => this.removeFilter());
    }

    ngOnInit(): void {
        this.selected = this.initial;
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
    }

}