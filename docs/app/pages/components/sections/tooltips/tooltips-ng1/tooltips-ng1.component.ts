import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-tooltips-ng1',
    templateUrl: './tooltips-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTooltipsNg1Component')
export class ComponentsTooltipsNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'TooltipsCtrl as vm'
        },
        js: [this.jsCode]
    };
    
}