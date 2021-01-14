import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-dropdown-forms',
    templateUrl: './input-dropdown-forms.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDropdownFormsTestPageComponent {

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

    constructor(private formBuilder: FormBuilder) {}

    placeholder: string = 'Type to search...';
    selected: string;
    disabled: boolean = false;

    form: FormGroup = this.formBuilder.group({
        inputDropdown: [{value: '', disabled: this.disabled}]
    });

    get inputDropdown() {
        return this.form.get('inputDropdown');
    }

    selectOption(event: KeyboardEvent, option: string): void {
        this.selected = option;
        event.preventDefault();
    }

}
