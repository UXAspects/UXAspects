import '../../../pages/components/components-sections/wizard/wizard-ng1/wrapper/wizard-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-wizard-wrapper'
})
export class WizardComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdWizardWrapper', elementRef, injector);
    }
}