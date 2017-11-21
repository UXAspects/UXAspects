import '../../../pages/components/components-sections/input-controls/slider-charts-ng1/wrapper/slider-charts-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-slider-charts-wrapper'
})
export class SliderChartsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSliderChartsWrapper', elementRef, injector);
    }
}