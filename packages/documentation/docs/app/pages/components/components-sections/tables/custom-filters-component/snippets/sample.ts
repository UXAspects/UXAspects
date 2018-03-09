import { Component, Input } from '@angular/core';
import { FilterBaseComponent, Filter, FilterContainerComponent, FilterRemoveAllEvent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'ux-filter-custom',
    templateUrl: './sample-filter.component.html',
    styleUrls: ['./sample-filter.component.css']
})
export class SampleFilterCustomComponent extends FilterBaseComponent {

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