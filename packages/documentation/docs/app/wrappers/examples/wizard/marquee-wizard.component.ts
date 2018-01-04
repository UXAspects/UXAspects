import '../../../pages/components/components-sections/wizard/marquee-wizard-ng1/wrapper/marquee-wizard-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-marquee-wizard-wrapper'
})
export class MarqueeWizardComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdMarqueeWizardWrapper', elementRef, injector);
    }
}