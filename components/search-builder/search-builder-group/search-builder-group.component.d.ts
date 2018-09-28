import { EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderFocusService } from '../search-builder-focus.service';
import { SearchBuilderGroupService } from './search-builder-group.service';
export declare class SearchBuilderGroupComponent implements OnInit, OnDestroy {
    searchBuilderGroupService: SearchBuilderGroupService;
    private _searchBuilderFocusService;
    id: string;
    header: string;
    operator: SearchBuilderGroupOperator;
    addText: string;
    placeholder: TemplateRef<any>;
    showPlaceholder: boolean;
    add: EventEmitter<MouseEvent>;
    remove: EventEmitter<SearchBuilderGroupQuery>;
    focusIndex: number;
    private _onDestroy;
    constructor(searchBuilderGroupService: SearchBuilderGroupService, _searchBuilderFocusService: SearchBuilderFocusService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    addField(event: MouseEvent): void;
    removeFieldAtIndex(index: number, field: SearchBuilderGroupQuery): void;
    setFocus(index: number): void;
    clearFocus(): void;
}
export declare type SearchBuilderGroupOperator = 'and' | 'or' | 'not';
