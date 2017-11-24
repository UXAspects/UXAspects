import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { Filter } from '../filter-container.component';
export declare class FilterDropdownComponent extends FilterBaseComponent {
    initial: Filter;
    selected: Filter;
    removeFilter(): void;
    ngOnInit(): void;
    selectFilter(filter: Filter): void;
}
