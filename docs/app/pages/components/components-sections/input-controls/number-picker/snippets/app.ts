import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.group({
      integer: [
        0,
        Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)]),
      ],
      decimal: [
        0,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(10)]),
      ],
    });
  }
}
