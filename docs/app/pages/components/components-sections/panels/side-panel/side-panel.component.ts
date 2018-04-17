import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.less']
})
@DocumentationSectionComponent('ComponentsSidePanelComponent')
export class ComponentsSidePanelComponent extends BaseDocumentationSection {
    
    open = false;
    inline = false;
    attachTo = 'window';
    width = '50%';
    top = '50px';
    modal = false;
    animate = true;
    closeOnExternalClick = false;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}