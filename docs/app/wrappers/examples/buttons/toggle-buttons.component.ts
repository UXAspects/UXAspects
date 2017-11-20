import '../../../pages/components/components-sections/buttons/toggle-buttons-ng1/wrapper/toggle-buttons-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-toggle-buttons-wrapper'
})
export class ToggleButtonsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdToggleButtonsWrapper', elementRef, injector);
    }
}