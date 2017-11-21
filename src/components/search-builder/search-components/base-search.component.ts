import { Component } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderGroupService } from '../search-builder-group/search-builder-group.service';

@Component({
    selector: 'ux-base-search'
})
export abstract class BaseSearchComponent {

    abstract type: string;
    context: SearchBuilderGroupQuery;

    constructor(
        private _searchBuilderService: SearchBuilderService,
        private _searchBuilderGroupService: SearchBuilderGroupService
    ) { }

    setValue(value: any): void {
        this.context.value = value;
        this._searchBuilderService.queryHasChanged();
    }
}
