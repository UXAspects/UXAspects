import '../../../pages/components/components-sections/tooltips/overflow-tooltip-ng1/wrapper/overflow-tooltip-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-overflow-tooltip-wrapper'
})
export class OverflowTooltipComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdOverflowTooltipWrapper', elementRef, injector);
    }
}