import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-draggable-panels-ng1',
    templateUrl: './draggable-panels-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDraggablePanelsNg1Component')
export class ComponentsDraggablePanelsNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/draggable-panels.html');
    private containerHtmlCode = require('./snippets/draggable-panels-container.html');
    private panelHtmlCode = require('./snippets/draggable-panels-panel.html');
    public codepen: ICodePen = {
        html: this.htmlCode
    };
}
