import { Component, Pipe, PipeTransform } from '@angular/core';


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
    private _filter: string = '';
    get filter(): string {
        return this._filter;
    }

    set filter(value: string) {
        this._filter = value;
        this.filteredOptionList =
            value && (value.length > 0) ?
                this.optionList.filter(option => (option.name.toLowerCase().indexOf(value.toLowerCase()) > -1)) :
                this.optionList;
    }
    allowNull: boolean = false;
    disabled: boolean = false;
    dropdownOpen: boolean = false;
    maxHeight: string = '400px';
    placeholder: string = 'Type to search...';

    selectOption(event: KeyboardEvent, option: RadioOption): void {
        this.selected = option;
        event.preventDefault();
    }

    dropdownOpenChange(value: boolean): void {
        this.dropdownOpen = value;
    }
}

export interface RadioOption {
    name: string;
}
