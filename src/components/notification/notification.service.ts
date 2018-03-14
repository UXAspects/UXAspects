import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {

    // provide default options
    options: NotificationOptions = {
        duration: 4,
        height: 100,
        spacing: 10,
        backgroundColor: '#7b63a3',
        iconColor: '#7b63a3'
    };

    direction: NotificationListDirection = 'above';

    notifications$: BehaviorSubject<NotificationRef[]> = new BehaviorSubject<NotificationRef[]>([]);    

    show(templateRef: TemplateRef<any>, options: NotificationOptions = this.options): NotificationRef {

        options = { ...this.options, ...options };

        const notificationRef: NotificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing,
            backgroundColor: options.backgroundColor,
            iconColor: options.iconColor
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
            setTimeout(() => this.dismiss(notificationRef), options.duration * 1000);
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
    backgroundColor?: string;
    iconColor?: string;
}

export interface NotificationOptions {
    duration?: number;
    height?: number;
    spacing?: number;
    backgroundColor?: string;
    iconColor?: string;
}

export type NotificationListDirection = 'above' | 'below';