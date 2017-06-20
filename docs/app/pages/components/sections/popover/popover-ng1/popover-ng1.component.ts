import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-popover-ng1',
    templateUrl: './popover-ng1.component.html',
    styleUrls: ['./popover-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsPopoverNg1Component')
export class ComponentsPopoverNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    public codepen: ICodePen = {
        html: this.snippets.examples.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'PopoverDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'popoverLayout.html',
            content: this.snippets.examples.popoverLayoutHtml
        }, {
            id: 'nestedPopoverLayout.html',
            content: this.snippets.examples.nestedPopoverLayoutHtml
        }],
        css: [this.snippets.examples.stylesCss],
        js: [this.snippets.examples.controllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
