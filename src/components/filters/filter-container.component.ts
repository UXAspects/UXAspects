import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { FilterService } from './filter.service';
import { Filter } from './interfaces/filter.interface';
import { FilterEvent } from './events/filter-event';
import { FilterAddEvent } from './events/filter-add-event';
import { FilterRemoveEvent } from './events/filter-remove-event';
import { FilterRemoveAllEvent } from './events/filter-remove-all-event';
import { Subject } from 'rxjs/Subject';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ux-filter-container',
    templateUrl: './filter-container.component.html',
    providers: [ FilterService ]
})
export class FilterContainerComponent implements OnDestroy {

    /** Allow filters to set from outside the component */
    @Input() set filters(filters: Filter[]) { this.filterService.filters$.next(filters); }

    /** Define the tooltip text */
    @Input() clearTooltip: string;

    /** Emit when the active filters chance */
    @Output() filtersChange = new EventEmitter<Filter[]>();

    /** Emit when a specific event occurs */
    @Output() events = new EventEmitter<FilterEvent>();

    /** Unsubscribe from the subscriptions on destroy */
    private _onDestroy = new Subject<void>();

    constructor(public filterService: FilterService) {

        // subscribe to changes to the active filters
        filterService.filters$.pipe(takeUntil(this._onDestroy), distinctUntilChanged())
            .subscribe(filters => this.filtersChange.emit(filters));

        // relay any events to the event emitter
        this.filterService.events$.pipe(takeUntil(this._onDestroy))
            .subscribe(event => this.events.emit(event));
    }

    /** Destroy all subscriptions */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}