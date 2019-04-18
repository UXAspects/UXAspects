import { Component } from '@angular/core';

@Component({
    selector: 'app-column-picker',
    templateUrl: './column-picker.testpage.component.html',
    styleUrls: ['./column-picker.testpage.component.less']
})
export class ColumnPickerTestPageComponent {

    /** Store a list of all selected columns */
    selected: ReadonlyArray<string> = [
        'Type',
        'Date',
        'Requested by',
        'Status',
        'Completion'
    ];

    /** Store a list of columns that must be selected */
    locked: ReadonlyArray<string> = [
        'ID'
    ];

    /** Store a list of columns that are not selected or locked */
    deselected: ReadonlyArray<string> = [
        'Author',
        'Category',
        'Date Created',
        'Date Modified',
        'Department',
        'Document ID',
        'Flag',
        'From',
        'Icon',
        'Importance',
        'Location',
        'Location ID',
        'Message',
        'Organization',
        'Time',
        'Time Created',
        'Time Modified',
        'Work Completed'
    ];

    /** Determine if we should show the custom title templates */
    showCustomTitles: boolean = false;
}