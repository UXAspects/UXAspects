import '../../../pages/components/components-sections/buttons/dropdown-ng1/wrapper/dropdown-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-dropdown-wrapper'
})
export class DropdownComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDropdownWrapper', elementRef, injector);
    }
}