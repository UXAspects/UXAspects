import '../../../pages/components/components-sections/buttons/checkbox-buttons-ng1/wrapper/checkbox-buttons-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-checkbox-buttons-wrapper'
})
export class CheckboxButtonsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCheckboxButtonsWrapper', elementRef, injector);
    }
}