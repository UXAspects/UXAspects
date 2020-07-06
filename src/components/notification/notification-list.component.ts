import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
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
    ]
})
export class NotificationListComponent implements AfterViewInit, OnChanges, OnDestroy {

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
    @Input()
    @HostBinding('class')
    position: NotificationListPostion = 'bottom-right';

    /** The list of notifications that have not been dismissed */
    notifications$: Observable<NotificationRef[]> = this._notificationService.notifications$.pipe(map(() => this._notifications));

    /** Store the bottom position of the notification list */
    @HostBinding('style.bottom.px')
    _bottom: number;

    /** Store a list of all element refs */
    @ViewChildren('notification') _elements: QueryList<ElementRef>;

    /** Filter out any hidden notifications */
    private get _notifications(): NotificationRef[] {
        return this._notificationService.notifications.filter(notification => notification.visible);
    }

    /** Unsubscribe from all subscriptions on component destroy */
    private _onDestroy = new Subject<void>();

    constructor(
        private _notificationService: NotificationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {

        // whenever the notifications change we want to recalculate the positions and height
        this._elements.changes.pipe(
            takeUntil(this._onDestroy),
            tick(),
            map(changes => changes.toArray() as ElementRef[]),
            withLatestFrom(this.notifications$)
        ).subscribe(([elements, notifications]) => {

            // Set the `top` style property of each element
            this.applyElementPositions(elements, notifications);

            this.updateListPosition(elements, notifications);

            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnChanges(): void {
        if (this._elements) {
            this.updateListPosition(this._elements.toArray(), this._notifications);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private applyElementPositions(elements: ElementRef[], notifications: NotificationRef[]): void {
        let top = 0;
        for (let i = 0; i < elements.length; i += 1) {
            const element = elements[i].nativeElement;
            const notification = notifications[i];
            this._renderer.setStyle(element, 'top', `${top}px`);
            top = top + this.getNotificationHeightPixels(notification, elements[i]);
        }
    }

    private updateListPosition(elements: ElementRef[], notifications: NotificationRef[]): void {
        if (this.position === 'bottom-left' || this.position === 'bottom-right') {

            // calculate the total height of all notifications including spacing
            this._bottom = notifications.reduce((total, notification, index) =>
                total + this.getNotificationHeightPixels(notification, elements[index]), 0);
        } else {

            // In a top position, bottom should be unset.
            this._bottom = undefined;
        }
    }

    /** Get the height of the notification, including spacing if configured. */
    private getNotificationHeightPixels(notification: NotificationRef, elementRef: ElementRef): number {
        if (notification.spacing === undefined) {
            return this.getElementOuterHeightPixels(elementRef);
        }

        return elementRef.nativeElement.offsetHeight + notification.spacing;
    }

    /** Get the total height of the element including margins. */
    private getElementOuterHeightPixels(elementRef: ElementRef): number {
        const element = elementRef.nativeElement;
        const { marginTop, marginBottom } = getComputedStyle(element);

        return element.offsetHeight + parseInt(marginTop) + parseInt(marginBottom);
    }
}

export type NotificationListPostion = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
