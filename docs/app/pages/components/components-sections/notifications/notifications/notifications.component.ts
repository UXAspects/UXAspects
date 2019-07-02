
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, TemplateRef } from '@angular/core';
import { ColorPickerColor, ColorService, NotificationService } from '@ux-aspects/ux-aspects';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationsComponent')
export class ComponentsNotificationsComponent extends BaseDocumentationSection implements IPlaygroundProvider, OnDestroy {

    isPickerOpen: boolean = false;
    duration: number = 4;
    description: string = 'You have 16 messages';

    colors: ColorPickerColor[][] = [
        [
            new ColorPickerColor('primary', this.colorService.getColor('primary').toHex()),
            new ColorPickerColor('accent', this.colorService.getColor('accent').toHex()),
            new ColorPickerColor('chart4', this.colorService.getColor('chart4').toHex()),
            new ColorPickerColor('chart5', this.colorService.getColor('chart5').toHex()),
        ],
        [
            new ColorPickerColor('ok', this.colorService.getColor('ok').toHex()),
            new ColorPickerColor('warning', this.colorService.getColor('warning').toHex()),
            new ColorPickerColor('critical', this.colorService.getColor('critical').toHex())
        ]
    ];

    selected: ColorPickerColor = this.colors[0][1];

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['NotificationModule', 'NumberPickerModule', 'ColorPickerModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            },
            {
                imports: ['BsDropdownModule'],
                forRoot: true,
                library: 'ngx-bootstrap/dropdown'
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
        this.notificationService.show(template, { duration: this.duration, backgroundColor: this.selected.hex }, { description: this.description });

        // announce the notification
        this._notifications.next(this.description);
    }

    @HostListener('document:keydown.escape')
    dismissNotifications(): void {
        this.notificationService.dismissAll();
    }
}

