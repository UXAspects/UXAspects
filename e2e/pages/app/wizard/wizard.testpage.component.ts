import { Component } from '@angular/core';

@Component({
    selector: 'wizard-app',
    templateUrl: './wizard.testpage.component.html'
})
export class WizardTestPageComponent {
    step5 = false;
    hasFooterTemplate: boolean = false;
    step1Invalid: boolean = false;
    step4Invalid: boolean = false;
    step2Invalid: boolean = false;
    disableNextWhenInvalid: boolean = false;
    disableNextWhenInvalidWizard: boolean = false;
}