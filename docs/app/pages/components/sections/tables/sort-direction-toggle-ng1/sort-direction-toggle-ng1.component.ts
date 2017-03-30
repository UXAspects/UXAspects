import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-sort-direction-toggle',
    templateUrl: './sort-direction-toggle-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSortDirectionToggleNg1Component')
export class ComponentsSortDirectionToggleNg1Component {
    
    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'SortToggleCtrl as vm'
        },
        js: [this.jsCode]
    };
}