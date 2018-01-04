import '../../../pages/components/components-sections/notifications/dismissable-styles-ng1/wrapper/dismissable-styles-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-dismissable-styles-wrapper'
})
export class DismissableStylesComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDismissableStylesWrapper', elementRef, injector);
    }
}