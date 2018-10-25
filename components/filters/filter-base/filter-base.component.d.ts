import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OnDestroy } from '@angular/core';
import { FilterContainerComponent } from '../filter-container.component';
import { Filter } from '../interfaces/filter.interface';
/**
 * @deprecated
 * This should no longer be used as we now have the FilterService
 * which is easier to use than this base component.
 */
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
