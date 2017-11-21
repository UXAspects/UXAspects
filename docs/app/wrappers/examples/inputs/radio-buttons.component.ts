import '../../../pages/components/components-sections/input-controls/radio-button-ng1/wrapper/radio-button-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-radio-button-wrapper'
})
export class RadioButtonComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdRadioButtonWrapper', elementRef, injector);
    }
}