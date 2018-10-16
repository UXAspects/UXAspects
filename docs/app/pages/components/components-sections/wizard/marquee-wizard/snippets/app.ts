import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MarqueeWizardComponent } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    error: boolean = false;
    skip: boolean = false;
    validate: boolean = false;
    modalOpen: boolean = false;
    requiredText = new FormControl('', Validators.required);

    constructor(private _announcer: LiveAnnouncer) {}

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

    onChange(index: number, wizard: MarqueeWizardComponent): void {

        // get the step header
        const step = wizard.steps.toArray()[index];

        // announce the step error
        if (step.valid) {
            this._announcer.announce(`${step.header} activated`);
        } else {
            this._announcer.announce(`${step.header} activated. This step is invalid.`);
        }
    }

    onError(): void {
        this._announcer.announce(`The current step is invalid`);
    }
}