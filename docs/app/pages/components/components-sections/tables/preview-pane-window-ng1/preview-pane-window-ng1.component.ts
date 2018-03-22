import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-preview-pane-window',
    templateUrl: './preview-pane-window-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsPreviewPaneWindowNg1Component')
export class ComponentsPreviewPaneWindowNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    sampleCode = this.snippets.compiled.sampleHtml;
    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;
    cssCode = this.snippets.compiled.stylesCss;
    footerCode = this.snippets.compiled.footerHtml;

    codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'PreviewPaneWindowCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'Preview.html',
                content: require('./wrapper/previews/Preview.html')
            },
            {
                id: 'PreviewDOC.html',
                content: require('./wrapper/previews/PreviewDOC.html')
            },
            {
                id: 'PreviewPDF.html',
                content: require('./wrapper/previews/PreviewPDF.html')
            },
            {
                id: 'PreviewPPT.html',
                content: require('./wrapper/previews/PreviewPPT.html')
            },
            {
                id: 'PreviewXLS.html',
                content: require('./wrapper/previews/PreviewXLS.html')
            }
        ],
        js: [ 
            this.snippets.raw.controllerJs
        ],
        css: [this.snippets.raw.stylesCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}