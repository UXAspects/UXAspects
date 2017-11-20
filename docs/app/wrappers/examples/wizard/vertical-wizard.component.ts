import '../../../pages/components/components-sections/wizard/vertical-wizard-ng1/wrapper/vertical-wizard-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-vertical-wizard-wrapper'
})
export class VerticalWizardComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdVerticalWizardWrapper', elementRef, injector);
    }
}