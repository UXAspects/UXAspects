import { Component } from '@angular/core';
import { SearchBuilderService } from '../search-builder.service';
import { SearchBuilderGroupQuery } from '../interfaces/group-query.interface';
import { SearchBuilderGroupService } from '../search-builder-group/search-builder-group.service';
import { SearchBuilderComponentContext } from '../interfaces/component-context.interface';

@Component({
    selector: 'ux-base-search',
    template: ''
})
export class BaseSearchComponent {

    type: string;
    config: any;
    context: SearchBuilderComponentContext;

    /**
     * Get the current value of the component
     */
    get value() {
        return this.context.value;
    }

    /**
     * Set the current value of the component
     */
    set value(value: any) {
        this.context.value = value;
        this._searchBuilderService.queryHasChanged();
    }

    constructor(
        private _searchBuilderService: SearchBuilderService,
        private _searchBuilderGroupService: SearchBuilderGroupService
    ) { }
}
