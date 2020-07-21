import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NotificationRef, NotificationService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'notification-testpage',
    templateUrl: './notification.testpage.component.html',
})
export class NotificationTestPageComponent {
    notificationId = 0;
    direction = 'above';
    position = 'top-right';

    @ViewChild('notification', { static: false }) notification: TemplateRef<any>;

    constructor(private _notificationService: NotificationService) {}

    showNotification(spacing?: number): void {
        this._notificationService.show(
            this.notification,
            {
                duration: 0,
                iconColor: 'fuchsia',
                spacing: spacing,
            },
            {
                id: this.notificationId,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus ex vel placerat porta.',
            }
        );

        this.notificationId += 1;
    }

    dismiss(notificationRef: NotificationRef): void {
        this._notificationService.dismiss(notificationRef);
    }

    dismissAll(): void {
        this._notificationService.dismissAll();
    }
}
