import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeaheadKeyService, TypeaheadOptionEvent } from '../../typeahead/index';
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

    @Input() set options(options: FilterDynamicListConfig) {
        this._config = {... this.defaultOptions, ...options };
    }

    get options(): FilterDynamicListConfig {
        return this._config;
    }

    @ViewChild(BsDropdownDirective) dropdown: BsDropdownDirective;

    defaultOptions: FilterDynamicListConfig = {
        placeholder: '',
        minCharacters: 3,
        maxResults: Infinity
    };

    typeaheadId: string = `ux-filter-dynamic-typeahead-${uniqueId++}`;
    query$ = new BehaviorSubject<string>('');
    selected: Filter;
    showTypeahead: boolean = true;
    typeaheadItems: string[] = [];
    highlightedElement: HTMLElement;
    typeaheadOpen: boolean = false;

    private _config: FilterDynamicListConfig = { ...this.defaultOptions };

    constructor(public typeaheadKeyService: TypeaheadKeyService, container: FilterContainerComponent, announcer: LiveAnnouncer) {
        super(container, announcer);
    }

    getItems(): string[] {
        const query = this.query$.value.toLowerCase();

        return this.filters.filter(item => item !== this.initial && item.name.toLowerCase().indexOf(query) !== -1)
            .map(item => item.name)
            .slice(0, this._config.maxResults);
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

    updateTypeahead(query: string): void {
        this.typeaheadOpen = query.length >= this._config.minCharacters;
        this.typeaheadItems = this.getItems();
    }

    select(event: TypeaheadOptionEvent): void {
        // find the filter with the matching name
        const filter = this.filters.find(_filter => _filter.name === event.option);

        if (filter) {
            this.selectFilter(filter);
        }
    }

}

export interface FilterDynamicListConfig {
    placeholder?: string;
    minCharacters?: number;
    maxResults?: number;
    maxIndividualItems?: number;
}

@Pipe({
    name: 'filterTypeaheadHighlight'
})
export class FilterTypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string {
        const regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="filter-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}