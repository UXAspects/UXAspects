import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { tick } from '../../common/index';
import { NotificationListDirection, NotificationRef, NotificationService } from './notification.service';

@Component({
    selector: 'ux-notification-list',
    templateUrl: './notification-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('notificationState', [
            state('in', style({ transform: 'translateY(0)', opacity: 0.9 })),
            transition(':enter', [
                style({ transform: 'translateY(-50px)', opacity: 0 }),
                animate(500)
            ]),
            transition(':leave', [
                animate(500, style({ transform: 'translateY(50px)', opacity: 0 }))
            ])
        ])
    ],
    host: {
        '[style.bottom.px]': '_height'
    }
})
export class NotificationListComponent implements AfterViewInit, OnDestroy {

    /**
     *  Sets the order in which notifications are displayed:
        `above` - newer notifications will appear above older ones.
        `below` - newer notifications will appear below older ones.
     */
    @Input()
    set direction(direction: NotificationListDirection) {
        this._notificationService.direction = direction;
    }

    /** Sets the position of the list of notifications within the browser window. */
    @Input() @HostBinding('class')
    position: NotificationListPostion = 'bottom-right';

    /** The list of notifications that have not been dismissed */
    notifications$: Observable<NotificationRef[]> = this._notificationService.notifications$.pipe(map(() => this._notifications));

    /** Store the total height of the notification list */
    _height: number;

    /** Store a list of all element refs */
    @ViewChildren('notification') _elements: QueryList<ElementRef>;

    /** Filter out any hidden notifications */
    private get _notifications(): NotificationRef[] {
        return this._notificationService.notifications.filter(notification => notification.visible);
    }

    /** Unsubscribe from all subscriptions on component destroy */
    private _onDestroy = new Subject<void>();

    constructor(private _notificationService: NotificationService, private _changeDetectorRef: ChangeDetectorRef) { }

    ngAfterViewInit(): void {

        // whenever the notifications change we want to recalculate the height
        this._elements.changes.pipe(
            takeUntil(this._onDestroy), filter(() => this.position === 'bottom-left' || this.position === 'bottom-right'),
            tick(), map(changes => changes.toArray()), withLatestFrom(this.notifications$)
        ).subscribe(([elements, notifications]) => {

            // calculate the total height of all notifications including spacing
            this._height = notifications.reduce((total, notification, index) =>
                total + this._getNotificationHeight(elements[index], notification) + notification.spacing, 0);

            // we are running in OnPush mode, so we will need to manually trigger CD here
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Get the height of a notification based on its content height or specified height
     */
    _getNotificationHeight(notification: HTMLElement, notificationRef: NotificationRef): number {
        // if no fixed height is specified calculate the height based on content size
        notificationRef.height = notificationRef.height || notification.scrollHeight;
        return notificationRef.height;
    }

    /**
     * Get the notification position based on the notifications before it and the spacing
     */
    _getNotificationPosition(index: number): number {
        return this._notifications.slice(0, index).reduce((accumulator, notificationRef) =>
            accumulator + notificationRef.height + notificationRef.spacing, 0
        );
    }
}

export type NotificationListPostion = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';