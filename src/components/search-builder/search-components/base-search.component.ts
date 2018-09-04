import { Component, OnDestroy } from '@angular/core';
import { SearchBuilderComponentContext } from '../interfaces/component-context.interface';
import { SearchBuilderService } from '../search-builder.service';

@Component({
    selector: 'ux-base-search',
    template: ''
})
export class BaseSearchComponent implements OnDestroy {

    get id(): string {
        return `ux-search-builder-search-component-${this._id}`;
    }

    type: string;
    config: any;
    context: SearchBuilderComponentContext;
    focus: boolean;

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

        // if value has been set perform validation
        this.validate();
    }

    get valid(): boolean {
        return this._valid;
    }

    set valid(valid: boolean) {
        this._valid = valid;
        this._searchBuilderService.setValid(this._id, valid);
    }

    private _id: number = this._searchBuilderService.generateComponentId();
    private _valid: boolean = true;

    constructor(private _searchBuilderService: SearchBuilderService) { }

    /**
     * Make sure we clean up after ourselves
     */
    ngOnDestroy(): void {
        this.valid = true;
    }

    /**
     * Perform any required validation on the value
     */
    validate(): void {
        // if a custom validation function has been provided then use it
        this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
    }

}

export interface BaseSearchComponentConfig {
    label?: string;
    placeholder?: string;
    validation?: (value: any) => boolean;
}