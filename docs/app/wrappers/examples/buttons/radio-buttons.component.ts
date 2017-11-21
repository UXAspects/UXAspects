import '../../../pages/components/components-sections/buttons/radio-buttons-ng1/wrapper/radio-buttons-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-radio-buttons-wrapper'
})
export class RadioButtonsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdRadioButtonsWrapper', elementRef, injector);
    }
}