import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-column-picker',
    templateUrl: './column-picker.component.html',
    styleUrls: ['./column-picker.component.less']
})
@DocumentationSectionComponent('ComponentsColumnPickerComponent')
export class ComponentsColumnPickerComponent extends BaseDocumentationSection implements IPlunkProvider {

    /** Store a list of all possible columns */
    columns: ReadonlyArray<string> = [
        'ID',
        'Author',
        'Category',
        'Completion',
        'Date',
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
        'Requested by',
        'Status',
        'Time',
        'Time Created',
        'Time Modified',
        'Type',
        'Work Completed'
    ];

    /** Store a list of all selected columns */
    selected: ReadonlyArray<string> = [
        'ID',
        'Type',
        'Date',
        'Requested by',
        'Status',
        'Completion'
    ];

    /** Store a list of columns that are not selected */
    deselected: ReadonlyArray<string> = this.columns.filter(column => this.selected.indexOf(column) === -1);

    /** Store the list of deselected columns that can be moved */
    deselectedSelection: ReadonlyArray<string> = [];

    /** Store the list of selected columns that can be moved */
    selectedSelection: ReadonlyArray<string> = [];

    /** Store a list of columns that must be selected */
    locked: ReadonlyArray<string> = [
        'ID'
    ];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['TableModule', 'CheckboxModule', 'FixedHeaderTableModule', 'SelectionModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['ButtonsModule'],
                library: 'ngx-bootstrap/buttons'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    /** Select the currently selected columns */
    selectColumns(columns: ReadonlyArray<string> = this.deselectedSelection): void {

        // add each item to the selected columns list
        columns.forEach(column => this.selected = [...this.selected, column]);

        // remove each item from the deselected columns list
        this.deselected = this.deselected.filter(column => columns.indexOf(column) === -1);

        // clear the current selection
        this.deselectedSelection = [];
    }

    /** Deselect the currently selected columns */
    deselectColumns(columns: ReadonlyArray<string> = this.selectedSelection): void {
        // add each item to the deselected columns list
        columns.forEach(column => this.deselected = [...this.deselected, column]);

        // remove each item from the selected columns list
        this.selected = this.selected.filter(column => columns.indexOf(column) === -1);

        // clear the current selection
        this.selectedSelection = [];
    }

    /** Select all deselected columns */
    selectAllColumns(): void {
        this.selectColumns(this.deselected);
    }

    /** Deselect all selected columns */
    deselectAllColumns(): void {
        this.deselectColumns(this.selected);
    }

    /** Determine if the column can be moved */
    isColumnLocked(column: string): boolean {
        return this.locked.indexOf(column) === -1;
    }
}