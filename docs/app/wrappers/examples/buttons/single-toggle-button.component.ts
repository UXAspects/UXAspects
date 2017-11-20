import '../../../pages/components/components-sections/buttons/single-toggle-button-ng1/wrapper/single-toggle-button-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-single-toggle-button-wrapper'
})
export class SingleToggleButtonComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSingleToggleButtonWrapper', elementRef, injector);
    }
}