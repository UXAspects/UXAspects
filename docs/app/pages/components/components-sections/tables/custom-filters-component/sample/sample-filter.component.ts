import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Filter,
  FilterRemoveAllEvent,
  FilterService,
  IconModule,
  MenuModule,
} from '@ux-aspects/ux-aspects';
import { Subject } from 'rxjs';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ux-filter-custom',
  templateUrl: './sample-filter.component.html',
  styleUrls: ['./sample-filter.component.less'],
  imports: [MenuModule, NgIf, IconModule, NgFor],
})
export class SampleFilterCustomComponent implements OnInit, OnDestroy {
  @Input() filters: Filter[] = [];
  @Input() initial: Filter;

  selected: Filter;

  private readonly _onDestroy = new Subject<void>();

  constructor(private readonly _filterService: FilterService) {
    // listen for remove all events in which case we should deselect event initial filters
    _filterService.events$
      .pipe(
        takeUntil(this._onDestroy),
        rxFilter(event => event instanceof FilterRemoveAllEvent)
      )
      .subscribe(() => this.removeFilter());

    // ensure that the current selected filter is still selected when the active filters change
    _filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
      if (this.selected && filters.indexOf(this.selected) === -1) {
        this.removeFilter();
      }
    });
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
