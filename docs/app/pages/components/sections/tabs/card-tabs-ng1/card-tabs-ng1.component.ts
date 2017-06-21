import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-card-tabs-ng1',
    templateUrl: './card-tabs-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsCardTabsNg1Component')
export class ComponentsCardTabsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'TabsCtrl as vm'
        },
        js: [this.snippets.examples.sampleJs],
        css: [this.snippets.examples.sampleCss]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}