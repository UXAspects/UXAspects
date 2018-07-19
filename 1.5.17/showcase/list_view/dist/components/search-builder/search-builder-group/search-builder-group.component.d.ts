import { OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { SearchBuilderGroupService } from './search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
export declare class SearchBuilderGroupComponent implements OnInit {
    searchBuilderGroupService: SearchBuilderGroupService;
    private _searchBuilderService;
    id: string;
    header: string;
    operator: SearchBuilderGroupOperator;
    addText: string;
    placeholder: TemplateRef<any>;
    showPlaceholder: boolean;
    add: EventEmitter<MouseEvent>;
    remove: EventEmitter<SearchBuilderGroupQuery>;
    constructor(searchBuilderGroupService: SearchBuilderGroupService, _searchBuilderService: SearchBuilderService);
    ngOnInit(): void;
    removeField(field: SearchBuilderGroupQuery): void;
}
export declare type SearchBuilderGroupOperator = 'and' | 'or' | 'not';
