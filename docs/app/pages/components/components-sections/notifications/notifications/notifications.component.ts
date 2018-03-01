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

    duration: number = 4;    
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
        modules: [{
            imports: ['NotificationModule', 'NumberPickerModule', 'ColorServiceModule'],
            library: '@ux-aspects/ux-aspects'
        }, {
            library: 'ngx-bootstrap/accordion',
            imports: ['AccordionModule'],
            providers: ['AccordionModule.forRoot()']
        }, {
            imports: ['BrowserAnimationsModule'],
            library: '@angular/platform-browser/animations'
        }]
    };

    constructor(public notificationService: NotificationService,
        public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

