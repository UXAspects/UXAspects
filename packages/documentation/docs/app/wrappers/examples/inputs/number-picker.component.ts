import '../../../pages/components/components-sections/input-controls/number-picker-ng1/wrapper/number-picker-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-number-picker-wrapper'
})
export class NumberPickerComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdNumberPickerWrapper', elementRef, injector);
    }
}