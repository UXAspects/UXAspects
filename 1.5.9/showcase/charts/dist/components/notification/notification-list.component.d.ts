import { NotificationService, NotificationRef, NotificationListDirection } from './notification.service';
import { Observable } from 'rxjs/Observable';
export declare class NotificationListComponent {
    private _notificationService;
    direction: NotificationListDirection;
    position: NotificationListPostion;
    notifications$: Observable<NotificationRef[]>;
    constructor(_notificationService: NotificationService);
}
export declare type NotificationListPostion = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
