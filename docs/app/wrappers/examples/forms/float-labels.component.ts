import '../../../pages/css/css-sections/text-inputs/float-labels/wrapper/float-labels-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-float-labels-wrapper'
})
export class FloatLabelsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFloatLabelsWrapper', elementRef, injector);
    }
}