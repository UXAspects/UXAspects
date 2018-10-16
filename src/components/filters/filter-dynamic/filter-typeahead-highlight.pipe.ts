import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterTypeaheadHighlight'
})
export class FilterTypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string {
        const regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="filter-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}