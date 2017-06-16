import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { Filter, FilterContainerComponent, FilterRemoveAllEvent } from '../filter-container.component';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
    selector: 'ux-filter-dynamic',
    templateUrl: './filter-dynamic.component.html',
    host: {
        '(document:click)': 'clickOff($event)',
    }
})
export class FilterDynamicComponent extends FilterBaseComponent {

    @Input() filters: Filter[];
    @Input() initial: Filter;
    @Input() options: FilterDynamicListConfig;

    @ViewChild( BsDropdownDirective ) dropdown: BsDropdownDirective;
    @ViewChild( 'inputBox' ) inputBox: ElementRef;

    defaultOptions: FilterDynamicListConfig = {
        placeholder: '',
        minCharacters: 3
    };
    searchQuery: string;
    selected: Filter;
    showTypeahead: boolean = true;
    typeaheadItems: string[] = [];

    getItems(): string[] {
        return this.filters.filter(item => item !== this.initial).map(item => item.name);
    }

    ngOnInit() {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();

        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length ) {
            this.showTypeahead = false;
        }
    }

    selectOption(typeaheadOption: TypeaheadMatch) { 
        this.removeFilter();
        let idx = this.filters.findIndex(filter => filter.name === typeaheadOption.value);
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        if (this.inputBox) {
            this.inputBox.nativeElement.value = '';
        }
        this.dropdown.hide();
    }

    clickOff(event: MouseEvent) {

        let target = event.target as HTMLElement;
        let hideDropdown = true;

        while (target && target.nodeName !== 'BODY') {
            if (target.classList.contains('ux-dynamic-filter')) {
                hideDropdown = false;
                break;
            } else {
                target = target.parentElement;
            }
        }

        if (hideDropdown) {
            if (this.inputBox) {
                this.inputBox.nativeElement.value = '';
            }
            this.dropdown.hide();
        }
        
    }

    removeFilter(): void { 
        if (this.selected !== this.initial) {
            super.removeFilter(this.selected);
            this.selected = this.initial;
        }
        if (this.inputBox) {
            this.inputBox.nativeElement.value = '';
        }
    }

    selectFilter(filter: Filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    }

}

export interface FilterDynamicListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    maxIndividualItems?: number;
}