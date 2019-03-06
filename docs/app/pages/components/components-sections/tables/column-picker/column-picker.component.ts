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

    /** Store the list of deselected columns that can be moved */
    deselectedSelection: ReadonlyArray<string> = [];

    /** Store the list of selected columns that can be moved */
    selectedSelection: ReadonlyArray<string> = [];

    /** Cache selection during reordering */
    private _selection: ReadonlyArray<string> = [];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['ReorderableModule', 'SelectionModule'],
                library: '@ux-aspects/ux-aspects'
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

    /** Ensure we don't select while dragging */
    storeSelection(): void {
        this._selection = [...this.selectedSelection];
    }

    /** Restore the selection once dragging ends */
    restoreSelection(): void {
        this.selectedSelection = this._selection;
    }
}