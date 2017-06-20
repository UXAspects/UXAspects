import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-facet-line-chart-ng1',
    templateUrl: './facet-line-chart-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFacetLineChartNg1Component')
export class ComponentsFacetLineChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.appHtml,
        js: [this.snippets.examples.appJs],
        css: [this.snippets.examples.appCss]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}