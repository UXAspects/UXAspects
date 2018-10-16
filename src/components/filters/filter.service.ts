import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { FilterAddEvent } from './events/filter-add-event';
import { FilterEvent } from './events/filter-event';
import { FilterRemoveAllEvent } from './events/filter-remove-all-event';
import { FilterRemoveEvent } from './events/filter-remove-event';
import { Filter } from './interfaces/filter.interface';

@Injectable()
export class FilterService {

    /** The list of active filters */
    filters$ = new BehaviorSubject<Filter[]>([]);

    /** Emit all the events when they occur */
    events$ = new Subject<FilterEvent>();

    add(filter: Filter): void {

        // if the filter is already selected or it is the intial filter then do nothing
        if (this.isSelected(filter) || filter.initial) {
            return;
        }

        // update the list of active filters
        this.filters$.next([...this.filters$.value, filter]);

        // emit the event
        this.events$.next(new FilterAddEvent(filter));
    }

    remove(filter: Filter): void {

        // if the filter is not selected then do nothing
        if (!this.isSelected(filter)) {
            return;
        }

        // update the list of active filters
        this.filters$.next(this.filters$.value.filter(_filter => _filter !== filter));

        // emit the event
        this.events$.next(new FilterRemoveEvent(filter));
    }

    removeAll(): void {

        // empty the list of active filters
        this.filters$.next([]);

        // emit the event
        this.events$.next(new FilterRemoveAllEvent());
    }

    isSelected(filter: Filter): boolean {
        return this.filters$.value.indexOf(filter) > -1;
    }
}