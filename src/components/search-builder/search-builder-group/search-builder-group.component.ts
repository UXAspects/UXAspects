import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { SearchBuilderGroupService } from './search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';

@Component({
  selector: 'ux-search-builder-group',
  templateUrl: './search-builder-group.component.html',
  providers: [SearchBuilderGroupService]
})
export class SearchBuilderGroupComponent implements OnInit {

  @Input() id: string;
  @Input() header: string;
  @Input() operator: SearchBuilderGroupOperator = 'and';
  @Input() addText: string = 'Add a field';
  @Input() placeholder: TemplateRef<any>;
  @Input() showPlaceholder: boolean = false;

  @Output() add: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() remove: EventEmitter<SearchBuilderGroupQuery> = new EventEmitter<SearchBuilderGroupQuery>();

  constructor(public searchBuilderGroupService: SearchBuilderGroupService, private _searchBuilderService: SearchBuilderService) { }

  ngOnInit(): void {

    // ensure we have a name otherwise throw an error
    if (!this.id) {
      throw new Error('Search builder group must have a name attribute.');
    }

    // otherwise register the group
    this.searchBuilderGroupService.init(this.id);
  }

  removeField(field: SearchBuilderGroupQuery): void {
    this.searchBuilderGroupService.remove(field);
    this.remove.emit(field);
  }
}

export type SearchBuilderGroupOperator = 'and' | 'or' | 'not';
