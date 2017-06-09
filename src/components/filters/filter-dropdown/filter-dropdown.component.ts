import { Component, Input } from '@angular/core';
import { FiltersBaseComponent } from '../filters-base/filters-base.component';
import { Filter, FiltersContainerComponent, FilterRemoveAllEvent } from '../filters-container.component';

@Component({
    selector: 'ux-filter-dropdown',
    templateUrl: './filter-dropdown.component.html',
})
export class FilterDropdownComponent extends FiltersBaseComponent {

    @Input() initial: Filter;

    selected: Filter;

    removeFilter(): void {
        super.removeFilter(this.selected);
        this.selected = this.initial;
    }

    ngOnInit() {
        this.selected = this.initial;
    }

    selectFilter(filter: Filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    }

}