import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'number-picker-app',
  templateUrl: './number-picker-update-on.testpage.component.html',
  styleUrls: ['./number-picker-update-on.testpage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NumberPickerUpdateOnTestPageComponent {
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      updateOnBlur: [
        0,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.max(10),
          ]),
          updateOn: 'blur',
        },
      ],
      updateOnChange: [
        0,
        {
          validators: Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.max(10),
          ]),
          updateOn: 'change',
        },
      ],
    });
  }
}
