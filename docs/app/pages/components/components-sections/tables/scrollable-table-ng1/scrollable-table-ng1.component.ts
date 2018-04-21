import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-scrollable-header-table',
    templateUrl: './scrollable-table-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsScrollableTableNg1Component')
export class ComponentsScrollableTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;

    codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'FixedHeaderCtrl'
        },
        js: [this.snippets.raw.codepenJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}