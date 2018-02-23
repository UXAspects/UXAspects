import { Component, HostBinding, Input } from '@angular/core';
import { NotificationService } from '../../index';

@Component({
    selector: 'ux-notification-list',
    templateUrl: './notification-list.component.html'
})
export class NotificationListComponent {
    // @HostBinding('class') @Input() position: 'left' | 'right' = 'right';
    // @Input() direction: 'top' | 'bottom' = 'top';

    // constructor(public notificationService: NotificationService) {
    constructor() {
    }
}