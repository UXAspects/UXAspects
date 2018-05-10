import { TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService } from '../../services/color/index';
export declare class NotificationService {
    private _colorService;
    options: NotificationOptions;
    direction: NotificationListDirection;
    notifications$: BehaviorSubject<NotificationRef[]>;
    show(templateRef: TemplateRef<any>, options?: NotificationOptions, data?: {
        [key: string]: any;
    }): NotificationRef;
    getHistory(): NotificationRef[];
    dismiss(notificationRef: NotificationRef): void;
    dismissAll(): void;
    constructor(_colorService: ColorService);
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
    data: {
        [key: string]: any;
    };
}
export interface NotificationOptions {
    duration?: number;
    height?: number;
    spacing?: number;
    backgroundColor?: string;
    iconColor?: string;
}
export declare type NotificationListDirection = 'above' | 'below';
