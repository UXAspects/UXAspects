import '../../../pages/components/components-sections/popover/popover-ng1/wrapper/popover-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-popover-wrapper'
})
export class PopoverComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdPopoverWrapper', elementRef, injector);
    }
}