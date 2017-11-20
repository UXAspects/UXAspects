import '../../../pages/components/components-sections/input-controls/checkbox-ng1/wrapper/checkbox-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-checkbox-wrapper'
})
export class CheckboxComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCheckboxWrapper', elementRef, injector);
    }
}