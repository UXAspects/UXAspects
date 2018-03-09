import '../../../pages/components/components-sections/panels/accordion-ng1/wrapper/accordion-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-accordion-wrapper'
})
export class AccordionNg1Component extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdAccordionWrapper', elementRef, injector);
    }
}