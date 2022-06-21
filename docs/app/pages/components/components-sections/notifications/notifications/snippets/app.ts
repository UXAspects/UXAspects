import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, HostListener, OnDestroy, TemplateRef } from '@angular/core';
import { ColorService, NotificationService } from '@ux-aspects/ux-aspects';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    duration: number = 4;
    description: string = 'You have 16 messages';
    backgroundColor: string = 'rgba(123, 99, 163, 1)';

    private _notifications = new Subject<string>();
    private _subscription: Subscription;

    constructor(public notificationService: NotificationService,
        public colorService: ColorService,
        private _liveAnnouncer: LiveAnnouncer) {

        // buffer notifications then announce them
        this._subscription = this._notifications.pipe(
            buffer(this._notifications.pipe(debounceTime(1000)))
        ).subscribe(notifications => {
            this._liveAnnouncer.announce(
                notifications.map(notification => `Notification: ${notification}.`).join()
            );
        });

    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._notifications.complete();
    }

    showNotification(template: TemplateRef<any>) {
        this.notificationService.show(template,
            { duration: this.duration, backgroundColor: this.backgroundColor },
            { description: this.description }
        );

        // announce the notification
        this._notifications.next(this.description);
    }

    @HostListener('document:keydown.escape')
    dismissNotifications(): void {
        this.notificationService.dismissAll();
    }
}
