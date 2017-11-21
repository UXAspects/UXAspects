import '../../../pages/components/components-sections/date-time-picker/integrated-date-picker-ng1/wrapper/integrated-date-picker-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-integrated-date-picker-wrapper'
})
export class IntegratedDatePickerComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdIntegratedDatePickerWrapper', elementRef, injector);
    }
}