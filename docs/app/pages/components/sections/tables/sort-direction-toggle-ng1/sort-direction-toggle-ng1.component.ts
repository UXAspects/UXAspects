import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-sort-direction-toggle',
    templateUrl: './sort-direction-toggle-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSortDirectionToggleNg1Component')
export class ComponentsSortDirectionToggleNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    private htmlCode = this.snippets.compiled.sampleHtml;
    private jsCode = this.snippets.compiled.sampleJs;

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'SortToggleCtrl as vm'
        },
        js: [this.snippets.examples.sampleJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}