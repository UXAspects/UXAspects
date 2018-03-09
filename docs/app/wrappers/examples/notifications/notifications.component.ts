import '../../../pages/components/components-sections/notifications/notifications-ng1/wrapper/notifications-wrapper.directive';
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-notifications-wrapper'
})
export class NotificationsComponent extends UpgradeComponent {

    @Input() colorFieldName: string;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdNotificationsWrapper', elementRef, injector);
    }
}