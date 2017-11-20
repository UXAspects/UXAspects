import '../../../pages/components/components-sections/date-time-picker/date-picker-ng1/wrapper/date-picker-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-date-picker-wrapper'
})
export class DatePickerComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDatePickerWrapper', elementRef, injector);
    }
}