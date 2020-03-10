import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorService } from '../../services/color/index';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    /**
     *  Sets the order in which notifications are displayed:
        `above` - newer notifications will appear above older ones.
        `below` - newer notifications will appear below older ones.
     */
    direction: NotificationListDirection = 'above';

    /**
     * The list of notifications including notifications that have been dismissed
     */
    notifications$: BehaviorSubject<NotificationRef[]> = new BehaviorSubject<NotificationRef[]>([]);

    /**
     * Access the list of notifications as an array
     */
    get notifications(): NotificationRef[] {
        return this.notifications$.value;
    }

    /**
     * Define the default set of notification options
     */
    options: NotificationOptions = {
        duration: 4,
        spacing: 10,
        backgroundColor: this._colorService.getColor('accent').toHex(),
        iconColor: this._colorService.getColor('accent').toHex()
    };

    constructor(private readonly _colorService: ColorService) { }

    /**
     * This function should be called to show a notification.
     * It should be given a TemplateRef containing the content to be displayed.
     * @param templateRef - A TemplateRef containing the content to be displayed
     * @param options - The properties to configure the notification.
     * @param context - The context passed to the notification TemplateRef. This can be accessed by adding a let-data="data" to the ng-template element.
     */
    show(templateRef: TemplateRef<any>, options: NotificationOptions = this.options, context: { [key: string]: any } = {}): NotificationRef {

        // populate the specified options with the default values for any missing properties
        options = { ...this.options, ...options };

        // create the notificationRef based on the options and context specified
        const notificationRef: NotificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing,
            backgroundColor: options.backgroundColor,
            iconColor: options.iconColor,
            data: context
        };

        // add the new notification to the list (either above or below based on direction)
        this.direction === 'above' ? this.notifications.unshift(notificationRef) : this.notifications.push(notificationRef);

        // update the notifications list
        this.notifications$.next(this.notifications);

        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(() => this.dismiss(notificationRef), options.duration * 1000);
        }

        return notificationRef;
    }

    /**
     * This function will return a list of all the notifications that have been shown.
     */
    getHistory(): NotificationRef[] {
        return this.notifications;
    }

    /**
     * This function can be called to dismiss a notification. It should be passed the object to dismiss.
     * @param notificationRef - The notification that should be dismissed
     */
    dismiss(notificationRef: NotificationRef): void {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications);
    }

    /**
     * This function will dismiss any currently visible notifications.
     */
    dismissAll(): void {
        this.notifications.forEach(notificationRef => notificationRef.visible = false);
        this.notifications$.next(this.notifications);
    }

    /** Remove the notification from the screen and from the notification history */
    remove(notificationRef: NotificationRef): void {
        this.notifications$.next(this.notifications.filter(_notificationRef => _notificationRef !== notificationRef));
    }

    /** Remove all notifications from the screen and from the notification history */
    removeAll(): void {
        this.notifications$.next([]);
    }
}

export interface NotificationRef extends NotificationOptions {
    /** The content to display in the notification */
    templateRef: TemplateRef<any>;
    /** The datestamp to display in the notification */
    date: Date;
    /** Indicated whether or not the notification has been dismissed or not */
    visible?: boolean;
    /** Additional data passed as template context to the notification */
    data: { [key: string]: any };
}

export interface NotificationOptions {
    /** The duration the notification should display for before it is automatically dismissed */
    duration: number;
    /** The height of the notification */
    height?: number;
    /** The spacing between each notification */
    spacing?: number;
    /** The background color of the notification */
    backgroundColor?: string;
    /** The color of the notification icon */
    iconColor?: string;
}

export type NotificationListDirection = 'above' | 'below';
