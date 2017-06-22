import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-reorderable-table',
    templateUrl: './reorderable-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsReorderableTableNg1Component')
export class ComponentsReorderableTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    private htmlCode = this.snippets.compiled.layoutHtml;
    private jsCode = this.snippets.compiled.controllerJs;
    private cssCode = this.snippets.compiled.stylesCss;

    private tableDataCode = this.snippets.compiled.tableDataHtml;
    private controlsCode = this.snippets.compiled.controlsHtml;

    private removeRowHtmlCode = this.snippets.compiled.removeRowHtml;
    private removeRowJsCode = this.snippets.compiled.removeRowJs;
    
    public codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'ReorderableCtrl as vm'
        },
        js: [this.snippets.raw.controllerJs],
        css: [this.snippets.raw.stylesCss]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}