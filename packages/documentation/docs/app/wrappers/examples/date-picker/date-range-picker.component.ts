import '../../../pages/components/components-sections/date-time-picker/date-range-picker-ng1/wrapper/date-range-picker-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-date-range-picker-wrapper'
})
export class DateRangePickerComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDateRangePickerWrapper', elementRef, injector);
    }
}