import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
import { FilterDynamicListConfig } from '../interfaces/filter-dynamic-list-config.interface';
import { Filter } from '../interfaces/filter.interface';

let uniqueId = 0;

@Component({
  selector: 'ux-filter-dynamic',
  templateUrl: './filter-dynamic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FilterDynamicComponent implements OnInit, OnDestroy {
  readonly typeaheadKeyService = inject(TypeaheadKeyService);

  private readonly _filterService = inject(FilterService);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  /** The unique id is used multiple times - this is to ensure we only increment it once per instance */
  private readonly _uniqueId: number = uniqueId++;

  /** Define the input for the component */
  @Input() id: string;

  /** The list of possible filter options */
  @Input() filters: Filter[] = [];

  /** Specify if there should be an initially selected filter */
  @Input() initial: Filter;

  /** Defined the closeOnBlur state for the ux-menu trigger */
  @Input() set closeOnBlur(value: boolean) {
    this._closeOnBlur = coerceBooleanProperty(value);
  }

  get closeOnBlur(): boolean {
    return this._closeOnBlur;
  }

  /** Specify the typeahead options */
  @Input() set options(options: FilterDynamicListConfig) {
    this._options = options;
  }

  /** Get the options with the defaults for any missing options */
  get options(): FilterDynamicListConfig {
    return { ...this._defaultOptions, ...this._options };
  }

  /** Emit when the filter menu is closed */
  @Output() readonly closed = new EventEmitter<void>();

  /** Generate a unique id for the typeahead */
  typeaheadId: string = `ux-filter-dynamic-typeahead-${this._uniqueId}`;

  /** Store the current search query */
  query$ = new BehaviorSubject<string>('');

  /** Store the selected filter */
  selected: Filter;

  /** Indicate whether or not the typeahead should be shown */
  showTypeahead: boolean = true;

  /** Store the items that should be displayed in the typeahead */
  typeaheadItems: string[] = [];

  /** Store the currently highlighted element */
  highlightedElement: HTMLElement;

  /** Store the open state of the typeahead */
  typeaheadOpen: boolean = false;

  /** Get the user provided id or fallback to a default ID */
  get filterId(): string {
    return this.id ?? `ux-filter-dynamic-${this._uniqueId}`;
  }

  /** The default options */
  private readonly _defaultOptions: FilterDynamicListConfig = {
    placeholder: '',
    minCharacters: 3,
    maxResults: Infinity,
  };

  /** Store the user specified typeahead options */
  private _options: FilterDynamicListConfig = { ...this._defaultOptions };

  /** Unsubscribe from all subscriptions */
  private readonly _onDestroy = new Subject<void>();
  private _closeOnBlur: boolean = false;

  constructor() {
    // listen for remove all events in which case we should deselect event initial filters
    this._filterService.events$
      .pipe(
        rxFilter(event => event instanceof FilterRemoveAllEvent),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => this.removeFilter());

    // ensure that the current selected filter is still selected when the active filters change
    this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
      if (this.selected && filters.indexOf(this.selected) === -1) {
        this.removeFilter();
      }
    });
  }

  /** Set up the initial conditions */
  ngOnInit(): void {
    // The initially selected item should be set the the specified initial item
    this.selected = this.initial;

    // watch for changes to the selected filters
    this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(filters => {
      filters.forEach(filter => {
        if (this.filters.indexOf(filter) !== -1) {
          this.selected = filter;
        }
      });

      this._changeDetector.markForCheck();
    });

    // get the items to be displayed in the typeahead
    this.typeaheadItems = this.getItems();

    // hide the typeahead if the number of filters always visible equals or exceeds the
    // total number of filters as there would be no additional filters to display in the typeahead
    const shouldHideTypeahead = this.options?.maxIndividualItems + 1 >= this.filters.length;

    if (shouldHideTypeahead) {
      this.showTypeahead = false;
    }
  }

  /** Cleanup all subscriptions */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Get the items to display in the typeahead based on the search query */
  getItems(): string[] {
    const query = this.query$.value.toLowerCase();

    return this.filters
      .filter(item => item !== this.initial && item.name.toLowerCase().indexOf(query) !== -1)
      .map(item => item.name)
      .slice(0, this._options.maxResults);
  }

  /** When the dropdown is closed clear the query */
  onClose(): void {
    this.query$.next('');
  }

  /** If a filter needs removed, and is not the initial filter then remove it */
  removeFilter(): void {
    // check if the filter we want to remove is the initial filter
    if (this.selected !== this.initial) {
      this._filterService.remove(this.selected);
      this.selected = this.initial;
    }

    // clear the search query
    this.query$.next('');

    this._changeDetector.markForCheck();
  }

  /** Select a specific filter */
  selectFilter(filter: Filter): void {
    // clear any current filters
    this.removeFilter();

    // store the newly selected filter
    this.selected = filter;

    // store the filter in the service
    this._filterService.add(this.selected);
  }

  /** Update typeahead items and visibility */
  updateTypeahead(query: string): void {
    this.typeaheadOpen = query.length >= this._options.minCharacters;
    this.typeaheadItems = this.getItems();
  }

  /** Select a filter from a typeahead item */
  select(event: TypeaheadOptionEvent): void {
    // find the filter with the matching name
    const filter = this.filters.find(_filter => _filter.name === event.option);

    if (filter) {
      this.selectFilter(filter);
    }
  }

  static ngAcceptInputType_closeOnBlur: BooleanInput;
}
