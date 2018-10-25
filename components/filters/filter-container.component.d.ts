import { EventEmitter, OnDestroy } from '@angular/core';
import { FilterEvent } from './events/filter-event';
import { FilterService } from './filter.service';
import { Filter } from './interfaces/filter.interface';
export declare class FilterContainerComponent implements OnDestroy {
    filterService: FilterService;
    /** Allow filters to set from outside the component */
    filters: Filter[];
    /** Define the tooltip text */
    clearTooltip: string;
    /** Emit when the active filters chance */
    filtersChange: EventEmitter<Filter[]>;
    /** Emit when a specific event occurs */
    events: EventEmitter<FilterEvent>;
    /** Unsubscribe from the subscriptions on destroy */
    private _onDestroy;
    constructor(filterService: FilterService);
    /** Destroy all subscriptions */
    ngOnDestroy(): void;
}
