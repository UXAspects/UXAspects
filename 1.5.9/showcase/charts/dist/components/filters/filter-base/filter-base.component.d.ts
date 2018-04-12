import { FilterContainerComponent, Filter } from '../filter-container.component';
export declare class FilterBaseComponent {
    private filtersContainer;
    filters: Filter[];
    constructor(filtersContainer: FilterContainerComponent);
    addFilter(filter: Filter): void;
    removeFilter(filter: Filter): void;
}
