import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, HostListener, TemplateRef } from '@angular/core';
import { ColorService, NotificationService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    duration: number = 4;
    description: string = 'You have 16 messages';
    backgroundColor: string = this.colorService.getColor('accent').toHex();

    colors = [
        this.colorService.getColor('primary').toHex(),
        this.colorService.getColor('accent').toHex(),
        this.colorService.getColor('chart4').toHex(),
        this.colorService.getColor('chart5').toHex(),
        this.colorService.getColor('ok').toHex(),
        this.colorService.getColor('warning').toHex(),
        this.colorService.getColor('critical').toHex()
    ];

    setColor (color: string): void {
        this.backgroundColor = this.colors[color];
    }

    constructor(public notificationService: NotificationService,
        public colorService: ColorService,
        private _liveAnnouncer: LiveAnnouncer) {
    }

    showNotification(template: TemplateRef<any>) {
        this.notificationService.show(template,
            { duration: this.duration, backgroundColor: this.backgroundColor },
            { description: this.description });

        this._liveAnnouncer.announce(`Notification: ${this.description}`);
    }

    @HostListener('document:keydown.escape')
    dismissNotifications(): void {
        this.notificationService.dismissAll();
    }
}