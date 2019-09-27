import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'wizard-app',
    templateUrl: './wizard.testpage.component.html'
})
export class WizardTestPageComponent {
    step5 = false;
    content: TemplateRef<any>;
}