import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    demoForm: UntypedFormGroup;

    get locationValue(): string {
        return this.demoForm.get('location').value;
    }

    set locationValue(value: string) {
        this.demoForm.get('location').setValue(value);
    }

    constructor(formBuilder: UntypedFormBuilder) {
        this.demoForm = formBuilder.group({
            'username': [''],
            'location': ['']
        });
    }
}
