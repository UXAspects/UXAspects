
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, TemplateRef } from '@angular/core';
import { ColorService, NotificationService } from '@ux-aspects/ux-aspects';
import { buffer, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationsComponent')
export class ComponentsNotificationsComponent extends BaseDocumentationSection implements IPlunkProvider, OnDestroy {

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

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['NotificationModule', 'NumberPickerModule', 'ColorServiceModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    private _notifications = new Subject<string>();
    private _subscription: Subscription;

    constructor(public notificationService: NotificationService, public colorService: ColorService, private _liveAnnouncer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // buffer notifications then announce them
        this._subscription = this._notifications.pipe(buffer(this._notifications.pipe(debounceTime(1000)))).subscribe(notifications => {
            this._liveAnnouncer.announce(notifications.map(notification => `Notification: ${notification}.`).join());
        });

    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._notifications.complete();
    }

    showNotification(template: TemplateRef<any>) {
        this.notificationService.show(template, { duration: this.duration, backgroundColor: this.backgroundColor }, { description: this.description });

        // announce the notification
        this._notifications.next(this.description);
    }

    @HostListener('document:keydown.escape')
    dismissNotifications(): void {
        this.notificationService.dismissAll();
    }
}

