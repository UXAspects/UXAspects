import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'uxt-float-label',
    templateUrl: 'float-label.testpage.component.html'
})
export class FloatLabelTestPageComponent {

    demoForm: UntypedFormGroup;

    mode = 'input';

    get locationValue(): string {
        return this.demoForm.get('location').value;
    }

    set locationValue(value: string) {
        this.demoForm.get('location').setValue(value);
    }

    get initialValue(): string {
        return this.demoForm.get('initial').value;
    }

    constructor(formBuilder: UntypedFormBuilder) {

        this.demoForm = formBuilder.group({
            'username': [''],
            'location': [''],
            'initial': ['A']
        });
    }
}