import { INotificationService, NotificationOptions } from './notification.interface';
export declare class NotificationService implements INotificationService {
    private _notificationService;
    constructor(_notificationService: INotificationService);
    showNotification(options: NotificationOptions): HTMLElement;
    dismissNotification(element: HTMLElement): void;
    dismissAllNotifications(): void;
    getNotifications(): any[];
    setNotificationVisibility(visible: boolean): void;
    setDirection(direction: 'append' | 'prepend'): void;
}
