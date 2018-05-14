import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    demoForm: FormGroup;

    get locationValue(): string {
        return this.demoForm.get('location').value;
    }

    set locationValue(value: string) {
        this.demoForm.get('location').setValue(value);
    }

    constructor(formBuilder: FormBuilder) {
        this.demoForm = formBuilder.group({
            'username': [''],
            'location': ['']
        });
    }
}