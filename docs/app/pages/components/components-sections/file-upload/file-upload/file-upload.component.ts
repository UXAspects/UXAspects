import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-file-upload',
    templateUrl: './file-upload.component.html'
})
@DocumentationSectionComponent('ComponentsFileUploadComponent')
export class ComponentsFileUploadComponent extends BaseDocumentationSection implements IPlunkProvider {

    fileOver: boolean = false;
    uploader: FileUploader = new FileUploader({});

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [
            {
                imports: ['FileUploadModule'],
                library: 'ng2-file-upload'
            },
            {
                imports: ['ProgressBarModule', 'AccessibilityModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    constructor(announcer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.uploader.onCompleteAll = () => announcer.announce('All files have been uploaded.');
    }

}