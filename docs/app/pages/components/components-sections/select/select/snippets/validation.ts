import { Component, OnDestroy } from '@angular/core';
import {
	AbstractControl,
	UntypedFormControl,
	UntypedFormGroup,
	Validators
} from '@angular/forms';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

	formGroup: UntypedFormGroup = new UntypedFormGroup({
		select: new UntypedFormControl(undefined, [Validators.required]),
	});

	options: string[] = ['Option1', 'Option2'];

	get select(): AbstractControl {
		return this.formGroup.get('select');
	}
}
