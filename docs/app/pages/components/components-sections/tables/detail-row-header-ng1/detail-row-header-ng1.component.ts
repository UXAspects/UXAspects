import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-detail-row-header',
    templateUrl: './detail-row-header-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDetailRowHeaderNg1Component')
export class ComponentsDetailRowHeaderNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    htmlCode = this.snippets.compiled.layoutHtml;
    controllerCode = this.snippets.compiled.controllerJs;
    popoverHtmlCode = this.snippets.compiled.popoverHtml;
    popoverControllerCode = this.snippets.compiled.popoverControllerJs;
    styleCode = this.snippets.compiled.stylesCss;
    serviceCode = this.snippets.compiled.serviceJs;

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'detailRowHeaderPopover.html',
                content: this.snippets.raw.popoverHtml
            }
        ],
        js: [
            this.snippets.raw.controllerJs,
            this.snippets.raw.popoverControllerJs,
            this.snippets.raw.serviceJs
        ],
        css: [
            this.snippets.raw.stylesCss
        ]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}