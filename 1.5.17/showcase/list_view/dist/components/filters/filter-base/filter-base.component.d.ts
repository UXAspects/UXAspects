import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OnDestroy } from '@angular/core';
import { Filter, FilterContainerComponent } from '../filter-container.component';
export declare class FilterBaseComponent implements OnDestroy {
    private filtersContainer;
    private _announcer;
    filters: Filter[];
    private _subscription;
    constructor(filtersContainer: FilterContainerComponent, _announcer: LiveAnnouncer);
    ngOnDestroy(): void;
    addFilter(_filter: Filter): void;
    removeFilter(_filter: Filter): void;
}
