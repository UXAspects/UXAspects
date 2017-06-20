import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-preview-pane-window',
    templateUrl: './preview-pane-window-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsPreviewPaneWindowNg1Component')
export class ComponentsPreviewPaneWindowNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    private sampleCode = this.snippets.compiled.sampleHtml;
    private htmlCode = this.snippets.compiled.layoutHtml;
    private jsCode = this.snippets.compiled.controllerJs;
    private cssCode = this.snippets.compiled.stylesCss;
    private footerCode = this.snippets.compiled.footerHtml;

    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
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
            this.snippets.examples.controllerJs
        ],
        css: [this.snippets.examples.stylesCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}