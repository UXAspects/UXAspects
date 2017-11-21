import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-file-upload-ng1',
    templateUrl: './file-upload-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFileUploadNg1Component')
export class ComponentsFileUploadNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.appHtml,
        js: [this.snippets.raw.appJs],
        css: [this.snippets.raw.appCss]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}