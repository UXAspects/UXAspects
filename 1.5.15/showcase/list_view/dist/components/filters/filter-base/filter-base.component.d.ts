import { OnDestroy } from '@angular/core';
import { Filter, FilterContainerComponent } from '../filter-container.component';
export declare class FilterBaseComponent implements OnDestroy {
    private filtersContainer;
    filters: Filter[];
    private _subscription;
    constructor(filtersContainer: FilterContainerComponent);
    ngOnDestroy(): void;
    addFilter(_filter: Filter): void;
    removeFilter(_filter: Filter): void;
}
