import { Directive, Host, Input, Output } from '@angular/core';
import { FilterContainerComponent, Filter, FilterRemoveAllEvent } from '../filter-container.component';

@Directive({
    selector: 'ux-filter-base'
})
export class FilterBaseComponent {

    @Input() filters: Filter[];

    constructor(@Host() private filtersContainer: FilterContainerComponent) {

        filtersContainer.events.filter(event => event instanceof FilterRemoveAllEvent).subscribe(this.removeFilter.bind(this));
    }

    addFilter(filter: Filter): void {
        if (!filter.initial) {
            this.filtersContainer.addFilter(filter);
        }
    }

    removeFilter(filter: Filter): void {
        if (!filter) {
            return;
        }

        this.filtersContainer.removeFilter(filter);
    }
    
}