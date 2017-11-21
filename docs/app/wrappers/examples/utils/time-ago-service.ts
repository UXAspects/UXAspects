import '../../../pages/components/components-sections/utilities/time-ago-service-ng1/wrapper/time-ago-service-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-time-ago-service-wrapper'
})
export class TimeAgoServiceComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTimeAgoServiceWrapper', elementRef, injector);
    }
}