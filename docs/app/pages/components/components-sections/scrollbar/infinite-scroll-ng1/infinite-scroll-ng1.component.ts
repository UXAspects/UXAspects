import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-infinite-scroll-ng1',
    templateUrl: './infinite-scroll-ng1.component.html',
    styleUrls: ['./infinite-scroll-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsInfiniteScrollNg1Component')
export class ComponentsInfiniteScrollNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    codepen: ICodePen = {
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'InfiniteScrollDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'itemTemplate.html',
            content: this.snippets.raw.itemTemplateHtml
        }],
        css: [this.snippets.raw.stylesCss],
        js: [this.snippets.raw.controllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
