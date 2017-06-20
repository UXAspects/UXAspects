import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-draggable-panels-views-ng1',
    templateUrl: './draggable-panels-views-ng1.component.html',
    styleUrls: ['./draggable-panels-views-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggablePanelsViewsNg1Component')
export class ComponentsDraggablePanelsViewsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.draggablePanelsViewsHtml,
        htmlAttributes: {
            'ng-controller': 'DraggablePanelsViewsDemoCtrl as vm'
        },
        css: [this.snippets.examples.draggablePanelsViewsCss],
        js: [this.snippets.examples.draggablePanelsViewsJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
