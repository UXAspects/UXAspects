import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  formGroup: FormGroup = new FormGroup({
    select: new FormControl(undefined, [Validators.required]),
  });

  options: string[] = ['Option1', 'Option2'];

  get select(): AbstractControl {
    return this.formGroup.get('select');
  }
}
