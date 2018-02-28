import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { ColorService, NotificationService } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNotificationsComponent')
export class ComponentsNotificationsComponent extends BaseDocumentationSection implements IPlunkProvider {

    duration: number = 4000;    
    backgroundColor: string = this.colorService.getColor('accent').toHex();

    notificationColors = {
        primary: this.colorService.getColor('primary').toHex(),
        accent: this.colorService.getColor('accent').toHex(),
        chart4: this.colorService.getColor('chart4').toHex(),
        chart5: this.colorService.getColor('chart5').toHex(),
        ok: this.colorService.getColor('ok').toHex(),
        warning: this.colorService.getColor('warning').toHex(),
        critical: this.colorService.getColor('critical').toHex()
    };
    
    setColor (color: string): void {
        this.backgroundColor = this.notificationColors[color];
    }

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [{
            imports: ['NotificationModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(public notificationService: NotificationService,
        public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

