import { OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../filter.service';
import { Filter } from '../interfaces/filter.interface';
export declare class FilterDropdownComponent implements OnInit, OnDestroy {
    private _filterService;
    /** The list of items to display in the dropdown */
    filters: Filter[];
    /** Define an initial item to select */
    initial: Filter;
    selected: Filter;
    private _onDestroy;
    constructor(_filterService: FilterService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectFilter(filter: Filter, event: MouseEvent): void;
    removeFilter(): void;
}
