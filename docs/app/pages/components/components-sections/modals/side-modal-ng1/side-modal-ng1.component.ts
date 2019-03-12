import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-side-modal-ng1',
    templateUrl: './side-modal-ng1.component.html',
    styleUrls: ['./side-modal-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSideModalNg1Component')
export class ComponentsSideModalNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'SideModalDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalContent.html',
            content: this.snippets.raw.modalContentHtml
        }, {
            id: 'modalFooter.html',
            content: this.snippets.raw.modalFooterHtml
        }],
        css: [this.snippets.raw.stylesCss],
        js: [this.snippets.raw.controllerJs, this.snippets.raw.modalControllerJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
