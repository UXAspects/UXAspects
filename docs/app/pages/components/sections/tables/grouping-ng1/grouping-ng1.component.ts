import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-grouping',
    templateUrl: './grouping-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGroupingNg1Component')
export class ComponentsGroupingNg1Component extends BaseDocumentationSection {
    
    private idsCode = this.snippets.compiled.idsJs;
    private rootCode = this.snippets.compiled.rootJs;
    private hierarchyCode = this.snippets.compiled.hierarchyJs;
    
    constructor() {
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }

}