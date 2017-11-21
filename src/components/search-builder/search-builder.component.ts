import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SearchBuilderService } from './search-builder.service';
import { SearchBuilderQuery } from './interfaces/query.interface';
import { SearchBuilderComponentDefinition } from './interfaces/component-definition.interface';
import { SearchTextComponent } from './search-components/search-text/search-text.component';

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

  private _subscription: Subscription;

  /**
   * Register the default search builder components
   */
  constructor(private _searchBuilderService: SearchBuilderService) {

    // add the default components
    _searchBuilderService.registerComponent('text', SearchTextComponent);

    // watch for any query changes
    this._subscription = _searchBuilderService.queryChange.subscribe(query => this.queryChange.emit(query));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
