import { Component } from '@angular/core';
import { ColumnPickerGroupItem, ColumnPickerGroupSetting } from '@ux-aspects/ux-aspects';

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
    deselected: ReadonlyArray<string | ColumnPickerGroupItem> = [
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

    /** Determine if we should show the custom title templates */
    showCustomTitles: boolean = false;
}
