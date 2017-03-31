import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-traditional-multiple-select-actions',
    templateUrl: './traditional-multiple-select-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsTraditionalMultipleSelectActionsNg1Component')
export class ComponentsTraditionalMultipleSelectActionsNg1Component extends BaseDocumentationSection {
    
    private htmlCode = this.snippets.compiled.layoutHtml;
    private selectionCode = this.snippets.compiled.selectionHtml;
    
    constructor() {
        super(
            require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/)
        );
    }
}