
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directive, Host, Input, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Filter, FilterContainerComponent, FilterRemoveAllEvent } from '../filter-container.component';

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
            this.filtersContainer.addFilter(_filter);
            this._announcer.announce(`Filter ${_filter.name} selected.`);
        }
    }

    removeFilter(_filter: Filter): void {
        if (!_filter) {
            return;
        }

        this.filtersContainer.removeFilter(_filter);
        this._announcer.announce(`Filter ${_filter.name} deselected.`);
    }

}