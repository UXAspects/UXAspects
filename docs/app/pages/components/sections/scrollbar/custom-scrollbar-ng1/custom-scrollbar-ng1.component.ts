import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-custom-scrollbar-ng1',
    templateUrl: './custom-scrollbar-ng1.component.html',
    styleUrls: ['./custom-scrollbar-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsCustomScrollbarNg1Component')
export class ComponentsCustomScrollbarNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'CustomScrollbarDemoCtrl as vm'
        },
        css: [this.snippets.examples.stylesCss],
        js: [this.snippets.examples.controllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
