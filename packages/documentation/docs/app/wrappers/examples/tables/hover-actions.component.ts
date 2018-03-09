import '../../../pages/components/components-sections/tables/hover-actions-ng1/wrapper/hover-actions-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-hover-actions-wrapper'
})
export class HoverActionsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdHoverActionsWrapper', elementRef, injector);
    }
}