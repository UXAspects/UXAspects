import { TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class NotificationService {
    options: NotificationOptions;
    direction: NotificationListDirection;
    notifications$: BehaviorSubject<NotificationRef[]>;
    show(templateRef: TemplateRef<any>, options?: NotificationOptions): NotificationRef;
    getHistory(): NotificationRef[];
    dismiss(notificationRef: NotificationRef): void;
    dismissAll(): void;
}
export interface NotificationRef {
    templateRef: TemplateRef<any>;
    duration: number;
    date: Date;
    visible?: boolean;
    height?: number;
    spacing?: number;
    backgroundColor: string;
}
export interface NotificationOptions {
    duration?: number;
    height?: number;
    spacing?: number;
    backgroundColor: string;
}
export declare type NotificationListDirection = 'above' | 'below';
