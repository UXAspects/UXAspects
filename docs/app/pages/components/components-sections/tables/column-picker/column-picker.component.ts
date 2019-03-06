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
}