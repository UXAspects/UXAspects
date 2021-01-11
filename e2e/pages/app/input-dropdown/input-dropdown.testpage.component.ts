import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-dropdown',
    templateUrl: './input-dropdown.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDropdownTestPageComponent implements OnInit {

    ngOnInit() {}

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

    form: FormGroup = this.formBuilder.group({
        inputForm: ['', [Validators.minLength(3), Validators.maxLength(6)]]
    });

    get inputForm() {
        return this.form.get('inputForm');
    }

    constructor(private formBuilder: FormBuilder) {}

    allowNull: boolean = false;
    dropdownOpen: boolean = false;
    disabled: boolean = false;
    maxHeight: string = '400px';
    placeholder: string = 'Type to search...';
    selected: RadioOption;

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
