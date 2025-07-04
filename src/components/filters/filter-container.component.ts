import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FilterEvent } from './events/filter-event';
import { FilterService } from './filter.service';
import { Filter } from './interfaces/filter.interface';

@Component({
  selector: 'ux-filter-container',
  templateUrl: './filter-container.component.html',
  providers: [FilterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FilterContainerComponent implements OnDestroy {
  readonly filterService = inject(FilterService);

  /** Allow filters to set from outside the component */
  @Input() set filters(filters: Filter[]) {
    this.filterService.filters$.next(filters);
  }

  /** Define the tooltip text */
  @Input() clearTooltip: string;

  /** Defines the aria-label for the clear all button */
  @Input() clearAriaLabel: string = 'Clear All Filters';

  /** Emit when the active filters chance */
  @Output() filtersChange = new EventEmitter<Filter[]>();

  /** Emit when a specific event occurs */
  @Output() events = new EventEmitter<FilterEvent>();

  /** Allow the content of the clear all button to be customized */
  @ContentChild('clearAllTemplate', { static: false }) clearAllTemplate: TemplateRef<void>;

  /** Unsubscribe from the subscriptions on destroy */
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // subscribe to changes to the active filters
    this.filterService.filters$
      .pipe(distinctUntilChanged(), takeUntil(this._onDestroy))
      .subscribe(filters => this.filtersChange.emit(filters));

    // relay any events to the event emitter
    this.filterService.events$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(event => this.events.emit(event));
  }

  /** Destroy all subscriptions */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
