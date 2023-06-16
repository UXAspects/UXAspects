import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderGroupService } from './search-builder-group.service';

@Component({
  selector: 'ux-search-builder-group',
  templateUrl: './search-builder-group.component.html',
  providers: [SearchBuilderGroupService]
})
export class SearchBuilderGroupComponent implements OnInit, OnDestroy {
  readonly searchBuilderGroupService = inject(SearchBuilderGroupService);

  private readonly _searchBuilderFocusService = inject(SearchBuilderFocusService);

  @Input() id: string;
  @Input() header: string;
  @Input() operator: SearchBuilderGroupOperator = 'and';
  @Input() addText: string = 'Add a field';
  @Input() placeholder: TemplateRef<void>;
  @Input() showPlaceholder: boolean = false;
  @Input() removeFieldButtonAriaLabel: string = 'Remove field';

  @Output() add: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() remove: EventEmitter<SearchBuilderGroupQuery> = new EventEmitter<SearchBuilderGroupQuery>();

  focusIndex: number = -1;

  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {

    // ensure we have a name otherwise throw an error
    if (!this.id) {
      throw new Error('Search builder group must have an id attribute.');
    }

    // otherwise register the group
    this.searchBuilderGroupService.init(this.id);

    // Track focus for child components
    this._searchBuilderFocusService.focus$.pipe(takeUntil(this._onDestroy)).subscribe(focus => {
      this.focusIndex = (focus.groupId === this.id) ? focus.index : -1;
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  addField(event: MouseEvent): void {
    this.add.emit(event);
  }

  removeFieldAtIndex(index: number, field: SearchBuilderGroupQuery): void {
    this.searchBuilderGroupService.removeAtIndex(index);
    this.remove.emit(field);
  }

  setFocus(index: number): void {
    this._searchBuilderFocusService.setFocus(this.id, index);
  }

  clearFocus(): void {
    this._searchBuilderFocusService.clearFocus();
  }
}

export type SearchBuilderGroupOperator = 'and' | 'or' | 'not';
