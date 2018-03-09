import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'number-picker-app',
    templateUrl: './number-picker.testpage.component.html',
    styleUrls: ['./number-picker.testpage.component.css']
})
export class NumberPickerTestPageComponent {
    form: FormGroup;

    constructor(formBuilder: FormBuilder) {

        this.form = formBuilder.group({
            integer: [0, Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])],
            decimal: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(10)])]
        });
    }
}
