import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-fixed-header-table',
    templateUrl: './fixed-header-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFixedHeaderTableNg1Component')
export class ComponentsFixedHeaderTableNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/layout.html');
    private jsCode = require('./snippets/controller.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'FixedHeaderCtrl'
        },
        js: [require('./snippets/codepen/fixed-header.js')]
    };
}