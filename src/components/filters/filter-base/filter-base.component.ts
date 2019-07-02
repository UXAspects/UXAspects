import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directive, Host, Input, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterContainerComponent } from '../filter-container.component';
import { Filter } from '../interfaces/filter.interface';

/**
 * @deprecated
 * This should no longer be used as we now have the FilterService
 * which is easier to use than this base component.
 */
@Directive({
    selector: 'ux-filter-base'
})
export class FilterBaseComponent implements OnDestroy {

    @Input() filters: Filter[];

    private _subscription: Subscription;

    constructor(@Host() private filtersContainer: FilterContainerComponent, private _announcer: LiveAnnouncer) {
        this._subscription = filtersContainer.events.pipe(filter(event => event instanceof FilterRemoveAllEvent)).subscribe(this.removeFilter.bind(this));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    addFilter(_filter: Filter): void {
        if (!_filter.initial) {
            this.filtersContainer.filterService.add(_filter);
            this._announcer.announce(`Filter ${_filter.name} selected.`);
        }
    }

    removeFilter(_filter: Filter): void {
        if (!_filter) {
            return;
        }

        this.filtersContainer.filterService.remove(_filter);
        this._announcer.announce(`Filter ${_filter.name} deselected.`);
    }

}