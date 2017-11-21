import '../../../pages/components/components-sections/input-controls/sliders-ng1/wrapper/sliders-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-sliders-wrapper'
})
export class SlidersComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSlidersWrapper', elementRef, injector);
    }
}