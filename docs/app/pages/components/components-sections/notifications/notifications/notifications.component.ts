import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, HostListener, TemplateRef } from '@angular/core';
import { ColorService, NotificationService } from '../../../../../../../src/index';
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
export class ComponentsNotificationsComponent extends BaseDocumentationSection implements IPlunkProvider {

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
                imports: ['NotificationModule', 'NumberPickerModule', 'ColorServiceModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                library: 'ngx-bootstrap/accordion',
                imports: ['AccordionModule'],
                providers: ['AccordionModule.forRoot()']
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    constructor(public notificationService: NotificationService, public colorService: ColorService, private _liveAnnouncer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

    }

    showNotification(template: TemplateRef<any>) {
        this.notificationService.show(template, { duration: this.duration, backgroundColor: this.backgroundColor }, { description: this.description });
        this._liveAnnouncer.announce(`Notification: ${this.description}`);
    }

    @HostListener('document:keydown.escape')
    dismissNotifications(): void {
        this.notificationService.dismissAll();
    }
}

