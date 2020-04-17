import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'typeaheadHighlight'
})
export class TypeaheadHighlight implements PipeTransform {
    transform(value: string, searchQuery: string): string {
        const regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b><u>${value.match(regex)}</u></b>`);
    }
}