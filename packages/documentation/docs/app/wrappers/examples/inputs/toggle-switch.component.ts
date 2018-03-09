import '../../../pages/components/components-sections/input-controls/toggle-switch-ng1/wrapper/toggle-switch-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-toggle-switch-wrapper'
})
export class ToggleSwitchComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdToggleSwitchWrapper', elementRef, injector);
    }
}