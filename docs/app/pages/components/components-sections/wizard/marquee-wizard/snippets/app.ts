import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    error: boolean = false;
    skip: boolean = false;
    validate: boolean = false;
    modalOpen: boolean = false;
    requiredText = new FormControl('', Validators.required);

    /**
     * Close the modal and reset everything
     */
    close(): void {
        this.modalOpen = false;
        this.validate = false;
        this.skip = false;
        this.error = false;
        this.requiredText.reset();
    }
}