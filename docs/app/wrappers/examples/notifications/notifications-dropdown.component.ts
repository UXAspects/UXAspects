import '../../../pages/components/components-sections/notifications/notification-dropdown-ng1/wrapper/notification-dropdown-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-notification-dropdown-wrapper'
})
export class NotificationDropdownComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdNotificationDropdownWrapper', elementRef, injector);
    }
}