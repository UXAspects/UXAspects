import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-hierarchical-search-builder',
    // template: `<ux-hierarchical-search-builder></ux-hierarchical-search-builder>`
    templateUrl: './hierarchical-search-builder.component.html',
    styleUrls: ['./hierarchical-search-builder.component.less']
})
@DocumentationSectionComponent('ComponentsHierarchicalSearchBuilderComponent')
export class ComponentsHierarchicalSearchBuilderComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    playground: IPlayground;

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
