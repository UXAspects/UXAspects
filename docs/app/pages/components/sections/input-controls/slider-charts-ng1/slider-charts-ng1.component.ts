import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-slider-charts-ng1',
    templateUrl: './slider-charts-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSliderChartsNg1Component')
export class ComponentsSliderChartsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.examples.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'SlidersChartsCtrl as vm'
        },
        js: [this.snippets.examples.codepenJs]
    };

}