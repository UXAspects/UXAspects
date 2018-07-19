import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PipeTransform } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { Filter, FilterContainerComponent } from '../filter-container.component';
export declare class FilterDynamicComponent extends FilterBaseComponent {
    typeaheadKeyService: TypeaheadKeyService;
    filters: Filter[];
    initial: Filter;
    options: FilterDynamicListConfig;
    dropdown: BsDropdownDirective;
    defaultOptions: FilterDynamicListConfig;
    typeaheadId: string;
    query$: BehaviorSubject<string>;
    selected: Filter;
    showTypeahead: boolean;
    typeaheadItems: string[];
    highlightedElement: HTMLElement;
    typeaheadOpen: boolean;
    private _config;
    constructor(typeaheadKeyService: TypeaheadKeyService, container: FilterContainerComponent, announcer: LiveAnnouncer);
    getItems(): string[];
    ngOnInit(): void;
    selectOption(typeaheadOption: TypeaheadMatch): void;
    clickOff(event: MouseEvent): void;
    removeFilter(): void;
    selectFilter(filter: Filter): void;
    updateTypeahead(query: string): void;
    select(event: TypeaheadOptionEvent): void;
}
export interface FilterDynamicListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    maxIndividualItems?: number;
}
export declare class FilterTypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string;
}
