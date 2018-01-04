import { Component, Input } from '@angular/core';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { Filter, FilterContainerComponent, FilterRemoveAllEvent } from '../filter-container.component';

@Component({
    selector: 'ux-filter-dropdown',
    templateUrl: './filter-dropdown.component.html',
})
export class FilterDropdownComponent extends FilterBaseComponent {

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