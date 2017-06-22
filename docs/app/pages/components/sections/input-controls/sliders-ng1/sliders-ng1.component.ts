import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-sliders-ng1',
    templateUrl: './sliders-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSlidersNg1Component')
export class ComponentsSlidersNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.raw.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'SlidersCtrl as vm'
        },
        js: [this.snippets.raw.codepenJs]
    };

}