import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { Filter } from '../filter-container.component';
export declare class FilterDynamicComponent extends FilterBaseComponent {
    filters: Filter[];
    initial: Filter;
    options: FilterDynamicListConfig;
    dropdown: BsDropdownDirective;
    defaultOptions: FilterDynamicListConfig;
    searchQuery: string;
    selected: Filter;
    showTypeahead: boolean;
    typeaheadItems: string[];
    getItems(): string[];
    ngOnInit(): void;
    selectOption(typeaheadOption: TypeaheadMatch): void;
    clickOff(event: MouseEvent): void;
    removeFilter(): void;
    selectFilter(filter: Filter): void;
}
export interface FilterDynamicListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    maxIndividualItems?: number;
}
