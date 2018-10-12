import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Filter, FilterRemoveAllEvent, FilterService } from '@ux-aspects/ux-aspects';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'ux-filter-custom',
    templateUrl: './sample-filter.component.html',
    styleUrls: ['./sample-filter.component.css']
})
export class SampleFilterCustomComponent implements OnInit, OnDestroy {

    @Input() filters: Filter[] = [];
    @Input() initial: Filter;

    selected: Filter;

    private _onDestroy = new Subject<void>();

    constructor(private _filterService: FilterService) {
        // listen for remove all events in which case we should deselect event initial filters
        _filterService.events$.pipe(
            takeUntil(this._onDestroy),
            rxFilter(event => event instanceof FilterRemoveAllEvent)
        ).subscribe(() => this.removeFilter());
    }

    ngOnInit(): void {
        // initially select the default option
        this.selected = this.initial;

        // watch for selected filters being changed externally
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {

            // check if any selected filters are part of this filter
            filters.forEach(filter => {
                if (this.filters.indexOf(filter) !== -1) {
                    this.selected = filter;
                }
            });
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    removeFilter(): void {
        // remove the currently selected filter
        this._filterService.remove(this.selected);

        // select the default option
        this.selected = this.initial;
    }

    selectFilter(filter: Filter) {

        // deselect the currently selected filter
        this.removeFilter();

        // store the active filter
        this.selected = filter;

        // select the filter
        this._filterService.add(this.selected);
    }
}