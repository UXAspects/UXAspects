import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-draggable-panels-views-ng1',
    templateUrl: './draggable-panels-views-ng1.component.html',
    styleUrls: ['./draggable-panels-views-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggablePanelsViewsNg1Component')
export class ComponentsDraggablePanelsViewsNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/draggable-panels-views.html');
    private cssCode = require('./snippets/draggable-panels-views.css');
    private javascriptCode = require('./snippets/draggable-panels-views.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'DraggablePanelsViewsDemoCtrl as vm'
        },
        css: [this.cssCode],
        js: [this.javascriptCode]
    };
}
