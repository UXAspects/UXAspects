import { Component, ViewEncapsulation } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DateTimePickerTimezone } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDateTimePickerComponent')
export class ComponentsDateTimePickerComponent extends BaseDocumentationSection implements IPlunkProvider {

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            { 
                imports: ['DateTimePickerModule', 'CheckboxModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['AccordionModule'],
                library: 'ngx-bootstrap/accordion',
                forRoot: true
            },
            {
                imports: ['PopoverModule'],
                library: 'ngx-bootstrap/popover',
                forRoot: true
            }
        ]
    }
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    parse(value: string): void {

        // try and parse the date
        const date = new Date(value);

        // check if the date is valid
        if (!isNaN(date.getDate())) {
            this.date = date;
        }
    }
}