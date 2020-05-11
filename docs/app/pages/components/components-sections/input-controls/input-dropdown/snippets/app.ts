import { Component, Pipe, PipeTransform } from '@angular/core';
import { interval } from 'rxjs';


@Pipe({ name: 'highlightSearch' })
export class HighlightSearch implements PipeTransform {
    transform(text: string, filter: string): string {
        const highlightIndex = text.toLowerCase().indexOf(filter.toLowerCase());
        return (highlightIndex < 0) ?
            text :
            text.substr(0, highlightIndex) +
            '<b>' + text.substr(highlightIndex, filter.length) + '</b>' +
            text.substr(highlightIndex + filter.length);
    }
}


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selected: RadioOption;
    optionList: ReadonlyArray<RadioOption> = [
        { name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }
    ];
    filteredOptionList: ReadonlyArray<RadioOption> = this.optionList;
    filter: string = '';
    allowNull: boolean = false;
    dropdownOpen: boolean = false;
    maxHeight: string = '400px';
    placeholder: string = 'Type to search...';
    resetFilter: boolean = false;

    constructor() {
        interval(10000).subscribe(() => {
            if (this.resetFilter) {
                this.filter = '';
                this.setFilter('');
            }
        });
    }

    selectOption(event: KeyboardEvent, option: RadioOption): void {
        this.selected = option;
        event.preventDefault();
    }

    setFilter(filter: string): void {
        this.filteredOptionList =
            filter && (filter.length > 0) ?
                this.optionList.filter(option => (option.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)) :
                this.optionList;
    }

    dropdownOpenChange(value: boolean): void {
        this.dropdownOpen = value;
    }
}

export interface RadioOption {
    name: string;
}
