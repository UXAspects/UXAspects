import '../../../pages/components/components-sections/notifications/alert-styles-ng1/wrapper/alert-styles-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-alert-styles-wrapper'
})
export class AlertStylesComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdAlertStylesWrapper', elementRef, injector);
    }
}