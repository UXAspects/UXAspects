import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    form: UntypedFormGroup;

    constructor(formBuilder: UntypedFormBuilder) {

        this.form = formBuilder.group({
            integer: [0, Validators.compose([Validators.required, Validators.min(-10), Validators.max(10)])],
            decimal: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(10)])]
        });
    }
}
