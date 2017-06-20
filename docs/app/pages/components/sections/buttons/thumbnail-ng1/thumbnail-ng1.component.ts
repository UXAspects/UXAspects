import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-thumbnail-ng1',
    templateUrl: './thumbnail-ng1.component.html',
    styleUrls: ['./thumbnail-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsThumbnailNg1Component')
export class ComponentsThumbnailNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.thumbnailHtml,
        htmlAttributes: {
            'ng-controller': 'ThumbnailDemoCtrl as vm'
        },
        css: [this.snippets.examples.thumbnailExampleCss],
        js: [this.snippets.examples.thumbnailExampleJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
