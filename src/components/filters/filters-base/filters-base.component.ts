import { FilterRemoveAllEvent } from './../filters-container.component';
import { Directive, Host, Input } from '@angular/core';
import { FiltersContainerComponent, Filter } from '../filters-container.component';

@Directive({
    selector: 'ux-filters-base'
})
export class FiltersBaseComponent {

    @Input() filters: Filter[];

    constructor(@Host() private filtersContainer: FiltersContainerComponent) {

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