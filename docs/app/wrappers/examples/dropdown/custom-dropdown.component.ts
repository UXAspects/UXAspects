import '../../../pages/components/components-sections/input-controls/custom-dropdown-ng1/wrapper/custom-dropdown-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-custom-dropdown-wrapper'
})
export class CustomDropdownComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCustomDropdownWrapper', elementRef, injector);
    }
}