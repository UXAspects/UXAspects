import '../../../pages/components/components-sections/tooltips/single-line-overflow-tooltip-ng1/wrapper/single-line-overflow-tooltip-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-single-line-overflow-tooltip-wrapper'
})
export class SingleLineOverflowTooltipComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSingleLineOverflowTooltipWrapper', elementRef, injector);
    }
}