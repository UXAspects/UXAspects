import { Component, Input } from '@angular/core';
import { FiltersBaseComponent, Filter, FiltersContainerComponent, FilterRemoveAllEvent } from '../../../../../../../../src/index';

@Component({
    selector: 'ux-filter-custom',
    templateUrl: './sample-filter.component.html',
    styleUrls: ['./sample-filter.component.less']
})
export class SampleFilterCustomComponent extends FiltersBaseComponent {

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