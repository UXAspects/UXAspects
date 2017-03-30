import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-grid-ng1',
    templateUrl: './grid-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGridNg1Component')
export class ComponentsGridNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/app.html');
    private jsCode = require('./snippets/app.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'GridDemoCtrl as vm'
        },
        js: [this.jsCode]
    };

}