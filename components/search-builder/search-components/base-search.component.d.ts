import { OnDestroy } from '@angular/core';
import { SearchBuilderComponentContext } from '../interfaces/component-context.interface';
import { SearchBuilderGroupService } from '../search-builder-group/search-builder-group.service';
import { SearchBuilderService } from '../search-builder.service';
export declare class BaseSearchComponent implements OnDestroy {
    private _searchBuilderService;
    private _searchBuilderGroupService;
    type: string;
    config: any;
    context: SearchBuilderComponentContext;
    private _id;
    private _valid;
    /**
     * Get the current value of the component
     */
    /**
     * Set the current value of the component
     */
    value: any;
    valid: boolean;
    constructor(_searchBuilderService: SearchBuilderService, _searchBuilderGroupService: SearchBuilderGroupService);
    /**
     * Make sure we clean up after ourselves
     */
    ngOnDestroy(): void;
    /**
     * Perform any required validation on the value
     */
    validate(): void;
}
export interface BaseSearchComponentConfig {
    label?: string;
    placeholder?: string;
    validation?: (value: any) => boolean;
}
