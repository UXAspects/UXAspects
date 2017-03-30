import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-hover-actions',
    templateUrl: './hover-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHoverActionsNg1Component')
export class ComponentsHoverActionsNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/layout.html');
    private jsCode = require('./snippets/controller.js');
    private cssCode = require('./snippets/styles.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'HoverActionCtrl'
        },
        js: [this.jsCode],
        css: [this.cssCode]
    };
}