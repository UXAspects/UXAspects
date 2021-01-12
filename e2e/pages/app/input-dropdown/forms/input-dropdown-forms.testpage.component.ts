import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-dropdown-forms',
    templateUrl: './input-dropdown-forms.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDropdownFormsTestPageComponent {

    optionList: ReadonlyArray<RadioOption> = [
        { name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }
    ];

    filteredOptionList: ReadonlyArray<RadioOption> = this.optionList;
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
        inputForm: [{value: '', disabled: true}, [Validators.minLength(3), Validators.maxLength(6)]]
    });

    get inputForm() {
        return this.form.get('inputForm');
    }

    private _filter: string = '';

    constructor(private formBuilder: FormBuilder) {}

    placeholder: string = 'Type to search...';
    selected: RadioOption;

    selectOption(event: KeyboardEvent, option: RadioOption): void {
        this.selected = option;
        event.preventDefault();
    }

}

export interface RadioOption {
    name: string;
}
