import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-preview-pane-window',
    templateUrl: './preview-pane-window-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsPreviewPaneWindowNg1Component')
export class ComponentsPreviewPaneWindowNg1Component implements ICodePenProvider {
    
    private sampleCode = require('./snippets/sample.html');
    private htmlCode = require('./snippets/layout.html');
    private jsCode = require('./snippets/controller.js');
    private cssCode = require('./snippets/styles.css');
    private footerCode = require('./snippets/footer.html');

    public codepen: ICodePen = {
        html: this.htmlCode,
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
            this.jsCode
        ],
        css: [this.cssCode]
    };
}