import { Injectable, Inject } from '@angular/core';
import { INotificationService, NotificationOptions } from './notification.interface';

@Injectable()
export class NotificationService implements INotificationService {
    
    constructor(@Inject('notificationService') private _notificationService: INotificationService) { }
    
    showNotification(options: NotificationOptions): HTMLElement {
        return this._notificationService.showNotification(options);   
    }

    dismissNotification(element: HTMLElement): void {
        this._notificationService.dismissNotification(element);
    }

    dismissAllNotifications(): void {
        this._notificationService.dismissAllNotifications();
    }

    getNotifications(): any[] {
        return this._notificationService.getNotifications();
    }

    setNotificationVisibility(visible: boolean): void {
        this._notificationService.setNotificationVisibility(visible);
    }

    setDirection(direction: 'append' | 'prepend'): void {
        this._notificationService.setDirection(direction);
    }
}