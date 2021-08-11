import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'number-picker-app',
    templateUrl: './number-picker-blur.testpage.component.html',
    styleUrls: ['./number-picker-blur.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberPickerUpdateOnBlurTestPageComponent {
    form: FormGroup;

    constructor(formBuilder: FormBuilder) {

        this.form = formBuilder.group({
            updateOnBlur: [
                0,
                {
                    validators: Validators.compose([
                        Validators.required,
                        Validators.min(-10),
                        Validators.max(10)
                    ]),
                    updateOn: 'blur'
                }
            ],
            updateOnChange: [
                0,
                {
                    validators: Validators.compose([
                        Validators.required,
                        Validators.min(-10),
                        Validators.max(10)
                    ]),
                    updateOn: 'change'
                }
            ]
        });
    }
}
