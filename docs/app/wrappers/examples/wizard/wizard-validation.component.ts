import '../../../pages/components/components-sections/wizard/wizard-validation-ng1/wrapper/wizard-validation-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-wizard-validation-wrapper'
})
export class WizardValidationComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdWizardValidationWrapper', elementRef, injector);
    }
}