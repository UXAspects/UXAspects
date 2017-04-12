import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-single-column-sorting',
    templateUrl: './single-column-sorting-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSingleColumnSortingNg1Component')
export class ComponentsSingleColumnSortingNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'SingleColumnSortingCtrl as vm'
        },
        js: [this.jsCode]
    };
}