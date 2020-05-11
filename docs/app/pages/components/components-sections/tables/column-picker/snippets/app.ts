import { Component } from '@angular/core';
import { ColumnPickerGroupSetting, ColumnPickerValue } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    /** Store a list of all selected columns */
selected: ReadonlyArray<string> = [
        'Type',
        'Date',
        'Requested by',
        'Status',
        'Completion'
    ];

    /** Store a list of columns that must be selected */
    locked: ReadonlyArray<string> = ['ID'];

    /** Store a list of columns that are not selected or locked */
    deselected: ReadonlyArray<ColumnPickerValue> = [
        { group: 'Meta data', name: 'Author' },
        { group: 'Meta data', name: 'Category' },
        { group: 'Meta data', name: 'Date Created' },
        { group: 'Meta data', name: 'Date Modified' },
        { group: 'Meta data', name: 'Department' },
        'Document ID',
        'Flag',
        'From',
        'Icon',
        'Importance',
        'Location',
        'Location ID',
        'Message',
        { group: 'Meta data', name: 'Organization' },
        'Time',
        'Time Created',
        'Time Modified',
        'Work Completed'
    ];

    groupSettings: ColumnPickerGroupSetting[] = [
        { group: 'Meta data', initiallyExpanded: true }
    ];

}
