import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-multiple-column-sorting',
    templateUrl: './multiple-column-sorting-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleColumnSortingNg1Component')
export class ComponentsMultipleColumnSortingNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'MultipleColumnSortingCtrl as vm'
        },
        js: [this.jsCode]
    };
}