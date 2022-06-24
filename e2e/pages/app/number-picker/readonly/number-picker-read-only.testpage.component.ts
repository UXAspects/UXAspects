import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'number-picker-app',
    templateUrl: './number-picker-read-only.testpage.component.html',
    styleUrls: ['./number-picker-read-only.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberPickerReadOnlyTestPageComponent {
    form: FormGroup;
    readonly = true;

    constructor(formBuilder: FormBuilder) {

        this.form = formBuilder.group({
            readonly: [5, Validators.required],
            readonlyInline: [6, Validators.required]
        });
    }
}
