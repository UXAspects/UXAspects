import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-static-tooltip-ng1',
    templateUrl: './static-tooltip-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsStaticTooltipNg1Component')
export class ComponentsStaticTooltipNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'StaticTooltipDemoCtrl as vm'
        },
        js: [this.jsCode]
    };
    
}