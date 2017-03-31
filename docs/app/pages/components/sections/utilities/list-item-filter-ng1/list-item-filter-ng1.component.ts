import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-list-item-filter-ng1',
    templateUrl: './list-item-filter-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsListItemFilterNg1Component')
export class ComponentsListItemFilterNg1Component implements ICodePenProvider {
        
        private htmlCode = require('./snippets/sample.html');
        private jsCode = require('./snippets/sample.js');

        public codepen: ICodePen = {
            html: this.htmlCode,
            htmlAttributes: {
                'ng-controller': 'ListItemFilterCtrl as vm'
            },
            js: [this.jsCode]
        };
}