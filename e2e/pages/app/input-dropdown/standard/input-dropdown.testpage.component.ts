import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-input-dropdown',
    templateUrl: './input-dropdown.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDropdownTestPageComponent {

    optionList: ReadonlyArray<string> = [
        'One', 'Two', 'Three', 'Four'
    ];

    filteredOptionList: ReadonlyArray<string> = this.optionList;
    get filter(): string {
        return this._filter;
    }

    set filter(value: string) {
        this._filter = value;
        this.filteredOptionList =
            value && (value.length > 0) ?
                this.optionList.filter(option => (option.toLowerCase().indexOf(value.toLowerCase()) > -1)) :
                this.optionList;
    }

    private _filter: string = '';

    disabled: boolean = false;
    placeholder: string = 'Type to search...';
    selected: string;

    selectOption(event: KeyboardEvent, option: string): void {
        this.selected = option;
        event.preventDefault();
    }

}

