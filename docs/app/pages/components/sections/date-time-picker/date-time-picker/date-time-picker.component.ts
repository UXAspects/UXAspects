import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DateTimePickerTimezone } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-components-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDateTimePickerComponent')
export class ComponentsDateTimePickerComponent extends BaseDocumentationSection {

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    showTime: boolean = true;
    showTimezones: boolean = true;
    

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