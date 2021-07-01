import { Component } from '@angular/core';
import { ColumnPickerGroup, ColumnPickerGroupItem } from '@ux-aspects/ux-aspects';

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
    deselected: ReadonlyArray<string | ColumnPickerGroupItem> = [
        { group: 'Metadata', name: 'Author' },
        { group: 'Metadata', name: 'Category' },
        { group: 'Metadata', name: 'Date Created' },
        { group: 'Metadata', name: 'Date Modified' },
        { group: 'Metadata', name: 'Department' },
        'Document ID',
        'Flag',
        'From',
        'Icon',
        'Importance',
        'Location',
        'Location ID',
        'Message',
        { group: 'Metadata', name: 'Organization' },
        'Time',
        'Time Created',
        'Time Modified',
        'Work Completed'
    ];

    groups: ColumnPickerGroup[] = [
        { name: 'Metadata', expanded: true }
    ];

}
