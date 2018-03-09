import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService, NotificationRef, NotificationListDirection } from './notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

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
export class NotificationListComponent {
    
    @Input() 
    set direction(direction: NotificationListDirection) {
        this._notificationService.direction = direction;
    }

    @Input() @HostBinding('class') position: NotificationListPostion = 'top-right';

    notifications$: Observable<NotificationRef[]> = this._notificationService.notifications$.pipe(
        map((notificationRefs: NotificationRef[]) => notificationRefs.filter(notificationRef => notificationRef.visible),
    ));

    constructor(private _notificationService: NotificationService) {

    }
}

export type NotificationListPostion = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';