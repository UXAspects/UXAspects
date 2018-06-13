
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

    constructor(@Host() private filtersContainer: FilterContainerComponent) {
        this._subscription = filtersContainer.events.pipe(filter(event => event instanceof FilterRemoveAllEvent)).subscribe(this.removeFilter.bind(this));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    addFilter(_filter: Filter): void {
        if (!_filter.initial) {
            this.filtersContainer.addFilter(_filter);
        }
    }

    removeFilter(_filter: Filter): void {
        if (!_filter) {
            return;
        }

        this.filtersContainer.removeFilter(_filter);
    }

}