import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {

    private _defaultOptions: NotificationOptions = {
        duration: 4000,
        height: 100,
        spacing: 4
    };

    direction: NotificationListDirection = 'above';

    notifications$: BehaviorSubject<NotificationRef[]> = new BehaviorSubject<NotificationRef[]>([]);    

    show(templateRef: TemplateRef<any>, options: NotificationOptions = this._defaultOptions): NotificationRef {

        options = { ...this._defaultOptions, ...options };

        const notificationRef: NotificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing
        };

        const notifications = this.notifications$.getValue();

        if (this.direction === 'above') {
            notifications.unshift(notificationRef);
        } else {
            notifications.push(notificationRef);
        }

        this.notifications$.next(notifications);

        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(() => this.dismiss(notificationRef), options.duration);
        }

        return notificationRef;
    }

    getHistory(): NotificationRef[] {
        return this.notifications$.getValue();
    }

    dismiss(notificationRef: NotificationRef): void {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications$.getValue());
    }
    
    dismissAll(): void {
        this.notifications$.getValue().forEach(notificationRef => notificationRef.visible = false);
        this.notifications$.next(this.notifications$.getValue());        
    }
}

export interface NotificationRef {
    templateRef: TemplateRef<any>;
    duration: number;
    date: Date;
    visible?: boolean;
    height?: number;
    spacing?: number;
}

export interface NotificationOptions {
    duration?: number;
    height?: number;
    spacing?: number;
}

export type NotificationListDirection = 'above' | 'below';