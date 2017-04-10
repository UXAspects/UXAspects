import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-layout-switching-splitter-ng1',
    templateUrl: './layout-switching-splitter-ng1.component.html',
    styleUrls: ['./layout-switching-splitter-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsLayoutSwitchingSplitterNg1Component')
export class ComponentsLayoutSwitchingSplitterNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'LayoutSwitchingSplitterDemoCtrl as vm'
        },
        css: [this.snippets.raw.stylesCss],
        js: [this.snippets.raw.controllerJs]
    };

    constructor() {
        super(
            null,
            null,
            null,
            null,
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }
}
