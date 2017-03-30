import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-hierarchy-bar-ng1',
    templateUrl: './hierarchy-bar-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHierarchyBarNg1Component')
export class ComponentsHierarchyBarNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/app.html');
    private jsCode = require('./snippets/app.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'HierarchyBarDemoCtrl as vm'
        },
        js: [ this.jsCode ]
    };
}