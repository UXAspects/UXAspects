import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderService } from './search-builder.service';

@Component({
  selector: 'ux-search-builder',
  templateUrl: './search-builder.component.html',
  providers: [SearchBuilderService]
})
export class SearchBuilderComponent implements OnDestroy {

  @Input()
  set components(components: SearchBuilderComponentDefinition[]) {
    this._searchBuilderService.registerComponents(components);
  }

  @Input()
  set query(value: SearchBuilderQuery) {
    this._searchBuilderService.setQuery(value);
  }

  get query() {
    return this._searchBuilderService.getQuery();
  }

  @Output() queryChange: EventEmitter<SearchBuilderQuery> = new EventEmitter<SearchBuilderQuery>();
  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  private _querySubscription: Subscription;
  private _validSubscription: Subscription;

  /**
   * Register the default search builder components
   */
  constructor(private _searchBuilderService: SearchBuilderService) {

    // watch for any query changes
    this._querySubscription = _searchBuilderService.queryChange.subscribe(query => this.queryChange.emit(query));

    // watch for any changes to the validation
    this._validSubscription = _searchBuilderService.validationChange.pipe(distinctUntilChanged()).subscribe(valid => this.valid.emit(valid));
  }

  /**
   * Remove any subscriptions and cleanup
   */
  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
    this._validSubscription.unsubscribe();
  }

}
