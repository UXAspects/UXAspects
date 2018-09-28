import { OnDestroy } from '@angular/core';
import { SearchBuilderComponentContext } from '../interfaces/component-context.interface';
import { SearchBuilderService } from '../search-builder.service';
export declare class BaseSearchComponent implements OnDestroy {
    private _searchBuilderService;
    readonly id: string;
    type: string;
    config: any;
    context: SearchBuilderComponentContext;
    focus: boolean;
    /**
     * Get the current value of the component
     */
    /**
     * Set the current value of the component
     */
    value: any;
    valid: boolean;
    private _id;
    private _valid;
    constructor(_searchBuilderService: SearchBuilderService);
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
