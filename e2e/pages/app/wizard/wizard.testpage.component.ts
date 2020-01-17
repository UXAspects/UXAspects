import { Component } from '@angular/core';

@Component({
    selector: 'wizard-app',
    templateUrl: './wizard.testpage.component.html'
})
export class WizardTestPageComponent {
    step5 = false;
    hasFooterTemplate: boolean = false;
    stepInvalid: boolean = false;
    disableNextWhenInvalid: boolean = false;
}