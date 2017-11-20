import '../../../pages/components/components-sections/input-controls/toggle-switch-ng1/wrapper/custom-toggle-switch-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-custom-toggle-switch-wrapper'
})
export class CustomToggleSwitchComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCustomToggleSwitchWrapper', elementRef, injector);
    }
}