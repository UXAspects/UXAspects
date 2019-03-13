import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-grouped-buttons-ng1',
    templateUrl: './grouped-buttons-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGroupedButtonsNg1Component')
export class ComponentsGroupedButtonsNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.groupedButtonsTopHtml + '\n' + this.snippets.raw.groupedButtonsBottomHtml,
        htmlAttributes: {
            'ng-controller': 'GroupedButtonsCtrl as vm'
        },
        js: [this.snippets.raw.groupedButtonsControllerJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
