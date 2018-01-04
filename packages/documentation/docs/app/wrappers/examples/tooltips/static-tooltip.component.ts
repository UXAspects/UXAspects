import '../../../pages/components/components-sections/tooltips/static-tooltip-ng1/wrapper/static-tooltip-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-static-tooltip-wrapper'
})
export class StaticTooltipComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdStaticTooltipWrapper', elementRef, injector);
    }
}