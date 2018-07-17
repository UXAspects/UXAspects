import { Component, Input, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeaheadKeyService } from '../../typeahead';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
import { Filter, FilterContainerComponent } from '../filter-container.component';

let uniqueId = 1;

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

    @ViewChild(BsDropdownDirective) dropdown: BsDropdownDirective;

    defaultOptions: FilterDynamicListConfig = {
        placeholder: '',
        minCharacters: 3
    };

    typeaheadId: string = `ux-filter-dynamic-typeahead-${uniqueId++}`;
    query$ = new BehaviorSubject<string>('');
    selected: Filter;
    showTypeahead: boolean = true;
    typeaheadItems: string[] = [];
    highlightedElement: HTMLElement;
    typeaheadOpen: boolean = false;
    typeaheadOptions = {};

    constructor(public typeaheadKeyService: TypeaheadKeyService, container: FilterContainerComponent) {
        super(container);
        debugger;
    }

    getItems(): string[] {
        return this.filters.filter(item => item !== this.initial).map(item => item.name);
    }

    ngOnInit() {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();

        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }

    selectOption(typeaheadOption: TypeaheadMatch) {
        this.removeFilter();
        const idx = this.filters.findIndex(filter => filter.name === typeaheadOption.value);
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.query$.next('');
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
            this.query$.next('');
            this.dropdown.hide();
        }

    }

    removeFilter(): void {
        if (this.selected !== this.initial) {
            super.removeFilter(this.selected);
            this.selected = this.initial;
        }
        this.query$.next('');
    }

    selectFilter(filter: Filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    }

    updateTypeahead(event: any): void {

    }

    select(event: any): void {

    }

}

export interface FilterDynamicListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    maxIndividualItems?: number;
}