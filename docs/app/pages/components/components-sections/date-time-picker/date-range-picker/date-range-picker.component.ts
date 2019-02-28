import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDateRangePickerComponent')
export class ComponentsDateRangePickerComponent extends BaseDocumentationSection {

    /** The date in the left side of the date range picker */
    start: Date;

    /** The date in the right side of the date range picker */
    end: Date;

    /** The formatted date string to display in the input */
    date: string;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    /** Parse a date string when the input changes */
    onDateChange(date: string): void {

        // check if the date contains a hyphen
        const parts = (date.indexOf('—') ? date.split('—') : date.split('-')).map(part => Date.parse(part.trim()));

        if (parts.length >= 1 && !isNaN(parts[0])) {
            this.start = new Date(parts[0]);
        }

        if (parts.length === 2 && !isNaN(parts[1])) {
            this.end = new Date(parts[1]);
        }
    }

    /** Update the date string when the date range changes */
    onRangeChange(): void {
        const start = this.start ? formatDate(this.start, 'd MMMM y  h:mm a z', 'en-US') : '';
        const end = this.end ? formatDate(this.end, 'd MMMM y  h:mm a z', 'en-US') : '';

        if (!start && !end) {
            return;
        }

        // concatenate the two dates
        this.date = start && end ? `${start} — ${end}` : start || end;
    }

}