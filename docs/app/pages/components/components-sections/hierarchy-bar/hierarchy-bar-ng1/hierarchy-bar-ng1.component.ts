import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-hierarchy-bar-ng1',
    templateUrl: './hierarchy-bar-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHierarchyBarNg1Component')
export class ComponentsHierarchyBarNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.appHtml,
        htmlAttributes: {
            'ng-controller': 'HierarchyBarDemoCtrl as vm'
        },
        js: [this.snippets.raw.appJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}