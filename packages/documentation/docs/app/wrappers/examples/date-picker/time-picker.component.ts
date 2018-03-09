import '../../../pages/components/components-sections/date-time-picker/time-picker-ng1/wrapper/time-picker-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-time-picker-wrapper'
})
export class TimePickerComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTimePickerWrapper', elementRef, injector);
    }
}