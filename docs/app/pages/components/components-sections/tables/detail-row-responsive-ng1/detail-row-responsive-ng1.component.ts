import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-detail-row-responsive',
    templateUrl: './detail-row-responsive-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDetailRowResponsiveNg1Component')
export class ComponentsDetailRowResponsiveNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;
    cssCode = this.snippets.compiled.stylesCss;

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'DetailRowResponsiveTableCtrl as vm'
        },
        js: [this.snippets.raw.codepenJs],
        css: [this.snippets.raw.stylesCss]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}