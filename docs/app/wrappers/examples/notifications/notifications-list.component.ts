import '../../../pages/components/components-sections/notifications/notification-list-ng1/wrapper/notification-list-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-notification-list-wrapper'
})
export class NotificationListComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdNotificationListWrapper', elementRef, injector);
    }
}