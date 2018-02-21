import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { FileUploader } from 'ng2-file-upload';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

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
                imports: ['ProgressBarModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}