import '../../../pages/components/components-sections/tooltips/tooltips-ng1/wrapper/tooltips-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tooltips-wrapper'
})
export class TooltipsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTooltipsWrapper', elementRef, injector);
    }
}